<?php

namespace themeEditor\themeEditor;

if (!defined('ABSPATH')) {
    header('Status: 403 Forbidden');
    header('HTTP/1.1 403 Forbidden');
    exit;
}

use VisualComposer\Framework\Container;
use VisualComposer\Helpers\Frontend;
use VisualComposer\Helpers\PostType;
use VisualComposer\Helpers\Request;
use VisualComposer\Helpers\Str;
use VisualComposer\Helpers\Traits\WpFiltersActions;
use VisualComposer\Helpers\Traits\EventsFilters;
use VisualComposer\Modules\Settings\Traits\Page;
use VisualComposer\Modules\Settings\Traits\SubMenu;

abstract class PostTypeController extends Container
{
    use WpFiltersActions;
    use EventsFilters;
    use Page;
    use SubMenu;

    protected $postType;

    protected $postNameSlug;

    protected $postNameLowercaseSlug;

    protected $postNameSingular;

    protected $postNamePlural;

    protected $templatePath;

    protected $dbMetaSlug;

    public function __construct()
    {
        // Set iframe-css for post type
        \VcvEnv::set('VCV_DASHBOARD_IFRAME_' . strtoupper($this->postType), true);
        $this->templatePath = 'settings/pages/custom-post-type';
        $this->addFilter('vcv:frontend:head:extraOutput', 'outputEditorLayouts');
        $this->wpAddAction('admin_init', 'doRedirect');
        $this->addFilter('vcv:helpers:access:editorPostType', 'addPostType');
        $this->wpAddFilter('post_row_actions', 'updatePostEditBarLinks');
        $this->wpAddFilter('bulk_actions-edit-' . $this->postType, 'removePostActions', 10, 1);
        $this->wpAddFilter('get_edit_post_link', 'modifyPostEditLink', 10, 2);
        $this->addFilter('vcv:frontend:url', 'addTypeToLink');
        $this->addEvent('vcv:inited', 'registerPostType');
        // We use wp action for 3rd developers API
        $this->wpAddAction('vcv:themeEditor:' . strtolower($this->postNameSlug), 'renderPageLayout');
        $this->wpAddFilter('vcv:themeEditor:' . strtolower($this->postNameSlug) . ':enabled', 'checkHfs');
        $this->addFilter('vcv:frontend:head:extraOutput', 'addGlobalVariables');

        $this->addEvent('vcv:inited', 'setCoreCapabilities');

        $this->addFilter('vcv:addons:exportImport:allowedPostTypes', 'enableExportTypes');

        $this->addFilter(
            'vcv:ajax:layoutDropdown:' . strtolower($this->postNameSlug) . ':updateList:adminNonce',
            'getPostList',
            11
        );

        $this->wpAddAction('admin_menu', 'addPage');

        $this->addFilter(
            'vcv:ajax:wordpress:settings:process:plugin:post:type:' . $this->postType . ':trash:adminNonce',
            'trashPostLinkController'
        );
    }

    /**
     * Redirect to frontend editor
     *
     * @param \VisualComposer\Helpers\Request $requestHelper
     */
    protected function doRedirect(Request $requestHelper)
    {
        global $pagenow;
        if (($pagenow === 'post-new.php' || ($pagenow === 'post.php' && $requestHelper->input('action') === 'edit'))
            && (
                $requestHelper->input('post_type') === $this->postType
                || get_post_type($requestHelper->input('post')) === $this->postType
            )
            && !$requestHelper->exists('vcv-action')
        ) {
            //redirect from classic editor to frontend editor
            if ($pagenow === 'post.php' && $requestHelper->input('post')) {
                $sourceId = $requestHelper->input('post');
                $attr = '?post=' . $sourceId . '&action=edit&vcv-source-id=' . $sourceId . '&';
                wp_redirect(
                    admin_url(
                        $pagenow . $attr . 'post_type=' . rawurlencode($this->postType)
                        . '&vcv-action=frontend&vcv-editor-type='
                        . rawurlencode($this->postType)
                    )
                );
                exit;
            }
            wp_redirect(
                add_query_arg(['vcv-action' => 'frontend', 'vcv-editor-type' => rawurlencode($this->postType)])
            );
            exit;
        }
    }

    /**
     * Add post type support for frontend editor
     *
     * @param $postTypes
     *
     * @return array
     */
    protected function addPostType($postTypes)
    {
        if (!in_array($this->postType, $postTypes)) {
            $postTypes[] = $this->postType;
        }

        return $postTypes;
    }

    /**
     * Update update post edit bar links
     *
     * @param $actions
     * @param $post
     *
     * @return mixed
     */
    protected function updatePostEditBarLinks(
        $actions,
        $post
    ) {
        // @codingStandardsIgnoreLine
        if ($post->post_type === $this->postType) {
            unset($actions['inline hide-if-no-js']);
            unset($actions['edit']);
            unset($actions['view']);
            unset($actions['preview']);
            $actions = array_reverse($actions);
        }

        return $actions;
    }

    /**
     * Remove edit action from dropdown
     *
     * @param $actions
     *
     * @return mixed
     */
    protected function removePostActions($actions)
    {
        global $post;

        // @codingStandardsIgnoreLine
        if (isset($post->post_type) && $post->post_type === $this->postType) {
            unset($actions['edit']);
        }

        return $actions;
    }

    /**
     * Modify default edit link on post title
     *
     * @param $link
     * @param $sourceId
     *
     * @return string
     */
    protected function modifyPostEditLink($link, $sourceId)
    {
        global $post;

        // @codingStandardsIgnoreLine
        if (isset($post->post_type) && $post->post_type === $this->postType) {
            $question = (preg_match('/\?/', $link) ? '&' : '?');
            $query = [
                'vcv-action' => 'frontend',
                'vcv-source-id' => $sourceId,
                'vcv-editor-type' => $this->postType,
            ];
            $link = $link . $question . http_build_query($query, '', '&');
            $link = str_replace('?&', '?', $link);
        }

        return $link;
    }

    /**
     * @param $url
     * @param $payload
     *
     * @return string
     */
    protected function addTypeToLink($url, $payload)
    {
        if ($this->postType === get_post_type($payload['sourceId'])) {
            return add_query_arg(['vcv-editor-type' => $this->postType], $url);
        }

        return $url;
    }

    /**
     * Register post type
     *
     * @throws \VisualComposer\Framework\Illuminate\Container\BindingResolutionException
     */
    protected function registerPostType()
    {
        $settings = vcapp('SettingsPagesSettings');
        register_post_type(
            $this->postType,
            [
                'labels' => [
                    'name' => $this->postNamePlural,
                    'singular_name' => $this->postNameSingular,
                    'menu_name' => $this->postNamePlural,
                    'add_new' => sprintf(__('Add %s', 'visualcomposer'), $this->postNameSingular),
                    'add_new_item' => sprintf(__('Add New %s', 'visualcomposer'), $this->postNameSingular),
                    'edit' => __('Edit', 'visualcomposer'),
                    'edit_item' => sprintf(__('Edit %s', 'visualcomposer'), $this->postNameSingular),
                    'new_item' => sprintf(__('New %s', 'visualcomposer'), $this->postNameSingular),
                    'view' => sprintf(__('View %s', 'visualcomposer'), $this->postNamePlural),
                    'view_item' => sprintf(__('View %s', 'visualcomposer'), $this->postNameSingular),
                    'search_items' => sprintf(__('Search %s', 'visualcomposer'), $this->postNameSingular),
                    'not_found' => sprintf(__('No %s Found', 'visualcomposer'), $this->postNamePlural),
                    'not_found_in_trash' => sprintf(
                        __('No %s Found in Trash', 'visualcomposer'),
                        $this->postNamePlural
                    ),
                    'parent' => sprintf(__('Parent %s', 'visualcomposer'), $this->postNameSingular),
                    'filter_items_list' => sprintf(__('Filter %s', 'visualcomposer'), $this->postNamePlural),
                    'items_list_navigation' => sprintf(__('%s Navigation', 'visualcomposer'), $this->postNamePlural),
                    'items_list' => sprintf(__('%s List', 'visualcomposer'), $this->postNamePlural),
                ],
                'public' => false,
                'capability_type' => [$this->postType, $this->postType . 's'],
                'capabilities' => [
                    'edit_post' => 'edit_' . $this->postType,
                    'read_post' => 'read_' . $this->postType,
                    'delete_post' => 'delete_' . $this->postType,
                    'edit_posts' => 'edit_' . $this->postType . 's',
                    'edit_others_posts' => 'edit_others_' . $this->postType . 's',
                    'publish_posts' => 'publish_' . $this->postType . 's',
                    'read_private_posts' => 'read_private_' . $this->postType . 's',
                    'create_posts' => 'edit_' . $this->postType . 's',
                    'edit_published_posts' => 'edit_published_' . $this->postType . 's',
                    'delete_posts' => 'delete_' . $this->postType . 's',
                    'delete_private_posts' => 'delete_private_' . $this->postType . 's',
                    'delete_published_posts' => 'delete_published_' . $this->postType . 's',
                    'delete_others_posts' => 'delete_others_' . $this->postType . 's',
                    'read' => 'read_' . $this->postType,
                ],
                'publicly_queryable' => false,
                'exclude_from_search' => true,
                'show_ui' => true,
                'show_in_menu' => false,
                'menu_icon' => 'dashicons-admin-page',
                'hierarchical' => false,
                'taxonomies' => [],
                'has_archive' => false,
                'rewrite' => false,
                'query_var' => false,
                'show_in_nav_menus' => false,
            ]
        );
    }

    /**
     * Set user capabilities specific for current post type.
     */
    protected function setCoreCapabilities()
    {
        $postTypeHelper = vchelper('PostType');
        $postTypeHelper->updatePostTypeUserRoleCapabilities($this->postType);
    }

    protected function outputEditorLayouts(
        $response,
        $payload,
        PostType $postTypeHelper,
        Str $strHelper
    ) {
        $currentPost = $postTypeHelper->get();
        $posts = $postTypeHelper->query(['post_type' => $this->postType, 'posts_per_page' => -1]);

        $layouts = [];
        foreach ($posts as $post) {
            /** @var \WP_Post $post */
            // @codingStandardsIgnoreLine
            $layouts[ $post->ID ] = $post->post_title;
        }

        $currentLayout = get_post_meta($currentPost->ID, '_' . VCV_PREFIX . $this->postNameSlug . 'TemplateId', true);

        return array_merge(
            $response,
            [
                vcview(
                    'partials/constant-script',
                    [
                        'key' => 'VCV_' . $strHelper->upper($this->postNameSlug) . '_TEMPLATES',
                        'value' => [
                            'current' => $currentLayout,
                            'all' => count($layouts) > 0 ? $layouts : false,
                        ],
                    ]
                ),
            ]
        );
    }

    /**
     * Render and output page layout header/footer/sidebar.
     *
     * @param \VisualComposer\Helpers\Frontend $frontendHelper
     * @param \themeEditor\themeEditor\LayoutController $layoutController
     *
     * @return void
     * @throws \ReflectionException
     * @throws \VisualComposer\Framework\Illuminate\Container\BindingResolutionException
     */
    protected function renderPageLayout(Frontend $frontendHelper, LayoutController $layoutController)
    {
        $sourceId = vchelper('Preview')->updateSourceIdWithAutosaveId(get_the_ID());

        $currentTemplateValue = get_post_meta($sourceId, '_' . VCV_PREFIX . $this->postNameSlug . 'TemplateId', true);

        $currentTemplateId = intval($currentTemplateValue);
        $currentTemplatePost = $currentTemplateId > 0 ? get_post($currentTemplateId) : false;

        $defaultTemplate = $layoutController->getGlobalTemplatePartData($this->postNameSingular);
        $defaultTemplateValue = $defaultTemplate['sourceId'];

        $defaultTemplateId = intval($defaultTemplateValue);
        $defaultTemplatePost = $defaultTemplateId > 0 ? get_post($defaultTemplateId) : false;

        /** @see \themeEditor\themeEditor\PostTypeController::getQueryArgs */
        $args = $this->call(
            'getQueryArgs',
            [
                $defaultTemplatePost,
                $currentTemplatePost,
                $currentTemplateValue,
                $defaultTemplateValue,
            ]
        );

        if (isset($args['p']) && $args['p'] > 0) {
            echo vchelper('Frontend')->renderContent($args['p']);
        } elseif ($frontendHelper->isPageEditable()) {
            $this->outputEditLayoutText();
        }

        $this->outputLayoutControlsLinks($args);
    }

    /**
     * Output header/footer/sidebar controls links.
     *
     * @param $args
     *
     * @return void
     */
    protected function outputLayoutControlsLinks($args = [])
    {
        $frontendHelper = vchelper('Frontend');
        if (!$frontendHelper->isPageEditable()) {
            return;
        }

        $editLink = isset($args['p']) && $args['p'] > 0 ? get_edit_post_link($args['p'], 'url') : '';

        echo vcaddonview(
            'zone-edit-control',
            [
                'addon' => 'themeEditor',
                'blockId' => isset($args['p']) && $args['p'] > 0 ? $args['p'] : 0,
                'editLink' => $editLink,
                'title' => $this->postNameSingular,
            ]
        );
    }

    /**
     * Output edit header/footer/sidebar edit text.
     *
     * @param $args
     *
     * @return void
     */
    protected function outputEditLayoutText()
    {
        echo sprintf(
            '<div class="vcv-zone-empty"><span class="vcv-zone-empty-text">%s</span></div>',
            sprintf(__('Select a %s', 'visualcomposer'), lcfirst(esc_attr($this->postNameSingular)))
        );
    }

    /**
     * @param $scripts
     *
     * @return array
     */
    protected function addGlobalVariables($scripts)
    {
        $variables = [];
        $variables[] = sprintf(
            '<script>window["vcvCreate" + "%s"] = "%s";</script>',
            $this->postNameSlug,
            admin_url('post-new.php?post_type=' . $this->postType)
        );

        return array_merge($scripts, $variables);
    }

    /**
     * Get post query arguments for a header/footer/sidebar.
     *
     * @param false|\WP_Post $defaultTemplatePost
     * @param false|\WP_Post $currentTemplatePost
     * @param int|string $defaultTemplateValue
     * @param int|string $currentTemplateValue
     * @param \VisualComposer\Helpers\Request $requestHelper
     * @param \VisualComposer\Helpers\Frontend $frontendHelper
     * @param \VisualComposer\Helpers\Str $strHelper
     *
     * @return array
     */
    protected function getQueryArgs(
        $defaultTemplatePost,
        $currentTemplatePost,
        $currentTemplateValue,
        $defaultTemplateValue,
        Request $requestHelper,
        Frontend $frontendHelper,
        Str $strHelper
    ) {
        $inputSlug = 'vcv-' . $strHelper->lower($this->postNameSlug);
        $inputValue = $requestHelper->input($inputSlug);
        $args = $this->getInitialQueryArgs();

        if ($inputValue === 'none') {
            return $args;
        }

        if (!$requestHelper->exists($inputSlug) && $currentTemplateValue === 'none') {
            return $args;
        }

        if (
            // @codingStandardsIgnoreLine
            $defaultTemplatePost && $defaultTemplatePost->post_status === 'publish'
            // @codingStandardsIgnoreLine
            && (!$currentTemplatePost || $currentTemplatePost->post_status !== 'publish')
        ) {
            $args['p'] = $defaultTemplateValue;
            // @codingStandardsIgnoreLine
        } elseif ($currentTemplatePost && $currentTemplatePost->post_status === 'publish') {
            $args['p'] = $currentTemplateValue;
        }

        if ($requestHelper->exists($inputSlug)  && $frontendHelper->isPageEditable()) {
            if ('default' === $inputValue
                && $defaultTemplatePost
                // @codingStandardsIgnoreLine
                && $defaultTemplatePost->post_status === 'publish'
            ) {
                $args['p'] = $defaultTemplateValue;
            } else {
                $args['p'] = intval($inputValue);
            }
        }

        return $args;
    }

    /**
     * Get initial args for a header/footer/sidebar.
     *
     * @return array
     */
    protected function getInitialQueryArgs()
    {
        $args = [
            'post_type' => $this->postType,
            'posts_per_page' => -1,
            'post_status' => 'publish',
        ];

        return $args;
    }

    protected function enableExportTypes($postTypes)
    {
        $postTypes[] = $this->postType;

        return $postTypes;
    }

    protected function checkHfs($state, Frontend $frontendHelper)
    {
        $state = false;

        $sourceId = vchelper('Preview')->updateSourceIdWithPreviewId(get_the_ID());

        $currentTemplateId = get_post_meta($sourceId, '_' . VCV_PREFIX . $this->postNameSlug . 'TemplateId', true);

        if ($frontendHelper->isPageEditable() || $currentTemplateId !== 'none') {
            $state = true;
        }

        return $state;
    }

    /**
     * Locate the requested template
     *
     * @param $templates
     */
    protected function extractTemplate($templates)
    {
        ob_start();
        locate_template($templates, true);
        ob_get_clean();
    }

    /**
     * Return layouts on hfs dropdown open
     *
     * @return array
     */
    protected function getPostList()
    {
        $postTypeHelper = vchelper('PostType');
        $currentPost = $postTypeHelper->get();
        $posts = $postTypeHelper->query(['post_type' => $this->postType, 'posts_per_page' => -1]);

        if (empty($posts)) {
            return ['status' => false];
        }

        $layouts = [];
        foreach ($posts as $post) {
            /** @var \WP_Post $post */
            // @codingStandardsIgnoreLine
            $layouts[ $post->ID ] = $post->post_title;
        }

        if (isset($currentPost->ID)) {
            $currentLayout = get_post_meta(
                $currentPost->ID,
                '_' . VCV_PREFIX . $this->postNameSlug . 'TemplateId',
                true
            );
        } else {
            $currentLayout = 'default';
        }

        $templateList = [
            'current' => $currentLayout,
            'all' => count($layouts) > 0 ? $layouts : false,
        ];

        return ['status' => true, 'data' => $templateList];
    }

    /**
     * Create settings page
     * @throws \Exception
     */
    protected function addPage()
    {
        $page = [
            'slug' => $this->postType,
            'title' => $this->postNamePlural,
            'layout' => 'dashboard-tab-content-nopadding',
            'capability' => 'edit_' . $this->postType . 's',
            'capabilityPart' => 'dashboard_addon_theme_builder',
            'isDashboardPage' => true,
            'forceReloadOnOpen' => true,
            'hideTitle' => true,
            'hideInWpMenu' => true
        ];
        $this->addSubmenuPage($page, 'vcv-headers-footers');
    }

    /**
     * To replace current post type with corresponding template.
     *
     * @param string $name
     * @param \themeEditor\themeEditor\LayoutController $layoutController
     */
    protected function replaceTemplate($name, LayoutController $layoutController)
    {
        if ($this->isWordpressThemeLayout()) {
            return;
        }

        $templateData = $layoutController->getTemplatePartId($this->postNameLowercaseSlug);

        if (!$templateData['replaceTemplate']) {
            return;
        }

        $sourceId = $templateData['sourceId'];

        echo vcaddonview(
            'layouts/vcv-custom-' . $this->postNameLowercaseSlug,
            [
                'addon' => 'themeEditor',
                'sourceId' => $sourceId,
                'part' => $this->postNameSingular,
            ]
        );

        $templates = [];
        if ($name) {
            $templates[] = $this->postNameLowercaseSlug . '-' . $name . '.php';
        }
        $templates[] = $this->postNameLowercaseSlug . '.php';

        $this->extractTemplate($templates);
    }

    /**
     * Check if current page layout has value 'Wordpress: Theme'.
     *
     * @return bool
     */
    protected function isWordpressThemeLayout()
    {
        $isWpThemePageLayout = false;
        $requestHelper = vchelper('Request');

        if ($requestHelper->exists(VCV_PREFIX . 'template')) {
            if ($requestHelper->input(VCV_PREFIX . 'template') === 'theme:standard') {
                $isWpThemePageLayout = true;
            }
        } else {
            $sourceId = vchelper('Preview')->updateSourceIdWithPreviewId(get_the_ID());
            $pageTemplateType = get_post_meta($sourceId, '_' . VCV_PREFIX . 'page-template', true);

            if ($pageTemplateType === 'theme:standard') {
                return true;
            }
        }

        return $isWpThemePageLayout;
    }

    /**
     * Add shortcode for a current post type.
     * We use it for our headers, footers, and sidebars,
     *
     * @param array $atts
     *
     * @return false|mixed|string
     */
    public function addTemplateShortcode($atts)
    {
        if (empty($atts) || empty($atts['id']) || $atts['id'] === 'none') {
            return '';
        }

        $requestHelper = vchelper('Request');
        $frontendHelper = vchelper('Frontend');
        $source = $requestHelper->input('vcv-' . $this->postNameLowercaseSlug);
        if ($source && $frontendHelper->isPageEditable()) {
            $atts['id'] = $source;
        }

        $defaultValues = ['default', 'defaultGlobal', 'defaultLayout'];
        if (in_array($atts['id'], $defaultValues)) {
            $templateId = '';
            if ($atts['id'] === 'defaultGlobal') {
                $globalTemplateData = vcapp(
                    '\themeEditor\themeEditor\LayoutController'
                )->getGlobalTemplatePartData($this->postNameLowercaseSlug);
                $templateId = $globalTemplateData['sourceId'];
            } elseif ($atts['id'] === 'defaultLayout') {
                $layoutId = $requestHelper->input('vcv-template');
                $templateId = get_post_meta(
                    $layoutId,
                    '_' . VCV_PREFIX .  $this->postNameSlug . 'TemplateId',
                    true
                );
            }

            return vchelper('Frontend')->renderContent($templateId);
            // TOOD: NOTE: We cannot render "theme default" footer/header
        } elseif (is_numeric($atts['id'])) {
            return vchelper('Frontend')->renderContent($atts['id']);
        }

        return '';
    }

    /**
     * We use it to replace headers and footers with corresponding
     * headers and footers in a block themes
     *
     * @link https://developer.wordpress.org/block-editor/how-to-guides/themes/block-theme-overview/
     *
     * @param string $name
     * @param \themeEditor\themeEditor\LayoutController $layoutController
     * @param \VisualComposer\Helpers\PageLayout $pageLayoutHelper
     */
    protected function replaceBlockTemplate($blockContent, $parsedBlock, LayoutController $layoutController)
    {
        if ($this->isWordpressThemeLayout()) {
            return $blockContent;
        }

        $templateData = $layoutController->getTemplatePartId($this->postNameLowercaseSlug);
        if (!$templateData['replaceTemplate']) {
            return $blockContent;
        }

        if (empty($parsedBlock['attrs']['tagName'])) {
            return $blockContent;
        }

        $templateTagName = $parsedBlock['attrs']['tagName'];

        if ($templateTagName === $this->postNameLowercaseSlug) {
            $content = vchelper('Frontend')->renderContent($templateData['sourceId']);

            $blockContent = $this->getTemplateWrapperStart() . $content . $this->getTemplateWrapperEnd();
        }

        return $blockContent;
    }

    /**
     * Get template content wrapper start.
     *
     * @return string
     */
    protected function getTemplateWrapperStart()
    {
        return '';
    }

    /**
     * Get template content wrapper end.
     *
     * @return string
     */
    protected function getTemplateWrapperEnd()
    {
        return '';
    }

    /**
     * Ajax request controller for remove post link.
     *
     * @param string $response
     * @param \VisualComposer\Helpers\Request $request
     *
     * @return array
     */
    protected function trashPostLinkController($response, Request $request)
    {
        $postId = intval($request->input('vcv-source-id'));
        $response = ['status' => false];

        if (empty($postId)) {
            return $response;
        }

        $postList = $this->getHfsAttachedToPosts($postId);

        if (!empty($postList)) {
            $response['status'] = true;
            $response['vcvPostList'] = $postList;
        }

        $settingsList = $this->getSettingsAttachedGlobalToHfs($postId);

        if (!empty($settingsList)) {
            $response['status'] = true;
            $response['vcvGlobalSettingsList'] = $settingsList;
        }

        return $response;
    }

    /**
     * Get list of posts where header/footer/sidebar is attached.
     *
     * @param int $layoutPostId
     *
     * @return array
     */

    protected function getHfsAttachedToPosts($postId)
    {
        global $wpdb;
        $postList = [];
        $query = $wpdb->prepare(
            "SELECT " . $wpdb->posts . ".post_title, " . $wpdb->posts . ".ID FROM " . $wpdb->posts . " JOIN " . $wpdb->postmeta . " ON " . $wpdb->posts . ".ID = " . $wpdb->postmeta . ".post_id WHERE meta_key=%s AND meta_value = %s AND post_type != 'revision' LIMIT 10",
            $this->dbMetaSlug,
            $postId
        );
        $result = $wpdb->get_results($query, ARRAY_A);

        if (empty($result) || !is_array($result)) {
            return $postList;
        }

        foreach ($result as $postData) {
            $postList[ $postData['ID']] = $postData['post_title'];
        }

        return $postList;
    }

    /**
     * Get global settings title list where header/footer/sidebar is attached.
     *
     * @param int $postId
     *
     * @return array $settingsList
     */
    protected function getSettingsAttachedGlobalToHfs($postId)
    {
        $settingsList = [];

        global $wpdb;
        $query = $wpdb->prepare(
            'SELECT option_name FROM '  . $wpdb->options . ' WHERE option_name LIKE %s AND option_value = %d',
            'vcv-headerFooterSettings%',
            $postId
        );
        $result = $wpdb->get_results($query, ARRAY_A);

        if (empty($result) || !is_array($result)) {
            return $settingsList;
        }

        foreach ($result as $settingsData) {
            $settingName = $settingsData['option_name'];
            $settingName = str_replace('vcv-headerFooterSettings', '', $settingName);
            $settingName = str_replace(['-', 'PageType', 'SeparatePostType'], ' ', $settingName);

            $settingName = ucfirst($settingName);

            $settingsList[] = $settingName;
        }

        return $settingsList;
    }
}

<?php

namespace popupBuilder\popupBuilder;

if (!defined('ABSPATH')) {
    header('Status: 403 Forbidden');
    header('HTTP/1.1 403 Forbidden');
    exit;
}

use VisualComposer\Framework\Container;
use VisualComposer\Framework\Illuminate\Support\Module;
use VisualComposer\Helpers\Access\CurrentUser;
use VisualComposer\Helpers\Frontend;
use VisualComposer\Helpers\PostType;
use VisualComposer\Helpers\Request;
use VisualComposer\Helpers\Traits\EventsFilters;
use VisualComposer\Helpers\Traits\WpFiltersActions;
use VisualComposer\Modules\Settings\Traits\Page;
use VisualComposer\Modules\Settings\Traits\SubMenu;

class PostTypeController extends Container implements Module
{
    use Page;
    use SubMenu;
    use EventsFilters;
    use WpFiltersActions;

    protected $postType = 'vcv_popups';

    protected $slug = 'vcv_popups';

    protected $templatePath = 'settings/pages/custom-post-type';

    public function __construct()
    {
        // Set iframe-css for post type
        \VcvEnv::set('VCV_DASHBOARD_IFRAME_VCV_POPUPS', true);
        // Set dashboard modifications for addon (needed for BC when addons not updated)
        \VcvEnv::set('VCV_HUB_ADDON_DASHBOARD_POPUPBUILDER', true);
        $this->addEvent('vcv:inited', 'registerArchiveTemplatesPostType', 10);
        $this->addEvent('vcv:inited', 'setCoreCapabilities');
        $this->addFilter('vcv:frontend:url', 'addTypeToLink');
        $this->addFilter('vcv:helpers:access:editorPostType', 'addPostType');
        $this->wpAddAction('admin_init', 'doRedirect');
        $this->wpAddFilter('bulk_actions-edit-' . $this->postType, 'removePostActions', 10, 1);
        $this->wpAddFilter('post_row_actions', 'updatePostEditBarLinks');
        $this->addFilter('vcv:addons:exportImport:allowedPostTypes', 'enableExportTypes');
        $this->addFilter('vcv:editor:settings:pageTemplatesLayouts:current', 'popupEditorBlankTemplate', 30);
        $this->addFilter('vcv:editor:variables', 'addCustomPopupVariables', 11);

        $this->addFilter(
            'vcv:ajax:attribute:linkSelector:getPopups:adminNonce',
            'getPopups'
        );
        $this->wpAddAction(
            'admin_menu',
            'addPage'
        );

        $this->addFilter(
            'vcv:ajax:wordpress:settings:process:plugin:post:type:' . $this->postType . ':trash:adminNonce',
            'trashPostLinkController'
        );
    }

    /**
     * Create settings page
     * @throws \Exception
     */
    protected function addPage()
    {
        $page = [
            'slug' => $this->postType,
            'title' => __('Popup Builder', 'visualcomposer'),
            'subTitle' => __('Popups', 'visualcomposer'),
            'layout' => 'dashboard-tab-content-nopadding',
            'iconClass' => 'vcv-ui-icon-dashboard-popup-builder',
            'capability' => 'edit_vcv_popupss',
            'capabilityPart' => 'dashboard_addon_popup_builder',
            'isDashboardPage' => true,
            'forceReloadOnOpen' => true,
            'hideTitle' => true,
            'hideInWpMenu' => true,
        ];
        $this->addSubmenuPage($page, 'vcv-custom-site-popups');
    }

    /**
     * Create archive template post type
     *
     */
    protected function registerArchiveTemplatesPostType()
    {
        $settings = vcapp('SettingsPagesSettings');

        register_post_type(
            $this->postType,
            [
                'label' => __('Popups', 'visualcomposer'),
                'public' => false,
                'publicly_queryable' => false,
                'exclude_from_search' => true,
                'show_ui' => true,
                'menu_icon' => 'dashicons-admin-page',
                'hierarchical' => false,
                'taxonomies' => [],
                'has_archive' => false,
                'rewrite' => false,
                'query_var' => false,
                'show_in_nav_menus' => false,
                'capability_type' => [$this->postType, $this->postType . 's'],
                'capabilities' => [
                    'edit_post' => 'edit_' . $this->postType,
                    'read_post' => 'read_' . $this->postType,
                    'delete_post' => 'delete_' . $this->postType,
                    'edit_posts' => 'edit_' . $this->postType . 's',
                    'edit_others_posts' => 'edit_others_' . $this->postType . 's',
                    'publish_posts' => 'publish_' . $this->postType . 's',
                    'create_posts' => 'edit_' . $this->postType . 's',
                    'edit_published_posts' => 'edit_published_' . $this->postType . 's',
                    'delete_posts' => 'delete_' . $this->postType . 's',
                    'delete_published_posts' => 'delete_published_' . $this->postType . 's',
                    'delete_others_posts' => 'delete_others_' . $this->postType . 's',
                    'read' => 'read_' . $this->postType,
                ],
                'show_in_menu' => false,
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
            $frontendHelper = vchelper('Frontend');
            //redirect from classic editor to frontend editor
            if ($pagenow === 'post.php' && $requestHelper->input('post')) {
                $sourceId = $requestHelper->input('post');
                wp_redirect(
                    $frontendHelper->getFrontendUrl($sourceId)
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
            $templateType = get_post_meta($post->ID, '_vcv-type', true);
            unset($actions['inline hide-if-no-js']);
            unset($actions['edit']);
            unset($actions['view']);
            unset($actions['preview']);
            if (!in_array($templateType, ['', 'custom'])) {
                unset($actions['trash']);
            }
            $actions = array_reverse($actions);
        }

        return $actions;
    }

    protected function enableExportTypes($postTypes)
    {
        $postTypes[] = $this->postType;

        return $postTypes;
    }

    /**
     * Use blank stretched template
     *
     * @param $originalTemplate
     * @param \VisualComposer\Helpers\PostType $postTypeHelper
     * @param \VisualComposer\Helpers\Frontend $frontendHelper
     *
     * @return array
     * @throws \VisualComposer\Framework\Illuminate\Container\BindingResolutionException
     */
    protected function popupEditorBlankTemplate(
        $originalTemplate,
        PostType $postTypeHelper,
        Frontend $frontendHelper,
        Request $requestHelper
    ) {
        if (($requestHelper->input('vcv-editor-type') === $this->postType && $frontendHelper->isFrontend())
            || $frontendHelper->isPageEditable()
        ) {
            $postId = vcfilter('vcv:editor:settings:pageTemplatesLayouts:current:custom');
            if ($postTypeHelper->get($postId)->post_type === $this->postType) {
                return ['type' => 'vc', 'value' => 'blank', 'stretchedContent' => 1];
            }
        }

        return $originalTemplate;
    }

    /**
     * Get list of popups
     *
     * @param \VisualComposer\Helpers\Request $requestHelper
     * @param \VisualComposer\Helpers\Access\CurrentUser $currentUserAccessHelper
     *
     * @return array
     */
    protected function getPopups(Request $requestHelper, CurrentUser $currentUserAccessHelper)
    {
        $results = [];
        $sourceId = (int)$requestHelper->input('vcv-source-id');
        if ($sourceId && $currentUserAccessHelper->wpAll(['edit_post', $sourceId])->get()) {
            $args = [
                'posts_per_page' => -1,
                'post_type' => 'vcv_popups',
            ];
            $posts = get_posts($args);

            foreach ($posts as $post) {
                $results[] = [
                    'id' => $post->ID,
                    // @codingStandardsIgnoreLine
                    'title' => $post->post_title,
                    'url' => vcfilter('vcv:linkSelector:url', get_permalink($post->ID), ['post' => $post]),
                    // @codingStandardsIgnoreLine
                    'type' => $post->post_type,
                ];
            }
        }

        return $results;
    }

    /**
     * Add custom global variables.
     *
     * @param array $variables
     *
     * @return array
     */
    protected function addCustomPopupVariables($variables)
    {
        $variables[] = [
            'key' => 'vcvCreatevcv_popups',
            'value' => admin_url('post-new.php?post_type=' . $this->postType),
            'type' => 'variable',
        ];

        return $variables;
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
        $popupPostId = intval($request->input('vcv-source-id'));
        $response = ['status' => false];

        if (empty($popupPostId)) {
            return $response;
        }

        $popupListLinks = $this->getPopupsAttachedToElementsLinks($popupPostId);

        $popupListPostSettings = $this->getPopupsAttachedToPostSettings($popupPostId);

        $popupList = $popupListLinks + $popupListPostSettings;

        if (!empty($popupList)) {
            $response['status'] = true;
            $response['vcvPostList'] = $popupList;
        }

        $settingsList = $this->getSettingsAttachedGlobalToPopup($popupPostId);

        if (!empty($settingsList)) {
            $response['status'] = true;
            $response['vcvGlobalSettingsList'] = $settingsList;
        }

        return $response;
    }

    /**
     * Get list of posts where popup is attached to element link.
     *
     * @param int $popupPostId
     *
     * @return array
     */
    protected function getPopupsAttachedToElementsLinks($popupPostId)
    {
        global $wpdb;
        $postList = [];
        $query = $wpdb->prepare(
            "SELECT post_title, ID FROM " . $wpdb->posts . " WHERE post_type != 'revision' AND post_content LIKE '%href=\"#vcv-popup-%d\"%' LIMIT 10",
            $popupPostId
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
     * Get list of posts where popup is attached to post settings.
     *
     * @param int $popupPostId
     *
     * @return array
     */
    protected function getPopupsAttachedToPostSettings($popupPostId)
    {
        global $wpdb;
        $postList = [];
        $query = $wpdb->prepare(
            "SELECT post_id, meta_value FROM " . $wpdb->postmeta . " WHERE meta_value!='' AND meta_key=%s",
            '_' . VCV_PREFIX . 'settingsPopup'
        );

        $result = $wpdb->get_results($query, ARRAY_A);

        if (empty($result) || !is_array($result)) {
            return $postList;
        }

        foreach ($result as $postData) {
            $popupSettingsList = unserialize($postData['meta_value']);

            if (empty($popupSettingsList) || !is_array($popupSettingsList)) {
                continue;
            }

            foreach ($popupSettingsList as $popup) {
                if (empty($popup['id'])) {
                    continue;
                }

                if ($popup['id'] != $popupPostId) {
                    continue;
                }

                if (get_post_status($postData['post_id']) === 'revision') {
                    continue;
                }

                $postList[$postData['post_id']] = get_the_title($postData['post_id']);
            }
        }

        return $postList;
    }

    /**
     * Get global settings title list where popup is attached.
     *
     * @param int $popupPostId
     *
     * @return array $settingsList
     */
    protected function getSettingsAttachedGlobalToPopup($popupPostId)
    {
        $settingsList = [];

        $optionsHelper = vchelper('Options');

        $optionValue = $optionsHelper->get('custom-site-popups-vcv_popup_on_first_page_load');
        if (!empty($optionValue) && intval($optionValue) === $popupPostId) {
            $settingsList[] = __('Popup On first page load', 'vcwb');
        }

        $optionValue = $optionsHelper->get('custom-site-popups-vcv_popup_on_page_load');
        if (!empty($optionValue) && intval($optionValue) === $popupPostId) {
            $settingsList[] = __('Popup On every page load', 'vcwb');
        }

        $optionValue = $optionsHelper->get('custom-site-popups-vcv_popup_on_exit_intent');
        if (!empty($optionValue) && intval($optionValue) === $popupPostId) {
            $settingsList[] = __('Popup On exit intent', 'vcwb');
        }

        return $settingsList;
    }
}

<?php

namespace maintenanceMode\maintenanceMode;

if (!defined('ABSPATH')) {
    header('Status: 403 Forbidden');
    header('HTTP/1.1 403 Forbidden');
    exit;
}

use VisualComposer\Framework\Container;
use VisualComposer\Framework\Illuminate\Support\Module;
use VisualComposer\Helpers\Hub\Addons;
use VisualComposer\Helpers\Options;
use VisualComposer\Helpers\Frontend;
use VisualComposer\Helpers\Traits\EventsFilters;
use VisualComposer\Helpers\Traits\WpFiltersActions;
use VisualComposer\Modules\Settings\Traits\Fields;
use VisualComposer\Modules\Settings\Traits\Page;
use VisualComposer\Modules\Settings\Traits\SubMenu;

class SettingsController extends Container implements Module
{
    use WpFiltersActions;
    use EventsFilters;
    use Fields;
    use Page;
    use SubMenu;

    /**
     * @var string
     */
    protected $slug = 'vcv-maintenance-mode';

    /*
     * @var string
     */
    protected $templatePath = 'settings/pages/index';

    public function __construct()
    {
        // Set dashboard modifications for addon (needed for BC when addons not updated)
        \VcvEnv::set('VCV_HUB_ADDON_DASHBOARD_MAINTENANCEMODE', true);
        $this->optionGroup = 'vcv-maintenance-mode';
        $this->optionSlug = 'vcv-maintenanceMode';

        $this->wpAddAction(
            'admin_init',
            'buildPage',
            40
        );
        $this->wpAddFilter('submenu_file', 'subMenuHighlight');
        $this->wpAddAction(
            'admin_head',
            'enqueueCss'
        );

        $this->wpAddAction(
            'admin_menu',
            'addPage'
        );
        $this->addEvent('vcv:settings:save', 'addPage');
    }

    protected function subMenuHighlight($submenuFile)
    {
        $screen = get_current_screen();
        if (strpos($screen->id, $this->slug)) {
            $submenuFile = 'vcv-settings';
        }

        return $submenuFile;
    }

    protected function enqueueCss()
    {
        echo '<style id="vcv-addons-maintenance-mode-settings-style" type="text/css">';
        $fileHelper = vchelper('File');
        echo $fileHelper->getContents(__DIR__ . '/../public/dist/element.bundle.css');
        echo '</style>';
    }

    protected function beforeRender(Addons $addonsHelper)
    {
        $addonUrl = $addonsHelper->getAddonUrl('maintenanceMode');
        wp_enqueue_script(
            'vcv-addons-maintenance-mode-settings',
            $addonUrl . '/public/dist/element.bundle.js',
            ['jquery'],
            VCV_VERSION
        );
    }

    protected function buildPage()
    {
        $sectionCallback = function () {
            echo sprintf(
                '<p class="description">%s</p>',
                esc_html__(
                    'Enable maintenance mode and select the page that will be displayed to the website visitors. Users with access to the admin panel will still be able to preview and edit the website.',
                    'visualcomposer'
                )
            );
        };
        $this->addSection(
            [
                'page' => $this->optionGroup,
                'callback' => $sectionCallback,
            ]
        );

        $toggleFieldCallback = function () {
            echo $this->call('renderToggle');
        };

        $this->addField(
            [
                'page' => $this->optionGroup,
                'title' => __('Maintenance Mode', 'visualcomposer'),
                'name' => 'settings-maintenanceMode-enabled',
                'id' => 'vcv-maintenance-mode-enable',
                'fieldCallback' => $toggleFieldCallback,
            ]
        );

        $dropdownFieldCallback = function () {
            echo $this->call('renderDropdown');
        };

        $this->addField(
            [
                'page' => $this->optionGroup,
                'title' => __('Select a maintenance page', 'visualcomposer'),
                'name' => 'settings-maintenanceMode-page',
                'id' => 'vcv-maintenance-mode-page',
                'fieldCallback' => $dropdownFieldCallback,
            ]
        );
    }

    protected function renderToggle(Options $optionsHelper)
    {
        return vcview(
            'settings/fields/toggle',
            [
                'name' => 'vcv-settings-maintenanceMode-enabled',
                'value' => 'maintenanceMode-enabled',
                'isEnabled' => $optionsHelper->get('settings-maintenanceMode-enabled', ''),
            ]
        );
    }

    /**
     * Render dropdown for maintenance page
     *
     * @param \VisualComposer\Helpers\Options $optionsHelper
     * @param \VisualComposer\Helpers\Frontend $frontendHelper
     *
     * @return mixed|string
     */
    protected function renderDropdown(Options $optionsHelper, Frontend $frontendHelper)
    {
        $urlHelper = vchelper('Url');
        $sourceId = (int)$optionsHelper->get('settings-maintenanceMode-page', '');
        $selected = '';
        if ($sourceId) {
            $selected = apply_filters('wpml_object_id', $sourceId, 'post', true); // if translated
            $post = get_post($selected);
            // Reset in case if post not published/removed
            // @codingStandardsIgnoreLine
            if (!$post || $post->post_status !== 'publish') {
                $selected = '';
            }
        }

        $pages = get_pages();
        $available = [];
        foreach ($pages as $page) {
            $available[] = [
                'id' => $page->ID,
                // @codingStandardsIgnoreLine
                'title' => $page->post_title,
                'url' => $frontendHelper->getFrontendUrl($page->ID),
            ];
        }

        return vcview(
            'settings/fields/dropdown',
            [
                'name' => 'vcv-settings-maintenanceMode-page',
                'value' => $selected,
                'enabledOptions' => $available,
                'dataTitle' => __('maintenance mode page', 'visualcomposer'),
                'class' => 'vcv-edit-link-selector',
                'emptyTitle' => __('None', 'visualcomposer'),
                'createUrl' => vcfilter(
                    'vcv:frontend:url',
                    $urlHelper->query(admin_url('post-new.php?post_type=page'), ['vcv-action' => 'frontend']),
                    ['query' => ['vcv-action' => 'frontend'], 'sourceId' => null]
                ),
            ]
        );
    }

    /**
     * @throws \Exception
     */
    protected function addPage()
    {
        $page = [
            'slug' => $this->getSlug(),
            'title' => __('Maintenance Mode', 'visualcomposer'),
            'layout' => 'dashboard-tab-content-standalone',
            'capability' => 'manage_options',
            'isDashboardPage' => true,
            'hideInWpMenu' => true,
        ];
        $this->addSubmenuPage($page);
    }
}

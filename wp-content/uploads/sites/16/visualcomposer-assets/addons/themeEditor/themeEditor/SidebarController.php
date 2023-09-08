<?php

namespace themeEditor\themeEditor;

if (!defined('ABSPATH')) {
    header('Status: 403 Forbidden');
    header('HTTP/1.1 403 Forbidden');
    exit;
}

require_once('PostTypeController.php');

use VisualComposer\Framework\Illuminate\Support\Module;

class SidebarController extends PostTypeController implements Module
{
    /**
     * @var string
     */
    protected $postType = 'vcv_sidebars';
    protected $slug = 'vcv_sidebars';

    protected $postNameSlug = 'Sidebar';

    public function __construct()
    {
        $this->postNameSingular = __('Sidebar', 'visualcomposer');
        $this->postNamePlural = __('Sidebars', 'visualcomposer');
        add_shortcode(
            'vcv_layouts_sidebar',
            function ($atts, $content, $tag) {
                if (!empty($atts) && !empty($atts['id']) && $atts['id'] !== 'none') {
                    $requestHelper = vchelper('Request');
                    $frontendHelper = vchelper('Frontend');
                    $sourceHeader = $requestHelper->input('vcv-sidebar');
                    if ($sourceHeader && $frontendHelper->isPageEditable()) {
                        $atts['id'] = $sourceHeader;
                    }

                    if (is_numeric($atts['id'])) {
                        return vchelper('Frontend')->renderContent($atts['id']);
                    }
                }

                return '';
            }
        );
        parent::__construct();
        $this->wpAddAction(
            'admin_menu',
            'addPage'
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
            'title' => $this->postNamePlural,
            'layout' => 'dashboard-tab-content-nopadding',
            'capability' => 'edit_' . $this->postType . 's',
            'capabilityPart' => 'dashboard_addon_theme_builder',
            'isDashboardPage' => true,
            'forceReloadOnOpen' => true,
            'hideTitle' => true,
            'hideInWpMenu' => true,
        ];
        $this->addSubmenuPage($page, 'vcv-headers-footers');
    }
}

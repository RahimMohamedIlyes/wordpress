<?php

namespace elementPresets\elementPresets;

if (!defined('ABSPATH')) {
    header('Status: 403 Forbidden');
    header('HTTP/1.1 403 Forbidden');
    exit;
}

use VisualComposer\Framework\Container;
use VisualComposer\Framework\Illuminate\Support\Module;
use VisualComposer\Helpers\Traits\EventsFilters;

/**
 * Class PostTypeController
 * @package elementPresets\elementPresets
 */
class PostTypeController extends Container implements Module
{
    use EventsFilters;

    /**
     * @var string
     */
    protected $postType = 'vcv_element_presets';

    /**
     * PostTypeController constructor.
     */
    public function __construct()
    {
        /** @see \elementPresets\elementPresets\PostTypeController::registerPostType */
        $this->addEvent('vcv:inited', 'registerPostType', 10);
        /** @see \elementPresets\elementPresets\PostTypeController::setCoreCapabilities */
        $this->addEvent('vcv:inited', 'setCoreCapabilities');
    }

    /**
     * Creating a private element presets post type
     */
    protected function registerPostType()
    {
        register_post_type(
            $this->postType,
            [
                'label' => __('Element Presets', 'visualcomposer'),
                'public' => false,
                'publicly_queryable' => false,
                'exclude_from_search' => true,
                'show_ui' => false,
                'menu_position' => 10,
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
}

<?php

namespace basicMenu\basicMenu;

if (!defined('ABSPATH')) {
    header('Status: 403 Forbidden');
    header('HTTP/1.1 403 Forbidden');
    exit;
}

use VisualComposer\Framework\Illuminate\Support\Module;
use VisualComposer\Framework\Container;
use VisualComposer\Helpers\Traits\EventsFilters;
use VisualComposer\Modules\Elements\Traits\AddShortcodeTrait;

class WpMenuShortcode extends Container implements Module
{
    use EventsFilters;
    use AddShortcodeTrait;

    public function __construct()
    {
        if (!defined('VCV_WP_BASIC_MENU_SHORTCODE')) {
            $this->addEvent('vcv:inited', 'registerShortcode');
            define('VCV_WP_BASIC_MENU_SHORTCODE', true);
        }
    }

    /**
     *
     */
    protected function registerShortcode()
    {
        $this->addShortcode('vcv_menu', 'render');
    }

    /**
     * @param $atts
     * @param $content
     * @param $tag
     *
     * @return string
     */
    protected function render($atts, $content, $tag)
    {
        $output = '';
        $atts = shortcode_atts(
            [
                'key' => '',
            ],
            $atts
        );
        if (empty($atts['key'])) {
            $menuList = get_terms('nav_menu');
            $current = current($menuList);
            if (!empty($current)) {
                $atts['key'] = $current->slug;
            }
        }

        if ($atts['key'] && is_nav_menu($atts['key'])) {
            ob_start();
            // check if the post is HFS or not
            $sourceId = get_the_ID();
            $post = get_post($sourceId);
            $hfsArray = ['vcv_headers', 'vcv_footers', 'vcv_sidebars'];

            //@codingStandardsIgnoreLine
            if (isset($post) && in_array($post->post_type, $hfsArray)) {
                $currentPostId = \VcvEnv::get('DYNAMIC_CONTENT_SOURCE_ID');
                if (empty($currentPostId)) {
                    $currentPostId = get_the_ID();
                }
                // @codingStandardsIgnoreStart
                global $wp_query, $wp_the_query;
                $backup = $wp_query;
                $backupGlobal = $wp_the_query;
                $tempPostQuery = new \WP_Query(
                    [
                        'p' => $currentPostId,
                        'post_status' => get_post_status($currentPostId),
                        'post_type' => get_post_type($currentPostId),
                    ]
                );
                $wp_query = $tempPostQuery;
                $wp_the_query = $tempPostQuery;
                if ($wp_query->have_posts()) {
                    $wp_query->the_post();
                    wp_nav_menu(
                        [
                            'menu' => $atts['key'],
                            'container' => 'nav',
                            'menu_id' => '1',
                            'walker' => new MenuWalker(),
                        ]
                    );
                }
                $wp_query = $backup;
                $wp_the_query = $backupGlobal; // fix wp_reset_query
                // @codingStandardsIgnoreEnd
                wp_reset_postdata();
            } else {
                wp_nav_menu(
                    [
                        'menu' => $atts['key'],
                        'container' => 'nav',
                        'menu_id' => '1',
                        'walker' => new MenuWalker(),
                    ]
                );
            }
            $output = ob_get_clean();

            $output = str_replace('id="1"', '', $output);
        }

        return $output;
    }
}

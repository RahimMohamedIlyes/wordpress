<?php

namespace postsGrid\postsGrid;

if (!defined('ABSPATH')) {
    header('Status: 403 Forbidden');
    header('HTTP/1.1 403 Forbidden');
    exit;
}

use VisualComposer\Framework\Container;
use VisualComposer\Framework\Illuminate\Support\Module;
use VisualComposer\Helpers\PostsGridPostIterator;
use VisualComposer\Modules\Elements\Traits\AddShortcodeTrait;
use VisualComposer\Helpers\Traits\WpFiltersActions;

class PostsGridShortcode extends Container implements Module
{
    use AddShortcodeTrait;
    use WpFiltersActions;

    protected $shortcodeTag = 'vcv_posts_grid';

    /**
     * PostsGridController constructor.
     */
    public function __construct()
    {
        if (!defined('VCV_POSTS_GRID_POSTS_GRID_SHORTCODE')) {
            /** @see \VisualComposer\Modules\Elements\Grids\PostsGridShortcode::render */
            $this->addShortcode($this->shortcodeTag, 'render');
            define('VCV_POSTS_GRID_POSTS_GRID_SHORTCODE', true);
        }
    }

    /**
     * @param $atts
     * @param $content
     * @param $tag
     * @param \VisualComposer\Helpers\PostsGridPostIterator $postsGridPostIteratorHelper
     *
     * @return string
     */
    protected function render($atts, $content, $tag, PostsGridPostIterator $postsGridPostIteratorHelper)
    {
        // Build Query from $atts
        $atts = shortcode_atts(
            [
                'unique_id' => '',
                'source' => '',
                'pagination' => '',
                'pagination_color' => '',
                'pagination_per_page' => '',
                'excerpt' => 0,
                'excerpt_length' => '',
                'filter' => 0,
                'filter_atts' => '',
            ],
            $atts
        );

        // Add excerpt length limit control. Default 55 by WordPress
        $defaultExcerptLength = apply_filters('excerpt_length', '55');
        $excerptLength = $atts['excerpt'] ? !empty($atts['excerpt_length']) ? $atts['excerpt_length'] : $defaultExcerptLength : $defaultExcerptLength;

        $excerptLengthFilterCallback = $this->wpAddFilter('excerpt_length', function () use ($excerptLength) {
            return (int)$excerptLength;
        }, 999);
        $excerptMoreFilterCallback = $this->wpAddFilter('excerpt_more', function () {
            return '&hellip;';
        }, 999);

        $atts['source'] = json_decode(rawurldecode($atts['source']), true);
        $atts['filter_atts'] = json_decode(rawurldecode($atts['filter_atts']), true);
        $atts = vcfilter(
            'vcv:elements:grids:atts',
            $atts,
            [
                'tag' => $tag,
            ]
        );
        $posts = vcfilter(
            'vcv:elements:grids:posts',
            [],
            [
                'atts' => $atts,
                'tag' => $tag,
            ]
        );

        $output = '';
        if (is_array($posts) && !count($posts)) {
            // @codingStandardsIgnoreLine
            global $wp_query;
            // @codingStandardsIgnoreLine
            if (!empty($wp_query->query)) {
                // @codingStandardsIgnoreLine
                $queriedPage = $wp_query->query['queriedPage'];

                // @codingStandardsIgnoreLine
                if ($queriedPage->is_search) {
                    $output = sprintf(
                        '<div class="vce-posts-grid-no-result">%s</div>',
                        __('Nothing Found', 'visualcomposer')
                    );
                }
            }
        } else {
            $content = vcfilter(
                'vcv:elements:grids:content',
                $content,
                ['atts' => $atts]
            );

            $postsOutput = $postsGridPostIteratorHelper->loopPosts($posts, $content);

            $output = sprintf('<div class="vce-posts-grid-list">%s</div>', $postsOutput);

            $output = vcfilter(
                'vcv:elements:grids:output',
                $output,
                [
                    'atts' => $atts,
                    'tag' => $tag,
                ]
            );
        }

        // Remove the length limit control after rendering post grid
        $this->wpRemoveFilter('excerpt_length', $excerptLengthFilterCallback);
        $this->wpRemoveFilter('excerpt_more', $excerptMoreFilterCallback);

        return $output;
    }
}

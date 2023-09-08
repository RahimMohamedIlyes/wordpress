<?php

namespace postsGridDataSourcePost\postsGridDataSourcePost;

if (!defined('ABSPATH')) {
    header('Status: 403 Forbidden');
    header('HTTP/1.1 403 Forbidden');
    exit;
}

use VisualComposer\Framework\Container;
use VisualComposer\Framework\Illuminate\Support\Module;
use VisualComposer\Helpers\PostType;
use VisualComposer\Helpers\Traits\EventsFilters;
use WP_Query;

/**
 * Class PostsController
 * @package VisualComposer\Modules\Elements\Grids\DataSource
 */
class PostsController extends Container implements Module
{
    use EventsFilters;

    /**
     * PostsController constructor.
     */
    public function __construct()
    {
        if (!defined('VCV_POSTS_GRID_POSTS_CONTROLLER')) {
            /** @see \VisualComposer\Modules\Elements\Grids\DataSource\PostsController::queryPosts */
            $this->addFilter('vcv:elements:grids:posts', 'queryPosts');
            $this->addFilter(
                'vcv:editor:variables vcv:editor:variables/postsGridDataSourcePost',
                'getVariables'
            );
            define('VCV_POSTS_GRID_POSTS_CONTROLLER', true);
        }
    }

    protected function getVariables($variables)
    {
        $key = 'vcvPostsGridSourcePostCategories';
        $value = vchelper('PostsGridSourcePosts')->getPostsCategories();

        $variables[] = [
            'key' => $key,
            'value' => $value,
            'type' => 'constant',
        ];

        return $variables;
    }

    /**
     * @param $posts
     * @param $payload
     * @param \VisualComposer\Helpers\PostType $postTypeHelper
     *
     * @return array
     */
    protected function queryPosts($posts, $payload, PostType $postTypeHelper)
    {
        if (!$postTypeHelper->isPostGridDataSourceType('postsGridDataSourcePost', $payload)) {
            return $posts;
        }

        // Value:
        $queryString = html_entity_decode($payload['atts']['source']['value']);
        $isStickyEnable = strpos($payload['atts']['source']['value'], 'sticky_posts') !== false;

        // parse query string like post_type=post&post_status=publish&posts_per_page=10 into associative array
        parse_str($queryString, $atts);

        if ($isStickyEnable) {
            $postPerPage = $atts['posts_per_page'];
            unset($atts['posts_per_page']);
        }

        $posts = array_merge(
            $posts,
            $postTypeHelper->query($atts)
        );

        if ($isStickyEnable) {
            $posts = $this->moveStickyAhead($posts);
            $posts = array_slice($posts, 0, $postPerPage);
        }

        return $posts;
    }

    /**
     * Move sticky posts to the top of the posts list.
     *
     * @param array $posts
     *
     * @return array
     */
    protected function moveStickyAhead($posts)
    {
        $stickyList = [];
        foreach ($posts as $key => $post) {
            if (is_sticky($post->ID)) {
                $stickyList[] = $post;
                unset($posts[$key]);
            }
        }

        if ($stickyList) {
            $posts = array_merge($stickyList, $posts);
        }

        return $posts;
    }
}

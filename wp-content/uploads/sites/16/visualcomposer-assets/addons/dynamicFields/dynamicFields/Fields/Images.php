<?php

namespace dynamicFields\dynamicFields\Fields;

if (!defined('ABSPATH')) {
    header('Status: 403 Forbidden');
    header('HTTP/1.1 403 Forbidden');
    exit;
}

require_once 'FieldResponse.php';

use VisualComposer\Framework\Container;
use VisualComposer\Framework\Illuminate\Support\Module;
use VisualComposer\Helpers\PostData;
use VisualComposer\Helpers\Traits\EventsFilters;
use VisualComposer\Helpers\Traits\WpFiltersActions;

/**
 * Class Images
 * @package dynamicFields\dynamicFields\Fields
 */
class Images extends Container implements Module
{
    use EventsFilters;
    use WpFiltersActions;
    use FieldResponse;

    /**
     * Images constructor.
     */
    public function __construct()
    {
        $this->addFilter('vcv:editor:data:postFields', 'addFeaturedImage');
        $this->addFilter('vcv:editor:data:postFields', 'addAuthorImage');
        $this->addFilter('vcv:editor:data:postFields', 'addBlogLogo');

        $this->addFilter('vcv:dynamic:value:wp_blog_logo', 'blogLogo');
        $this->addFilter('vcv:dynamic:value:featured_image', 'postFeaturedImage');
        $this->addFilter('vcv:dynamic:value:featured_image', 'postFeaturedImageAlt');
        $this->addFilter('vcv:dynamic:value:layout_has_featured_image', 'layoutHasPostFeaturedImage');
        $this->addFilter('vcv:dynamic:value:layout_featured_image', 'layoutPostFeaturedImage');
        $this->addFilter('vcv:dynamic:value:post_author_image', 'postAuthorImage');
    }

    /**
     * @param $response
     *
     * @param $payload
     *
     * @return mixed
     */
    protected function addFeaturedImage($response, $payload)
    {
        $sourceId = $payload['sourceId'];
        $post = get_post($sourceId);
        if ((isset($payload['forceAddField']) && $payload['forceAddField'])
            //@codingStandardsIgnoreLine
            || (isset($post) && post_type_supports($post->post_type, 'thumbnail') && $post->post_status !== 'trash')
        ) {
            $featuredImage = [
                'value' => 'featured_image',
                'label' => esc_html__('Featured Image', 'visualcomposer'),
            ];
            $response['attachimage']['post']['group']['values'][] = $featuredImage;
            $response['designOptions']['post']['group']['values'][] = $featuredImage;
            $response['designOptionsAdvanced']['post']['group']['values'][] = $featuredImage;
        }

        return $response;
    }

    /**
     * @param $response
     *
     * @param $payload
     *
     * @return mixed
     */
    protected function addAuthorImage($response, $payload)
    {
        $sourceId = $payload['sourceId'];
        $post = get_post($sourceId);
        if ((isset($payload['forceAddField']) && $payload['forceAddField'])
            //@codingStandardsIgnoreLine
            || (isset($post) && post_type_supports($post->post_type, 'author') && $post->post_status !== 'trash')
        ) {
            $postAuthorImage = [
                'value' => 'post_author_image',
                'label' => str_replace('&#039;', '\'', esc_html__('Author\'s Profile Picture', 'visualcomposer')),
            ];
            $response['attachimage']['author']['group']['values'][] = $postAuthorImage;
            $response['designOptions']['author']['group']['values'][] = $postAuthorImage;
            $response['designOptionsAdvanced']['author']['group']['values'][] = $postAuthorImage;
        }

        return $response;
    }

    /**
     * @param $response
     *
     * @param $payload
     *
     * @return mixed
     */
    protected function addBlogLogo($response, $payload)
    {
        if (current_theme_supports('custom-logo')) {
            $blogLogo = [
                'value' => 'wp_blog_logo',
                'label' => esc_html__('Logo', 'visualcomposer'),
            ];
            $response['attachimage']['site']['group']['values'][] = $blogLogo;
            $response['designOptions']['site']['group']['values'][] = $blogLogo;
            $response['designOptionsAdvanced']['site']['group']['values'][] = $blogLogo;
        }

        return $response;
    }

    /**
     * @param $response
     * @param $payload
     *
     * @param \VisualComposer\Helpers\PostData $postDataHelper
     *
     * @return mixed
     */
    protected function postFeaturedImageAlt($response, $payload, PostData $postDataHelper)
    {
        $atts = $payload['atts'];
        $sourceId = false;
        if (isset($atts['sourceId'])) {
            $sourceId = $atts['sourceId'];
        }

        if (isset($atts['currentValue'])) {
            // Get all image attributes from saved URL
            $imageUrlFromDb = $atts['currentValue'];
            $attributeParameters = parse_url($imageUrlFromDb);
            $imageAttributes = [];
            if (isset($attributeParameters['query'])) {
                parse_str($attributeParameters['query'], $imageAttributes);
            }
            // Get actual attributes
            $actualAttributes = $postDataHelper->getImageAttributes($sourceId);

            // Replace Alt Attribute
            $currentAttr = 'alt="' . (isset($imageAttributes['alt']) ? $imageAttributes['alt'] : '') . '"';
            $actualAttr = 'alt="' . (isset($actualAttributes['alt']) ? $actualAttributes['alt'] : '') . '"';
            $response = $this->parseResponse($currentAttr, $actualAttr, $response);

            // Replace Title Attribute
            $currentAttr = 'title="' . (isset($imageAttributes['title']) ? $imageAttributes['title'] : '') . '"';
            $actualAttr = 'title="' . (isset($actualAttributes['title']) ? $actualAttributes['title'] : '') . '"';
            $response = $this->parseResponse($currentAttr, $actualAttr, $response);

            // Replace Caption Attribute
            $currentAttr = '<figcaption>' . (isset($imageAttributes['caption']) ? $imageAttributes['caption'] : '') . '</figcaption>';
            if (empty($imageAttributes['caption'])) {
                $currentAttr = '<figcaption hidden=""></figcaption>';
            }
            $actualAttr = '<figcaption>' . (isset($actualAttributes['caption']) ? $actualAttributes['caption'] : '') . '</figcaption>';
            $response = $this->parseResponse($currentAttr, $actualAttr, $response);
        }

        return $response;
    }

    /**
     * @param $response
     * @param $payload
     *
     * @param \VisualComposer\Helpers\PostData $postDataHelper
     *
     * @return mixed
     */
    protected function postFeaturedImage($response, $payload, PostData $postDataHelper)
    {
        // If we don't have content to replace with we do nothing
        if (empty($response)) {
            return $response;
        }
        $atts = $payload['atts'];
        $sourceId = false;
        if (isset($atts['sourceId'])) {
            $sourceId = $atts['sourceId'];
        }

        if (isset($atts['atts'])) {
            //extra atts
            $extraAtts = urldecode($atts['atts']);
            if (strpos($extraAtts, 'data-enable-link="true"') !== false) {
                $response = '<a href="' . esc_url(get_permalink($sourceId)) . '">' . $response . '</a>';
            }
        }

        if (isset($atts['currentValue'])) {
            $actualValue = $postDataHelper->getFeaturedImage($sourceId);
            $postThumbnailUrlDb = get_the_post_thumbnail_url($sourceId, 'full');
            if (empty($postThumbnailUrlDb)) {
                $response = ''; // hide the wrapper if possible
            } else {
                $response = $this->parseResponse($atts['currentValue'], $actualValue, $response);
            }
        } elseif (isset($atts['type']) && $atts['type'] === 'backgroundImage') {
            $src = $postDataHelper->getFeaturedImage($sourceId);
            if (!empty($src)) {
                $this->addDesignOptionsStyles($atts['elementId'], $src, $atts['device']);
            }
        }

        return $response;
    }

    /**
     * @param $response
     * @param $payload
     *
     * @return mixed
     */
    protected function layoutHasPostFeaturedImage($response, $payload)
    {
        if (empty($response)) {
            return $response;
        }
        $postThumbnailId = get_post_thumbnail_id();
        if (!$postThumbnailId) {
            $response = ''; // hide the wrapper if possible
        }

        // add caption on bottom
        $excerpt = get_the_excerpt($postThumbnailId);
        $caption = '';
        if (!empty($excerpt)) {
            $caption = '<figcaption>' . $excerpt . '</figcaption>';
        }
        $response = str_replace('</figure>', $caption . '</figure>', $response);

        return $response;
    }

    /**
     * @param $response
     * @param $payload
     *
     * @param \VisualComposer\Helpers\PostData $postDataHelper
     *
     * @return mixed
     */
    protected function layoutPostFeaturedImage($response, $payload, PostData $postDataHelper)
    {
        $atts = $payload['atts'];
        $sourceId = false;
        if (isset($atts['sourceId'])) {
            $sourceId = $atts['sourceId'];
        }
        $postThumbnailId = get_post_thumbnail_id($sourceId);
        if (!$postThumbnailId) {
            return '';
        }
        $extraAtts = [];
        if (isset($atts['atts'])) {
            $parsed = shortcode_parse_atts(urldecode($atts['atts']));
            if (isset($parsed['atts'])) {
                $extraAtts = json_decode($parsed['atts'], true);
            }
        }
        if (empty($extraAtts)) {
            return ''; // something wrong
        }
        $size = $extraAtts['size'];
        $shape = $extraAtts['shape'];
        $meta = wp_get_attachment_metadata($postThumbnailId);

        $match = preg_match('/(\d+)(?:x)(\d+)/', $size, $matches);
        if (!$match && $shape === 'round') {
            $width = min($meta['width'], $meta['height']);
            $height = min($meta['width'], $meta['height']);
            if (isset($meta['sizes'][ $size ])) {
                $width = min($meta['sizes'][ $size ]['width'], $meta['sizes'][ $size ]['height']);
                $height = min($meta['sizes'][ $size ]['width'], $meta['sizes'][ $size ]['height']);
            }
            $match = true;
            $matches = [
                '',
                $width,
                $height,
            ];
        }

        if ($match) {
            $src = $this->resizeLayoutFeaturedImage($matches, $shape, $meta['file'], $postThumbnailId);
        } else {
            $src = get_the_post_thumbnail_url($sourceId, $size);
        }

        $output = $this->getLayoutFeaturedImageOutput($extraAtts, $src, $postThumbnailId);

        return $output;
    }

    /**
     * @param $response
     * @param $payload
     *
     * @param \VisualComposer\Helpers\PostData $postDataHelper
     *
     * @return mixed
     */
    protected function blogLogo($response, $payload, PostData $postDataHelper)
    {
        $atts = $payload['atts'];
        if (isset($atts['currentValue'])) {
            $actualValue = $postDataHelper->getBlogLogo();
            if (empty($response)) {
                return $actualValue;
            }
            $response = $this->parseResponse($atts['currentValue'], $actualValue, $response);
        } elseif (isset($atts['type']) && $atts['type'] === 'backgroundImage') {
            $src = $postDataHelper->getBlogLogo();
            if (!empty($src)) {
                $this->addDesignOptionsStyles($atts['elementId'], $src, $atts['device']);
            }
        }

        return $response;
    }

    /**
     * @param $response
     * @param $payload
     * @param \VisualComposer\Helpers\PostData $postDataHelper
     *
     * @return mixed
     */
    protected function postAuthorImage($response, $payload, PostData $postDataHelper)
    {
        // If we don't have content to replace with we do nothing
        if (empty($response)) {
            return $response;
        }
        $atts = $payload['atts'];

        $sourceId = false;
        if (isset($atts['sourceId'])) {
            $sourceId = $atts['sourceId'];
        }

        if (isset($atts['atts'])) {
            //extra atts
            $extraAtts = urldecode($atts['atts']);
            if (strpos($extraAtts, 'data-enable-link="true"') !== false) {
                $post = get_post($sourceId);
                // @codingStandardsIgnoreLine
                $response = '<a href="' . esc_url(get_author_posts_url($post->post_author)) . '">' . $response . '</a>';
            }
        }

        if (isset($atts['currentValue'])) {
            $actualValue = $postDataHelper->getPostAuthorImage($sourceId);
            $response = $this->parseResponse($atts['currentValue'], $actualValue, $response);
        } elseif (isset($atts['type']) && $atts['type'] === 'backgroundImage') {
            $src = $postDataHelper->getPostAuthorImage($sourceId);
            if (!empty($src)) {
                $this->addDesignOptionsStyles($atts['elementId'], $src, $atts['device']);
            }
        }

        return $response;
    }

    /**
     * @param $id
     * @param $src
     * @param $device
     */
    protected function addDesignOptionsStyles($id, $src, $device)
    {
        $frontendHelper = vchelper('Frontend');
        if ($frontendHelper->isPageEditable()) {
            return;
        }

        $this->wpAddAction(
            'wp_print_footer_scripts',
            function () use ($id, $src, $device) {
                $devicesMedia = [
                    'all' => ['', ''],
                    'xs' => ['@media (max-width: 543px) {', '}'],
                    'sm' => ['@media (max-width: 767px) and (min-width: 544px) {', '}'],
                    'md' => ['@media (max-width: 991px) and (min-width: 768px) {', '}'],
                    'lg' => ['@media (max-width: 1199px) and (min-width: 992px) {', '}'],
                    'xl' => ['@media (min-width: 1200px) {', '}'],
                ];
                // TODO: Use wp_add_inline_style
                $selector = sprintf(
                    '#el-%1$s[data-vce-do-apply*="all"][data-vce-do-apply*="el-%1$s"][data-vce-dynamic-image-%2$s="%1$s"],#el-%1$s[data-vce-do-apply*="background"][data-vce-do-apply*="el-%1$s"][data-vce-dynamic-image-%2$s="%1$s"],#el-%1$s [data-vce-do-apply*="all"][data-vce-do-apply*="el-%1$s"][data-vce-dynamic-image-%2$s="%1$s"],#el-%1$s [data-vce-do-apply*="background"][data-vce-do-apply*="el-%1$s"][data-vce-dynamic-image-%2$s="%1$s"]',
                    esc_attr($id),
                    esc_attr($device)
                );
                echo sprintf(
                    '<style>%1$s %2$s { background-image: url("%3$s"); } %4$s</style>',
                    $devicesMedia[ $device ][0],
                    $selector,
                    esc_url($src),
                    $devicesMedia[ $device ][1]
                );
            }
        );
    }

    /**
     * @param $extraAtts
     * @param $src
     * @param $postThumbnailId
     *
     * @return string
     */
    protected function getLayoutFeaturedImageOutput($extraAtts, $src, $postThumbnailId)
    {
        $output = '<img ';
        if (!empty($extraAtts['data-src'])) {
            $output .= ' src=""';
            $output .= ' data-src="' . set_url_scheme($src) . '"';
        } else {
            $output .= ' src="' . set_url_scheme($src) . '"';
        }
        $output .= ' class="' . esc_attr($extraAtts['class']) . '"';
        $attachment = get_post($postThumbnailId);
        // @codingStandardsIgnoreStart
        $imageAttributes = [
            'alt' => get_post_meta($attachment->ID, '_wp_attachment_image_alt', true),
            'title' => $attachment->post_title,
        ];
        // @codingStandardsIgnoreEnd
        $output .= ' title="' . esc_attr($imageAttributes['title']) . '"';
        $output .= ' alt="' . esc_attr($imageAttributes['alt']) . '"';
        $output .= ' />';

        return $output;
    }

    /**
     * @param array $matches
     * @param $shape
     * @param $file
     * @param $postThumbnailId
     *
     * @return string
     */
    protected function resizeLayoutFeaturedImage(array $matches, $shape, $file, $postThumbnailId)
    {
        // size is NumberxNumber like 134x120
        $width = (int)$matches[1];
        $height = (int)$matches[2];
        if ($shape === 'round') {
            $width = min($width, $height);
            $height = min($width, $height);
        }
        $imagePath = dirname($file);
        $imageFullFilename = basename($file);
        $imageShortFileName = pathinfo($imageFullFilename, PATHINFO_FILENAME);
        $imageExtension = pathinfo($imageFullFilename, PATHINFO_EXTENSION);

        $uploadDir = wp_upload_dir();
        $imageResizedPath = sprintf('%s/%s-%dx%d.%s', rtrim($imagePath, '\\/'), $imageShortFileName, $width, $height, $imageExtension);
        $resizedPath = sprintf("%s/%s", rtrim($uploadDir['basedir'], '\\/'), $imageResizedPath);

        // check for cache
        if (file_exists($uploadDir['basedir'] . '/' . $imageResizedPath)) {
            $src = $uploadDir['baseurl'] . '/' . $imageResizedPath;
        } else {
            // resize + save
            $file = get_attached_file($postThumbnailId);
            $imageEditor = wp_get_image_editor($file);
            $imageEditor->resize($width, $height, true);
            $imageEditor->save($resizedPath);
            $src = $uploadDir['baseurl'] . '/' . $imageResizedPath;
        }

        return $src;
    }
}

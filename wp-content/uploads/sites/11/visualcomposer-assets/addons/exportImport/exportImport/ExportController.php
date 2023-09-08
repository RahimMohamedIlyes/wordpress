<?php

namespace exportImport\exportImport;

if (!defined('ABSPATH')) {
    header('Status: 403 Forbidden');
    header('HTTP/1.1 403 Forbidden');
    exit;
}

use VisualComposer\Framework\Container;
use VisualComposer\Framework\Illuminate\Support\Module;
use VisualComposer\Helpers\Access\UserCapabilities;
use VisualComposer\Helpers\File;
use VisualComposer\Helpers\Nonce;
use VisualComposer\Helpers\Request;
use ZipArchive;
use VisualComposer\Helpers\Traits\EventsFilters;
use VisualComposer\Helpers\Traits\WpFiltersActions;
use VisualComposer\Helpers\Url;

/**
 * Class ExportController
 * @package exportImport\exportImport
 */
class ExportController extends Container implements Module
{
    use EventsFilters;
    use WpFiltersActions;

    /**
     * @var array
     */
    protected $templateFolders = [];

    /**
     * @var array
     */
    protected $postsToExport = [];

    /**
     * @var array
     */
    protected $exportContent = [];

    /**
     * @var array
     */
    protected $imageData = [];

    /**
     * @var array
     */
    protected $videosData = [];

    /**
     * @var array
     */
    protected $tags = [];

    /**
     * ExportController constructor.
     */
    public function __construct()
    {
        $this->wpAddFilter('post_row_actions', 'addExportLink', 100);
        $this->addFilter('vcv:addons:globalTemplate:adminCss', '__return_false');
        $this->addFilter('vcv:ajax:exportImport:export:adminNonce', 'handleSingleExport');
        $this->addFilter('vcv:addons:exportImport:export:postMeta', 'filterPostMeta');
        $this->addEvent('vcv:admin:inited', 'exportActionHandler');
    }

    /**
     * @param \VisualComposer\Helpers\Request $requestHelper
     *
     * @throws \ReflectionException
     * @throws \VisualComposer\Framework\Illuminate\Container\BindingResolutionException
     */
    protected function handleSingleExport(Request $requestHelper)
    {
        $sourceId = $requestHelper->input('sourceId');

        $this->addToExportQueue($sourceId);
        $this->call('prepareExportPost');
    }

    /**
     * Add post to export queue
     *
     * @param $sourceId
     */
    protected function addToExportQueue($sourceId)
    {
        $this->postsToExport = array_merge($this->postsToExport, (array)$sourceId);
    }

    /**
     * Parse export content and crete download zip
     *
     * @throws \ReflectionException
     * @throws \VisualComposer\Framework\Illuminate\Container\BindingResolutionException
     */
    protected function prepareExportPost()
    {
        $postsToExport = $this->postsToExport;

        foreach ($postsToExport as $sourceId) {
            $post = get_post($sourceId);

            $pageContent = get_post_meta($sourceId, VCV_PREFIX . 'pageContent', true);
            if (!empty($pageContent)) {
                $data = $pageContent;
                // @codingStandardsIgnoreLine
            } elseif ($post->post_type === 'vcv_templates') {
                $data = rawurlencode(
                    wp_json_encode(
                        [
                            'elements' => get_post_meta($sourceId, 'vcvEditorTemplateElements', true),
                        ]
                    )
                );
            }

            $content = [];
            $decoded = json_decode(rawurldecode($data), true);
            if ($decoded && isset($decoded['elements'])) {
                $content = $decoded['elements'];
            }

            $postUniqueId = get_post_meta($sourceId, '_' . VCV_PREFIX . 'id', true);
            if (!$postUniqueId) {
                $postUniqueId = uniqid('', true);
                update_post_meta($sourceId, '_' . VCV_PREFIX . 'id', $postUniqueId);
            }

            $this->templateFolders[ $postUniqueId ] = 'templates/' . $postUniqueId;

            $parsedContent = $this->parseContent($content);
            $this->addExportContent($post, $sourceId, $parsedContent, $postUniqueId);
        }
        $this->call('export');
    }

    /**
     * Find all images in content
     *
     * @param $content
     *
     * @return array
     */
    protected function parseContent($content)
    {
        $this->imageData = [];
        $this->videosData = [];
        $this->tags = [];

        array_walk_recursive($content, [$this, 'findUrls']);
        array_walk_recursive($content, [$this, 'findTags']);

        return [
            'imagesData' => $this->imageData,
            'videosData' => $this->videosData,
            'content' => $content,
            'tags' => array_values(array_unique($this->tags)),
        ];
    }

    /**
     * @param $value
     * @param $key
     */
    public function findUrls(&$value, $key)
    {
        $skippedKeys = ['metaPreviewUrl', 'metaThumbnailUrl'];

        if (!in_array($key, $skippedKeys, true)) {
            /** @see make_clickable() */
            $urlRegex = '@(https?:\/\/([-\w\.]+[-\w])+(:\d+)?(\/([\w/_\.#-]*(\?\S+)?[^\.\s\"\'\]\[])?)?)@';
            $value = preg_replace_callback($urlRegex, [$this, 'replaceUrls'], $value);
        }
    }

    /**
     * @param $value
     * @param $key
     */
    public function findTags(&$value, $key)
    {
        if ($key === 'tag') {
            $this->tags[] = 'element/' . $value;
        }
    }

    /**
     * Replace found images with placeholders
     *
     * @param $matches
     *
     * @return string
     */
    protected function replaceUrls($matches)
    {
        //check if it's a image and replace it with placeholders
        if (vchelper('WpMedia')->checkIsImage($matches[0])) {
            $imageLink = $matches[0];
            $imageName = pathinfo($imageLink, PATHINFO_FILENAME) . '.' . pathinfo($imageLink, PATHINFO_EXTENSION);
            $this->imageData[ $imageName ] = $imageLink;

            return '[publicPath]/assets/elements/' . $imageName;
        }

        //check if it's a video and replace it with placeholders
        if (vchelper('WpMedia')->checkIsVideo($matches[0])) {
            $videoLink = $matches[0];
            $videoName = pathinfo($videoLink, PATHINFO_FILENAME) . '.' . pathinfo($videoLink, PATHINFO_EXTENSION);
            $this->videosData[ $videoName ] = $videoLink;

            return '[publicPath]/assets/elements/' . $videoName;
        }

        return $matches[0];
    }

    /**
     * Create a export zip file
     *
     * @param $post
     * @param $sourceId
     * @param $parsedContent
     * @param $postUniqueId
     */
    protected function addExportContent($post, $sourceId, $parsedContent, $postUniqueId)
    {
        $type = get_post_meta($sourceId, '_' . VCV_PREFIX . 'type', true);
        $this->exportContent[ $postUniqueId ] = [
            'id' => $postUniqueId,
            'type' => !empty($type) ? $type : 'custom',
            'tags' => $parsedContent['tags'],
            'data' => $parsedContent['content'],
            'images' => $parsedContent['imagesData'],
            'videos' => $parsedContent['videosData'],
            'postMeta' => vcfilter(
                'vcv:addons:exportImport:export:postMeta',
                get_post_meta($sourceId),
                // @codingStandardsIgnoreLine
                ['sourceId' => $sourceId, 'postType' => $post->post_type]
            ),
            // @codingStandardsIgnoreLine
            'postName' => $post->post_name,
            // @codingStandardsIgnoreLine
            'postType' => $post->post_type,
            'post' => $post,
        ];
    }

    /**
     * Create an export zip file and download it
     *
     * @param \VisualComposer\Helpers\File $fileHelper
     */
    protected function export(File $fileHelper)
    {
        $zip = new ZipArchive();

        $tempDir = get_temp_dir();
        $posts = $this->exportContent;
        $manifest = [];
        $manifest['blogUrl'] = get_site_url();
        $manifest['templates'] = [];

        if (count($posts) > 1) {
            $zipName = 'vc-' . 'templates-' . date('d-m-Y-H-i') . '.zip';
            $zip->open($tempDir . $zipName, ZipArchive::CREATE | ZipArchive::OVERWRITE);

            foreach ($posts as $postUniqueId => $post) {
                $manifest['templates'] = $manifest['templates'] + [
                        $post['postName'] => [
                            'templateId' => $postUniqueId,
                            'templateTitle' => $post['post']->post_title,
                        ],
                    ];
                $images = $post['images'];
                $videos = $post['videos'];
                $files = array_merge($images, $videos);
                $zip->addFromString($post['postName'] . '/bundle.json', json_encode($post));
                if (!empty($files)) {
                    foreach ($files as $name => $file) {
                        $downloadedFile = file_get_contents($file);
                        if ($downloadedFile) {
                            $zip->addFromString(
                                $post['postName'] . '/' . $this->templateFolders[ $postUniqueId ] . '/assets/elements/'
                                . $name,
                                $downloadedFile
                            );
                        }
                    }
                }
            }
        } else {
            $post = current($posts);
            $zipName = 'vc-' . $post['post']->post_name . '-' . date('d-m-Y-H-i') . '.zip';
            $zip->open($tempDir . $zipName, ZipArchive::CREATE | ZipArchive::OVERWRITE);

            $manifest['templates'][] = [
                'templateId' => $post['id'],
                'templateTitle' => $post['post']->post_title,
            ];
            $images = $post['images'];
            $videos = $post['videos'];
            $files = array_merge($images, $videos);
            $zip->addFromString('bundle.json', json_encode($post));
            if (!empty($files)) {
                foreach ($files as $name => $file) {
                    // Disable SSL verification need in-case if https for localhost used and any self-signed SSL
                    $arrContextOptions = [
                        'ssl' => [
                            'verify_peer' => false,
                            'verify_peer_name' => false,
                        ],
                    ];

                    $downloadedFile = file_get_contents($file, null, stream_context_create($arrContextOptions));
                    if ($downloadedFile) {
                        $zip->addFromString(
                            $this->templateFolders[ $post['id'] ] . '/assets/elements/'
                            . $name,
                            $downloadedFile
                        );
                    }
                }
            }
        }

        $zip->addFromString('manifest.json', json_encode($manifest));
        $zip->close();
        header('Content-Type: application/zip');
        header('Content-disposition: attachment; filename=' . $zipName);
        header('Content-Transfer-Encoding: binary');
        header('Expires: 0');
        header('Cache-Control: must-revalidate');
        header('Pragma: public');
        header('Content-Length: ' . filesize($tempDir . $zipName));
        while (ob_get_level()) {
            ob_end_clean();
        }
        readfile($tempDir . $zipName);
        $fileHelper->removeFile($tempDir . $zipName);
        exit;
    }

    /**
     * Add export links to post
     *
     * @param $actions
     * @param $post
     * @param \VisualComposer\Helpers\Url $urlHelper
     * @param \VisualComposer\Helpers\Nonce $nonceHelper
     * @param \VisualComposer\Helpers\Access\UserCapabilities $userCapabilitiesHelper
     *
     * @return mixed
     */
    protected function addExportLink(
        $actions,
        $post,
        Url $urlHelper,
        Nonce $nonceHelper,
        UserCapabilities $userCapabilitiesHelper
    ) {
        if (
            // @codingStandardsIgnoreLine
            in_array($post->post_type, vcfilter('vcv:addons:exportImport:allowedPostTypes', []), true)
            && $userCapabilitiesHelper->canEdit($post->ID)
        ) {
            //prevent hub template export

            $url = $urlHelper->adminAjax(
                [
                    'vcv-action' => 'exportImport:export:adminNonce',
                    'vcv-nonce' => $nonceHelper->admin(),
                    'sourceId' => $post->ID,
                ]
            );
            $actions['vcv_export'] = sprintf('<a href="%s">%s</a>', $url, __('Export', 'visualcomposer'));
        }

        return $actions;
    }

    /**
     * Register bulk action
     */
    protected function exportActionHandler()
    {
        $allowedPostTypes = vcfilter('vcv:addons:exportImport:allowedPostTypes', []);

        if (!empty($allowedPostTypes)) {
            foreach ($allowedPostTypes as $postType) {
                $this->wpAddFilter('bulk_actions-edit-' . $postType, 'addExportAction');
                $this->wpAddFilter('handle_bulk_actions-edit-' . $postType, 'actionHandler', 10, 3);
            }
        }
    }

    /**
     * @param $actions
     *
     * @return mixed
     */
    protected function addExportAction($actions)
    {
        $actions['vcv_export'] = __('Export', 'visualcomposer');

        return $actions;
    }

    /**
     * @param $redirectTo
     * @param $action
     * @param $sourceIds
     *
     * @return mixed
     * @throws \ReflectionException
     * @throws \VisualComposer\Framework\Illuminate\Container\BindingResolutionException
     */
    protected function actionHandler($redirectTo, $action, $sourceIds)
    {
        if ($action !== 'vcv_export') {
            return $redirectTo;
        }

        $this->addToExportQueue($sourceIds);

        $this->call('prepareExportPost');

        return $redirectTo; // die will be called in prepareExportPost
    }

    /**
     * @param $meta
     * @param $payload
     *
     * @return mixed
     */
    protected function filterPostMeta($meta, $payload)
    {
        $postType = $payload['postType'];
        if ($postType === 'vcv_template') {
            unset($meta['_vcv-HeaderTemplateId']);
            unset($meta['_vcv-FooterTemplateId']);
            unset($meta['_vcv-SidebarTemplateId']);
        }

        return $meta;
    }
}

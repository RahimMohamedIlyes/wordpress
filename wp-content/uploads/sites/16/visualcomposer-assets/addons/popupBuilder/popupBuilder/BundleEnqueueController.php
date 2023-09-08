<?php

namespace popupBuilder\popupBuilder;

if (!defined('ABSPATH')) {
    header('Status: 403 Forbidden');
    header('HTTP/1.1 403 Forbidden');
    exit;
}

use VisualComposer\Framework\Container;
use VisualComposer\Framework\Illuminate\Support\Module;
use VisualComposer\Helpers\Frontend;
use VisualComposer\Helpers\Hub\Addons;
use VisualComposer\Helpers\Request;
use VisualComposer\Helpers\Traits\EventsFilters;
use VisualComposer\Helpers\Traits\WpFiltersActions;

class BundleEnqueueController extends Container implements Module
{
    use EventsFilters;
    use WpFiltersActions;

    public function __construct()
    {
        $this->addFilter(
            'vcv:editors:frontend:render',
            function ($response, Request $requestHelper, Frontend $frontendHelper) {
                if ($requestHelper->input('vcv-editor-type') === 'vcv_popups' && $frontendHelper->isFrontend()) {
                    /** @see \popupBuilder\popupBuilder\BundleEnqueueController::addEditorTypeVariable */
                    $this->addFilter('vcv:editor:variables', 'addEditorTypeVariable');
                }
                /** @see \popupBuilder\popupBuilder\BundleEnqueueController::addFooterBundleScriptFe */
                $this->addFilter('vcv:frontend:footer:extraOutput', 'addFooterBundleScriptFe', 10);

                return $response;
            }
        );
        /** @see \popupBuilder\popupBuilder\BundleEnqueueController::assetsLibraries */
        $this->addFilter('vcv:helper:assetsShared:getLibraries', 'assetsLibraries');
    }

    protected function addFooterBundleScriptFe($response, $payload, Addons $hubAddonsHelper)
    {
        // Add JS
        $response = array_merge(
            (array)$response,
            [
                sprintf(
                    '<script id="vcv-script-popup-builder-fe-bundle" type="text/javascript" src="%s"></script>',
                    $hubAddonsHelper->getAddonUrl(
                        'popupBuilder/public/dist/element.bundle.js?v=' . VCV_VERSION
                    )
                ),
            ]
        );

        return $response;
    }

    protected function addEditorTypeVariable($variables)
    {
        $editorType = false;
        $key = 'VCV_EDITOR_TYPE';
        foreach ($variables as $i => $variable) {
            if ($variable['key'] === $key) {
                $variables[ $i ] = [
                    'key' => 'VCV_EDITOR_TYPE',
                    'value' => 'popup',
                    'type' => 'constant',
                ];
                $editorType = true;
            }
        }

        if (!$editorType) {
            $variables[] = [
                'key' => $key,
                'value' => 'popup',
                'type' => 'constant',
            ];
        }

        return $variables;
    }

    /**
     * @param $assetsLibraries
     *
     * @param \VisualComposer\Helpers\Hub\Addons $hubAddonsHelper
     *
     * @return mixed
     */
    protected function assetsLibraries($assetsLibraries, Addons $hubAddonsHelper)
    {
        $assetsLibraries['popup'] = [
            'dependencies' => [],
            'jsBundle' => add_query_arg(
                'v',
                VCV_VERSION,
                $hubAddonsHelper->getAddonUrl(
                    'popupBuilder/popupBuilder/public/dist/popup.bundle.js'
                )
            ),
            'cssBundle' => add_query_arg(
                'v',
                VCV_VERSION,
                $hubAddonsHelper->getAddonUrl(
                    'popupBuilder/popupBuilder/public/dist/popup.bundle.css'
                )
            ),
        ];
        $assetsLibraries['popupOnElementId'] = [
            'dependencies' => [],
            'jsBundle' => add_query_arg(
                'v',
                VCV_VERSION,
                $hubAddonsHelper->getAddonUrl(
                    'popupBuilder/popupBuilder/public/dist/popupOnElementId.bundle.js'
                )
            ),
            'cssBundle' => add_query_arg(
                'v',
                VCV_VERSION,
                $hubAddonsHelper->getAddonUrl(
                    'popupBuilder/popupBuilder/public/dist/popup.bundle.css'
                )
            ),
        ];
        $assetsLibraries['popupOnExitIntent'] = [
            'dependencies' => [],
            'jsBundle' => add_query_arg(
                'v',
                VCV_VERSION,
                $hubAddonsHelper->getAddonUrl(
                    'popupBuilder/popupBuilder/public/dist/popupOnExitIntent.bundle.js'
                )
            ),
            'cssBundle' => add_query_arg(
                'v',
                VCV_VERSION,
                $hubAddonsHelper->getAddonUrl(
                    'popupBuilder/popupBuilder/public/dist/popup.bundle.css'
                )
            ),
        ];
        $assetsLibraries['popupOnPageLoad'] = [
            'dependencies' => [],
            'jsBundle' => add_query_arg(
                'v',
                VCV_VERSION,
                $hubAddonsHelper->getAddonUrl(
                    'popupBuilder/popupBuilder/public/dist/popupOnPageLoad.bundle.js'
                )
            ),
            'cssBundle' => add_query_arg(
                'v',
                VCV_VERSION,
                $hubAddonsHelper->getAddonUrl(
                    'popupBuilder/popupBuilder/public/dist/popup.bundle.css'
                )
            ),
        ];
        $assetsLibraries['popupOnFirstPageLoad'] = [
            'dependencies' => [],
            'jsBundle' => add_query_arg(
                'v',
                VCV_VERSION,
                $hubAddonsHelper->getAddonUrl(
                    'popupBuilder/popupBuilder/public/dist/popupOnPageLoad.bundle.js'
                )
            ),
            'cssBundle' => add_query_arg(
                'v',
                VCV_VERSION,
                $hubAddonsHelper->getAddonUrl(
                    'popupBuilder/popupBuilder/public/dist/popup.bundle.css'
                )
            ),
        ];

        return $assetsLibraries;
    }
}

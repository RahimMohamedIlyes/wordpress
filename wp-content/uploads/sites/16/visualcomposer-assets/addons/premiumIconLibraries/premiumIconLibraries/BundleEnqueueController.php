<?php

namespace premiumIconLibraries\premiumIconLibraries;

if (!defined('ABSPATH')) {
    header('Status: 403 Forbidden');
    header('HTTP/1.1 403 Forbidden');
    exit;
}

use VisualComposer\Framework\Container;
use VisualComposer\Framework\Illuminate\Support\Module;
use VisualComposer\Helpers\Assets;
use VisualComposer\Helpers\Traits\EventsFilters;
use VisualComposer\Helpers\Url;

class BundleEnqueueController extends Container implements Module
{
    use EventsFilters;

    public function __construct()
    {
        $this->addFilter(
            'vcv:frontend:footer:extraOutput',
            'addBundleScript',
            10
        );
    }

    protected function addBundleScript($response, $payload, Url $urlHelper, Assets $assetsHelper)
    {
        // Add JS
        if (vcvenv('VCV_ENV_DEV_ADDONS')) {
            $response = array_merge(
                (array)$response,
                [
                    sprintf(
                        '<script id="vcv-script-premiumIconLibraries-fe-bundle" type="text/javascript" src="%s"></script>',
                        $urlHelper->to(
                            'devAddons/premiumIconLibraries/public/dist/element.bundle.js?v=' . VCV_VERSION
                        )
                    ),
                ]
            );
        } else {
            $response = array_merge(
                (array)$response,
                [
                    sprintf(
                        '<script id="vcv-script-premiumIconLibraries-fe-bundle" type="text/javascript" src="%s"></script>',
                        $assetsHelper->getAssetUrl(
                            '/addons/premiumIconLibraries/public/dist/element.bundle.js?v=' . VCV_VERSION
                        )
                    ),
                ]
            );
        }

        return $response;
    }
}

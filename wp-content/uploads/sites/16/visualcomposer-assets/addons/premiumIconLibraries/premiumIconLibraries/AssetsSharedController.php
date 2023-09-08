<?php

namespace premiumIconLibraries\premiumIconLibraries;

if (!defined('ABSPATH')) {
    header('Status: 403 Forbidden');
    header('HTTP/1.1 403 Forbidden');
    exit;
}

use VisualComposer\Framework\Container;
use VisualComposer\Framework\Illuminate\Support\Module;
use VisualComposer\Helpers\Traits\EventsFilters;

class AssetsSharedController extends Container implements Module
{
    use EventsFilters;

    public function __construct()
    {
        $this->addFilter('vcv:helper:assetsShared:getLibraries', 'addSharedLibraries');
    }

    protected function addSharedLibraries($libraries)
    {
        if (vcvenv('VCV_ENV_EXTENSION_DOWNLOAD') && !vcvenv('VCV_ENV_DEV_ADDONS')) {
            $optionsHelper = vchelper('Options');
            $assets = $optionsHelper->get('assetsLibrary', []);
            $assetsHelper = vchelper('Assets');
            if (isset($assets['iconpicker'])) {
                $value = $assets['iconpicker'];
                $key = 'iconpicker';
                $libraries[ $key ] = $value;

                if (isset($value['cssSubsetBundles'])) {
                    $cssSubsetBundles = [];
                    foreach ($value['cssSubsetBundles'] as $singleKey => $single) {
                        $cssSubsetBundles[ $singleKey ] = add_query_arg(
                            'v',
                            VCV_VERSION,
                            $assetsHelper->getAssetUrl($single)
                        );
                    }
                    $libraries[ $key ]['cssSubsetBundles'] = $cssSubsetBundles;
                }
            }
        }

        return $libraries;
    }
}

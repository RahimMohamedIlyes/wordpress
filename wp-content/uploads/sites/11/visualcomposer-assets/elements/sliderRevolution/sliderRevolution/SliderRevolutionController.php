<?php

namespace sliderRevolution\sliderRevolution;

if (!defined('ABSPATH')) {
    header('Status: 403 Forbidden');
    header('HTTP/1.1 403 Forbidden');
    exit;
}

use VisualComposer\Framework\Container;
use VisualComposer\Framework\Illuminate\Support\Module;
use VisualComposer\Helpers\Traits\EventsFilters;
use VisualComposer\Helpers\Traits\WpFiltersActions;

class SliderRevolutionController extends Container implements Module
{
    protected static $instancesId = [];

    use EventsFilters;
    use WpFiltersActions;

    public function __construct()
    {
        if (!defined('VCV_WP_SLIDER_REVOLUTION_CONTROLLER')) {
            $this->addFilter(
                'vcv:editor:variables vcv:editor:variables/sliderRevolution',
                'getVariables'
            );
            $this->wpAddAction(
                'template_redirect',
                'checkPlugin'
            );
            define('VCV_WP_SLIDER_REVOLUTION_CONTROLLER', true);
            $this->addFilter(
                'vcv:ajax:elements:ajaxShortcode:adminNonce',
                'setId',
                -1
            );
            $this->addFilter(
                'vcv:ajax:elements:ajaxShortcode:adminNonce',
                'setInitList',
                10
            );
        }
    }

    public function setId($response)
    {
        $this->wpAddFilter(
            'revslider_get_html_id',
            function ($sliderId) {
                $sliderId = preg_replace('/[^a-zA-Z0-9]/', '', $sliderId);
                if (!isset(self::$instancesId[ $sliderId ])) {
                    self::$instancesId[ $sliderId ] = $sliderId . '_' . time() . '_' . mt_rand(1000, 9000);
                }

                return self::$instancesId[ $sliderId ];
            }
        );

        return $response;
    }

    public function setInitList($response)
    {
        if (!empty(self::$instancesId) && !vcIsBadResponse($response) && isset($response['footerContent'])) {
            $response['footerContent'] .= sprintf(
                '<script>
jQuery(function() {
  window.setTimeout(function(){
    if(jQuery.fn.revolution){
      // Used to fix async revslider loading
      if(typeof window.vcvRevInstances==="undefined") {window.vcvRevInstances=[]}
      window.vcvRevInstances=%s.concat(window.vcvRevInstances)
      jQuery.fn.revolution.RS_prioList=window.vcvRevInstances
    }
  }, 1000);
});
</script>',
                json_encode(array_values(self::$instancesId))
            );
        }

        return $response;
    }

    /**
     * @param $variables
     * @param $payload
     *
     * @return array
     */
    protected function getVariables($variables, $payload)
    {
        $revSliders = [];
        if (class_exists('RevSlider')) {
            $slider = new \RevSlider();
            $arrSliders = $slider->getArrSliders();

            $revSliders = [];
            $revSliders[] = ['label' => __('Select slider', 'visualcomposer'), 'value' => 0];

            if ($arrSliders) {
                foreach ($arrSliders as $slider) {
                    $revSliders[] = [
                        'label' => $slider->getTitle() . '(' . $slider->getAlias() . ')',
                        'value' => $slider->getAlias(),
                    ];
                }
            }
        }

        if (empty($revSliders)) {
            $revSliders = [
                ['label' => __('No slider found', 'visualcomposer'), 'value' => 0],
            ];
        }

        $variables[] = [
            'key' => 'vcvWpSliderRevolution',
            'value' => $revSliders,
            'type' => 'variable',
        ];

        return $variables;
    }

    protected function checkPlugin()
    {
        if (!class_exists('RevSliderFront')) {
            add_shortcode(
                'rev_slider',
                function () {
                    return __('The Slider Revolution plugin is not activated', 'visualcomposer');
                }
            );
        }
    }
}

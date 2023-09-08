<?php

namespace globalTemplate\globalTemplate;

if (!defined('ABSPATH')) {
    header('Status: 403 Forbidden');
    header('HTTP/1.1 403 Forbidden');
    exit;
}

use VisualComposer\Framework\Illuminate\Support\Module;
use VisualComposer\Framework\Container;
use VisualComposer\Helpers\Traits\EventsFilters;
use VisualComposer\Modules\Elements\Traits\AddShortcodeTrait;

/**
 * Class GlobalTemplateShortcode
 * @package globalTemplate\globalTemplate
 */
class GlobalTemplateShortcode extends Container implements Module
{
    use EventsFilters;
    use AddShortcodeTrait;

    /**
     * GlobalTemplateShortcode constructor.
     */
    public function __construct()
    {
        /** @see \globalTemplate\globalTemplate\GlobalTemplateShortcode::registerShortcode */
        $this->addEvent('vcv:inited', 'registerShortcode');
        /** @see \globalTemplate\globalTemplate\GlobalTemplateShortcode::printLateOutputGlobalTemplateShortcodeControl */
        $this->addFilter(
            'vcv:elements:global:template:shortcode:is:print:late:output',
            'printLateOutputGlobalTemplateShortcodeControl'
        );
    }

    /**
     * Register the shortcode
     */
    protected function registerShortcode()
    {
        /** @see \globalTemplate\globalTemplate\GlobalTemplateShortcode::render */
        $this->addShortcode('vcv_global_template', 'render');
    }

    /**
     * Render the shortcode.
     *
     * @param array $atts
     *
     * @return string
     */
    protected function render($atts)
    {
        $output = vchelper('Request')->isAjax() ? __('Select the template', 'visualcomposer') : '';
        $atts = shortcode_atts(
            [
                'id' => '',
            ],
            $atts
        );
        if (!empty($atts['id'])) {
            global $post;
            if (!get_post($atts['id']) || get_post_status($atts['id']) !== 'publish') {
                return $output;
            }
            $backup = $post;
            $originalId = get_the_ID();
            $previousDynamicContent = \VcvEnv::get('DYNAMIC_CONTENT_SOURCE_ID');
            if (empty($previousDynamicContent)) {
                \VcvEnv::set('DYNAMIC_CONTENT_SOURCE_ID', $originalId);
            }
            $templateId = intval(esc_attr($atts['id']));
            $query = new \WP_Query(
                [
                    'post_type' => 'vcv_templates',
                    'suppress_filters' => true,
                    'post_status' => 'publish',
                    'p' => $templateId,
                ]
            );
            vchelper('AssetsEnqueue')->addToEnqueueList($templateId);
            if ($query->have_posts()) {
                $styles = $this->getLateStyles();

                $query->the_post();
                $templateId = get_the_ID();

                $post = $backup; // We need set scope - current post. This may raise issues.. VC-534
                $frontendHelper = vchelper('Frontend');
                $content = vcfilter(
                    'vcv:frontend:content',
                    $frontendHelper->renderContentWordpressElements($query->post->post_content),
                    ['sourceId' => $templateId] // used in Popup addon
                );
                $output = $styles . $content;
                wp_reset_postdata();
            }
            \VcvEnv::set('DYNAMIC_CONTENT_SOURCE_ID', $previousDynamicContent);
            $post = $backup;
        }

        return $output;
    }

    /**
     * Disable late output for global template shortcode for a header cases.
     *
     * @param bool $isPrintLateOutput
     *
     * @return bool
     */
    protected function printLateOutputGlobalTemplateShortcodeControl($isPrintLateOutput)
    {
        if (doing_action('vcv:themeEditor:header')) {
            return false;
        }

        return $isPrintLateOutput;
    }

    protected function getLateStyles()
    {
        $styles = '';

        $isPrintLateOutput = vcfilter(
            'vcv:elements:global:template:shortcode:is:print:late:output',
            true
        );

        if ($isPrintLateOutput) {
            // Only if we are in content
            ob_start();
            // Trigger enqueue (only CSS)
            vcevent('vcv:assets:enqueue:css:list');

            // Forcerly print styles before content, to avoid flashing/jumping
            print_late_styles();
            $styles = ob_get_clean(); // Fix to put source-css before content to avoid flashing VC-1210
        }

        return $styles;
    }
}

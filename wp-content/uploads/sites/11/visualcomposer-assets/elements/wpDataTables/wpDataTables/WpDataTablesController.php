<?php

namespace wpDataTables\wpDataTables;

if (!defined('ABSPATH')) {
    header('Status: 403 Forbidden');
    header('HTTP/1.1 403 Forbidden');
    exit;
}

use VisualComposer\Framework\Container;
use VisualComposer\Framework\Illuminate\Support\Module;
use VisualComposer\Helpers\Traits\EventsFilters;
use VisualComposer\Helpers\Traits\WpFiltersActions;

class WpDataTablesController extends Container implements Module
{
    use EventsFilters;
    use WpFiltersActions;

    protected $items;

    public function __construct()
    {
        if (!defined('VCV_WP_DATA_TABLES_CONTROLLER')) {
            $this->addFilter(
                'vcv:editor:variables vcv:editor:variables/wpDataTables',
                'getVariables'
            );
            $this->wpAddAction(
                'template_redirect',
                'checkPlugin'
            );
            define('VCV_WP_DATA_TABLES_CONTROLLER', true);
        }
    }

    /**
     * @param $variables
     * @param $payload
     *
     * @return array
     */

    protected function getVariables($variables, $payload)
    {
        $allTables = $allCharts = false;
        if (class_exists('WDTBrowseTable')) {
            $tables = new \WDTBrowseTable();
            $allTables = $tables->getAllTables();
        }
        if (class_exists('WDTBrowseChartsTable')) {
            $charts = new \WDTBrowseChartsTable();
            $allCharts = $charts->getAllCharts();
        }

        $values = [];
        $values[] = [
            'label' => __('Select item', 'visualcomposer'),
            'value' => '',
        ];

        if ($allTables) {
            $wpDataTables = [];
            foreach ($allTables as $table) {
                $wpDataTables[] = [
                    'label' => $table['title'] . ' (' . $table['id'] . ')',
                    'value' => 'wpDataTables-' . $table['id'],
                ];
            }
            $values[] = [
                'group' => [
                    'label' => 'wpDataTables',
                    'values' => $wpDataTables,
                ],
            ];
        }

        if ($allCharts) {
            $wpDataCharts = [];
            foreach ($allCharts as $chart) {
                $wpDataCharts[] = [
                    'label' => $chart['title'] . ' (' . $chart['id'] . ')',
                    'value' => 'wpDataCharts-' . $chart['id'],
                ];
            }
            $values[] = [
                'group' => [
                    'label' => 'wpDataCharts',
                    'values' => $wpDataCharts,
                ],
            ];
        }

        $variables[] = [
            'key' => 'vcvWpDataTables',
            'value' => $values,
            'type' => 'variable',
        ];

        return $variables;
    }

    protected function checkPlugin()
    {
        if (!class_exists('WP_List_Table')) {
            add_shortcode(
                'wpdatatable',
                function () {
                    return __('The wpDataTables plugin is not activated', 'visualcomposer');
                }
            );
            add_shortcode(
                'wpdatachart',
                function () {
                    return __('The wpDataTables plugin is not activated', 'visualcomposer');
                }
            );
        }
    }
}

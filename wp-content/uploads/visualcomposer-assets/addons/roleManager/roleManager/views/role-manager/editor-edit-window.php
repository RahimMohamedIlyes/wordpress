<?php

if (!defined('ABSPATH')) {
    header('Status: 403 Forbidden');
    header('HTTP/1.1 403 Forbidden');
    exit;
}
// @codingStandardsIgnoreStart
/**
 * @var bool $stateValue
 * @var string $role
 * @var string $part
 */
?>

<div class="vcv-settings-section vcv-settings_vcv-settings-gutenberg-editor-enabled">
    <h2><?php echo __('Element Edit Window', 'visualcomposer'); ?></h2>
    <div class="vcv-ui-settings-status-table">
        <p class="description"><?php echo __('Control access to tabs in edit window in the Frontend Editor for the selected user role.', 'visualcomposer'); ?></p>
    </div>
    <div class="vcv-ui-settings-status-table">
        <div class="vcv-ui-settings-status-table-row">
            <div class="vcv-ui-settings-status-table-title description"><?php echo __('Layout', 'visualcomposer'); ?></div>
            <div class="vcv-ui-settings-status-table-content">
                <?php
                $index = 'layoutTab';
                $capabilityKey = 'vcv_access_rules__' . $part . '_' . $index;
                $isEnabled = isset($stateCapabilities[ $capabilityKey ]) && $stateCapabilities[ $capabilityKey ];

                echo vcview(
                    'settings/fields/customtoggle',
                    [
                        'onTitle' => 'On',
                        'offTitle' => 'Off',
                        'value' => $index,
                        'name' => 'vcv-role-manager[' . $role . '][' . $part . '][]',
                        'title' => '',
                        'isEnabled' => $isEnabled,
                    ]
                ); ?>
            </div>
        </div>
        <div class="vcv-ui-settings-status-table-row">
            <div class="vcv-ui-settings-status-table-title description"><?php echo __('Content', 'visualcomposer'); ?></div>
            <div class="vcv-ui-settings-status-table-content">
                <?php
                $index = 'contentTab';
                $capabilityKey = 'vcv_access_rules__' . $part . '_' . $index;
                $isEnabled = isset($stateCapabilities[ $capabilityKey ]) && $stateCapabilities[ $capabilityKey ];

                echo vcview(
                    'settings/fields/customtoggle',
                    [
                        'onTitle' => 'On',
                        'offTitle' => 'Off',
                        'value' => $index,
                        'name' => 'vcv-role-manager[' . $role . '][' . $part . '][]',
                        'title' => '',
                        'isEnabled' => $isEnabled,
                    ]
                ); ?>
            </div>
        </div>
        <div class="vcv-ui-settings-status-table-row">
            <div class="vcv-ui-settings-status-table-title description"><?php echo __('Design', 'visualcomposer'); ?></div>
            <div class="vcv-ui-settings-status-table-content">
                <?php
                $index = 'designTab';
                $capabilityKey = 'vcv_access_rules__' . $part . '_' . $index;
                $isEnabled = isset($stateCapabilities[ $capabilityKey ]) && $stateCapabilities[ $capabilityKey ];

                echo vcview(
                    'settings/fields/customtoggle',
                    [
                        'onTitle' => 'On',
                        'offTitle' => 'Off',
                        'value' => $index,
                        'name' => 'vcv-role-manager[' . $role . '][' . $part . '][]',
                        'title' => '',
                        'isEnabled' => $isEnabled,
                    ]
                ); ?>
            </div>
        </div>
        <div class="vcv-ui-settings-status-table-row">
            <div class="vcv-ui-settings-status-table-title description"><?php echo __('Advanced', 'visualcomposer'); ?></div>
            <div class="vcv-ui-settings-status-table-content">
                <?php
                $index = 'advancedTab';
                $capabilityKey = 'vcv_access_rules__' . $part . '_' . $index;
                $isEnabled = isset($stateCapabilities[ $capabilityKey ]) && $stateCapabilities[ $capabilityKey ];

                echo vcview(
                    'settings/fields/customtoggle',
                    [
                        'onTitle' => 'On',
                        'offTitle' => 'Off',
                        'value' => $index,
                        'name' => 'vcv-role-manager[' . $role . '][' . $part . '][]',
                        'title' => '',
                        'isEnabled' => $isEnabled,
                    ]
                ); ?>
            </div>
        </div>
    </div>
</div>

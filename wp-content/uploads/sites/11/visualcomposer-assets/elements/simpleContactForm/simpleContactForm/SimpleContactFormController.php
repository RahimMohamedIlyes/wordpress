<?php

namespace simpleContactForm\simpleContactForm;

if (!defined('ABSPATH')) {
    header('Status: 403 Forbidden');
    header('HTTP/1.1 403 Forbidden');
    exit;
}

use VisualComposer\Framework\Container;
use VisualComposer\Framework\Illuminate\Support\Module;
use VisualComposer\Helpers\Nonce;
use VisualComposer\Helpers\Request;
use VisualComposer\Helpers\Traits\EventsFilters;
use VisualComposer\Helpers\Traits\WpFiltersActions;
use VisualComposer\Helpers\Url;

/**
 * Class SimpleContactFormController.
 */
class SimpleContactFormController extends Container implements Module
{
    use WpFiltersActions;
    use EventsFilters;

    public function __construct()
    {
        $this->addFilter('vcv:ajax:element:simpleContactForm:sendEmail:nonce', 'sendEmail');

        $this->addFilter(
            'vcv:frontView:variables vcv:editor:variables vcv:editor:variables/simpleContactForm',
            'getVariables'
        );

        $this->addFilter(
            'vcv:dataAjax:setData',
            'setData'
        );
    }

    /**
     * @param $response
     * @param $payload
     * @param \VisualComposer\Helpers\Request $requestHelper
     *
     * @return mixed
     */
    protected function setData($response, $payload, Request $requestHelper)
    {
        $dataDecoded = $requestHelper->inputJson('vcv-data');
        $sourceId = vchelper('Preview')->updateSourceIdWithPreviewId($payload['sourceId']);

        $this->removeOldEmails($sourceId);
        if (isset($dataDecoded['elements']) && !empty($dataDecoded['elements'])) {
            $elementsData = $dataDecoded['elements'];
            foreach ($elementsData as $elementData) {
                if ($elementData['tag'] === 'simpleContactForm') {
                    $email = $elementData['destinationEmail'];
                    update_post_meta(
                        $sourceId,
                        '_' . VCV_PREFIX . 'simpleContactFormEmail-' . $elementData['id'],
                        $email
                    );
                }
            }
        }

        return $response;
    }

    /**
     * Keep the DB clean
     *
     * @param $sourceId
     */
    protected function removeOldEmails($sourceId)
    {
        $postMeta = get_post_meta($sourceId);
        foreach ($postMeta as $key => $meta) {
            if (strpos($key, 'simpleContactFormEmail')) {
                delete_post_meta($sourceId, $key);
            }
        }
    }

    /**
     * Send Email
     *
     * @param \VisualComposer\Helpers\Nonce $nonceHelper
     *
     * @param \VisualComposer\Helpers\Request $requestHelper
     *
     * @return array
     */
    protected function sendEmail(Nonce $nonceHelper, Request $requestHelper)
    {
        $response = ['status' => false, 'meesage' => __('Failed to verify nonce, please try again', 'visualcomposer')];
        if ($nonceHelper->verifyUser($requestHelper->input('vcv-nonce'))) {
            $message = nl2br(esc_html($requestHelper->input('vcv-message')));
            $from = $requestHelper->input('vcv-email-from');
            $name = $requestHelper->input('vcv-name');
            $subject = $requestHelper->input('vcv-subject');
            $sourceId = $requestHelper->input('vcv-source-id');
            $elementId = $requestHelper->input('vcv-element-id');

            if (empty($subject)) {
                $subject = get_the_title();
            }

            $headers[] = 'Content-Type: text/html; charset=UTF-8';
            $headers[] = 'From: ' . esc_attr($name) . ' <' . sanitize_email($from) . '>';
            $headers[] = 'Reply-To: ' . esc_attr($name) . ' <' . sanitize_email($from) . '>';

            $to = sanitize_email(get_post_meta($sourceId, '_vcv-simpleContactFormEmail-' . $elementId, true));

            if (!empty($to) && is_email($to) && wp_mail($to, $subject, $message, $headers)) {
                $response = ['status' => true];
            } else {
                $message = __('Failed to send the message, please check your SMTP configuration', 'visualcomposer');

                if (empty($to) || !is_email($to)) {
                    $message = __('Invalid receivers email, please contact site administrator.', 'visualcomposer');
                }

                if (isset($GLOBALS['phpmailer']) && is_string($GLOBALS['phpmailer']->ErrorInfo)) {
                    $message = $GLOBALS['phpmailer']->ErrorInfo;
                }
                $response = ['status' => false, 'message' => $message];
            }
        }

        return $response;
    }

    /**
     * @param $variables
     * @param $payload
     *
     * @param \VisualComposer\Helpers\Url $urlHelper
     * @param \VisualComposer\Helpers\Nonce $nonceHelper
     *
     * @return array
     */
    protected function getVariables($variables, $payload, Url $urlHelper, Nonce $nonceHelper)
    {
        if (!is_array($variables)) {
            $variables = [];
        }

        $publicAjaxUrl = $urlHelper->ajax(
            [
                'vcv-action' => 'element:simpleContactForm:sendEmail:nonce',
                'vcv-late-request' => 1,
            ]
        );

        $variables[] = [
            'key' => 'VCV_SIMPLE_CONTACT_FORM_AJAX_URL',
            'type' => 'constant',
            'value' => $publicAjaxUrl,
        ];

        $variables[] = [
            'key' => 'VCV_SIMPLE_CONTACT_FORM_USER_NONCE',
            'type' => 'constant',
            'value' => $nonceHelper->user(),
        ];

        return $variables;
    }
}

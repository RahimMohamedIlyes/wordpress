<?php
/**
 * Plugin Name: Really Simple SSL Pro multisite
 * Plugin URI: https://really-simple-ssl.com/pro
 * Description: Heavyweight Security Features
 * Version: 7.0.2
 * Requires at least: 5.7
 * Requires PHP: 7.2
 * Text Domain: really-simple-ssl-pro
 * Domain Path: /languages
 * Author: Really Simple Plugins
 * Author URI: https://www.really-simple-plugins.com
 * Network: true
 */

/*  Copyright 2020  Really Simple Plugins B.V.  (email : support@really-simple-ssl.com)
    License: see license.txt
*/

defined('ABSPATH') or die("you do not have access to this page!");

if (!class_exists('REALLY_SIMPLE_SSL_PRO_MULTISITE')) {
    class REALLY_SIMPLE_SSL_PRO_MULTISITE {

    private static $instance;
    public $server;
    public $admin;
    public $support;
    public $licensing;
    public $headers;
    public $csp_backend;
    public $scan;
    public $importer;


    private function __construct() {
	    if (isset($_GET['rsssl_apitoken']) && $_GET['rsssl_apitoken'] == get_site_option('rsssl_csp_report_token') ) {
		    if ( !defined('RSSSL_LEARNING_MODE') ) define( 'RSSSL_LEARNING_MODE' , true );
	    }
    }

    public static function instance() {
        if ( ! isset( self::$instance ) && ! ( self::$instance instanceof REALLY_SIMPLE_SSL_PRO_MULTISITE ) ) {
            self::$instance = new REALLY_SIMPLE_SSL_PRO_MULTISITE;
	        self::$instance->setup_constants();
            if (self::$instance->is_compatible()) {
                self::$instance->includes();

	            if ( rsssl_is_logged_in_rest() || is_admin() || defined('RSSSL_DOING_SYSTEM_STATUS') || defined('RSSSL_LEARNING_MODE') || ( defined( 'WP_CLI' ) && WP_CLI ) ) {
		            self::$instance->headers     = new rsssl_headers();
		            self::$instance->admin       = new rsssl_pro_admin();
		            self::$instance->scan        = new rsssl_scan();
		            self::$instance->importer    = new rsssl_importer();
		            self::$instance->csp_backend = new rsssl_csp_backend();
		            self::$instance->support     = new rsssl_support();
	            }
	            self::$instance->licensing = new rsssl_licensing();
                self::$instance->hooks();
                self::$instance->load_translation();
            } else {
	            add_action( 'admin_notices', array( 'REALLY_SIMPLE_SSL_PRO_MULTISITE', 'admin_notices' ) );
	            add_action( 'admin_enqueue_scripts', array( 'REALLY_SIMPLE_SSL_PRO_MULTISITE', 'enqueue_installer_script_styles' ) );
	            add_action( 'wp_ajax_rsssl_install_plugin', array( 'REALLY_SIMPLE_SSL_PRO_MULTISITE', 'maybe_install_suggested_plugins' ) );
            }

        }

        return self::$instance;
    }

    /**
     * Enqueue plugin installer script
     */
    public static function enqueue_installer_script_styles() {
        $minified = ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) ? '' : '.min';
        wp_enqueue_script( 'rsssl-admin', rsssl_pro_url . "assets/js/admin$minified.js", array( 'jquery' ), rsssl_pro_version, true );
        wp_localize_script(
            'rsssl-admin',
            'rsssl_admin',
            array(
                'admin_url'        => admin_url( 'admin-ajax.php' ),
                'plugin_page_url'  => add_query_arg( array(
                    "page" => "really-simple-security",
                    "tab" => 'configuration',
                ), admin_url( "options-general.php" ) ),
            )
        );
    }

	/**
    * Checks if one of the necessary plugins is active, and of the required version.
    */

	public function is_compatible(){
		require_once(ABSPATH.'wp-admin/includes/plugin.php');
		$core_plugin = 'really-simple-ssl/rlrsssl-really-simple-ssl.php';
		$core_plugin_data = false;
		if ( is_plugin_active($core_plugin)) $core_plugin_data = get_plugin_data( WP_PLUGIN_DIR .'/'. $core_plugin, false, false );
		//this older version is not compatible with newer free version

		if ( is_plugin_active($core_plugin) && $core_plugin_data && version_compare($core_plugin_data['Version'] ,'6.2.0','>=') ) {
			return true;
		}

		$per_page_plugin = 'really-simple-ssl-on-specific-pages/really-simple-ssl-on-specific-pages.php';
		if (is_plugin_active($per_page_plugin)) {
			return false;
		}

		//nothing yet? then...sorry, but no, not compatible.
		return false;
	}

    private function setup_constants() {
        define('rsssl_pro_url', plugin_dir_url(__FILE__ ));
        define('rsssl_pro_path', plugin_dir_path(__FILE__ ));
        define('rsssl_pro_plugin', plugin_basename( __FILE__ ) );
	    define('rsssl_pro_template_path', trailingslashit(plugin_dir_path(__FILE__)).'grid/templates/');
	    define('rsssl_pro_ms_template_path', trailingslashit(plugin_dir_path(__FILE__)).'grid_ms/templates/');
	    $debug = ( defined( 'RSSSL_DEBUG' ) && RSSSL_DEBUG ) ? time() : '';
	    define('rsssl_pro_version', '7.0.2' . $debug );
	    define('rsssl_pro_ms_version', rsssl_pro_version );
        define('rsssl_pro_plugin_file', __FILE__);
        if (!defined('REALLY_SIMPLE_SSL_URL')) define( 'REALLY_SIMPLE_SSL_URL', 'https://really-simple-ssl.com');
	    define( 'RSSSL_ITEM_ID', 35206 );
	    define( 'RSSSL_ITEM_NAME', 'Really Simple SSL Pro Multisite' );
	    define( 'RSSSL_ITEM_VERSION', rsssl_pro_version );
    }

    private function includes() {
	    if (rsssl_is_logged_in_rest() || is_admin() || defined('RSSSL_DOING_SYSTEM_STATUS') || defined('RSSSL_LEARNING_MODE') || ( defined( 'WP_CLI' ) && WP_CLI )  ) {
		    require_once( rsssl_pro_path . '/upgrade.php' );
		    require_once(rsssl_pro_path  . '/class-headers.php' );
		    require_once( rsssl_pro_path . '/csp-violation-endpoint.php');
		    require_once( rsssl_pro_path . '/class-admin.php' );
		    require_once( rsssl_pro_path . '/class-scan.php' );
		    require_once( rsssl_pro_path . '/class-importer.php' );
		    require_once( rsssl_pro_path . '/class-support.php');
		    require_once( rsssl_pro_path . '/settings/settings.php');
	    }
	    require_once( rsssl_pro_path . '/front-end.php' );
	    require_once( rsssl_pro_path . '/security/security.php' );
	    require_once( rsssl_pro_path . '/cron/cron.php' );
	    require_once( rsssl_pro_path . '/csp-endpoint-public.php' );
	    require_once(rsssl_pro_path . '/class-licensing.php');
    }

    private function hooks() {

    }
	/**
	 * Load plugin translations.
	 *
	 * @since 1.0.0
	 *
	 * @return void
	 */
	private function load_translation() {
		load_plugin_textdomain('really-simple-ssl-pro', FALSE, dirname(plugin_basename(__FILE__) ) . '/languages/');
	}

    /**
     * Handles the displaying of any notices in the admin area
     *
     * @since 1.0.28
     * @access public
     * @return void
     */

	    public static function admin_notices() {
		    //prevent showing the review on edit screen, as gutenberg removes the class which makes it editable.
		    $screen = get_current_screen();
		    if ( $screen && $screen->base === 'post' ) return;
		    $core_plugin_data = false;
		    require_once(ABSPATH.'wp-admin/includes/plugin.php');
		    $core_plugin = 'really-simple-ssl/rlrsssl-really-simple-ssl.php';
		    if ( is_plugin_active($core_plugin) ) {
                $core_plugin_data = get_plugin_data( trailingslashit(WP_PLUGIN_DIR) . $core_plugin, false, false );
		    }
		    if ( !is_plugin_active($core_plugin) ) {
			    ?>
                <div id="rsssl-message" class="notice error really-simple-plugins">
                    <style>
                        #rsssl-message {
                            padding: 0 !important;
                        }
                        #rsssl-message .rsssl-notice {
                            padding-left: 20px;
                            text-indent: 10px;
                        }
                        #rsssl-message .rsssl-notice .rsssl-notice-header {
                            border-bottom: 1px solid #DEDEDE;
                            padding-bottom: 15px;
                        }
                        #rsssl-message .rsssl-notice .rsssl-notice-footer {
                            margin-bottom: 10px;
                        }
                        .rsssl-pro-loader {
                            width: 50px;
                            height: 15px;
                            text-align: center;
                            font-size: 10px;
                        }

                        .rsssl-pro-loader > div {
                            background-color: #333;
                            height: 100%;
                            width: 3px;
                            margin:1px;
                            display: inline-block;
                            -webkit-animation: sk-stretchdelay 1.2s infinite ease-in-out;
                            animation: sk-stretchdelay 1.2s infinite ease-in-out;
                        }

                        .rsssl-pro-loader .rect2 {
                            -webkit-animation-delay: -1.1s;
                            animation-delay: -1.1s;
                        }

                        .rsssl-pro-loader .rect3 {
                            -webkit-animation-delay: -1.0s;
                            animation-delay: -1.0s;
                        }

                        .rsssl-pro-loader .rect4 {
                            -webkit-animation-delay: -0.9s;
                            animation-delay: -0.9s;
                        }

                        .rsssl-pro-loader .rect5 {
                            -webkit-animation-delay: -0.8s;
                            animation-delay: -0.8s;
                        }

                        @-webkit-keyframes sk-stretchdelay {
                            0%, 40%, 100% { -webkit-transform: scaleY(0.4) }
                            20% { -webkit-transform: scaleY(1.0) }
                        }

                        @keyframes sk-stretchdelay {
                            0%, 40%, 100% {
                                transform: scaleY(0.4);
                                -webkit-transform: scaleY(0.4);
                            }  20% {
                                   transform: scaleY(1.0);
                                   -webkit-transform: scaleY(1.0);
                               }
                        }
                    </style>
                    <div class="rsssl-notice">
                        <div class="rsssl-notice-header">
                            <h1><?php echo __("Plugin dependency error","really-simple-ssl-pro");?></h1>
                        </div>
                        <div class="rsssl-notice-content">
						    <?php if ( !defined('rsssl_plugin') ) {
							    ?>
                                <p> <?php echo __("Really Simple SSL Pro is an add-on for Really Simple SSL, and cannot do it on its own :-(","really-simple-ssl-pro"); ?> </p>
                                <p> <?php echo __("Please install and activate Really Simple SSL to enable the add-on.","really-simple-ssl-pro"); ?> </p> <?php
						    } else { ?>
                                <p><?php echo sprintf(__("Please %supgrade%s to the latest version to be able use the full functionality of the plugin.","really-simple-ssl-pro"),'<a href="https://really-simple-ssl.com/pro" target="_blank">','</a>');?></p>
						    <?php } ?>
                        </div>
                        <div class="rsssl-notice-footer">
						    <?php
						    require_once( rsssl_pro_path . 'class-installer.php' );
						    new rsssl_installer( 'really-simple-ssl' );
						    ?>
                            <div>

                                <button type="button" class=" rsssl-install-plugin"><?php echo __("Install and activate Really Simple SSL","really-simple-ssl-pro") ?></button>
                            </div>
                        </div>
                    </div>
                </div>
			    <?php
		    } elseif ( isset($core_plugin_data['Version']) && version_compare($core_plugin_data['Version'], '7.0.0', '<')) {
			    ?>
                <div id="rsssl-message" class="notice error really-simple-plugins">
                    <div class="rsssl-notice">
                        <div class="rsssl-notice-header">
                            <h1><?php echo __("Plugin dependency error","really-simple-ssl-pro");?></h1>
                        </div>
                        <div class="rsssl-notice-content">
                            <p><?php echo __("Really Simple SSL needs to be updated to the latest version to be compatible.","really-simple-ssl-pro");?></p>
                            <p><?php echo sprintf(__("Please %supgrade%s to the latest version to be able use the full functionality of the plugin.","really-simple-ssl-pro"),'<a href="https://really-simple-ssl.com/pro" target="_blank">','</a>');?></p>
                        </div>
                    </div>
                </div>
			    <?php
		    }
	    }

	    /**
	     * Install suggested plugins
	     * @return void
	     */
	    public static function maybe_install_suggested_plugins(){
		    $error = true;
		    if ( current_user_can('install_plugins') ) {
			    $error = false;
			    $step = isset($_GET['step']) ? sanitize_title($_GET['step']) : 'download';
			    require_once( rsssl_pro_path . 'class-installer.php' );
			    $installer = new rsssl_installer( 'really-simple-ssl' );
			    $installer->install($step);
		    }

		    $response = json_encode( [ 'success' => $error ] );
		    header( "Content-Type: application/json" );
		    echo $response;
		    exit;
	    }
    }
}

if ( !class_exists('REALLY_SIMPLE_SSL_PRO') && !function_exists('RSSSL_PRO')) {
    function RSSSL_PRO() {
        return REALLY_SIMPLE_SSL_PRO_MULTISITE::instance();
    }

    add_action( 'plugins_loaded', 'RSSSL_PRO', 9 );
}

if ( !function_exists('rsssl_pro_ms_activate') ) {
	function rsssl_pro_ms_activate(){
		require_once(ABSPATH.'wp-admin/includes/plugin.php');
		$pro_plugin = 'really-simple-ssl-pro/really-simple-ssl-pro.php';
		if ( is_plugin_active( $pro_plugin) ) {
			deactivate_plugins( $pro_plugin );
		}
		if ( defined('rsssl_version') ) {
			add_action( 'shutdown', array( RSSSL_PRO()->admin, 'activate' ) );
		}
	}
	register_activation_hook( __FILE__, 'rsssl_pro_ms_activate' );
}

if ( !function_exists('rsssl_pro_deactivate')) {
	function rsssl_pro_deactivate(){
		if ( defined('rsssl_version') ) {
			add_action( 'shutdown', array( RSSSL_PRO()->admin, 'deactivate' ) );
		}
	}
	register_deactivation_hook( __FILE__, 'rsssl_pro_deactivate' );
}



<?php defined( 'ABSPATH' ) or die();

class rsssl_scan {
	private static $_this;
	//private $mixed_content_detected    = FALSE;
	private $nr_requests_in_one_run = 5;
	private $nr_files_in_one_run = 400;
	private $nr_of_rows_in_one_run = 2000;
	private $file_array = array();
	public $files_with_blocked_resources = array();
	public $posts_with_external_resources = array();
	public $postmeta_with_external_resources = array();
	public $widgets_with_external_resources = array();
	public $posts_with_blocked_resources = array();
	public $postmeta_with_blocked_resources = array();
	public $widgets_with_blocked_resources = array();
	private $external_resources = array();
	public $blocked_resources = array();
	public $source_of_resource = array();//match filename to url
	private $webpages = array();
	private $css_js_files = array();
	public $css_js_with_mixed_content = array();
	public $traced_urls = array();
	private $files_with_css_js = array();
	private $files_with_external_css_js = array();
	public $external_css_js_with_mixed_content = array();
	private $queue = 0;
	private $scan_completed_no_errors;
	private $last_scan_time;
	private $error_number = 0;
	private $safe_domains
		= array(
			"http://",
			"http://gmpg.org/xfn/11",
			"http://player.vimeo.com/video/",
			"http://www.youtube.com/embed/",
			"http://platform.twitter.com/widgets.js"
		);
	public $ignored_urls;


	function __construct() {
		if ( isset( self::$_this ) ) {
			wp_die( sprintf( __( '%s is a singleton class and you cannot create a second instance.', 'really-simple-ssl-pro' ), get_class( $this ) ) );
		}

		self::$_this = $this;
		add_filter("rsssl_run_test", array($this, 'mixed_content_scan'), 10, 3 );
		add_action('admin_init', array($this, 'start_quick_scan_from_url') );
		add_filter( 'rsssl_notices', array($this,'get_notices_list'),20, 1 );
	}



	static function this() {
		return self::$_this;
	}

	/**
	 * Catch rest api request
	 * @param $response
	 * @param $test
	 * @param $data
	 *
	 * @return mixed
	 */

	public function mixed_content_scan($response, $test, $data ){
		if ( $test === 'mixed_content_scan' ){
			$state = $data['state'];
			switch ($state) {
				case 'start':
					update_option( "rsssl_iteration", 1, false );
					delete_transient( 'rsssl_scan' );
					update_option( "rsssl_progress", 0, false );
					update_option( "rsssl_current_action", "", false );
					update_option( "rsssl_scan_type", "home", false );
					update_option( "rsssl_scan_active",  'running', false );
					break;
				case 'start_full':
					update_option( "rsssl_scan_type", "all", false );
					update_option( "rsssl_scan_active",  'running', false );
					break;
				case 'stop':
					update_option( "rsssl_scan_active", 'stop', false );
					break;
				case 'running':
					update_option( "rsssl_scan_active", 'running', false );
			}

			//can be false or 'stop', if not active
			if ( get_option( 'rsssl_scan_active' ) === 'running' ) {
				$this->run_scan();
			}

			$progress = get_option( 'rsssl_progress' );
			if ( $progress>=100 ) {
				update_option( "rsssl_scan_active", 'stop', false );
			}

			$response = $this->get();
		}
		return $response;
	}

	/**
	 * Check if the user has completed a scan before, but the data was cleared due to timeout of transient
	 * @return bool
	 */

	public function has_cleared_scan_data() {
		$completed_scan_before = false;
		if ( $this->scan_completed_no_errors === 'COMPLETED' || $this->scan_completed_no_errors === 'ERRORS' ) {
			$completed_scan_before = true;
		}

		if ( ! get_transient( 'rsssl_scan' ) && $completed_scan_before && get_option( 'rsssl_progress' ) == 100 ) {
			return true;
		}

		return false;
	}


	/**
	 * Get list of notices for the dashboard
	 * @param array $notices
	 *
	 * @return array
	 */
	public function get_notices_list($notices)
	{
		$notices['mixed_content_scan'] = array(
			'callback' => 'RSSSL_PRO()->scan->pro_scan_notice',
			'score' => 10,
			'output' => array(
				'has-ssl-no-scan-errors' => array(
					'msg' => __("Great! Your scan last completed without errors.", "really-simple-ssl-pro"),
					'icon' => 'success'
				),
				'has-ssl-scan-has-errors' => array(
					'msg' => __("The last scan was completed with errors. Only migrate if you are sure the found errors are not a problem for your site.", "really-simple-ssl-pro"),
					'icon' => 'warning',
					'dismissible' => true,
				),
				'no-scan-done' => array(
					'msg' => __("You haven't scanned the site yet, you should scan your site to check for possible issues.", "really-simple-ssl-pro"),
					'icon' => 'open',
					'highlight_field_id' => 'mixedcontentscan',
				),
				'no-ssl-no-scan-errors' => array(
					'msg' => __("Great! Your scan last completed without errors.", "really-simple-ssl-pro"),
					'icon' => 'success'
				),
				'no-ssl-scan-has-errors' => array(
					'msg' => __("The last scan was completed with errors. Are you sure these issues don't impact your site?", "really-simple-ssl-pro"),
					'icon' => 'warning',
					'dismissible' => true,
				),
			),
		);

		return $notices;
	}

	/**
	 * Conditions for a notice
	 *
	 * @return string
	 */
	public function pro_scan_notice() {
		if ( !rsssl_get_option('site_has_ssl') ) {
			if ( $this->scan_completed_no_errors() == "COMPLETED" ) {
				return 'has-ssl-no-scan-errors';
			} elseif ( $this->scan_completed_no_errors() == "ERRORS" ) {
				return 'has-ssl-scan-has-errors';
			} elseif ( ! RSSSL_PRO()->licensing->license_is_valid() ) {
				return 'no-ssl-no-scan-done-invalid-license';
			} else {
				return 'no-scan-done';
			}
		} else {
			if ( $this->scan_completed_no_errors() == "COMPLETED" ) {
				return 'no-ssl-no-scan-errors';
			} elseif ( $this->scan_completed_no_errors() == "ERRORS" ) {
				return 'no-ssl-scan-has-errors';
			} elseif ( ! RSSSL_PRO()->licensing->license_is_valid() ) {
				return 'no-ssl-no-scan-done-invalid-license';
			} else {
				return 'no-scan-done';
			}
		}
	}

  /**
   * Start a quick scan, invoked via $_GET parameter
   */

	public function start_quick_scan_from_url() {
		if ( !isset($_GET['rsssl_start_scan']) ) {
			return;
		}
		if ( ! rsssl_user_can_manage() ) {
			return;
	    }

	    update_option( "rsssl_scan_active", 'running', false );
	    update_option( "rsssl_iteration", 1, false );
		delete_transient( 'rsssl_scan' );
	    update_option( "rsssl_progress", 0, false );
	    update_option( "rsssl_current_action", "", false );
	    update_option( "rsssl_scan_type", "home", false );
		wp_redirect(add_query_arg(array('page'=>'really-simple-security','#'=>'settings/mixed_content_scan'), admin_url( 'options-general.php' ) ));
		exit();
    }

	/**
   * Get last scan time
	 * @return bool|string
	 */

	private function get_last_scan_time() {
		if ( $this->last_scan_time == __( "Never", "really-simple-ssl-pro" ) ) {
			return $this->last_scan_time;
		}
		if ( ! empty( $this->last_scan_time ) ) {
			//$date = date(DateTime::RFC850);
			return sprintf(
			    _x( "%s at %s","'date' at 'time'", "really-simple-ssl-pro" ),
          date( get_option( 'date_format' ), $this->last_scan_time ),
          date( "H:i", $this->last_scan_time )
      );
		}
		return false;
	}

	/**
	 * run the scan
	 */

	public function run_scan() {
		if ( get_option( 'rsssl_scan_active' ) !== 'running' ) {
			return;
		}
		//we don't want the ajax request trigger a cron request
		if ( isset( $_GET['rsssl_scan_request'] ) ) {
			return;
		}

		$total_iterations = 14;
		$iteration = get_option( "rsssl_iteration", 1 );
		$in_queue = false;

		if ( $iteration == 1 ) {
			$this->load_results( true ); //true to reset all values
			//get all pages of this website
			$this->webpages = $this->get_webpage_list();
			$this->queue    = 1;
			$progress       = $this->calculate_queue_progress( 1, 1, $total_iterations, $iteration );
			$in_queue       = $this->still_in_queue( 0 );
			update_option( 'rsssl_progress', $progress, false  );
			update_option( 'rsssl_current_action', __( "Generating web page list", "really-simple-ssl-pro" ), false );
			$this->save_results();
		}

		if ( $iteration == 2 ) {
			$this->load_results();
			//find all css and js files
			$this->parse_for_css_js_and_external_files( $this->webpages );
			$progress = $this->calculate_queue_progress( count( $this->webpages ), $this->queue, $total_iterations, $iteration );
			$current_queue = ( $this->queue == 0 ) ? count( $this->webpages ) : $this->queue;

			update_option( 'rsssl_progress', $progress, false );
			update_option( 'rsssl_current_action',
				sprintf( __( "Searching for js and css files and links to external resources in website, %s of %s",
					"really-simple-ssl-pro" ), $current_queue,
					count( $this->webpages ) ), false );

			$in_queue = $this->still_in_queue( count( $this->webpages ) );
			$this->save_results();
		}

		if ( $iteration == 3 ) {
			$this->load_results();
			//parse these files for http links
			$this->css_js_with_mixed_content = $this->parse_for_http( $this->css_js_files, $this->css_js_with_mixed_content );
			$progress = $this->calculate_queue_progress( count( $this->css_js_files ), $this->queue, $total_iterations, $iteration );
			$current_queue = ( $this->queue == 0 ) ? count( $this->css_js_files ) : $this->queue;
			update_option( 'rsssl_progress', $progress, false );
			update_option( 'rsssl_current_action', sprintf( __( "Searching for mixed content in css and js files, %s of %s",
					"really-simple-ssl-pro" ), $current_queue,
					count( $this->css_js_files ) + 2 ), false );
			$in_queue = $this->still_in_queue( count( $this->css_js_files ) );
			$this->save_results();
		}

		if ( $iteration == 4 ) {
			$this->load_results();
			$this->get_file_array();
			$this->queue = $this->still_in_queue( 1 );
			$progress    = $this->calculate_queue_progress( 1, 1, $total_iterations, $iteration );
			$in_queue    = $this->still_in_queue( 0 );
			update_option( 'rsssl_progress', $progress, false );
			update_option( 'rsssl_current_action', __( "Generating file list", "really-simple-ssl-pro" ), false );
			$this->save_results();
		}

		if ( $iteration == 5 ) {
			$this->load_results();
			$this->search_posts_for_external_urls();
			//get the number of rows total
			$total_post_count = $this->get_total_post_count();
			$progress = $this->calculate_queue_progress( $total_post_count, $this->queue, $total_iterations, $iteration );
			$in_queue         = $this->still_in_queue( $total_post_count );
			$current_queue    = ( $this->queue == 0 ) ? $total_post_count : $this->queue;
			update_option( 'rsssl_progress', $progress, false );
			update_option( 'rsssl_current_action',
				sprintf( __( "Checking posts for external URLs, %s of %s",
					"really-simple-ssl-pro" ), $current_queue,
					$total_post_count ), false );
			$this->save_results();
		}

		if ( $iteration == 6 ) {
			$this->load_results();
			//Also search for widgets with external urls
			$this->search_widgets_for_external_urls();
			$progress = $this->calculate_queue_progress( 1, 1, $total_iterations, $iteration );
			$in_queue = $this->still_in_queue( 0 );
			update_option( 'rsssl_progress', $progress, false );
			update_option( 'rsssl_current_action', __( "Checking widgets for external URLs", "really-simple-ssl-pro" ), false );
			$this->save_results();
		}

		if ( $iteration == 7 ) {
			$this->load_results();
			$this->search_postmeta_for_external_urls();
			$progress = $this->calculate_queue_progress( 1, 1, $total_iterations, $iteration );
			$in_queue = $this->still_in_queue( 0 );
			update_option( 'rsssl_progress', $progress, false );
			update_option( 'rsssl_current_action',
				__( "Checking which postmeta contain external resources",
					"really-simple-ssl-pro" ), false );
			$this->save_results();
		}

		if ( $iteration == 8 ) {
			$this->load_results();
			//check which of these files cannot load over ssl
			$this->find_blocked_resources( $this->external_resources );
			$progress = $this->calculate_queue_progress( count( $this->external_resources ), $this->queue, $total_iterations, $iteration );
			$in_queue = $this->still_in_queue( count( $this->external_resources ) );
			$current_queue = ( $this->queue == 0 ) ? count( $this->external_resources ) : $this->queue;
			update_option( 'rsssl_progress', $progress, false );
			update_option( 'rsssl_current_action', sprintf( __( "Checking which resources can't load over ssl, %s of %s", "really-simple-ssl-pro" ), $current_queue, count( $this->external_resources ) ), false );
			$this->save_results();
		}

		if ( $iteration == 9 ) {
			$this->load_results();

			$external_css_js_files = $this->get_external_css_js_files();
			//check which of these files contain http links.
			$this->external_css_js_with_mixed_content = $this->parse_external_files_for_http( $external_css_js_files, $this->external_css_js_with_mixed_content );
			$progress = $this->calculate_queue_progress( count( $external_css_js_files ), $this->queue, $total_iterations, $iteration );
			$in_queue = $this->still_in_queue( count( $external_css_js_files ) );
			$current_queue = ( $this->queue == 0 ) ? count( $external_css_js_files ) : $this->queue;
			update_option( 'rsssl_progress', $progress , false);
			update_option( 'rsssl_current_action',
				sprintf( __( "Checking if external js or css files contain http links, %s of %s",
					"really-simple-ssl-pro" ), $current_queue,
					count( $external_css_js_files ) ), false );
			$this->save_results();
		}

		if ( $iteration == 10 ) {
			$this->load_results();
			//search in php files and db for references to ext res.
			$this->search_files_for_urls();
			$progress = $this->calculate_queue_progress( count( $this->file_array ), $this->queue, $total_iterations, $iteration );
			$in_queue = $this->still_in_queue( count( $this->file_array ) );
			$current_queue = ( $this->queue == 0 ) ? count( $this->file_array ) : $this->queue;
			update_option( 'rsssl_progress', $progress, false );
			update_option( 'rsssl_current_action',
				sprintf( __( "Looking up blocked resources in files, %s of %s",
					"really-simple-ssl-pro" ), $current_queue,
					count( $this->file_array ) ), false );
			$this->save_results();
		}

		if ( $iteration == 11 ) {
			$this->load_results();
			$this->find_posts_with_blocked_urls();
			$this->queue = 1;
			$progress    = $this->calculate_queue_progress( 1, 1, $total_iterations, $iteration );
			$in_queue    = $this->still_in_queue( 0 );
			update_option( 'rsssl_progress', $progress, false );
			update_option( 'rsssl_current_action',
				__( "Looking up blocked resources in posts",
					"really-simple-ssl-pro" ), false );
			$this->save_results();
		}

		if ( $iteration == 12 ) {
			$this->load_results();
			$this->find_postmeta_with_blocked_urls();
			$this->queue = 1;
			$progress    = $this->calculate_queue_progress( 1, 1, $total_iterations, $iteration );
			$in_queue    = $this->still_in_queue( 0 );
			update_option( 'rsssl_progress', $progress, false );
			update_option( 'rsssl_current_action',
				__( "Looking up blocked resources in postmeta",
					"really-simple-ssl-pro" ), false );
			$this->save_results();
		}

		if ( $iteration == 13 ) {
			$this->load_results();
			$this->find_widgets_with_blocked_urls();
			$this->queue = 1;
			$progress  = $this->calculate_queue_progress( 1, 1,
					$total_iterations, $iteration )
			        - 1;//prevent progress from being 100 before last step
			$in_queue  = $this->still_in_queue( 0 );
			update_option( 'rsssl_progress', $progress, false );
			update_option( 'rsssl_current_action',
				__( "Looking up blocked resources in widgets",
					"really-simple-ssl-pro" ), false );
			$this->save_results();
		}

		if ( $iteration == 14 ) {
			$this->load_results();
			//dropped brute force database search
			update_option( 'rsssl_current_action', __( "Finished scan", "really-simple-ssl-pro" ), false );
			$in_queue = $this->still_in_queue( 1 );
			update_option( 'rsssl_progress', 100, false );
			update_option( "rsssl_scan_active", 'stop', false );
			$this->save_results();
		}

		if ( ! $in_queue ) {
			$iteration ++;
		}

		update_option( "rsssl_iteration", $iteration, false );
	}

	/**
   * Get total post count
	 * @return int
	 */

	private function get_total_post_count() {
		global $wpdb;
		$args    = array(
			'public' => true,
		);
		$post_types = get_post_types( $args );
		$post_types_query = array();
		foreach ( $post_types as $post_type ) {
			$post_types_query[] = " post_type = '" . $post_type . "'";
			$post_types_query[] = " post_type = 'wp_block'";
		}

		$posttypes_query = implode( " OR ", $post_types_query );
		$count      = get_transient( "rsssl_scan_post_count" );
		if ( ! $count ) {
			$sql = "select count(*) from $wpdb->posts  where post_status='publish' and (" . $posttypes_query . ")";
			$count = $wpdb->get_var( $sql );
			set_transient( "rsssl_scan_post_count", $count, DAY_IN_SECONDS );
		}

		return $count;
	}

	/**
  *Lookup all posts that have a blocked external url
  */

	private function find_posts_with_blocked_urls() {
		$posts_array = array();
		$blocked_urls = $this->blocked_resources;
		$posts_with_external_resources = $this->posts_with_external_resources;
		foreach ( $posts_with_external_resources as $post_id => $urls ) {
			//check if one of the found urls is in the blocked resources array.
			foreach ( $urls as $url ) {
				if ( $this->in_array_r( $url, $blocked_urls ) ) {
					//add post to post list with blocked resources
					if ( ! in_array( $post_id, $posts_array ) ) {
						$posts_array[] = $post_id;
					}
					$this->traced_urls[] = $url;
				}
			}
		}
		$this->posts_with_blocked_resources = $posts_array;
	}

	/**
	 * find post meta fields with blocked url's
	 */
	private function find_postmeta_with_blocked_urls() {
		$postmeta_array = array();
		$blocked_urls = $this->blocked_resources;
		$postmeta_with_external_resources = $this->postmeta_with_external_resources;

		foreach ( $postmeta_with_external_resources as $post_id => $urls ) {
			//check if one of the found urls is in the blocked resources array.
			foreach ( $urls as $url ) {
				if ( $this->in_array_r( $url, $blocked_urls ) ) {
					//add post to post list with blocked resources
					if ( ! in_array( $post_id, $postmeta_array ) ) {
						$postmeta_array[] = $post_id;
					}
					$this->traced_urls[] = $url;
				}
			}
		}
		$this->postmeta_with_blocked_resources = $postmeta_array;

	}

	/**
   * Get widget data by title
	 * @param $title
	 *
	 * @return array|bool
	 */
	public function get_widget_data( $title ) {

		//Get the widget type, before the -
		$type = substr( $title, 0, strpos( $title, '-' ) );

		//Get the widget id, after type -
		$id = substr( $title, strpos( $title, '-' ) + 1 );

		//Get the widget options, save to array to retrieve the HTML
		$widget_array = get_option( "widget_" . $type );
		$widget_html = "";
		$widget_title = "";

		$type_found = false;
		if ( isset( $widget_array[ $id ]["content"] ) ) {
			$type_found = true;
			$widget_html = $widget_array[ $id ]["content"];
		}

		if ( isset( $widget_array[ $id ]["url"] ) ) {
			$type_found = true;
			$widget_html = $widget_array[ $id ]["url"];
		}
		if ( isset( $widget_array[ $id ]["text"] ) ) {
			$type_found = true;
			$widget_html = $widget_array[ $id ]["text"];
		}

		if ( isset( $widget_array[ $id ]["title"] ) ) {
			$widget_title = $widget_array[ $id ]["title"];
		}

		if ( $type_found ) {
			return array(
				"type" => $type,
				"id"  => $id,
				"html" => $widget_html,
				"title" => $widget_title
			);
		} else {
			return false;
		}

	}

	/**
	 * Save the edited html of a widget to the widget in question.
	 * @param string $title
	 * @param string $content
	 *
	 * @return bool
	 */

	public function update_widget_data( $title, $content ) {

		//Get the widget type, before the -
		$type = substr( $title, 0, strpos( $title, '-' ) );
		//Get the widget id, after type -
		$id = substr( $title, strpos( $title, '-' ) + 1 );
		//Get the widget options, save to array to retrieve the HTML
		$widget_array = get_option( "widget_" . $type );

		$type_found = false;
		if ( isset( $widget_array[ $id ]["content"] ) ) {
			$type_found           = true;
			$widget_array[ $id ]["content"] = $content;
		}

		if ( isset( $widget_array[ $id ]["url"] ) ) {
			$type_found         = true;
			$widget_array[ $id ]["url"] = $content;
		}

		if ( isset( $widget_array[ $id ]["text"] ) ) {
			$type_found         = true;
			$widget_array[ $id ]["text"] = $content;
		}

		if ( $type_found ) {
			update_option( "widget_" . $type, $widget_array, false );
		}

		return true;
	}


	private function get_widget_area( $search_widget_title ) {
		$widget_areas = wp_get_sidebars_widgets();
		foreach ( $widget_areas as $widget_area_name => $widgets ) {
			$found = false;
			foreach ( $widgets as $widget_title ) {
				if ( $search_widget_title == $widget_title ) {
					$found = true;
				}
			}
			if ( $found ) {
				return $widget_area_name;
			}
		}

		return false;
	}

	/**
	 *  Get the friendly title for a widget area
	 *
	 * @param string widget index
	 *
	 * @return string
	 */

	private function get_widget_title( $area ) {
		global $wp_registered_sidebars, $wp_registered_widgets;
		if ( isset( $wp_registered_sidebars[ $area ] ) ) {
			$title = $wp_registered_sidebars[ $area ]["name"];
		}
		if ( isset( $wp_registered_widgets[ $area ] ) ) {
			$title = $wp_registered_widgets[ $area ]["name"];
		}
		return $title;
	}

	/**
	 *
	 * Search for widgets in external URLs
	 *
	 **/

	private function search_widgets_for_external_urls() {
		//$external_resources = $this->external_resources;
		$patterns     = $this->external_domain_patterns();
		$url_only_patterns = $this->external_domain_patterns( true );
		$widgets_array   = array();

		//Check $type and pattern
		$widget_areas = wp_get_sidebars_widgets();
		foreach ( $widget_areas as $widgets ) {
			foreach ( $widgets as $widget_title ) {
				$widget_data = $this->get_widget_data( $widget_title );
				if ( ! $widget_data ) {
					continue;
				}
				if ( ! isset( $widget_data["html"] )
				   || ! isset( $widget_data["type"] )
				) {
					continue;
				}

				$html = $widget_data["html"];
				$type = $widget_data["type"];
				//media_image is different because the URL pattern is different. media_image ONLY contains the URL. Other widgets contain HTML <img src=">
				if ( $type == 'media_image' ) {
					foreach ( $url_only_patterns as $pattern ) {
						if ( preg_match_all( $pattern, $html, $matches,
							PREG_PATTERN_ORDER )
						) {

							foreach ( $matches[0] as $match ) {
								//list to show all posts with external urls
								$url = $match;
								if ( ! isset( $widgets_array[ $widget_title ] )
								   || ( isset( $widgets_array[ $widget_title ] )
								     && ! in_array( $url, $widgets_array[ $widget_title ] ) )
								) {
									$widgets_array[ $widget_title ][] = $url;
								}
							}
						}
					}
				} else {
					foreach ( $patterns as $pattern ) {
						if ( preg_match_all( $pattern, $html, $matches,
							PREG_PATTERN_ORDER )
						) {
							foreach ( $matches[1] as $key => $match ) {
								if ( empty( $matches[2][ $key ] ) ) {
									continue;
								}
								//list to show all posts with external urls
								$url = $matches[1][ $key ] . $matches[2][ $key ];

								if ( ! isset( $widgets_array[ $widget_title ] )
								   || ( isset( $widgets_array[ $widget_title ] )
								     && ! in_array( $url,
											$widgets_array[ $widget_title ] ) )
								) {
									$widgets_array[ $widget_title ][] = $url;
									$this->external_resources [] = $url;
								}
							}
						}
					}
				}
			}
		}
		$this->widgets_with_external_resources = $widgets_array;
	}

	/**
	 * Search for blocked urls within widgets
	 *
	 * @param void
	 *
	 * @return
	 *
	 */

	private function find_widgets_with_blocked_urls() {
		$blocked_urls          = $this->blocked_resources;
		$widgets_with_blocked_resources = array();
		$widgets_with_external_resources = $this->widgets_with_external_resources;

		foreach ( $widgets_with_external_resources as $widget_name => $urls ) {
			//check if one of the found urls is in the blocked resources array.
			foreach ( $urls as $url ) {
				if ( $this->in_array_r( $url, $blocked_urls ) ) {
					//add post to post list with blocked resources
					if ( ! in_array( $widget_name,
						$widgets_with_blocked_resources )
					) {
						$widgets_with_blocked_resources[] = $widget_name;
					}
					$this->traced_urls[] = $url;
				}
			}
		}
		$this->widgets_with_blocked_resources = $widgets_with_blocked_resources;
	}


	/**
	 * Scan all posts for external urls.
	 */

	private function search_posts_for_external_urls() {
		global $wpdb;

		$external_resources = $this->external_resources;
		$posts_array    = $this->posts_with_external_resources;

		$patterns = $this->external_domain_patterns();
		//look only in posts of used post types.
		$args    = array(
			'public' => true,
		);
		$post_types = get_post_types( $args );

		$post_types_query = array();
		foreach ( $post_types as $post_type ) {
			$post_types_query[] = " post_type = '" . $post_type . "'";
			$post_types_query[] = " post_type = 'wp_block'";
		}

		$posttypes_query = implode( " OR ", $post_types_query );

		$query
			= "select ID, post_content, guid from $wpdb->posts where post_status='publish' and ("
			 . $posttypes_query . ") LIMIT " . $this->queue . ", "
			 . $this->nr_of_rows_in_one_run;

		$results = $wpdb->get_results( $query );

		foreach ( $results as $result ) {
			$str = $result->post_content;
			foreach ( $patterns as $pattern ) {
				if ( preg_match_all( $pattern, $str, $matches,
					PREG_PATTERN_ORDER )
				) {
					foreach ( $matches[1] as $key => $match ) {
						if ( empty( $matches[2][ $key ] ) ) {
							continue;
						}
						//list to show all posts with external urls
						$url = $matches[1][ $key ] . $matches[2][ $key ];
						//check if already in array
						if ( ! isset( $posts_array[ $result->ID ] )
						   || ( isset( $posts_array[ $result->ID ] )
						     && ! in_array( $url,
									$posts_array[ $result->ID ] ) )
						) {
							$posts_array[ $result->ID ][] = $url;
						}

						//list to check all external urls.
						if ( ! in_array( $url, $external_resources ) ) {
							$external_resources[] = $url;
						}

						//list to track those resource back to where they came from.
						$this->source_of_resource[ $url ] = $result->ID;
					}
				}
			}
		}
		$this->queue += $this->nr_of_rows_in_one_run;

		$this->posts_with_external_resources = $posts_array;
		$this->external_resources      = $external_resources;

	}

	/*
 * Search the wp_postmeta table for external URLs
 */

	public function search_postmeta_for_external_urls() {
		global $wpdb;

		$external_resources = $this->external_resources;
		$postmeta_array   = $this->postmeta_with_external_resources;
		$patterns = $this->external_domain_patterns();

		$query
			= "select post_id, meta_key, meta_value from $wpdb->postmeta LIMIT "
			 . $this->queue . ", " . $this->nr_of_rows_in_one_run;

		$results = $wpdb->get_results( $query );
		foreach ( $results as $result ) {
			$str = $result->meta_value;
			foreach ( $patterns as $pattern ) {
				if ( preg_match_all( $pattern, $str, $matches,
					PREG_PATTERN_ORDER )
				) {
					foreach ( $matches[1] as $key => $match ) {
						if ( empty( $matches[2][ $key ] ) ) {
							continue;
						}
						//list to show all posts with external urls
						$url = $matches[1][ $key ] . $matches[2][ $key ];
						//check if already in array
						//if (!isset($postmeta_array[$result->post_id]) || (isset($postmeta_array[$result->post_id]) && !in_array($url, $postmeta_array[$result->post_id])))
						$postmeta_array[ $result->post_id ][ $result->meta_key ]
							= $url;

						//list to check all external urls.
						if ( ! in_array( $url, $external_resources ) ) {
							$external_resources[] = $url;
						}

						//list to track those resource back to where they came from.
						$this->source_of_resource[ $url ] = $result->post_id;
					}
				}
			}
		}
		$this->queue += $this->nr_of_rows_in_one_run;

		$this->postmeta_with_external_resources = $postmeta_array;
		$this->external_resources        = $external_resources;
	}


	/**
	 * Check if this URL should be ignored
	 * Should be ignored if
	 * - show ignored URLs is false OR
	 * - the url is in the ignored list
	 *
	 */

	public function ignore( $url ) {
		$show_ignore_urls = get_option( "rsssl_show_ignore_urls" );
		$ssl_url     = str_replace( "http://", "https://", $url );
		$http_url     = str_replace( "https://", "http://", $url );

		//When ignored URLS is off, ignore will be true

		if ( ! $show_ignore_urls && in_array( $ssl_url, $this->ignored_urls )
		   || in_array( $http_url, $this->ignored_urls )
		   || in_array( $http_url, $this->safe_domains )
		) {

			return true;
		}

		return false;
	}

	/**
	 * check each item in the array to see if it can load over https, if no, adds it to the output array.
	 */

	private function find_blocked_resources( $external_resources ) {

		$blocked_urls = $this->blocked_resources;

		$start = $this->queue;
		$count = 0;
		for ( $i = $start; $i < count( $external_resources ); ++ $i ) {
			$this->queue = $i + 1;

			//sometimes indexes are removed as doubles, skip to next.
			if ( ! isset( $external_resources[ $i ] ) ) {
				continue;
			}
			$count ++;
			$url = $external_resources[ $i ];

			$ssl_url = str_replace( "http://", "https://", $url );

			if ( ! in_array( $url, $blocked_urls ) ) {
				$html = $this->get_contents( $ssl_url );
				//if the mixed content fixer is active, the url might be https.
				if ( $this->error_number != 0 ) {
					$blocked_urls[] = str_replace( "https://", "http://",
						$url );
				}
			}
			if ( $count > $this->nr_requests_in_one_run ) {
				break;
			}
		}

		$this->blocked_resources = $blocked_urls;

	}

	/**
	 *
	 * Links in these files can contain http links, if these domains can be loaded over https.
	 * Generates a list of files with urls that could not be loaded over https.
	 */

	private function search_files_for_urls() {
		$file_array = $this->file_array;

		$start = $this->queue;
		$count = 0;

		for ( $i = $start; $i < count( $file_array ); ++ $i ) {
			$this->queue = $i + 1;
			//sometimes indexes are removed as doubles, skip to next.
			if ( ! isset( $file_array[ $i ] ) ) {
				continue;
			}
			$count ++;

			$file = $file_array[ $i ];
			if ( file_exists( $file ) ) {
				$html = file_get_contents( $file );
				//search the files where blocked resources are used.
				foreach ( $this->blocked_resources as $url ) {
					if ( strpos( $html, $url ) !== false ) {
						if ( ! isset( $this->files_with_blocked_resources[ $file ] )
						   || ( isset( $this->files_with_blocked_resources[ $file ] )
						     && ! in_array( $url,
									$this->files_with_blocked_resources[ $file ] ) )
						) {
							$this->files_with_blocked_resources[ $file ][]
								= $url;
						}
						//by adding this one to a tracing list, we keep track of the urls that are accounted for.
						if ( ! in_array( $url, $this->traced_urls ) ) {
							$this->traced_urls[] = $url;
						}
					}
				}

				//search the files where external css or js is used.
				foreach (
					$this->external_css_js_with_mixed_content as $url => $value
				) {
					if ( strpos( $html, $url ) !== false ) {
						if ( ! isset( $this->files_with_external_css_js[ $file ] )
						   || ( isset( $this->files_with_external_css_js[ $file ] )
						     && ! in_array( $url,
									$this->files_with_external_css_js[ $file ] ) )
						) {
							$this->files_with_external_css_js[ $file ][] = $url;
						}
						//by adding this one to a tracing list, we keep track of the urls that are accounted for.
						if ( ! in_array( $url, $this->traced_urls ) ) {
							$this->traced_urls[] = $url;
						}
					}
				}
			}
			if ( $count > $this->nr_files_in_one_run ) {
				break;
			}
		}
	}

	/**
	 * get list of webpages on this site, only on per posttype, as we only need to check each template
	 */

	private function get_webpage_list() {
		$scan_type = get_option( "rsssl_scan_type" );
		$url_list = array();
		$url_list[] = home_url();
		if ( $scan_type != "home" ) {

			$menus = get_nav_menu_locations();
			foreach ( $menus as $location => $menu_id ) {
				$menu_items = wp_get_nav_menu_items( $menu_id );

				foreach ( (array) $menu_items as $key => $menu_item ) {
					//only insert url if on the same domain as homeurl
					if ( isset( $menu_item->url )
					   && strpos( $menu_item->url, home_url() ) !== false
					) {
						$url_list[] = $menu_item->url;
					}
				}
			}

			//also add an url from each post type that is used in this website.
			$args = array(
				'public' => true,
			);

			$post_types    = get_post_types( $args );
			$post_types_query = array();
			foreach ( $post_types as $post_type ) {
				$post_types_query[] = " post_type = '" . $post_type . "'";
			}

			$sql = implode( " OR ", $post_types_query );
			global $wpdb;
			$sql
				= "SELECT ID FROM $wpdb->posts where post_status='publish' and ("
				 . $sql . ") group by post_type";

			$results = $wpdb->get_results( $sql );

			foreach ( $results as $result ) {
				if ( ! in_array( get_permalink( $result->ID ),
					$url_list )
				) {
					$url_list[] = get_permalink( $result->ID );
				}
			}
		}

		return $url_list;
	}


	/**
	 * Create an array of all files we have to check in the plugins and theme directory.
	 */

	private function get_file_array() {
		$childtheme_dir = get_stylesheet_directory();
		$parenttheme_dir = get_template_directory();

		//$plugin_dir = dirname(dirname( __FILE__ ));

		$file_array = $this->get_filelist_from_dir( $childtheme_dir );
		//if parentthemedir and childtheme dir are different, check those as well
		if ( strcasecmp( $childtheme_dir, $parenttheme_dir ) == 0 ) {
			$file_array = array_merge( $file_array,
				$this->get_filelist_from_dir( $parenttheme_dir ) );
		}

		//$file_array = array_merge($file_array, $this->get_filelist_from_dir($plugin_dir));
		$this->file_array = array_unique( $file_array );
	}

	/**
   * Get dirname of uploads folder
	 * @return string
	 */
	public function uploads_dirname() {
		// defaults to uploads.
		$upload_dir_name = "uploads";
		if ( defined( 'UPLOADS' ) ) {
			$upload_dir_name = str_replace( trailingslashit( WP_CONTENT_DIR ),
				'', untrailingslashit( UPLOADS ) );
		}

		return $upload_dir_name;
	}

	public function get_path_to( $directory, $file ) {
		if ( $directory != "plugins" && $directory != "mu-plugins" && $directory != $this->uploads_dirname()
		   && $directory != "themes"
		) {
			return $file;
		}

		//find position within wp-content
		$needle = "wp-content/" . $directory . "/";

		$pos = strpos( $file, $needle );
		if ( $pos !== false ) {
			$file = substr( $file, $pos + strlen( $needle ) );
		}

		return "wp-content/" . $directory . "/" . $file;
	}

	/**
	 * Get a list of files from a directory, with the extensions as passed.
	 *
	 * @param string $path : path to directory to search in.
	 *
	 * @return array
	 */

	private function get_filelist_from_dir( $path ) {
		$filelist  = array();
		$extensions = array( "php" );
		if ( $handle = opendir( $path ) ) {
			while ( false !== ( $file = readdir( $handle ) ) ) {
				if ( $file != "." && $file != ".." ) {
					$file = $path . '/' . $file;
					$ext = strtolower( pathinfo( $file, PATHINFO_EXTENSION ) );

					//we also exclude backup files generated by really simple ssl, rsssl-bkp-
					if ( is_file( $file ) && in_array( $ext, $extensions )
					   && ( strpos( $file, "rsssl-bkp-" ) === false )
					) {
						$filelist[] = $file;
					} elseif ( is_dir( $file ) ) {
						if ( strpos( $file, "really-simple-ssl" ) === false ) {
							$filelist = array_merge( $filelist, $this->get_filelist_from_dir( $file) );
						}
					}
				}
			}
			closedir( $handle );
		}

		return $filelist;
	}

	/**
	 * These files are loaded in the website, but cannot be dynamically changed, so have to contain only https links.
	 * Input: array of js and css files, by url
	 * Output: array of js and css files, that contain http references.
	 */

	private function parse_for_http( $urls, $files_with_http ) {
		$url_pattern = '([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-]?)';
		$patterns  = array(
			'/url\([\'"]?\K(http:\/\/)' . $url_pattern . '/i',
			'/<link [^>].*?href=[\'"]\K(http:\/\/)' . $url_pattern . '/i',
			'/<meta property="og:image" .*?content=[\'"]\K(http:\/\/)'
			. $url_pattern . '/i',
			'/<(?:img|iframe)[^>].*?src=[\'"]\K(http:\/\/)' . $url_pattern
			. '/i',
			'/<script [^>]*?src=[\'"]\K(http:\/\/)' . $url_pattern . '/i',
		);

		//search for occurrence of links without https
		$start = $this->queue;
		$count = 0;
		for ( $i = $start; $i <= count( $urls ) + 1; ++ $i ) {
			$count ++;
			$this->queue = $i + 1;

			if ( ! isset( $urls[ $i ] ) ) {
				continue;
			}
			$url = $urls[ $i ];

			$file = $this->convert_url_to_path( $url );

			if ( ! file_exists( $file ) ) {
				continue;
			}
			$str = file_get_contents( $file );
			foreach ( $patterns as $pattern ) {
				if ( preg_match_all( $pattern, $str, $matches,
					PREG_PATTERN_ORDER )
				) {
					$this->traced_urls[] = $url;
					foreach ( $matches[1] as $key => $match ) {
						//matches[1][$key] is the first matching group, e.g http://
						//matches[2][$key] is the second matching group, e.g really-simple-ssl.com/image.jpg
						//if matches[2][$key] is empty, the result will be http://. We don't want this so continue
						if ( empty( $matches[2][ $key ] ) ) {
							continue;
						}
						$file_with_http = $matches[1][ $key ]
						         . $matches[2][ $key ];
						if ( ! isset( $files_with_http[ $url ] )
						   || ( isset( $files_with_http[ $url ] )
						     && ! in_array( $file_with_http,
									$files_with_http[ $url ] ) )
						) {
							$files_with_http[ $url ][] = $file_with_http;
						}
					}
				}
			}
			if ( $count > $this->nr_requests_in_one_run ) {
				break;
			}
		}

		return $files_with_http;
	}

	private function get_external_css_js_files() {
		//get not blocked urls
		$not_blocked_urls = array_diff( $this->external_resources,
			$this->blocked_resources );
		$result_arr    = array();
		foreach ( $not_blocked_urls as $url ) {
			if ( ( ( strpos( $url, ".js" ) !== false )
			    || ( strpos( $url, ".css" ) !== false ) )
			   && ! in_array( $url, $result_arr )
			) {

				$result_arr[] = $url;

			}
		}

		return $result_arr;
	}


	/**
	 *
	 * These files are loaded in the website, but cannot be dynamically changed, so have to contain only https links.
	 *
	 * Input: array of js and css files, by url
	 * Output: array of js and css files, that contain http references.
	 */

	private function parse_external_files_for_http( $urls, $files_with_http ) {

		$url_pattern = '([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-]?)';
		$patterns  = array(
			'/url\([\'"]?\K(http:\/\/)' . $url_pattern . '/i',
			'/<link [^>].*?href=[\'"]\K(http:\/\/)' . $url_pattern . '/i',
			'/<meta property="og:image" .*?content=[\'"]\K(http:\/\/)'
			. $url_pattern . '/i',
			'/<(?:img|iframe)[^>].*?src=[\'"]\K(http:\/\/)' . $url_pattern
			. '/i',
			'/<script [^>]*?src=[\'"]\K(http:\/\/)' . $url_pattern . '/i',
		);

		$start = $this->queue;
		$count = 0;
		for ( $i = $start; $i < count( $urls ); ++ $i ) {
			$this->queue = $i + 1;
			if ( ! isset( $urls[ $i ] ) ) {
				continue;
			}
			$count ++;
			$url = $urls[ $i ];
			$str = $this->get_contents( $url );
			if ( $this->error_number != 0 ) {
				continue;
			}
			foreach ( $patterns as $pattern ) {
				if ( preg_match_all( $pattern, $str, $matches,
					PREG_PATTERN_ORDER )
				) {
					$this->traced_urls[] = $url;
					foreach ( $matches[1] as $key => $match ) {
						if ( empty( $matches[2][ $key ] ) ) {
							continue;
						}
						$file_with_http      = $matches[1][ $key ]
						               . $matches[2][ $key ];
						$files_with_http[ $url ][] = $file_with_http;
					}
				}
			}

			if ( $count > $this->nr_requests_in_one_run ) {
				break;
			}
		}

		return $files_with_http;

	}

  /**
   * In: post_id INT post_id of wp_block
   * Out: post_id of any post that is using this wp block
   */

	public function get_post_using_this_block( $post_id ) {
		//look for <!-- wp:block {"ref":$post_id} /-->
		$wp_block_string = '<!-- wp:block {"ref":' . $post_id . '} /-->';

		$parent_post_id = false;

		global $wpdb;

		$sql = "select * from " . $wpdb->prefix
		    . "posts where post_content like '" . $wp_block_string . "'";

		$posts = $wpdb->get_results( $sql );
		if ( ! empty( $posts ) ) {
			$parent_post_id = $posts[0]->ID;
		}

		return $parent_post_id;
	}


	/**
	 * convert any url to the corresponding absolute path.
	 */

	private function convert_url_to_path( $url ) {
		//$url can start with http, https, or //
		//home_url can start with http, or https
		if ( strpos( $url, "//" ) === 0 ) {
			$url = "http:" . $url;
		}
		$url = str_replace( "https://", "http://", $url );
		$wp_root_dir = $this->get_ABSPATH();
		$wp_root_url = str_replace( "https://", "http://", home_url() );

		return str_replace( $wp_root_url, $wp_root_dir, $url );
	}

	private function parse_for_css_js_and_external_files( $webpages ) {
		$css_js_files    = $this->css_js_files;
		$external_resources = $this->external_resources;
		$css_js_patterns  = array(
			"/(http:\/\/|https:\/\/|\/\/)([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-]?\.js)(?:((\?.*[\'|\"])|['|\"]))/",
			//js url pattern. after .js can be a string if it starts with ?
			"/(http:\/\/|https:\/\/|\/\/)([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-]?\.css)(?:((\?.*[\'|\"])|['|\"]))/",
			//css url pattern after .css can be a string if it starts with ?
		);
		$start       = $this->queue;
		$count       = 0;
		$nr_of_pages    = count( $webpages );

		for ( $i = $start; $i < $nr_of_pages; ++ $i ) {
			$this->queue = $i + 1;

			//sometimes indexes are removed as doubles, skip to next.
			if ( ! isset( $webpages[ $i ] ) ) {
				continue;
			}
			$count ++;
			$url    = $webpages[ $i ];
			$local_only = true;
			$html    = $this->get_contents( $url, $local_only );
			//first, look up css and js files.
			foreach ( $css_js_patterns as $pattern ) {
				if ( preg_match_all( $pattern, $html, $matches,
					PREG_PATTERN_ORDER )
				) {
					foreach ( $matches[1] as $key => $match ) {
						if ( empty( $matches[2][ $key ] ) ) {
							continue;
						}
						$css_js_file = $matches[1][ $key ]
						        . $matches[2][ $key ];
						//we ignore plugin files, as these can be expected to behave
						if ( ! in_array( $css_js_file, $css_js_files )
						   && ! $this->is_plugin_file( $css_js_file )
						   && ! $this->is_wp_core_file( $css_js_file )
						) {
							$css_js_files[]              = $css_js_file;
							$this->source_of_resource[ $css_js_file ] = $url;
						}
					}
				}
			}

			//now, look up external resources.
			foreach ( $this->external_domain_patterns() as $pattern ) {
				if ( preg_match_all( $pattern, $html, $matches,
					PREG_PATTERN_ORDER )
				) {
					foreach ( $matches[1] as $key => $match ) {
						if ( empty( $matches[2][ $key ] ) ) {
							continue;
						}
						$external_resource = $matches[1][ $key ]
						           . $matches[2][ $key ];
						if ( ! in_array( $external_resource,
							$external_resources )
						) {
							$external_resources[] = $external_resource;
							$this->source_of_resource[ $external_resource ]
							           = $url;
						}
					}
				}
			}

			if ( $count > $this->nr_requests_in_one_run ) {
				break;
			}
		}

		//put all css and js files on external urls in separate array
		foreach ( $css_js_files as $key => $file ) {

			$home_url = str_replace( array( "https://", "http://" ), "",
				home_url() );
			if ( strpos( $file, $home_url ) === false ) {
				unset( $css_js_files[ $key ] );
				$css_js_files = array_values( $css_js_files );
				if ( ! in_array( $file, $external_resources ) ) {
					$external_resources[] = $file;
				}
			}
		}

		$this->external_resources = $external_resources;
		$this->css_js_files    = $css_js_files;

	}


	/*
  * Check if a url is located in this site's plugins folder
  *
  * */

	public function is_plugin_file( $file ) {
		$plugins_url
			     = plugins_url(); //e.g. https://domain.com/wp-content/plugins
		$plugins_url = str_replace( array( "https://", "http://" ), "",
			$plugins_url );

		if ( strpos( $file, $plugins_url ) === false ) {
			return false;
		}

		return true;

	}

  /**
  * Check if a url is located in this site's wp core files
  *
  * */

	public function is_wp_core_file( $file ) {
		$wp_includes_url = includes_url();
		$wp_includes_url = str_replace( array( "https://", "http://" ), "",
			$wp_includes_url );

		$wp_admin_url = admin_url();
		$wp_admin_url = str_replace( array( "https://", "http://" ), "",
			$wp_admin_url );


		if ( strpos( $file, $wp_includes_url ) === false
		   && strpos( $file, $wp_admin_url ) === false
		) {
			return false;
		}

		return true;

	}

	/**
	 * Get the absolute path the the www directory of this site, where .htaccess lives.
	 *
	 * @since 1.0
	 *
	 * @access public
	 *
	 */

	public function get_ABSPATH() {
		$path = ABSPATH;
		if ( $this->is_subdirectory_install() ) {
			$siteUrl = site_url();
			$homeUrl = home_url();
			$diff  = str_replace( $homeUrl, "", $siteUrl );
			$diff  = trim( $diff, "/" );
			$pos   = strrpos( $path, $diff );
			if ( $pos !== false ) {
				$path = substr_replace( $path, "", $pos, strlen( $diff ) );
				$path = trim( $path, "/" );
				$path = "/" . $path . "/";
			}
		}

		return $path;
	}

	/**
	 * Find if this wordpress installation is installed in a subdirectory
	 *
	 * @since 2.0
	 *
	 * @access protected
	 *
	 */

	protected function is_subdirectory_install() {
		if ( strlen( site_url() ) > strlen( home_url() ) ) {
			return true;
		}

		return false;
	}

	/*
  return a pattern with which all references to external domains can be found.
*/

	private function external_domain_patterns( $url_only = false ) {
		$url_pattern = '([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-]?)(?:[\'|\"])';
		$image_pattern
		       = '([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-]?[.jpg|.gif|.jpeg|.png|.svg])(?:((\?.*[\'|"])|[\'|"]))';
		$script_pattern
		       = '([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-]?[.js])(?:((\?.*[\'|\"])|[\'|\"]))';
		$style_pattern
		       = '([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-]?[.css])(?:((\?.*[\'|\"])|[\'|\"]))';

		$patterns = array();

		$domain = preg_quote( str_replace( array( "http://", "https://" ), "",
			home_url() ), "/" );
		if ( ! $url_only ) {
			$patterns = array_merge( $patterns, array(
				'/url\([\'"]?\K(http:\/\/|https:\/\/)(?!(' . $domain . '))'
				. $image_pattern . '/i',
				'/<link[^>].*?href=[\'"]\K(http:\/\/|https:\/\/)(?!' . $domain
				. ')' . $style_pattern . '/i',
				'/<meta property="og:image" .*?content=[\'"]\K(http:\/\/|https:\/\/)(?!'
				. $domain . ')' . $image_pattern . '/i',
				'/<(?:img)[^>].*?src=[\'"]\K(http:\/\/|https:\/\/)(?!' . $domain
				. ')' . $image_pattern . '/i',
				'/<(?:iframe)[^>].*?src=[\'"]\K(http:\/\/|https:\/\/)(?!'
				. $domain . ')' . $url_pattern . '/i',
				'/<script[^>]*?src=[\'"]\K(http:\/\/|https:\/\/)(?!' . $domain
				. ')' . $script_pattern . '/i',
				'/<form[^>]*?action=[\'"]\K(http:\/\/|https:\/\/)(?!' . $domain
				. ')' . $url_pattern . '/i',
				'/"url":"\K(http:\/\/|https:\/\/)(?!' . $domain . ')'
				. $image_pattern . '/i',
			) );

		} else {
			$url_pattern = '([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-]?)';
			$patterns  = array_merge( $patterns, array(
				'/\K(http:\/\/|https:\/\/)(?!(' . $domain . '))' . $url_pattern
				. '/i',
			) );
		}

		return $patterns;
	}

	//make distinction between $src on own domain and $src on remote domain
	//remote domain resources need to be downloaded.
	//compare non www url.
	public function is_third_party($src){
		$home_url_no_www = str_replace( "https://", "http://", str_replace( "://www.", "://", home_url() ) );
		$src_no_www   = str_replace( "://www.", "://", $src );
		if ( strpos( $src_no_www, $home_url_no_www ) === false ) {
			return true;
		} else {
			return  false;
		}
	}

	/**
	 * Get type of a file by path
	 * @param string $file
	 *
	 * @return string
	 */
	public function get_file_type($file){
		if ( strpos( $file, "themes" ) !== false ) {
			return "themes";
		} elseif ( strpos( $file, "mu-plugins" ) !== false ) {
			return "mu-plugins";
		} elseif ( strpos( $file, "plugins" ) !== false ) {
			return "plugins";
		} elseif ( strpos( $file, "uploads" ) !== false ) {
			return $this->uploads_dirname();
		} elseif ( strpos( $file, "cache" ) !== false ) {
			return $this->uploads_dirname();
		} else {
			return "na";
		}
	}

	/**
	 * Get description of path based on location
	 *
	 * @param string $file
	 *
	 * @return string
	 */
	public function get_file_type_description($file){
		if ( strpos( $file, "themes" ) !== false ) {
			return __( "theme file", "really-simple-ssl-pro" );
		} elseif ( strpos( $file, "mu-plugins" ) !== false ) {
			return __( "mu plugin file", "really-simple-ssl-pro" );
		} elseif ( strpos( $file, "plugins" ) !== false ) {
			return __( "plugin file", "really-simple-ssl-pro" );
		} elseif ( strpos( $file, "uploads" ) !== false ) {
			return __( "uploads file, possibly generated by plugin or theme", "really-simple-ssl-pro" );
		} elseif ( strpos( $file, "cache" ) !== false ) {
			return __( "cached file, deactivate cache to see the actual source", "really-simple-ssl-pro" );
		} else {
			return __( "file", "really-simple-ssl-pro" );
		}
	}

	/**
	 *   Generate the result output for the scan
	 *
	 */

	public function get() {
		$data = [];
		//results id is used for removal of rows after successful fix.
		$results_id = 0;
		$this->load_results();
		$mixed_content_detected = false;
		$copyright_fix_warning = [__( "Downloading files from other websites can cause serious copyright issues! It is always illegal to use images, files, or any copyright protected material on your own site without the consent of the copyrightholder. Please ask the copyrightholder for permission. Use this function at your own risk.", "really-simple-ssl-pro" ),
		                         __( "This downloads the file from the domain without SSL, inserts it into WP media, and changes the URL to the new URL.", "really-simple-ssl-pro" )];

		/**
		 *    Blocked urls
		 *    check if we have urls that can't load over https .
		 */

		if ( ( count( $this->files_with_blocked_resources ) > 0 )
		     || count( $this->posts_with_blocked_resources ) > 0
		     || count( $this->postmeta_with_blocked_resources ) > 0
		     || count( $this->css_js_with_mixed_content ) > 0
		     || count( $this->external_css_js_with_mixed_content ) > 0
		) {
			$mixed_content_detected = true;
		}

		foreach ( $this->files_with_blocked_resources as $file => $urls ) {
			$item_title = $this->get_file_type_description($file);
			$file_type = $this->get_file_type($file);
			foreach ( $urls as $blocked_url ) {
				$results_id ++;
				$modal_explanation = [sprintf( __( "Blocked URL: %s", "really-simple-ssl-pro" ), $blocked_url ), __( "You can edit the source file manually by pressing the edit button.", "really-simple-ssl-pro" )];
				$data[] = [
					'id'               => $results_id,
					'ignored'          => $this->ignore($blocked_url),
					'type'             => 'blocked_url',
					'description'      => sprintf( __( "Mixed content in PHP file in %s", "really-simple-ssl-pro" ), $item_title ),
					'blocked_url'      => $blocked_url,
					'location'         => $this->get_path_to( $file_type, $file ),
					'details'    => [
						'title'       => __("Details", "really-simple-ssl"),
						'description' => $modal_explanation,
						'view'        => $this->get_path_to( $file_type, $file ),
						'edit'        => $this->get_edit_link( $file ),
						'help'        => "https://really-simple-ssl.com/knowledge-base/fix-blocked-resources-content-files",
						'action'      => 'ignore_url',
					],

				];
			}
		}

		/**
		 *    CSS and JS with mixed content
		 *    List CSS and JS files that contain http links
		 *
		 */
//		$this->css_js_with_mixed_content = [
//			'https://really-simple-ssl.com/wp-content/themes/theme/css.css' => ['https://nu.nl', 'http://complianz.io']
//		];
		foreach ( $this->css_js_with_mixed_content as $file => $mixed_resources ) {
			$item_title = $this->get_file_type_description($file);
			$file_type = $this->get_file_type($file);
			foreach ( $mixed_resources as $blocked_url ) {
				$type = $this->is_third_party($blocked_url) ? "css_js_thirdparty" : "css_js";
				$modal_explanation = [sprintf( __( "Blocked URL: %s", "really-simple-ssl-pro" ), $blocked_url )];
				$modal_explanation[] = $file_type === 'mu-plugins' ? __("Can be fixed manually by editing the respective mu-plugin file in the /wp-content/mu-plugins/ directory.", "really-simple-ssl-pro" ) : __( "Can be fixed automatically by pressing the Fix button. If fixing fails, the source file can be edited manually by pressing the Edit button.", "really-simple-ssl-pro" );
				$results_id ++;
				$data[] = [
					'id'               => $results_id,
					'ignored'          => $this->ignore($blocked_url),
					'description'      => sprintf(__("Mixed content in %s", "really-simple-ssl-pro"), $item_title),
					'type'             => $type,
					'blocked_url'      => $blocked_url,
					'location'         => $this->get_path_to( $file_type, $file ),
					'details'    => [
						'title'       => __("Details", "really-simple-ssl"),
						'description' => $modal_explanation,
						'view'        => $this->get_path_to( $file_type, $file ),
						'edit'        =>  $this->get_edit_link( $file ),
						'help'        => "https://really-simple-ssl.com/knowledge-base/fix-css-and-js-files-with-mixed-content",
						'action'      => 'ignore_url',
					],
					'fix'    => [
						'title'       => __( "Import and insert file", "really-simple-ssl-pro" ),
						'subtitle'    => __( "Copyright warning!", "really-simple-ssl-pro" ),
						'description' => $copyright_fix_warning,
						'action'      => $this->is_third_party( $blocked_url ) ? "fix_cssjs" : "fix_file",
						'path'        => $this->get_path_to( $file_type, $file ),
					]
				];
			}
		}

		/**
		 *    CSS and JS from other domains with mixed content
		 *    List CSS and JS files on other domains that contain http links
		 *
		 */

		$external_css_js_with_mixed_content = $this->external_css_js_with_mixed_content;
		foreach ( $external_css_js_with_mixed_content as $remote_url => $blocked_urls ) {
			foreach ( $blocked_urls as $blocked_url ) {
				$results_id ++;
				$modal_explanation = [__( "Cannot be fixed automatically, as the mixed content is coming from an external domain. Contact the owner of the domain to update the CSS/JS file", "really-simple-ssl-pro" )];
				$modal_explanation[] = sprintf( __( "Mixed content resources: %s", "really-simple-ssl-pro" ), $blocked_url );
				$data[] = [
					'id'               => $results_id,
					'ignored'          => $this->ignore($blocked_url),
					'type'             => 'css_js_other_domains',
					'description'      => __( "Mixed content in CSS/JS file from other domain", "really-simple-ssl-pro" ),
					'blocked_url'      => $blocked_url,
					'location'         => $remote_url,
					'details'   => [
						'title'       => __("Details", "really-simple-ssl"),
						'description' => $modal_explanation,
						'view'        => '',
						'edit'        => '',
						'help'        => "https://really-simple-ssl.com/knowledge-base/fix-css-js-files-mixed-content-domains/",
						'action'      => 'ignore_url',
					]
				];
			}
		}

		/**
		 *    Posts with blocked resources
		 *    List posts with images or resources that could not load over https://
		 *
		 */

		foreach ( $this->posts_with_blocked_resources as $post_id ) {
			$blocked_urls = $this->posts_with_external_resources[ $post_id ];
			if ( get_post_type( $post_id ) === "wp_block" ) {
				$post_id = $this->get_post_using_this_block( $post_id );
			}
			foreach ( $blocked_urls as $blocked_url ) {
				if ( ! in_array( $blocked_url, $this->blocked_resources ) ) {
					continue;
				}
				$results_id ++;
				$explanation = [sprintf( __( "Blocked URL: %s", "really-simple-ssl-pro" ), $blocked_url ),
				                __( "Mixed content found in in a post. Can be fixed automatically by pressing the fix button. Pressing the edit button allows you to update the link in the post manually.", "really-simple-ssl-pro" )];
				$data[] = [
					'id'               => $results_id,
					'ignored'          => $this->ignore($blocked_url),
					'type'             => 'posts',
					'description'      => sprintf(__( "Mixed content in post: %s", "really-simple-ssl-pro" ), get_the_title( $post_id ) ),
					'blocked_url'      => $blocked_url,
					'location'         => get_permalink($post_id),
					'details'    => [
						'title'       => __("Details", "really-simple-ssl"),
						'description' => $explanation,
						'view'        => '',
						'edit'        => get_admin_url( null, 'post.php?post=' . $post_id . '&action=edit' ),
						'help'        => "https://really-simple-ssl.com/fix-posts-with-blocked-resources-domains-without-ssl-certificate/",
						'action'      => 'ignore_url'
					],
					'fix'    => [
						'title'       => __( "Import and insert file", "really-simple-ssl-pro" ),
						'subtitle'    => __( "Copyright warning!", "really-simple-ssl-pro" ),
						'description' => $copyright_fix_warning,
						'action'      => 'fix_post',
						'post_id'     => $post_id,
					]
				];
			}
		}

		foreach ( $this->postmeta_with_blocked_resources as $post_id ) {
			$blocked_urls = $this->postmeta_with_external_resources[ $post_id ];
			foreach ( $blocked_urls as $meta_key => $blocked_url ) {
				if ( ! in_array( $blocked_url, $this->blocked_resources ) ) {
					continue;
				}
				$results_id++;
				//check if item is coming from an iframe
				$description = $this->source_is_iframe( $post_id, $blocked_url, $meta_key ) ? __( "iFrame in the wp_postmeta database table", "really-simple-ssl-pro" ) : __( "Mixed content in the postmeta table", "really-simple-ssl-pro" );
				$modal_explanation = [sprintf( __( "Blocked URL: %s", "really-simple-ssl-pro" ), $blocked_url ),
				                __( "Mixed content from a postmeta table in your database. Usually won't cause any mixed content on the front-end. Check the post if it causes mixed content. If so, the link can be replace directly in the database.", "really-simple-ssl-pro" )];
				$data[] = [
					'id'               => $results_id,
					'ignored'          => $this->ignore($blocked_url),
					'type'             => 'postmeta',
					'description'      => $description,
					'blocked_url'      => $blocked_url,
					'location'         => get_permalink($post_id),
					'meta_key'         => $meta_key,
					'details'    => [
						'title'       => __("Details", "really-simple-ssl"),
						'description' => $modal_explanation,
						'view'        => get_permalink($post_id),
						'edit'        => get_admin_url( null, 'post.php?post=' . $post_id . '&action=edit' ),
						'help'        => "https://really-simple-ssl.com/knowledge-base/fix-blocked-resources-content-postmeta",
						'action'      => 'ignore_url'
					],
					'fix'    => [
						'title'       => __( "Import and insert file", "really-simple-ssl-pro" ),
						'subtitle'    => __( "Copyright warning!", "really-simple-ssl-pro" ),
						'description' => $copyright_fix_warning,
						'action'      => 'fix_postmeta',
						'post_id'     => $post_id,
					]
				];
			}
		}

		/**
		 *    Widgets with blocked resources
		 *    List widgets with images or resources that could not load over https://
		 *
		 */

		foreach ( $this->widgets_with_blocked_resources as $widget_name ) {
			$blocked_urls = $this->widgets_with_external_resources[ $widget_name ];
			foreach ( $blocked_urls as $blocked_url ) {
				if ( ! in_array( $blocked_url, $this->blocked_resources ) ) {
					continue;
				}
				$widget_data = $this->get_widget_data( $widget_name );
				$widget_area = $this->get_widget_area( $widget_name );
				$item_title = $this->get_widget_title( $widget_area );
				$file = sprintf( __("Widget area \"%s\"", "really-simple-ssl-pro" ), $item_title);
				if (isset( $widget_data["title"]) && strlen( $widget_data["title"])>0) {
					$file .= ': '. $widget_data["title"];
				}
				$results_id++;
				$modal_explanation = [sprintf( __( "Blocked URL: %s", "really-simple-ssl-pro" ), $blocked_url ), __( "Mixed content found in a widget. Press the edit link to edit the widget manually.", "really-simple-ssl-pro" )];
				$data[] = [
					'id'               => $results_id,
					'ignored'          => $this->ignore($blocked_url),
					'type'             => 'widgets',
					'description'      => __( "Widget with mixed content", "really-simple-ssl-pro" ).': '.$item_title,
					'blocked_url'      => $blocked_url,
					'location'         => $file,
					'details'   => [
						'title'       => __("Details", "really-simple-ssl"),
						'description' => $modal_explanation,
						'view'        => '',
						'edit'        => get_admin_url( null, '/widgets.php' ),
						'help'        => "https://really-simple-ssl.com/knowledge-base/locating-mixed-content-in-widgets/",
						'action'      => 'ignore_url'
					],
					'fix'    => [
						'title'    => __( "Import and insert file", "really-simple-ssl-pro" ),
						'subtitle' => __( "Copyright warning!", "really-simple-ssl-pro" ),
						'description' => $copyright_fix_warning,
						'action' => 'fix_widget',
						'widget_id' => $widget_name,
					]
				];
			}
		}

		$progress = get_option( 'rsssl_progress' );
		if ( $progress > 0 ){
			$this->scan_completed_no_errors = !$mixed_content_detected ? "COMPLETED" : "ERRORS";
			$this->save_results();
		}
		$this->last_scan_time = get_option( 'rsssl_last_scan_time');
		$this->scan_completed_no_errors = get_option( 'rsssl_scan_completed_no_errors', 'NEVER' );
		$action = get_option( 'rsssl_current_action' );
		$state = get_option( "rsssl_scan_active" );
		return [
				'completed_status'=>strtolower($this->scan_completed_no_errors()),
		        'data' => $data,
		        'progress' => $progress,
		        'state' => $state,
		        'action'=>$action,
		        'nonce' => wp_create_nonce( 'fix_mixed_content' ) ];
	}

	/**
	 * Load the scan data
	 *
	 * @param bool $reset
	 */

	public function load_results( $reset = false ) {
//		delete_transient( 'rsssl_scan' );
		$this->scan_completed_no_errors = get_option( 'rsssl_scan_completed_no_errors', 'NEVER' );
		$this->last_scan_time = get_option( 'rsssl_last_scan_time', __( "Never", "really-simple-ssl-pro" ) );
		$options       = get_transient( 'rsssl_scan' );
		if ( isset( $options ) ) {
			if ( ! $reset ) {
				$this->css_js_files = $options['css_js_files'] ?? array();
				$this->queue = $options['queue'] ?? array();
				$this->css_js_with_mixed_content = $options['css_js_with_mixed_content'] ?? array();
				$this->webpages = $options['webpages'] ?? array();
				$this->external_resources = $options['external_resources'] ?? array();
				$this->file_array = $options['file_array'] ?? array();
				$this->files_with_blocked_resources = $options['files_with_blocked_resources'] ?? array();
				$this->posts_with_blocked_resources = $options['posts_with_blocked_resources'] ?? array();
				$this->postmeta_with_blocked_resources = $options['postmeta_with_blocked_resources'] ?? array();
				$this->blocked_resources = $options['blocked_resources'] ?? array();
				$this->traced_urls = $options['traced_urls'] ?? array();
				$this->source_of_resource = $options['source_of_resource'] ?? array();
				$this->external_css_js_with_mixed_content = $options['external_css_js_with_mixed_content'] ?? array();
				$this->files_with_css_js = $options['files_with_css_js'] ?? array();
				$this->files_with_external_css_js = $options['files_with_external_css_js'] ?? array();
				$this->posts_with_external_resources = $options['posts_with_external_resources'] ?? array();
				$this->postmeta_with_external_resources = $options['postmeta_with_external_resources'] ?? array();
				$this->widgets_with_external_resources = $options['widgets_with_external_resources'] ?? array();
				$this->widgets_with_blocked_resources = $options['widgets_with_blocked_resources'] ?? array();
			}

			$this->ignored_urls = $options['ignored_urls'] ?? array();
			if ( ! in_array( $this->safe_domains[0], $this->ignored_urls ) ) {
				$this->ignored_urls = array_merge( $this->safe_domains, $this->ignored_urls );
			}
		}
	}

	/**
	 * Save the results
	 */

	public function save_results() {
		//do not save when we're not scanning
		if ( isset( $_POST['rsssl_no_scan'] ) ) {
			return;
		}

		$options = array(
			'css_js_files'                       => $this->css_js_files,
			'queue'                              => $this->queue,
			'css_js_with_mixed_content'          => $this->css_js_with_mixed_content,
			'webpages'                           => $this->webpages,
			'external_resources'                 => $this->external_resources,
			'blocked_resources'                  => $this->blocked_resources,
			'file_array'                         => $this->file_array,
			'files_with_blocked_resources'       => $this->files_with_blocked_resources,
			'posts_with_blocked_resources'       => $this->posts_with_blocked_resources,
			'postmeta_with_blocked_resources'    => $this->postmeta_with_blocked_resources,
			'traced_urls'                        => $this->traced_urls,
			'source_of_resource'                 => $this->source_of_resource,
			'scan_completed_no_errors'           => $this->scan_completed_no_errors,
			'external_css_js_with_mixed_content' => $this->external_css_js_with_mixed_content,
			'files_with_css_js'                  => $this->files_with_css_js,
			'files_with_external_css_js'         => $this->files_with_external_css_js,
			'posts_with_external_resources'      => $this->posts_with_external_resources,
			'postmeta_with_external_resources'   => $this->postmeta_with_external_resources,
			'ignored_urls'                       => $this->ignored_urls,
			'widgets_with_external_resources'    => $this->widgets_with_external_resources,
			'widgets_with_blocked_resources'     => $this->widgets_with_blocked_resources,
		);

		update_option( 'rsssl_scan_completed_no_errors', $this->scan_completed_no_errors, false );
		update_option( 'rsssl_last_scan_time', time(), false );
		set_transient( 'rsssl_scan', $options, WEEK_IN_SECONDS );
	}

	/**
	 * Calculate progress
	 *
	 * @param $array_count
	 * @param $queue_position
	 * @param $total
	 * @param $iteration
	 *
	 * @return float|int
	 */

	private function calculate_queue_progress(
		$array_count, $queue_position, $total, $iteration
	) {
		$iteration   = (int) $iteration;
		$queue_position = (int) $queue_position;
		$total     = (int) $total;
		$array_count  = (int) $array_count;
		//prevent division by zero
		$array_count = ( $array_count == 0 ) ? 1 : $array_count;
		$total    = ( $total == 0 ) ? 1 : $total;
		//queue can never be larger then array count
		$queue_position = ( $queue_position > $array_count ) ? $array_count : $queue_position;
		return ( ( $iteration / $total ) + ( ( $queue_position / $array_count ) / $total ) ) * 100;
	}

	private function still_in_queue( $array_count ) {
		$in_queue = true;
		//if array is empty, or the queue is same as array minus one, we are not in queue anymore
		if ( $this->queue >= $array_count || $array_count == 0 ) {
			$in_queue  = false;
			$this->queue = 0;
		}

		return $in_queue;
	}

	/**
   * Get error data for completed scan
	 * @return mixed|string|void
	 */
	public function scan_completed_no_errors() {
		$this->scan_completed_no_errors = get_option( 'rsssl_scan_completed_no_errors', 'NEVER' );

		return $this->scan_completed_no_errors;
	}

	/**
   * Get edit link for plugins or themes
	 * @param $file
	 *
	 * @return bool|string
	 */
	public function get_edit_link( $file ) {
		if ( defined( 'DISALLOW_FILE_EDIT' ) && DISALLOW_FILE_EDIT ) {
			return 'FILE_EDIT_BLOCKED';
		}
		$edit_link = false;
		if ( stripos( $file, "themes" ) !== false ) {
			$themes = wp_get_themes();
			foreach ( $themes as $theme ) {
				$template = "/" . $theme->template . "/";
				if ( stripos( $file, $template ) !== false ) {
					$filename = substr( $file,
						strrpos( $file, $template ) + strlen( $template ) );
					$filename = trim( $filename, "/" );
					$edit_link = "theme-editor.php?file=" . $filename
					       . "&theme=" . $theme->template;
					break;
				}
			}
		}

		if ( stristr( $file, "plugins" ) ) {
			$plugins = get_plugins();
			foreach ( $plugins as $plugin_dir => $plugin ) {
				$plugin_folder = "/" . dirname( $plugin_dir ) . "/";
				if ( stristr( $file, $plugin_folder ) ) {
					$filename = substr( $file,
						strrpos( $file, $plugin_folder ) );
					$filename = trim( $filename, "/" );
					$edit_link = "plugin-editor.php?file=" . $filename
					       . "&plugin=" . $plugin_dir;
					break;
				}
			}
		}

		return $edit_link;

	}

	/**
  * recursive arraysearch function, that searches for both key and value.
  */

	private function in_array_r( $needle, $haystack ) {
		foreach ( $haystack as $key => $value ) {
			if ( ( $key === $needle ) || ( $value === $needle )
			   || ( is_array( $value )
			     && $this->in_array_r( $needle, $value ) )
			) {
				return true;
			}
		}
		return false;
	}

	/**
	 * Handles any errors as the result of trying to open a https page when there may be no ssl.
	 *
	 * @since 2.0
	 *
	 * @access public
	 *
	 */

	private function custom_error_handling(
		$errno, $errstr, $errfile, $errline, array $errcontext
	) {
		$this->error_number = $errno;
	}

	/**
  * retrieves the content of an url
  * If a redirection is in place, the new url serves as input for this function
  * max 5 iterations
  *
  * set local only to true, if no external urls should be followed.
  *
  */

	public function get_contents( $url, $local_only = false ) {
		//if url is protocol independent, (//) get contents might not work.
		if ( strpos( $url, "//" ) === 0 ) {
			$url = "https:" . $url;
		}

		$home_url = str_replace( array( "https://", "http://" ), "",
			site_url() );
		if ( strpos( $url, $home_url ) !== false ) {
			$url = add_query_arg( 'rsssl_scan_request', '1', $url );
		}

		$response   = wp_remote_get( $url );
		$filecontents = "";

		if ( is_array( $response ) ) {
			$status    = wp_remote_retrieve_response_code( $response );
			$filecontents = wp_remote_retrieve_body( $response );
		}

		if ( is_wp_error( $response ) ) {
			$this->error_number = "404";
		} else {
			$this->error_number = 0;
		}

		return $filecontents;
	}

	/**
   *
   * iframe can be found in posts, postmeta
   * Check if this url is used in an iframe
   *
   */

	public function source_is_iframe( $post_id, $url, $meta_key = false ) {
		//get contents of postmeta
		if ( ! empty( $meta_key ) ) {
			$content = get_post_meta( $post_id, $meta_key, true );
		} else {
			//get contents of post
			$post  = get_post( $post_id );
			$content = $post->post_content;
		}
		//iFrame pattern
		$pattern
			= '/<(?:iframe)[^>].*?src=[\'"]\K(http:\/\/|https:\/\/)()([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-]?)(?:[\'|\"])/i';

		//if match return true
		if ( preg_match_all( $pattern, $content, $matches,
			PREG_PATTERN_ORDER )
		) {
			return true;
		}

		return false;
	}

	public function roll_back_modal() {
		$args = array(
			'title'    => __( "Roll back changes made to your files", "really-simple-ssl-pro" ),
			'subtitle' => __( "Copyright warning!", "really-simple-ssl-pro" ),
			'id'       => 'roll-back-modal',
			'content'  => array(
				__( "This will put the files back that were changed by the fix option in Really Simple SSL Pro.",
					"really-simple-ssl-pro" ),
				__( "Please note that any changes you have made since to your current files, will be lost.",
					"really-simple-ssl-pro" ),
			),
			'buttons'  => array(
				1 => array(
					'text'  => __( 'Restore files', 'really-simple-ssl-pro' ),
					'id'    => 'start-roll-back',
					'class' => 'button-primary',
					'type'  => 'data',
					'nonce' => wp_create_nonce( 'fix_mixed_content' ),
				),
			),
		);

       // return new rsssl_modal( $args );

	}

}//class closure
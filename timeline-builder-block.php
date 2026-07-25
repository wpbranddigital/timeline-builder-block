<?php
/**
 * Plugin Name:       Timeline Builder Block
 * Plugin URI:        https://wordpress.org/plugins/timeline-builder-block/
 * Description:       A native Gutenberg block to build beautiful, responsive animated timelines.
 * Version:           1.0.0
 * Requires at least: 6.5
 * Requires PHP:      7.4
 * Author:            WPBrand Digital 
 * Author URI:        https://wpbranddigital.org
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       timeline-builder-block
 *
 * @package TimelineBuilderBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

define( 'TIMELINE_BUILDER_BLOCK_VERSION', '1.0.0' );
define( 'TIMELINE_BUILDER_BLOCK_DIR', plugin_dir_path( __FILE__ ) );
define( 'TIMELINE_BUILDER_BLOCK_URL', plugin_dir_url( __FILE__ ) );

/**
 * Register the block using the metadata loaded from block.json.
 *
 * @return void
 */
function timeline_builder_block_init() {
	register_block_type( TIMELINE_BUILDER_BLOCK_DIR . 'build' );
}
add_action( 'init', 'timeline_builder_block_init' );

/**
 * Bootstrap the admin dashboard.
 *
 * @return void
 */
function timeline_builder_block_admin() {
	if ( ! is_admin() ) {
		return;
	}

	require_once TIMELINE_BUILDER_BLOCK_DIR . 'includes/class-admin-dashboard.php';
	new Timeline_Builder_Block_Admin_Dashboard();
}
add_action( 'plugins_loaded', 'timeline_builder_block_admin' );

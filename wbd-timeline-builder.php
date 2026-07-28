<?php
/**
 * Plugin Name:       WBD Timeline Builder
 * Plugin URI:        https://wordpress.org/plugins/wbd-timeline-builder/
 * Description:       A native Gutenberg block to build beautiful, responsive animated timelines.
 * Version:           1.0.1
 * Requires at least: 6.5
 * Requires PHP:      7.4
 * Author:            WPBrand Digital
 * Author URI:        https://wpbranddigital.org
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       wbd-timeline-builder
 *
 * @package WBDTimelineBuilder
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

define( 'WBD_TIMELINE_BUILDER_VERSION', '1.0.1' );
define( 'WBD_TIMELINE_BUILDER_DIR', plugin_dir_path( __FILE__ ) );
define( 'WBD_TIMELINE_BUILDER_URL', plugin_dir_url( __FILE__ ) );

// Backwards compatibility constants
if ( ! defined( 'TIMELINE_BUILDER_BLOCK_VERSION' ) ) {
	define( 'TIMELINE_BUILDER_BLOCK_VERSION', WBD_TIMELINE_BUILDER_VERSION );
}
if ( ! defined( 'TIMELINE_BUILDER_BLOCK_DIR' ) ) {
	define( 'TIMELINE_BUILDER_BLOCK_DIR', WBD_TIMELINE_BUILDER_DIR );
}
if ( ! defined( 'TIMELINE_BUILDER_BLOCK_URL' ) ) {
	define( 'TIMELINE_BUILDER_BLOCK_URL', WBD_TIMELINE_BUILDER_URL );
}

/**
 * Register the block using the metadata loaded from block.json.
 *
 * @return void
 */
function wbd_timeline_builder_init() {
	register_block_type( WBD_TIMELINE_BUILDER_DIR . 'build' );
}
add_action( 'init', 'wbd_timeline_builder_init' );

/**
 * Bootstrap the admin dashboard.
 *
 * @return void
 */
function wbd_timeline_builder_admin() {
	if ( ! is_admin() ) {
		return;
	}

	require_once WBD_TIMELINE_BUILDER_DIR . 'includes/class-admin-dashboard.php';
	new WBD_Timeline_Builder_Admin_Dashboard();
}
add_action( 'plugins_loaded', 'wbd_timeline_builder_admin' );

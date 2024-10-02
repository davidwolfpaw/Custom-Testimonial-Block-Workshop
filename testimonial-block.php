<?php
/**
 * Plugin Name: Testimonial Block Workshop
 * Description: Basic Custom Testimonial Block with no build tools needed - Workshop Demo
 * Version: 1.0.0
 * Author: david wolfpaw
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

// Define plugin version
define( 'TESTIMONIAL_BLOCK_VERSION', '1.0.0' );

// Function to register the block and enqueue scripts/styles
function register_testimonial_block() {

	// Register the block's JavaScript file
	wp_register_script(
		'testimonial-block-script', // Unique script handle
		plugins_url( 'testimonial-block.js', __FILE__ ), // URL of where the block file exists
		array( 'wp-blocks', 'wp-block-editor' ), // Scripts that should load before this script
		TESTIMONIAL_BLOCK_VERSION, // Version of the plugin script (optional)
		true, // Is script in HTML Footer (optional)
	);

	// Register the block type with the scripts and styles
	register_block_type(
		// Block namespace and name
		'workshop/testimonial-block',
		// Array of arguments for the block
		array(
			'editor_script' => 'testimonial-block-script',
		)
	);
}
add_action( 'init', 'register_testimonial_block' );

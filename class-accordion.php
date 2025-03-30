<?php
/**
 * WeCodeArt Framework.
 *
 * WARNING: This file is part of the core WeCodeArt Framework. DO NOT edit this file under any circumstances.
 * Please do all modifications in the form of a child theme.
 *
 * @package 	WeCodeArt Framework
 * @subpackage 	Support\Modules\Formatting
 * @copyright   Copyright (c) 2024, WeCodeArt Framework
 * @since 		6.3.7
 * @version		6.6.2
 */

namespace WeCodeArt\Support\Modules;

defined( 'ABSPATH' ) || exit;


use WeCodeArt\Config\Interfaces\Integration;
use WeCodeArt\Config\Traits\{ Asset, Singleton, No_Conditionals };
use function WeCodeArt\Functions\{ get_prop, toJSON };

/**
 * The Accordion object.
 */
final class Accordion implements Integration {

    use Asset;
    use Singleton;
	use No_Conditionals;

	const VERSION = '1.0.7';

	/**
	 * Send to Constructor
	 */
	public function register_hooks() {
		\add_action( 'init', [ $this, 'register_block' ], 20, 1 ); 
	}

	/**
	 * Register block.
	 *
	 * @return  void
	 */
	public function register_block(): void {
		\register_block_type_from_metadata( dirname( __FILE__ ) . '/blocks/accordion-block.json' );
		\register_block_type_from_metadata( dirname( __FILE__ ) . '/blocks/accordion-item-block.json' );
		
		\wp_enqueue_block_style( 'wecodeart/accordion', [
			'handle' => 'wp-block-wecodeart-accordion',
			'src' 	=> $this->get_asset( 'css', 'index' ),
			'path' 	=> $this->get_asset( 'css', 'index', 'directory' ),
			'ver' 	=> wecodeart( 'version' ),
		] );

		\wp_register_script( 
			'wp-block-wecodeart-accordion',
			$this->get_asset( 'js', 'index' ),
			[
				'wp-i18n',
				'wp-data',
				'wp-blocks',
				'wp-editor',
				'wp-element',
				'wp-components',
			],
			wecodeart( 'version' ), 
			true 
		);
	}

	/**
	 * Get file.
	 *
	 * @return string
	 */
	public function get_asset( string $type, string $name, string $path = 'uri' ): string {
		$file_path = wecodeart_if( 'is_dev_mode' ) ? 'unminified' : 'minified';
		$file_name = wecodeart_if( 'is_dev_mode' ) ? $name . '.' . $type :  $name . '.min.' . $type;
		$file_path = wecodeart_config( 'paths' )[$path] . '/inc/support/modules/accordion/assets/' . $file_path . '/' . $type . '/' . $file_name;
		$file_path = wp_normalize_path( $file_path );

		if( $path === 'uri' ) {
			return esc_url( $file_path );
		}

		return $file_path;
	}
}
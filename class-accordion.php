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
 * @version		6.6.0
 */

namespace WeCodeArt\Support\Modules;

defined( 'ABSPATH' ) || exit;


use WeCodeArt\Config\Traits\{ Asset, Singleton, No_Conditionals };
use WeCodeArt\Config\Interfaces\Integration;
use function WeCodeArt\Functions\get_prop;
use function WeCodeArt\Functions\toJSON;

/**
 * The Accordion object.
 */
final class Accordion implements Integration {

    use Asset;
    use Singleton;
	use No_Conditionals;

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
		\register_block_type_from_metadata( dirname( __FILE__ ) . '/accordion-block.json', [
			'render_callback'   => [ $this, 'render_accordion' ],
		] );
			
		\register_block_type_from_metadata( dirname( __FILE__ ) . '/accordion-item-block.json', [
			'render_callback' => [ $this, 'render_accordion_item' ]
		] ); 
		
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
	 * Dynamically renders the `wecodeart/accordion` block.
	 *
	 * @param 	array 	$attributes	The attributes.
	 * @param 	string 	$content 	The block markup.
	 *
	 * @return 	string 	The block markup.
	 */
	public function render_accordion( array $attributes = [], string $content = '' ): string {
		$p = wecodeart( 'dom' )::processor( $content );
		$p->next_tag();

		$accordion_id = $p->get_attribute( 'id' ) ?: wp_unique_id( 'wp-accordion-' );
		$p->set_attribute( 'id', $accordion_id );

		$p->set_attribute( 'data-wp-interactive', 'wecodeart/accordion' );
		$p->set_attribute( 'data-wp-context', toJSON( [
			'multiExpand' 	=> get_prop( $attributes, [ 'multiExpand' ], true ),
			'elements'		=> [],
		] ) );

		if( get_prop( $attributes, [ 'multiExpand' ] ) === false ) {
			$p->set_attribute( 'data-wp-init--multiple', 'callbacks.multiExpand' );
		}

		$content = $p->get_updated_html();

		return $content;
	}
	
	/**
	 * Dynamically renders the `wecodeart/accordion-item` block.
	 *
	 * @param 	array 	$attributes	The attributes.
	 * @param 	string 	$content 	The block markup.
	 *
	 * @return 	string 	The block markup.
	 */
	public function render_accordion_item( array $attributes = [], string $content = '', object $block = null ): string {
		$is_open = get_prop( $attributes, [ 'isOpen' ], false );

		$p = wecodeart( 'dom' )::processor( $content );
		$p->next_tag();

		$item_id = $p->get_attribute( 'id' ) ?: wp_unique_id( 'wp-accordion-item-' );
		$p->set_attribute( 'data-wp-interactive', 'wecodeart/collapse' );
		$p->set_attribute( 'data-wp-context', toJSON( [
			'isOpen' => $is_open,
		] ) );

		$p->set_attribute( 'data-wp-init', 'wecodeart/accordion::callbacks.addElement' );

		if ( $p->next_tag( [
			'class_name'=> 'wp-accordion-item__button'
		] ) ) {
			$p->set_attribute( 'data-wp-bind--aria-label', 'state.ariaLabel' );
			$p->set_attribute( 'data-wp-bind--aria-expanded', 'context.isOpen' );
			$p->set_attribute( 'data-wp-on--click', 'actions.toggle' );
			$p->set_attribute( 'data-wp-class--collapsed', '!context.isOpen' );
			$p->set_attribute( 'aria-controls', $item_id . '-content' );
			$p->set_attribute( 'aria-label', $is_open ? esc_html__( 'Close item', 'wecodeart' ) : esc_html__( 'Open item', 'wecodeart' ) );
			$p->set_attribute( 'aria-expanded', $is_open ? 'true' : 'false' );
			$p->set_attribute( 'id', $item_id . '-toggle' );
			$p->set_attribute( 'type', 'button' );

			if( ! $is_open ) {
				$p->add_class( 'collapsed' );
			}
		}

		if ( $p->next_tag( [
			'class_name' => 'wp-accordion-item__content'
		] ) ) {
			$p->set_attribute( 'aria-labelledby', $item_id . '-toggle' );
			$p->set_attribute( 'id', $item_id . '-content' );
			$p->set_attribute( 'role', 'region' );
			$p->add_class( 'collapse' );

			if( $is_open ) {
				$p->add_class( 'show' );
			}
		}

		\wp_interactivity_config( 'wecodeart/collapse', [
			'ariaLabel'	=>	[
				'collapsed' => esc_html__( 'Open item', 'wecodeart' ),
				'expanded'	=> esc_html__( 'Close item', 'wecodeart' )
			],
			'classNames' => [
				'show' 			=> 'show',
				'collapse' 		=> 'collapse',
				'collapsing' 	=> 'collapsing'
			]
		] );
		
		wecodeart( 'styles' )->Components->load( [ 'transition' ] );

		$content = $p->get_updated_html();

		return $content;
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
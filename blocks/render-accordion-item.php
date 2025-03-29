<?php

use function WeCodeArt\Functions\{ get_prop, toJSON };

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

\wecodeart( 'styles' )->Components->load( [ 'transition' ] );

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

echo $p->get_updated_html();
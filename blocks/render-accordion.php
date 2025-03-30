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

$p = wecodeart( 'dom' )::processor( $content );
$p->next_tag();

$accordion_id = $p->get_attribute( 'id' ) ?: wp_unique_id( 'wp-accordion-' );
$p->set_attribute( 'id', $accordion_id );

$p->set_attribute( 'data-wp-interactive', 'wecodeart/accordion' );
$p->set_attribute( 'data-wp-context', toJSON( [
    'multiExpand' 	=> get_prop( $attributes, [ 'multiExpand' ], false ),
    'isOpened'		=> [],
] ) );
$p->set_attribute( 'data-wp-init', 'callbacks.onAccordionChange' );

echo $p->get_updated_html();
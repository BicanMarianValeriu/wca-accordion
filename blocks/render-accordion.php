<?php

use function WeCodeArt\Functions\{ get_prop, toJSON };

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

echo $p->get_updated_html();
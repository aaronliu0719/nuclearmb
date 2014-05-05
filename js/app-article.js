/*!
 * Articles
 *
 */

;(function( window, document, $, undefined ) {
    
    $('article')
    .find('aside')
    .each(function() {
        var
            $this = $( this ),
            $p = $this.prev('p, ol, ul, blockquote, table, div')
        ;

        $p
        .wrap('<div class="entity-w-note-aside"/>')
        .parent()
        .append( $this )
    })

})( window, document, jQuery );


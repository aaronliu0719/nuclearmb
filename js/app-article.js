/*!
 * Articles
 *
 */

;(function( window, document, $, undefined ) {
    
    $('article')
    .find('aside')
    .each(function( i ) {
        var
            $this = $( this ),
            $p = $this.prev('p, ol, ul, blockquote, table, div'),
            cut = $p.outerHeight() + 16
        ;

        $this.css('margin-top', -cut)
    })

})( window, document, jQuery );


/*!
 * Article Application
 */

;(function( window, document, $, undefined ) {
    

/**
 * Note Aside implementation
 * ---
 * Works with CSS (`_aside.sass`)
 *
 */
$('article')
.find('aside')
.each(function() {
    var
        $this = $( this ),
        $p = $this.prev('p, ol, ul, blockquote, table, div')
    ;

    if ( $this.parents('.entity-w-note-aside').length > 0 ) {
        return
    }

    $p
    .wrap('<div class="entity-w-note-aside"/>')
    .parent()
    .append( $this )
})


/**
 * Share buttons init
 */
~function() {
    var 
        service = [],
        url = encodeURIComponent( window.location.href )
    ;

    service['twr']  = 'https://twitter.com/share?url='
    service['fb']   = 'https://www.facebook.com/sharer/sharer.php?u='
    service['goog'] = 'https://plus.google.com/share?url='

    $('footer.main-content nav')
    .on('click', 'button.share', function() {
        for ( var name in service ) {
            if ( $(this).hasClass( name ) ) {
                window.open(
                    service[name] + url,                            // url
                    name + '-share-dialog',                         // window's name
                    'width=626,height=436,location=yes,menubar=no'  // other parameters
                )
                break
            }
        }
    })
}()

})( window, document, jQuery );


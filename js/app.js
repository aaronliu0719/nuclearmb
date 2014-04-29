

/*!
 *
 */
;(function( window, document, $, undefined ) {

var 
    $win = $( window ),
    $doc = $( document ),
    $body = $( 'body' ),
    $slide = $( '.slide' ),

    nav_height = function() {
        return $('nav.layout').outerHeight()
    }
;

$doc
.on('ready', function() {
    $body.slidify( nav_height, true )
})

$win
.on('scroll', function() {
    $slide.niche( nav_height, true )
})

})( window, document, jQuery );


/*!
 *
 */
;(function( window, document, $, undefined ) {

var 
    $doc = $(document)
;

$.fn.slidify = function( devi, minus ) {
    var 
        $this = $(this),
        $b$h = $('body, html')
    ;

    $this
    .find('[data-slideto]')
    .each(function() {
        $(this).on('click', function() {
            var
                $this = $(this),
                target = $this.attr('data-slideto'),
                $target = $('#' + target),
                deviation = devi() || 0,
                posi = minus ? $target.position().top - deviation : $target.position().top + deviation
            ;

            $b$h
            .animate({ scrollTop: posi }, '500', 'swing', function() {
            })
        })
    })
}

$.fn.niche = function( devi, minus ) {
    var
        $this = $(this)
    ;

    $this
    .each(function() {
        var 
            $this = $(this),
            height = $this.outerHeight(),
            id = $this.attr('id') || '',
            deviation = devi() || 0,

            start = minus ? $this.position().top - deviation : $this.position().top + deviation,
            end = start + height,

            current = $doc.scrollTop()
        ;

        if ( current >= start ) {
            $('.current-slide')
            .removeClass()

            $('[data-slideto="' + id + '"]')
            .addClass('current-slide')
        }
    })
}

})( window, document, jQuery );


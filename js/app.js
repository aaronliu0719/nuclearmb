

/*!
 *
 */
;(function( window, document, $, undefined ) {

var 
    $win = $( window ),
    $doc = $( document ),
    $body = $('body')

    nav_height = function() {
        return $('nav.layout').outerHeight()
    }
;

$doc
.on('ready', function() {
    $body.slidify( nav_height, true )
})


})( window, document, jQuery );


/*!
 * Slide & Niche
 */
;(function( window, document, $, undefined ) {

var 
    $doc = $( document ),
    $win = $( window ),
    $body = $('body'),
    $b$h = $('body, html'),


    hash = {
        clean: true,

        original: function() {
            return window.location.hash.substring(1)
        },

        decode: function() {
            var
                val = this.original()
            ;

            return val.match(/%/i) ? decodeURIComponent( val ) : val
        },

        encode: function( val ) {
            var 
                encoded = this.clean ? val : encodeURIComponent( val )
            ;

            return encoded
        },

        assign: function( val, title ) {
            var
                title = title !== null ? title : true
            ;

            window.location.hash = val !== '' ? '!/' + this.encode( val ) : ''

            if ( title ) {
                document.title = val
            }
        },

        get: function() {
            var
                val = this.decode( val )
            ;

            return val.replace(/^[\!\/]*([^\/]*)\/?$/ig, '$1')
        }
    },

    ID = [],
    TITLE = [],
    POSI = [],
    INIT,
    DEVIATION,

    slide = function( top, callback ) {
        $b$h
        .animate(
            {
                scrollTop: top
            }, 
            '500',
            'swing',
            $.isFunction( callback ) ? callback() : ''
        )
    },

    niche = function( somePoint ) {
        ID.forEach(function( id, i ) {
            var
                start = POSI['start'][i],
                end = POSI['end'][i]-11,
                title = TITLE[i],
                now = hash.get()
            ;

            if ( somePoint >= start && somePoint <= end ) {
                //console.log( title+', '+ POSI['end'][i-1] +', '+ start )

                $body
                .attr('data-current-slide', id)

                if ( now !== title ) {
                    if ( somePoint > DEVIATION || id != INIT ) {
                        hash.assign( title )
                    }
                }
            }
        })
    },

    origTitle = document.title
;

~function(){
    var 
        origHash = hash.get() || ''
    ;
    
    window.location.hash = '測試'
    
    if ( '測試' !== hash.get() ) {
        hash.clean = false
    }

    hash.assign( origHash, false )
}()

$.fn.slidify = function( devi, minus ) {
    var 
        LISTENER,

        $this = $( this )
    ;

    DEVIATION = $.isFunction( devi ) ? devi() : 0

    $this
    .find('[data-slide-to]')
    .each(function() {
        var 
            $this = $( this ),
            target = $this.attr('data-slide-to'),
            $target = $('#' + target),

            top = parseInt( $target.position().top ),
            text = $this.text()
        ;

        $( this )
        .on('click', function() {
            var
                posi = minus ? top - DEVIATION : top + DEVIATION
            ;

            slide( posi )
        })
    })

    $win
    .on('ready resize', function() {
        DEVIATION = $.isFunction( devi ) ? devi() : 0
        POSI['start'] = []
        POSI['end'] = []

        $('.slide')
        .each(function( i ) {
            var
                $this = $( this ),
                height = $this.outerHeight(),
                top = parseInt( $this.position().top )
            ;

            ID[i] = $this.attr('id') || ''
            TITLE[i] = $this.find('h1').eq(0).text() || origTitle
            POSI['start'][i] = minus ? top - DEVIATION : top + DEVIATION
            POSI['end'][i] = height + POSI['start'][i] - 11 // small workaround form `margin-top` of each slide

            if ( $this.hasClass('init-slide') ) {
                INIT = ID[i]
            }
        })
    })
    .on('scroll', function() {
        clearTimeout( LISTENER )

        LISTENER = setTimeout(function() {
            niche( $doc.scrollTop() )
        }, 500)
    })
    .on('hashchange', function() {
        var
            now = hash.get(),
            posi
        ;

        TITLE.forEach(function( title, i ) {
            if ( posi ) {
                return
            } else if ( now === title ) {
                posi = POSI['start'][i]
            }
        })
      
      slide( posi )
    })
}

})( window, document, jQuery );


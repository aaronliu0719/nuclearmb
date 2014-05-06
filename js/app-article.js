/*!
 * Article Application
 */

String.prototype.repeat = function( num ) {
    return new Array( num + 1 ).join( this )
}


;(function( window, document, $, undefined ) {
var
    $doc = $( document ),
    $win = $( window )
;

/**
 * Note-aside implementation
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
 * Bookmarks for headings
 */
~function() {
    var 
        a = $('<a/>'),
        anchor = a.clone(),
        ol = $('<ol/>'),
        li = $('<li/>'),
        $artc = $('article.main-content'),
        $nav,
        $ol,
        menu_scrollTop
    ;

    anchor
    .addClass('sectional-anchor')
    .attr('title', '自右鍵取得此章節的網址錨點')
    .text('#')

    $artc
    .find('h2, h3, h4, h5, h6')
    .each(function( i ) {
        var
            elem = this.nodeName.replace(/^h([2-6])$/i, '$1'),
            $this = $( this ),
            id = $this.attr('id'),
            title = $this.text(),
            level = '#'.repeat( Number( elem ))
        ;

        if ( !id ) {
            id = '-sec-' + i
            $this.attr('id', id)
        }

        // anchors beside headings
        $this
        .prepend( 
            anchor.clone()
            .attr('href', '#' + id)
            .text( level )
        )

        // sectional menu
        ol.append(
            li.clone()
            .attr('data-level', elem-1)
            .append(
                a.clone()
                .attr('href', '#' + id)
                .text( title )
            )
        )
    })

    ol
    .append(
        $('<li class="comment"><a href="#comment">評論</a></li>')
    )

    $artc
    .find('header.main-content')
    .after( 
        $('<nav id="sectional-menu" class="main-content" />')
        .append( ol )
        .append( $('<button id="section-menu-switch">段落選單開關</button>') )
    )

    $nav = $('#sectional-menu')
    $ol = $nav.find('ol')
    menu_scrollTop = $nav.offset().top

    $win
    .on('scroll', function() {
        if ( $doc.scrollTop() >= menu_scrollTop ) {
            $nav
            .addClass('scrolled-over')
        } else {
            $nav
            .removeClass('scrolled-over on')

            $ol
            .removeAttr('style')
        }
    })

    $doc
    .on('mouseover', '#sectional-menu.scrolled-over', function() {
        $nav.addClass('on')
        $ol.slideDown('fast')
    })
    .on('mouseleave', '#sectional-menu.scrolled-over', function() {
        $nav.removeClass('on')
        $ol.slideUp('fast')
    })
    // For mobile/touch devices
    .on('click', '#section-menu-switch', function() {
        $nav.toggleClass('on')
        $ol.toggle()
    })
}()

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


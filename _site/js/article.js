

(function($){

	$(document).on('ready', function(){
		/* 解析網址及現在位置 */
		var cp = parseAddress();


		/* 載入文章列表 */
		nav( cp );


		/* 各家服務分享按鈕 */
		sharing();
	});



	/* 參考文獻及附註位置調整 */
	$(window).on('ready resize', function(){
		$('footer ol li').each(function(i){
			var i = i + 1;
				ref = '#ref-' + i,
				refY = $(ref).position().top,
				articleY = $('article').position().top,
				Y = refY-articleY;

			$(this).css('margin-top', refY);
		});
	});



	/* 「文章選單」偵測捲軸位置自動開關 */
	$(window).on('ready scroll', function(e){
		var current = $(document).scrollTop(),
			posi = [];

		posi['close'] = 110;
		posi['open'] = $('article footer .copyright').position().top-80;


		/* To close */
		if ( current >= posi['close'] && $('nav').hasClass('on') )
			$('nav').removeClass('on').addClass('off');

		if ( current < posi['close'] && $('nav').hasClass('off') )
			$('nav').removeClass('off').addClass('on');


		/* To open again */
		if ( current >= posi['open'] && $('nav').hasClass('off') )
			$('nav').removeClass('off').addClass('on');

		if ( posi['close'] < current && current < posi['open'] && $('nav').hasClass('on') )
			$('nav').removeClass('on').addClass('off');
	});




function parseAddress() {
	var address = decodeURIComponent(location.href),
		domain = 'http://' + document.domain + '/read/',
		path = address.replace(domain, ''),
		pathes = path.split('/'),

		cat, article, single, index,
		result = [],
		classes = '';


	cat = pathes[0];
	classes += 'cat '+ cat + ' ';

	if ( pathes[1] ) {
		article = pathes[1];
		classes += 'article ' + article + ' ';
	}


	result['cat'] = cat;
	result['article'] = article || false;
	result['classes'] = classes;

	return result;
};


function nav( cp ) {

	$.getJSON( "/data/article_index.json", function( data ) {
		var ul = $('<ul/>'),
			nav = data.cat,
			cur_cat, cur_art,
			classes = cp['classes'];


		nav.forEach(function(cat, i){
			var genre = cat.genre,

				prefix = ( genre.match(/article/g) ) ? 'read/' : '',
				id = ( cat.alternative != null ) ? cat.alternative : cat.pinyin,
				cat_path = '/' + prefix + id,
				li, article;

			cur_cat = ( cp['cat'] == id ) ? i : false;
			classes += (cur_cat) ? 'cat' + (i+1) : '';

			li = $('<li/>').append(
					$('<a/>').attr('href', cat_path).html(cat.title)
				 ).addClass( (cur_cat) ? 'current' : '' );



			if (cat.article) {
				var artlist = $('<ul/>');

				cat.article.forEach(function(article) {
					var id = ( article.alternative != null ) ? article.alternative : article.pinyin,
						article_path = cat_path + '/' + id;
					
					cur_art = ( cp['article'] === id ) ? true : false;


					artlist.append( 
						$('<li/>')
						.append( 
							$('<a/>').attr('href', article_path).html(article.title)
						).addClass( (cur_art) ? 'current' : '' )
					);
				});

				li.append( $('<div/>').append( artlist ) );
			}

			ul.append( li );
		});


		$('nav')
		.addClass('on')
		.find('> div:first-child').after( 
			$('<div/>')
			.attr('class', 'article-menu')
			.append( ul )
		);

		$('body').addClass(classes);

	});


	/* 選單開關 */
	$('nav .site-menu ul')
	.find('li.cat2, li.cat3')
	.each(function(){
		var cat = ( $(this).hasClass('cat2') ) ? 'cat2' : 'cat3';

		$(this).find('a').on('click', function(e){
			e.preventDefault();

			$(this).parents('nav').removeClass('cat2 cat3').addClass(cat);

			if ( $('nav').hasClass('off') )
				$('nav').removeClass('off').addClass('on open_manually');

			else if ( $('nav').hasClass('on') && $('nav').hasClass('open_manually') ){
				if ( $('nav').hasClass( cat ) )
					$('nav').removeClass('on open_manually').addClass('off');
			}
		});
	});
};


function sharing() {
	var services = [],
			url = encodeURIComponent(location.href),
			elem = function(serv){  return 'a.' + serv + '-share-button';  };

	services['twr'] = 'https://twitter.com/share?url=';
	services['fb'] = 'https://www.facebook.com/sharer/sharer.php?u=';
	services['gplus'] = 'https://plus.google.com/share?url=';


	for ( var name in services ) {
	    $( elem(name) )
	    .attr('data-name', name)
	    .on('click', function(e){
			e.preventDefault();

			var name = $(this).attr('data-name');

		    window.open(
		      	services[name] + url,
		      	name + '-share-dialog', 
		      	'width=626,height=436,location=yes,menubar=no'
		    );
		});
	}
};

})(jQuery);






 























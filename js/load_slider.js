function init_slider(){
    $(window).stellar();

    var links = $('.navigation').find('li'),
        slide = $('.slide'),
        button = $('.button'),
        mywindow = $(window),
        htmlbody = $('html,body');



    slide.waypoint(function (event, direction) {
        
        dataslide = $(this).attr('data-slide');
        window.direction = direction;
        window.currentSlide = dataslide;

        if (direction === 'down') {
            $('.navigation li[data-slide="' + dataslide + '"]').addClass('active').prev().removeClass('active');
        }
        else {
            $('.navigation li[data-slide="' + dataslide + '"]').addClass('active').next().removeClass('active');
        }

        var slideTitle = getSlideTitle(dataslide);
        History.pushState({slide:dataslide, subject:0}, slideTitle, encodeURIComponent(slideTitle));
        window.current_slide = dataslide;

    });
 
    mywindow.scroll(function () {

        if (mywindow.scrollTop() == 0) {

            $('.navigation li[data-slide="1"]').addClass('active');
            $('.navigation li[data-slide="2"]').removeClass('active');
        }
    });

    function goToByScroll(dataslide) {
        var top = $('.slide[data-slide="' + dataslide + '"]').offset().top;

        if(window.current_slide<dataslide){
            top += 5;
        }else if(window.current_slide>dataslide){
            top -= 5;
        }

        if(top<0) top=0;
        

        window.current_slide = dataslide;
        
        //console.log('route');
        //NMB.router.navigate("slide1"); 
        

        htmlbody.animate({
            scrollTop: top
        }, 1000, 'easeInOutQuint');
        

      
    }

    

    window.goToByScroll = goToByScroll;

    links.click(function (e) {
        e.preventDefault();
        dataslide = $(this).attr('data-slide');
        goToByScroll(dataslide);
    });

    button.click(function (e) {
        e.preventDefault();
        dataslide = $(this).attr('data-slide');
        goToByScroll(dataslide);

    });
}

function init_content_slider(){
    var current = 1;
                
    var iterate     = function(){
        var i = parseInt(current+1);
        var lis = $('#rotmenu').children('li').size();
        if(i>lis) i = 1;
        display($('#rotmenu li:nth-child('+i+')'));
    }
    //display($('#rotmenu li:first'));

    display($('#slide2 #rotmenu li:first'));
    display($('#slide4 #rotmenu li:first'));
    display($('#slide6 #rotmenu li:first'));

    //var slidetime = setInterval(iterate,3000);
    
    $('#rotmenu li').bind('click',function(e){
        //clearTimeout(slidetime);
        display($(this));
        e.preventDefault();

        //TODO: 加上subject的history
        console.log('li.eq='+$(this).eq(0));
        //History.pushState({slide:dataslide, subject:0}, slideTitle, encodeURIComponent(slideTitle));
    });

    
    
    function display(elem){
        var $this   = elem;
        
        var display_target = elem.attr('display');

        console.log('display_target='+display_target);
        var repeat  = false;
        if(current == parseInt($this.index() + 1))
            repeat = true;
        
        if(!repeat)
            $this.parent().find('li:nth-child('+current+') a').stop(true,true).animate({'marginRight':'-20px'},300,function(){
                $(this).animate({'opacity':'0.7'},700);
            });
        
        current = parseInt($this.index() + 1);
        
        var elem = $('a',$this);
        
            elem.stop(true,true).animate({'marginRight':'0px','opacity':'1.0'},300);

        
        
        var info_elem = elem.next();
        $('#'+display_target+' .heading').animate({'left':'-420px'}, 500,'easeOutCirc',function(){
            $('h1',$(this)).html(info_elem.find('.info_heading').html());
            $(this).animate({'left':'0px'},400,'easeInOutQuad');
        });
        
        $('#'+display_target+' .description').animate({'bottom':'-270px'},500,'easeOutCirc',function(){
            $('p',$(this)).html(info_elem.find('.info_description').html());
            $(this).animate({'bottom':'0px'},400,'easeInOutQuad');
        })
        $('#'+display_target).prepend(
        $('<img/>',{
            style   :   'opacity:0',
            className : 'bg'
        }).load(
        function(){
            $(this).animate({'opacity':'1'},600);
            $('#'+display_target+' img:first').next().animate({'opacity':'0'},700,function(){
                $(this).remove();
            });
        }
    ).attr('src','images/'+info_elem.find('.info_image').html()).attr('width','800').attr('height','400')
    );
    }
}
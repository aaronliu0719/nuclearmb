function init_slider(){

    
    
    
    
    var slide = $('.slide'),
        button = $('.button'),
        mywindow = $(window),
        links = $('li.nav_item'),
        htmlbody = $('html,body');

    $(window).stellar();

    
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

        var new_route = config.base_url+"/"+encodeURIComponent(slideTitle);
        History.pushState({slide:dataslide, subject:0}, slideTitle, new_route);
        window.current_slide = dataslide;

    });
    
 
    mywindow.scroll(function () {

        if (mywindow.scrollTop() == 0) {

            $('.navigation li[data-slide="1"]').addClass('active');
            $('.navigation li[data-slide="2"]').removeClass('active');
        }
    });



    function goToSubject(dataslide, subject_id, open_detail){
        console.log("goToSubject:" + dataslide+'/'+subject_id+"/"+open_detail);

        var subject_li = $("#slide"+dataslide+ " li").eq(subject_id-1);
        console.log("#slide"+dataslide+ " li");
        console.log(subject_li);

        if(subject_li.length>0)
        {
            subject_li.click();
            if(open_detail)
            {
                subject_li.find("a#more").click();
            }
            
        }
    }

    function goToByScroll(dataslide, subject_id, open_detail) {
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

        var scroll_speed = 1000;
        
        if(subject_id==undefined){
            htmlbody.animate({
                scrollTop: top
            }, scroll_speed, 'easeInOutQuint');
        }else{
            htmlbody.animate({
                scrollTop: top
            }, scroll_speed, 'easeInOutQuint', (function (dataslide, subject_id, open_detail) {
                return function() {
                    goToSubject(dataslide, subject_id, open_detail);
                }
            })(dataslide, subject_id, open_detail));
        }
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

        var subject_id = $(this).attr("subject");
        var subject_title = $(this).find("a.info_menu").text();
        var slideTitle = getSlideTitle(window.current_slide);

        console.log(slideTitle+"/"+subject_title);
        //加上subject
        var new_route = config.base_url+"/"+encodeURIComponent(slideTitle)+"#"+encodeURIComponent(subject_title);
        History.pushState({slide:dataslide, subject:subject_id}, subject_title, new_route);
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
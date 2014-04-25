

function getURLParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++)
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam)
        {
            return sParameterName[1];
        }
    }
    return null;
}

function more_click(obj, dataslide, subject_id, subject_title){

    var slide_title = getSlideTitle(dataslide);
    
    console.log(slide_title);
    console.log(subject_title);

    var new_route = config.base_url+"/"+encodeURIComponent(slide_title)+"#"+encodeURIComponent(subject_title)+"#detail";
    History.pushState({slide:dataslide, subject:subject_id}, subject_title, new_route);

    
}

function getSlideTitle(slide_id){
    
    var title = $('.navigation li[data-slide="'+slide_id+'"]').text();
    return title;

}

function init_location(){
    var url = location.href,
        protocal = "http://",
        path = "/",
        base_url ="";

    if(url.substring(0, 8)=="https://"){
        protocal = "https://";
    }

    base_url = protocal+location.host+config.base_url;

    if(url.length>base_url.length)
    {
        path = url.substring(base_url.length, url.length)
    }
    console.log("path="+path);

    router.navigate(path);

}

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds){
            break;
        }
    }
}

function init_all(){
    if(load_slice<4)
    {
        setTimeout(init_all, 100);
        return;
    }
    init_slider();
    init_content_slider();

    init_router();
    init_location();

    $('.fancybox').fancybox(
        {
            width:'80%',
            height: '80%',
            afterClose: function() {
                History.back();
            }
        }
    );
}

var load_slice = 0;

$(document).ready(function ($) {
    window.current_slide = 1;
    //init_template();

    
    $("#slide2_container").load("inc/about_nuke.html", function(){
        load_slice++;
    });
    $("#slide3_container").load("inc/green_energy.html", function(){
        load_slice++;
    });
    $("#slide8_container").load("inc/nuke_friends.html", function(){
        load_slice++;
    });
    $("#slide9_container").load("inc/about_us.html", function(){
        load_slice++;
    });

    init_all();


});
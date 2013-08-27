

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


function getSlideTitle(slide_no){
    
    var title = $('.navigation li[data-slide="'+slide_no+'"]').text();
    

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
    router.navigate(path);

}

$(document).ready(function ($) {
    window.current_slide = 1;
    init_template();
    init_slider();
    init_content_slider();
    
    init_location();



    $('.fancybox').fancybox(
        {
            width:'80%',
            height: '80%',

        }
    );

});
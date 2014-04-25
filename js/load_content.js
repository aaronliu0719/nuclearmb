var much_info_template,
	mid_info_template,
	template_count=5,
	template_progress=0;


function init_template(){
	var much_info_template_source = $("#much-info-template").html(),
		mid_info_template_source = $("#mid-info-template").html();

	much_info_template = Handlebars.compile(much_info_template_source);
	mid_info_template = Handlebars.compile(mid_info_template_source);
}


function load_much_info_template(data_url, target_container){
	$.ajax({
		url: data_url,
		type: "GET",
		async: false,
		crossDomain: false,
		cache: false,
		dataType: "json",
		success: function (data, textStatus, jqXHR){
			
			var content_html    = much_info_template(data);
			target_container.html(content_html);
			template_progress+=1;
			
		},
		error: function(jqXHR, textStatus, errorThrown){
			console.log('error:'+errorThrown);
		}
	});	
}

function load_mid_info_template(data_url, target_container){
	$.ajax({
		url: data_url,
		type: "GET",
		async: false,
		crossDomain: false,
		cache: false,
		dataType: "json",
		success: function (data, textStatus, jqXHR){
			var content_html    = mid_info_template(data);
			target_container.html(content_html);
			template_progress+=1;
			
		},
		error: function(jqXHR, textStatus, errorThrown){
			console.log('error:'+errorThrown);
		}
	});	
}
var much_info_template,
	mid_info_template;

function init_template(){
	var much_info_template_source = $("#much-info-template").html(),
		mid_info_template_source = $("#mid-info-template").html();

	much_info_template = Handlebars.compile(much_info_template_source);
	mid_info_template = Handlebars.compile(mid_info_template_source);

	load_much_info_template("data/slide2.json", $("#slide2_container"));
	load_mid_info_template("data/slide3.json", $("#slide3_container"));
	load_much_info_template("data/slide4.json", $("#slide4_container"));
	load_mid_info_template("data/slide5.json", $("#slide5_container"));
	load_much_info_template("data/slide6.json", $("#slide6_container"));
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
		},
		error: function(jqXHR, textStatus, errorThrown){
			console.log('error:'+errorThrown);
		}
	});	
}
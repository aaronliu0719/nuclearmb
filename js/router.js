
function MyRouter(){
	this.routingTable = {};

	this.addRoute = function(path, callback){
		this.routingTable[path] = callback;
	}

	this.navigate = function(path)
	{
		var is_mached = false;

		console.log('navigate path='+path);	

		if(this.routingTable[path]!==undefined){
			this.routingTable[path]();
			console.log('E1');	

		}else if(this.routingTable[decodeURIComponent(path)]!==undefined){
			this.routingTable[decodeURIComponent(path)]();
			console.log('E2');

		}else{
			if(this.routingTable['default_route']!==undefined){
				this.routingTable['default_route']();
			}else{
				console.log('ERROR 404');
			}		

		}
	}

}

var router = null;

function init_router(){
	router = new MyRouter();
	
	
	router.addRoute('/核能流言終結者', 								function(){ goToByScroll(1) });
	router.addRoute('/核電好危險？', 								function(){ goToByScroll(2) });
	router.addRoute('/核電好危險？/輻射ABC', 						function(){ goToByScroll(2, 1) });
	router.addRoute('/核電好危險？/輻射ABC/detail', 					function(){ goToByScroll(2, 1, true) });
	router.addRoute('/核電好危險？/廢核是世界主流？', 				function(){ goToByScroll(2, 2) });
	router.addRoute('/核電好危險？/廢核是世界主流？/detail', 			function(){ goToByScroll(2, 2, true) });
	router.addRoute('/核電好危險？/福島核災的始末與未來發展', 			function(){ goToByScroll(2, 3) });
	router.addRoute('/核電好危險？/福島核災的始末與未來發展/detail', 	function(){ goToByScroll(2, 3, true) });
	router.addRoute('/核電好危險？/地震國不該發展核電？', 			function(){ goToByScroll(2, 4) });
	router.addRoute('/核電好危險？/地震國不該發展核電？/detail', 		function(){ goToByScroll(2, 4, true) });
	router.addRoute('/核電好危險？/核電廠=輻射源？', 					function(){ goToByScroll(2, 5) });
	router.addRoute('/核電好危險？/核電廠=輻射源？/detail', 			function(){ goToByScroll(2, 6, true) });
	router.addRoute('/核電好危險？/核廢料遺禍子孫？', 				function(){ goToByScroll(2, 6) });
	router.addRoute('/核電好危險？/核廢料遺禍子孫？/detail', 			function(){ goToByScroll(2, 6, true) });
	router.addRoute('/綠能是王道？', 								function(){ goToByScroll(3) });
	router.addRoute('/節電就夠用？', 								function(){ goToByScroll(4) });
	router.addRoute('/核四拆爛污？', 								function(){ goToByScroll(5) });
	router.addRoute('/能源與經濟發展', 								function(){ goToByScroll(6) });
	router.addRoute('/FQA', 										function(){ goToByScroll(7) });
	router.addRoute('/理性大串連', 									function(){ goToByScroll(8) });
	router.addRoute('/關於我們', 									function(){ goToByScroll(9) });
	router.addRoute('default_route', 								function(){ goToByScroll(1) });

	console.log('router complete');
}

function goTo404(){
	//location.href = config.base_url+"/err404.html"
}





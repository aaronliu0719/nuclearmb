
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
			console.log('R1');	
			return;

		}else if(this.routingTable[decodeURIComponent(path)]!==undefined){
			 
			this.routingTable[decodeURIComponent(path)]();
			console.log(decodeURIComponent(path));
			console.log('R2');
			return;

		}else{
			var sp = path.indexOf("#");
			if(sp > 0){
				var p1 = path.substr(0, sp);
				var p2 = path.substr(sp+1, path.length-sp-1);

				path = decodeURIComponent(p1)+"#"+p2;
				if(this.routingTable[path]!==undefined){
					this.routingTable[path]();
					console.log('R3');
					return;
				}else{
					path = decodeURIComponent(p1);
					if(this.routingTable[path]!==undefined){
						this.routingTable[path]();
						console.log('R4');
						return;
					}
				}
			}
		}

		

		if(this.routingTable['default_route']!==undefined){
	
			this.routingTable['default_route']();
			console.log('R5');

		}else{
			console.log('ERROR 404');
		}		

		
	}

}

var router = null;

function init_router(){
	router = new MyRouter();
	
	
	router.addRoute('/核能流言終結者', 		function(){ goToByScroll(1) });
	router.addRoute('/核電好危險？', 		function(){ goToByScroll(2) });
	router.addRoute('/綠能與節電的迷思', 	function(){ goToByScroll(3) });
	router.addRoute('/FQA', 				function(){ goToByScroll(4) });
	router.addRoute('/理性大串連', 			function(){ goToByScroll(5) });
	router.addRoute('/關於我們', 			function(){ goToByScroll(6) });
	router.addRoute('default_route', 		function(){ goToByScroll(1) });

	console.log('router complete');
}








function MyRouter(){
	this.routingTable = {};

	this.addRoute = function(path, callback){
		this.routingTable[path] = callback;
	}

	this.navigate = function(path)
	{
		var is_mached = false;

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

var router = NULL;

function init_router(){
	router = new MyRouter();
	
	router.addRoute('/核能流言終結者', function(){ goToByScroll(1) });
	router.addRoute('/核電好危險？', function(){ goToByScroll(2) });
	router.addRoute('/綠能是王道？', function(){ goToByScroll(3); alert('xxx'); });
	router.addRoute('/節電就夠用？', function(){ goToByScroll(4) });
	router.addRoute('/核四拆爛污？', function(){ goToByScroll(5) });
	router.addRoute('/能源與經濟發展', function(){ goToByScroll(6) });
	router.addRoute('/FQA', function(){ goToByScroll(7) });
	router.addRoute('/理性大串連', function(){ goToByScroll(8) });
	router.addRoute('/關於我們', function(){ goToByScroll(9) });
	router.addRoute('default_route', function(){ goToByScroll(1); console.log('default route'); });

	console.log('router complete');
}





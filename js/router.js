
function Routing(){
	this.routingTable = {};

	this.route = function(path, callback){
		this.routingTable[path] = callback;
	}

	this.navigate = function(path)
	{
		var is_mached = false;

		if(this.routingTable[path]!==undefined){
			this.routingTable[path]();	
		}else if(this.routingTable[decodeURIComponent(path)]!==undefined){
			this.routingTable[decodeURIComponent(path)]();
		}else{
			if(this.routingTable['default_route']!==undefined)
			{
				this.routingTable['default_route']();
			}		
		}
	}

}

var router = new Routing();

router.route('/核能流言終結者', function(){ goToByScroll(1) });
router.route('/核電好危險？', function(){ goToByScroll(2) });
router.route('/綠能是王道？', function(){ goToByScroll(3) });
router.route('/節電就夠用？', function(){ goToByScroll(4) });
router.route('/核四拆爛污？', function(){ goToByScroll(5) });
router.route('/能源與經濟發展', function(){ goToByScroll(6) });
router.route('/FQA', function(){ goToByScroll(7) });
router.route('/理性大串連', function(){ goToByScroll(8) });
router.route('/關於我們', function(){ goToByScroll(9) });
router.route('default_route', function(){ goToByScroll(1); console.log('default route'); });






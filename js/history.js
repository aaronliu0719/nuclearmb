(function(window,undefined){

	
	
	// Establish Variables
	var State = History.getState(),
		$log = $('#log');

	// Log Initial State
	History.log('initial:', State.data, State.title, State.url);

	// Bind to State Change
	History.Adapter.bind(window,'statechange',function(){ // Note: We are using statechange instead of popstate
		// Log the State
		var State = History.getState(); // Note: We are using History.getState() instead of event.state
		History.log('statechange:', State.data, State.title, State.url);
	});

})(window);


	
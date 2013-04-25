(function(window){

	//--------------------------------------------------------------------------
	//  Vars
	//--------------------------------------------------------------------------
	var loader;
	var game;
	var gameContainer;
	var manifest = [
		"assets/lone_ranger.json",
		"assets/background.json",
		"assets/town_platforms.json",
	];

	//--------------------------------------------------------------------------
	//  Window events
	//--------------------------------------------------------------------------
	$(document).ready(onReady);
	$(window).resize(onResize);
	window.onorientationchange = onResize;


	//--------------------------------------------------------------------------
	//  Window handlers
	//--------------------------------------------------------------------------
	function onReady(){
		console.log("onReady");
		gameContainer = document.getElementById("game-container");
		preLoad();
		onResize();
	}

	function onResize(){
		console.log("onResize");
		// resize canvas
		var width = $(window).width();
    	var height = $(window).height();

    	GAME.width = 800;
    	GAME.height = 450;
	}

	//--------------------------------------------------------------------------
	//  Preload
	//--------------------------------------------------------------------------
	function preLoad(){
		// load assets
		loader = new PIXI.AssetLoader(manifest);
		loader.onComplete = initApp;
		loader.load();
	}

	//--------------------------------------------------------------------------
	//  Initialization
	//--------------------------------------------------------------------------
	function initApp(){
		console.log("init");
		game = new GAME.Engine();
		gameContainer.appendChild(game.view.renderer.view);

		if (GAME.LO_MODE) {
	        setInterval(update, 1000 / 30);
	    } else {
	        requestAnimFrame(update);
	    }

	    $(game.view.renderer.view).mousedown(function(event) {
	        event.preventDefault();
	        onTouch();
	    });

	    game.view.renderer.view.addEventListener("touchstart", onTouchStart, true);
    	game.view.renderer.view.addEventListener("touchend", onTouchEnd, true);
	}

	//--------------------------------------------------------------------------
	//  Interaction
	//--------------------------------------------------------------------------
	function onTouch() {
		console.log("touch");
		if (game){
			game.onTouch();
		}
	}

	function onTouchStart(event) {
	    event.preventDefault();
	    onTouch();
	}

	function onTouchEnd(event) {
	    event.preventDefault();
	}

	//--------------------------------------------------------------------------
	//  Main Game Loop
	//--------------------------------------------------------------------------
	function update() {

		stats.begin();

	    game.update();

	    if (!GAME.LO_MODE) {
	        requestAnimFrame(update);
	    }

	    stats.end();

	}

})(window);
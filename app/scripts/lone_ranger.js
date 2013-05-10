(function(window){

	//--------------------------------------------------------------------------
	//  Vars
	//--------------------------------------------------------------------------
	var loader, audio_loader;
	var audio_assets = [];
	var game;
	var gameContainer;
	var loaded = 0;
	var manifest = [
		"assets/sprites/interface.json",
		"assets/sprites/background.json",
		"assets/sprites/town_platforms.json",
		"assets/sprites/canyon_platforms.json",
		"assets/sprites/town_bg.json",
		"assets/sprites/indian_bg.json",
		"assets/sprites/obstacles_desert.json",
		"assets/sprites/obstacles_town.json",
		"assets/sprites/horses_complete_75percent.json",
		"assets/sprites/train_complete.json",
		"assets/sprites/carriage_reflections_1st_class.json",
		"assets/sprites/carriage_reflections_2nd_class.json"
	];
	var audio_manifest = [
		{src:"assets/audio/game_intro_coup_de_grace_v1.mp3", id:"intro-music"},
		{src:"assets/audio/game_over_impact_coup_de_grace_v1.mp3", id:"failed-music"},
		{src:"assets/audio/gameplay_coup_de_grace_v1.mp3", id:"game-music"},
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

		gameContainer = document.getElementById("game-container");
		preLoad();
		GAME.width = 800;
		GAME.height = 480;

	}

	function onResize(){

		if ($(window).width() <= 1024){
			console.log("onResize");
			// resize canvas
			var width = $(window).width();
	    	var height = $(window).height();

		    var ratio = height / 480;


		    if (game) {
		        var view = game.view.renderer.view;

		        view.style.height = 480 * ratio + "px"

		        var newWidth = (width / ratio);

		        view.style.width = width + "px"

		        game.view.resize(newWidth, 480);
		   
		    }

		    GAME.width = (width / ratio);
		    GAME.height = 480;
		}
    
	}

	//--------------------------------------------------------------------------
	//  Preload
	//--------------------------------------------------------------------------
	function preLoad(){
		// load assets
		loader = new PIXI.AssetLoader(manifest);
		loader.onComplete = onAssetsPreloaded;
		loader.load();

		audioloader = new createjs.LoadQueue()
        audioloader.installPlugin(createjs.Sound)
        
        audioloader.onComplete = onAudioPreloaded
        audioloader.onFileLoad = onAudioFileLoaded
        audioloader.loadManifest(audio_manifest)
	}

	function onAudioFileLoaded(o){
		audio_assets[o.item.id] = o.result
	}

	function onAudioPreloaded(){
		GAME.audio_assets = audio_assets;
		loaded++;
		checkLoaded();
	}

	function onAssetsPreloaded(){
		loaded++;
		checkLoaded();
	}


	//--------------------------------------------------------------------------
	//  Initialization
	//--------------------------------------------------------------------------
	function checkLoaded(){
		if (loaded >= 2){
			initApp();
		}
	}

	function initApp(){
		
		//GAME.LO_MODE = true;

		$("#loader").css("display", "none");
		game = new GAME.Engine();
		gameContainer.appendChild(game.view.renderer.view);

		if (GAME.LO_MODE) {
	        setInterval(update, 1000 / 40);
	    } else {
	        requestAnimFrame(update);
	    }

	    $(game.view.renderer.view).mousedown(function(event) {
	        event.preventDefault();
	        onTouch();
	    });

	    $(document).keydown(function(event) {
            if (event.keyCode == 32) {
                event.preventDefault()
            	onTouch();
           	}
        });

	    game.view.renderer.view.addEventListener("touchstart", onTouchStart, true);
    	game.view.renderer.view.addEventListener("touchend", onTouchEnd, true);

    	onResize();

	}

	//--------------------------------------------------------------------------
	//  Interaction
	//--------------------------------------------------------------------------
	function onTouch() {
		//console.log("touch");
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

		//stats.begin();

	    game.update();

	    if (!GAME.LO_MODE) {
	        requestAnimFrame(update);
	    }

	    //stats.end();

	}

})(window);
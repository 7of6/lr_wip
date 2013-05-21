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
		"assets/sprites/carriage_reflections.json"
	];
	var audio_manifest = [
		{src:"assets/audio/game_intro_coup_de_grace_v1.mp3|assets/audio/game_intro_coup_de_grace_v1.ogg", id:"intro-music"},
		{src:"assets/audio/game_failed_black_mask_v1.mp3|assets/audio/game_failed_black_mask_v1.ogg", id:"failed-music"},
		{src:"assets/audio/gameplay_coup_de_grace_v1.mp3|assets/audio/gameplay_coup_de_grace_v1.ogg", id:"game-music"},
		{src:"assets/audio/game_complete_black_mask_v1.mp3|assets/audio/game_complete_black_mask_v1.ogg", id:"complete-music"},
		{src:"assets/audio/game_over_impact_coup_de_grace_v1.mp3|assets/audio/game_over_impact_coup_de_grace_v1.ogg", id:"gameover-sound"},

		// localised copy
		{src:"assets/localisation/copy.json", id:"game-copy"}

	];

	WebFontConfig = {
	    google: { families: [ 'Anton::latin', 'Titillium+Web:600italic,700italic:latin' ] },
	    active: function(){ 
	    	onFontsPreloaded();
	    }
	  };
	  (function() {
	    var wf = document.createElement('script');
	    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
	      '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
	    wf.type = 'text/javascript';
	    wf.async = 'true';
	    var s = document.getElementsByTagName('script')[0];
	    s.parentNode.insertBefore(wf, s);
	  })();

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
		GAME.width = 800;
		GAME.height = 480;

		var video = document.getElementById('video');
		video.addEventListener('click',function(){
		  video.play();
		},false);

		if (Modernizr.canvas){
			preLoad();
		}else{
			$("#loader").css("display", "none");
			$("#game-container").css("display", "none");
			$("#no-canvas").css("display", "block");
			$("#wrapper").addClass("no-canvas-bg");
		}

	}

	function onResize(){

		if (GAME.isMobile){

			if (window.innerWidth > window.innerHeight){
			
				// resize canvas
				var width = window.innerWidth;//$(window).width();
		    	var height = window.innerHeight;//$(window).height();


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

			} else {

				GAME.width = 800;
				GAME.height = 480;

				if (game) {
			        var view = game.view.renderer.view;
			        view.style.height = 480 + "px"
			        view.style.width = 800 + "px"
			        game.view.resize(800, 480);
			    }

			}
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

	function onFontsPreloaded(){
		loaded++;
		checkLoaded();
	}


	//--------------------------------------------------------------------------
	//  Initialization
	//--------------------------------------------------------------------------
	function checkLoaded(){
		if (loaded >= 3){
			initApp();
		}
	}

	function initApp(){
		
		//GAME.LO_MODE = true;

		GAME.LOCALISED = audio_assets["game-copy"].copy;

		if ((/iPhone|iPod|iPad|Android/i).test(navigator.userAgent)){

			GAME.isMobile = true;

			// add mobile specific classes
			$("#wrapper").addClass("mobile");
			$("#float").addClass("mobile");
			$("#content-container").addClass("mobile");
			$("#trailer-container").addClass("mobile");

		}

		if ((/Firefox/i).test(navigator.userAgent)){
			GAME.isFireFox = true;
		}


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

    	$("#close-button").mousedown(function(event) {
    		GAME.closeTrailer();
    	});

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

	GAME.openTrailer = function(){

		if (!GAME.trailerOpen){

			GAME.trailerOpen = 1;

			if (game){

				if (!game.soundManager.isMute){
					GAME.wasUnMute = 1;
					game.soundManager.mute();
				}
				
			}

			GAME.pause = 1;

			var video = document.getElementById('video');

			if (GAME.isMobile){
				$("video")[0].width = window.innerWidth;
				$("video")[0].height = window.innerHeight - 200;
			}
			
			//$("video")[0].play();
			video.play();
			$("#trailer-container").css("display", "block");

		}

	}

	GAME.closeTrailer = function(){

		if (GAME.trailerOpen){

			GAME.trailerOpen = 0;

			GAME.pause = 0;
			$("video")[0].pause();
			$("#trailer-container").css("display", "none");

			if (game){

				if (GAME.wasUnMute){
					game.soundManager.unmute();
					GAME.wasUnMute = 0;
				}
			
			}

		}
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
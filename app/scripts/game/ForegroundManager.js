//--------------------------------------------------------------------------
//  Foreground Manager Class
//--------------------------------------------------------------------------
GAME.ForegroundManager = function(engineRef){
	console.log("ForegroundManager");

	this.engine = engineRef;

	// object pools
	this.objectPools = {
		floor: [],
		obstacles: [],
		platforms: []
	}

	// tileables positions
	this.floorPos = 0;
	this.platformPos = 2000;

	this.floorFactory = new GAME.FloorFactory();
	this.platformFactory = new GAME.PlatformFactory();

	this.initFloor();	

}

GAME.ForegroundManager.constructor = GAME.ForegroundManager;

GAME.ForegroundManager.prototype.initFloor = function(){

	// add enough floor tiles to cover the screen
	for (var i=0; i<Math.ceil(GAME.width/this.floorFactory.getFloor().texture.width)+1; i++){

		var floor = this.floorFactory.getFloor();
		floor.position.x = this.floorPos;
		floor.x = this.floorPos;
		floor.position.y = 329;
		floor.y = 329;

		this.engine.view.gameFG.addChild(floor);
		this.objectPools.floor.push(floor);

		this.floorPos += floor.width - 1;

	}

}

GAME.ForegroundManager.prototype.update = function(){

	// move everything in the floor pool
	for (var i=0; i<this.objectPools.floor.length;i++){

		obj = this.objectPools.floor[i];

		obj.position.x = obj.x - GAME.camera.x - 140;

		if (obj.position.x < 0 - obj.width){
			this.floorFactory.floorPool.returnObject(obj);
			this.objectPools.floor.splice(i, 1);
			i--;
			this.engine.view.gameFG.removeChild(obj);
		}

	}

	// add new floor tile
	if (obj.position.x + obj.width < GAME.width){		

		var floor = this.floorFactory.getFloor();
		floor.position.x = Math.round(obj.position.x + obj.width);
		floor.x = this.floorPos;
		floor.position.y = 329;

		this.engine.view.gameFG.addChild(floor);
		this.objectPools.floor.push(floor);

		this.floorPos += floor.width - 1;
	}

	// move everything in the platform pool
	for (var i=0; i<this.objectPools.platforms.length;i++){

		obj = this.objectPools.platforms[i];

		obj.position.x = obj.x - GAME.camera.x - 140;

		if (obj.position.x < 0 - obj.width){
			this.platformFactory.platformPool.returnObject(obj);
			this.objectPools.platforms.splice(i, 1);
			i--;
			this.engine.view.gameFG.removeChild(obj);
		}

	}

	
	// add new platforms
	if (obj.position.x + obj.width < GAME.width){

		var platform = this.platformFactory.getPlatform();
		platform.position.x = Math.round(obj.position.x + obj.width);
		platform.x = this.platformPos;
		platform.position.y = 329;
		platform.y = 329;

		this.engine.view.gameFG.addChild(platform);
		this.objectPools.platforms.push(platform);

		this.platformPos += platform.width + 800;

	}
	

}
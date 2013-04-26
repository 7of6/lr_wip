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
	this.platformPos = 2500;

	this.floorFactory = new GAME.FloorFactory();
	this.platformFactory = new GAME.PlatformFactory();
	this.obstacleFactory = new GAME.ObstacleFactory();

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
	if (obj.position.x + obj.width < GAME.width + this.engine.player.speed.x * 40){		

		var floor = this.floorFactory.getFloor();
		floor.position.x = Math.round(obj.position.x + obj.width);
		floor.x = this.floorPos;
		floor.position.y = 329;

		this.engine.view.gameFG.addChild(floor);
		this.objectPools.floor.push(floor);

		this.floorPos += floor.width - 1;

		// add obstacles
		for (var i=0; i<Math2.randomInt(1,3); i++){

			if (Math2.randomInt(0,2) == 0){

				var randomOffset = Math2.randomInt(0, floor.width);
				this.addObstacle(floor.position.x + randomOffset, floor.x + randomOffset, 329);

			}

		}

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

	/*

	
	// add new platforms
	if (obj.position.x + obj.width < GAME.width){

		var platform = this.platformFactory.getPlatform();
		platform.position.x = Math.round(obj.position.x + obj.width);
		platform.x = this.platformPos;
		platform.position.y = 329;
		platform.y = 329;

		this.engine.view.gameFG.addChild(platform);
		this.objectPools.platforms.push(platform);

		this.platformPos += platform.width + 500;

	}

	*/

	// move everything in the obstacle pool
	for (var i=0; i<this.objectPools.obstacles.length;i++){

		obj = this.objectPools.obstacles[i];

		obj.position.x = obj.x - GAME.camera.x - 140;

		if (obj.position.x < 0 - obj.width){
			this.obstacleFactory.obstaclePool.returnObject(obj);
			this.objectPools.obstacles.splice(i, 1);
			i--;
			this.engine.view.gameFG.removeChild(obj);
		}

	}
	

}

GAME.ForegroundManager.prototype.addObstacle = function(a,b,c) {

    var d = this.obstacleFactory.getObstacle();
    d.position.x = a;
    d.x = b
    d.position.y = c;
    this.objectPools.obstacles.push(d);
    this.engine.view.gameFG.addChild(d)

}
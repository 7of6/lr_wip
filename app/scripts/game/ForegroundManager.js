//--------------------------------------------------------------------------
//  Foreground Manager Class
//--------------------------------------------------------------------------
GAME.ForegroundManager = function(engineRef){
	console.log("ForegroundManager");

	this.engine = engineRef;
	this.obstacleMax = 0;

	this.hasFloorGaps = 0;
	gapAdded = 0;

	FLOOR_Y = 329;
	FLOOR_GAP_WIDTH = 400;

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
		floor.position.y = FLOOR_Y;
		floor.y = FLOOR_Y;

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

		var cap = null;

		if (gapAdded == 1){
			// add cap left
			cap = this.floorFactory.getFloorCap("left");
			cap.position.x = Math.round(obj.position.x + obj.width - 1);
			cap.x = this.floorPos;
			cap.position.y = FLOOR_Y;
			this.objectPools.floor.push(cap);
			gapAdded = 0;
		}

		var floor = this.floorFactory.getFloor();
		floor.position.x = Math.round(obj.position.x + obj.width);
		floor.x = this.floorPos;
		floor.position.y = FLOOR_Y;

		this.engine.view.gameFG.addChild(floor);

		if (cap){
			this.engine.view.gameFG.addChild(cap);
		}

		this.objectPools.floor.push(floor);

		this.floorPos += floor.width - 1;

		if (this.hasFloorGaps == 1){

			// add cap right
			cap = this.floorFactory.getFloorCap("right");
			cap.position.x = Math.round(floor.position.x + floor.width - 1);
			cap.x = this.floorPos;
			cap.position.y = FLOOR_Y;
			this.engine.view.gameFG.addChild(cap);
			this.objectPools.floor.push(cap);
			// declare gap
			this.floorPos += FLOOR_GAP_WIDTH;
			gapAdded = 1;
		}

		// add obstacles
		for (var i=0; i<Math2.randomInt(0,this.obstacleMax); i++){

				var randomOffset = Math2.randomInt(0, floor.width);
				this.addObstacle(floor.position.x + randomOffset, floor.x + randomOffset, FLOOR_Y + 5);

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

			this.addPlatform(obj.position.x + GAME.width + 500, obj.x + GAME.width + 500, FLOOR_Y);
		}

	}

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

GAME.ForegroundManager.prototype.addPlatform = function(a,b,c) {

	var platform = this.platformFactory.getPlatform();
		platform.position.x = a;
		platform.x = b;
		platform.position.y = c;
		platform.y = c;

		this.engine.view.gameFG.addChild(platform);
		this.objectPools.platforms.push(platform);


	// add obstacles
	for (var i=0; i<Math2.randomInt(1,this.obstacleMax); i++){

		if (Math2.randomInt(0,2) == 0){

			var randomOffset = Math2.randomInt(40, platform.width-40);
			this.addObstacle(platform.position.x + randomOffset, platform.x + randomOffset, platform.y - platform.height);

		}

	}

}

GAME.ForegroundManager.prototype.addStepUp = function(a,b,c) {

	var obj = this.platformFactory.getStepUp();

	var platform = obj.step1;
		platform.position.x = a;
		platform.x = b;
		platform.position.y = c;
		platform.y = c;

	var platform2 = obj.step2;
		platform2.position.x = a + platform.width + 10;
		platform2.x = b + platform.width + 10;
		platform2.position.y = c;
		platform2.y = c;

		this.engine.view.gameFG.addChild(platform);
		this.objectPools.platforms.push(platform);

		this.engine.view.gameFG.addChild(platform2);
		this.objectPools.platforms.push(platform2);

}

GAME.ForegroundManager.prototype.addObstacle = function(a,b,c) {

    var d = this.obstacleFactory.getObstacle();
    d.position.x = a;
    d.x = b
    d.position.y = c;
    this.objectPools.obstacles.push(d);
    this.engine.view.gameFG.addChild(d)

}

GAME.ForegroundManager.prototype.reset = function() {

    for (var i = 0; i < this.objectPools.floor.length; i++) {
        var obj = this.objectPools.floor[i];
        this.engine.view.gameFG.removeChild(obj);
    }
    this.objectPools.floor = [];

    for (var i = 0; i < this.objectPools.obstacles.length; i++) {
        var obj = this.objectPools.obstacles[i];
        this.engine.view.gameFG.removeChild(obj);
    }
    this.objectPools.obstacles = [];

    for (var i = 0; i < this.objectPools.platforms.length; i++) {
        var obj = this.objectPools.platforms[i];
        this.engine.view.gameFG.removeChild(obj);
    }
    this.objectPools.platforms = [];

    this.floorPos = 0;

    this.initFloor();
};
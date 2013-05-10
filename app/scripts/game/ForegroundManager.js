//--------------------------------------------------------------------------
//  Foreground Manager Class
//--------------------------------------------------------------------------
GAME.ForegroundManager = function(engineRef){
	console.log("ForegroundManager");

	this.engine = engineRef;
	this.obstacleMax = 0;

	this.hasFloorGaps = 0;
	this.hasPlatforms = 0;
	this.hasFloor = 1;
	this.toNextGap = 0;
	this.gapAdded = 0;


	this.FLOOR_Y = 329;
	this.FLOOR_GAP_WIDTH = 350;

	// object pools
	this.objectPools = {
		floor: [],
		obstacles: [],
		platforms: []
	}

	// tileables positions
	this.floorPos = 0;
	this.platformPos = 0;

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
		floor.position.y = this.FLOOR_Y;
		floor.y = this.FLOOR_Y;

		this.engine.view.gameFG.addChild(floor);
		this.objectPools.floor.push(floor);

		this.floorPos += floor.width - 1;

	}

}

GAME.ForegroundManager.prototype.update = function(){

	// move everything in the floor pool
	for (var i=0; i<this.objectPools.floor.length;i++){

		obj = this.objectPools.floor[i];

		obj.position.x = obj.x - GAME.camera.x - 100;

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

		if (this.gapAdded == 1){
			// add cap left
			cap = this.floorFactory.getFloorCap("left");
			cap.position.x = Math.round(obj.position.x + obj.width - 1);
			cap.x = this.floorPos;
			cap.position.y = this.FLOOR_Y;
			this.objectPools.floor.push(cap);
			this.gapAdded = 0;
		}

		var floor = this.floorFactory.getFloor();
		floor.position.x = Math.round(obj.position.x + obj.width);
		floor.x = this.floorPos;

		if (this.hasFloor){
			floor.position.y = this.FLOOR_Y;
		}else{
			floor.position.y = this.FLOOR_Y + 300;
		}

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
			cap.position.y = this.FLOOR_Y;
			this.engine.view.gameFG.addChild(cap);
			this.objectPools.floor.push(cap);
			// declare gap
			this.floorPos += Math2.randomInt(250, this.FLOOR_GAP_WIDTH);
			this.gapAdded = 1;
		}

		// add obstacles to floor if we don't have platforms
		if (!this.hasPlatforms){

			for (var i=0; i<Math2.randomInt(0,this.obstacleMax); i++){

				var randomOffset = Math2.randomInt(100, floor.width - 150);
				this.addObstacle(floor.position.x + randomOffset, floor.x + randomOffset, this.FLOOR_Y + 5);

			}

		}

	}

	// move everything in the platform pool
	for (var i=0; i<this.objectPools.platforms.length;i++){

		obj = this.objectPools.platforms[i];

		obj.position.x = obj.x - GAME.camera.x - 100;

		if (obj.position.x < 0 - obj.width - 100){
			this.platformFactory.platformPool.returnObject(obj);
			this.objectPools.platforms.splice(i, 1);
			i--;
			this.engine.view.gameFG.removeChild(obj);

		}

	}

	// add new platforms
	if ((GAME.camera.x + GAME.width + 100 > this.platformPos) && this.platformPos != 0 && this.hasPlatforms == 1){
		this.addPlatform();
	}


	// move everything in the obstacle pool
	for (var i=0; i<this.objectPools.obstacles.length;i++){

		obj = this.objectPools.obstacles[i];

		obj.position.x = obj.x - GAME.camera.x - 100;

		if (obj.position.x < 0 - obj.width){
			this.obstacleFactory.obstaclePool.returnObject(obj);
			this.objectPools.obstacles.splice(i, 1);
			i--;
			this.engine.view.gameFG.removeChild(obj);
		}

	}
	

}

GAME.ForegroundManager.prototype.addPlatform = function() {

	var xOffset = Math2.randomInt(40, 150);

	var platform = this.platformFactory.getPlatform();
		platform.position.x = GAME.width + xOffset;
		platform.x = this.platformPos + xOffset;

		if(this.hasFloor){
			platform.position.y = this.FLOOR_Y + 5;
		}else{
			platform.position.y = GAME.height;
		}

		
	
		this.engine.view.gameFG.addChild(platform);
		this.objectPools.platforms.push(platform);

		this.platformPos = platform.x + platform.width + xOffset;


	// add obstacles
	for (var i=0; i<Math2.randomInt(0,this.obstacleMax); i++){

		var randomOffset = Math2.randomInt(100, platform.width - 150);
		this.addObstacle(platform.position.x + randomOffset, platform.x + randomOffset, platform.position.y - platform.hitHeight + 5);

	}

}

GAME.ForegroundManager.prototype.addStepUp = function() {

	var obj = this.platformFactory.getStepUp();

	var platform = obj.step1;
		platform.position.x = GAME.width + 40;
		platform.x = this.floorPos - 80;
		platform.position.y = this.FLOOR_Y + 5;

	var platform2 = obj.step2;
		platform2.position.x = platform.position.x + platform.width + 10;
		platform2.x = platform.x + platform.width + 10;
		platform2.position.y = this.FLOOR_Y + 5;

		this.engine.view.gameFG.addChild(platform);
		this.objectPools.platforms.push(platform);

		this.engine.view.gameFG.addChild(platform2);
		this.objectPools.platforms.push(platform2);

	this.platformPos = platform2.x + platform2.width;

}

GAME.ForegroundManager.prototype.addObstacle = function(a,b,c) {

    var d = this.obstacleFactory.getObstacle();
    d.position.x = a;
    d.x = b
    d.position.y = c;
    this.objectPools.obstacles.push(d);
    this.engine.view.gameFG.addChild(d)

}

GAME.ForegroundManager.prototype.resetFloor = function() {

	this.hasFloor = 1;

    for (var i = 0; i < this.objectPools.floor.length; i++ ){
    	this.objectPools.floor[i].position.y = this.FLOOR_Y;
    }

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
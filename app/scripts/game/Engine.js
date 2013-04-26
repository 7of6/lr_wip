//--------------------------------------------------------------------------
//  Declare Game Object
//--------------------------------------------------------------------------
var GAME = GAME || {};
GAME.camera = new PIXI.Point;
GAME.width, GAME.height;
GAME.LO_MODE = 0;

//--------------------------------------------------------------------------
//  Game Engine Class
//--------------------------------------------------------------------------
GAME.Engine = function() {
	console.log("Engine");

    GAME.level = GAME_LEVEL.DESERT;
    GAME.counter = 0;

	this.player = new GAME.Player;
	this.view = new GAME.View(this);

	this.foregroundManager = new GAME.ForegroundManager(this);
	this.collisionManager = new GAME.CollisionManager(this);

	this.view.gameFG.addChild(this.player.view);

}
GAME.Engine.constructor = GAME.Engine;


GAME.Engine.prototype.update = function() {

    if (!GAME.pause){
    	//GAME.time.update();
        //var a = 0;
        //0 < a && (a = 0); - 70 > a && (a = -70);
        //GAME.camera.y = a;
        this.player.update();
        this.collisionManager.update();
        this.foregroundManager.update();
        this.view.update();
    }
};

GAME.Engine.prototype.onTouch = function() {
	this.player.jump();
};

//--------------------------------------------------------------------------
//  Level Object
//--------------------------------------------------------------------------
var GAME_LEVEL = {
    DESERT: 0,
    INDIAN_VILLAGE: 1,
    TOWN: 2,
    TOWN_ROOFTOPS: 3,
    DESERT2: 4,
    CANYONS: 5
};

//--------------------------------------------------------------------------
//  Time Class
//--------------------------------------------------------------------------
Time = function() {
    this.DELTA_TIME = 1;
    this.lastTime = Date.now();
    this.frames = 0;
    this.speed = 1
};
Time.constructor = Time;
Time.prototype.update = function() {
    this.frames++;
    var now = Date.now();
    this.frames = 0;
    this.DELTA_TIME = 0.06 * (now - this.lastTime);
    this.DELTA_TIME *= this.speed;
    2.3 < this.DELTA_TIME && (this.DELTA_TIME = 2.3);
    this.lastTime = now
};
GAME.time = new Time;
//--------------------------------------------------------------------------
//  Declare Game Object
//--------------------------------------------------------------------------
var GAME = GAME || {};
GAME.camera = new PIXI.Point;
GAME.width, GAME.height;
GAME.LO_MODE = 0;
GAME.GOAL_DISTANCE = 20000;

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

    this.sectionManager = new GAME.SectionManager(this);

	this.view.gameFG.addChild(this.player.view);

}
GAME.Engine.constructor = GAME.Engine;


GAME.Engine.prototype.update = function() {

    if (!GAME.pause){

        this.player.update();
        this.collisionManager.update();
        this.foregroundManager.update();
        this.view.update();

        //console.log(GAME.camera.y);

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
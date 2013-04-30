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

    GAME.level = GAME_LEVEL.TUTORIAL;
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
        this.sectionManager.update();

        //console.log(GAME.camera.y);

    }
};

GAME.Engine.prototype.reset = function(){

    this.player.reset();
    this.view.reset();
    this.foregroundManager.reset();
    this.sectionManager.reset();
    this.view.gameFG.addChild(this.player.view);
    GAME.level = GAME_LEVEL.TUTORIAL;
    GAME.counter = 0;

}

GAME.Engine.prototype.onTouch = function() {
	this.player.jump();
};
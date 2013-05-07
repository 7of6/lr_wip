//--------------------------------------------------------------------------
//  Game Engine Class
//--------------------------------------------------------------------------
GAME.Engine = function() {
	console.log("Engine");

    GAME.level = GAME_LEVEL.START;
    GAME.counter = 0;

	this.player = new GAME.Player(this);
    //this.tonto = new GAME.Tonto(this);
	this.view = new GAME.View(this);

	this.foregroundManager = new GAME.ForegroundManager(this);
	this.collisionManager = new GAME.CollisionManager(this);
    this.sectionManager = new GAME.SectionManager(this);
    this.soundManager = new GAME.SoundManager();

    //this.view.gameFG.addChild(this.tonto.view);
    this.view.gameFG.addChild(this.player.view);

    this.gameoverScreen = new GAME.GameOver(this);
    this.titleScreen = new GAME.Title(this);

    this.view.screens.addChild(this.titleScreen);
    //this.view.screens.addChild(this.gameoverScreen);

    this.soundManager.playMusic("intro-music");

}
GAME.Engine.constructor = GAME.Engine;


GAME.Engine.prototype.update = function() {

    if (!GAME.pause){

        if (!GAME.gameover){
            this.player.update();
            this.collisionManager.update();
            this.foregroundManager.update();
            this.sectionManager.update();
        }
        this.view.update();

    }
};

GAME.Engine.prototype.reset = function(){

    this.view.screens.removeChild(this.view.screens.getChildAt(0));
    this.view.progressbar.reset();
    this.view.progressbar.show();
    this.player.reset();
    this.view.reset();
    this.foregroundManager.reset();
    this.sectionManager.reset();
    GAME.level = GAME_LEVEL.START;
    GAME.counter = 0;
    GAME.gameover = 0;
    this.soundManager.playMusic("game-music");

}

GAME.Engine.prototype.onGameOver = function(){

    GAME.gameover = 1;

    this.view.progressbar.hide();

    // set some things in game over
    // ???

    this.view.screens.addChild(this.gameoverScreen);
    this.soundManager.playMusic("failed-music");

}

GAME.Engine.prototype.onTouch = function() {
	this.player.jump();
};
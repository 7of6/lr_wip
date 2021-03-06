//--------------------------------------------------------------------------
//  Game Engine Class
//--------------------------------------------------------------------------
GAME.Engine = function() {

    GAME.level = GAME_LEVEL.START;
    GAME.tutorial = 0;
    GAME.seenTutorial = 0;

	this.player = new GAME.Player(this);
    this.tonto = new GAME.Tonto(this);
	this.view = new GAME.View(this);

	this.foregroundManager = new GAME.ForegroundManager(this);
	this.collisionManager = new GAME.CollisionManager(this);
    this.sectionManager = new GAME.SectionManager(this);
    this.soundManager = new GAME.SoundManager();   

    this.view.gameFG.addChild(this.tonto.view);
    this.view.playerHolder.addChild(this.player.view);

    this.gameoverScreen = new GAME.GameOver(this);
    this.gamecompleteScreen = new GAME.GameComplete(this);
    this.titleScreen = new GAME.Title(this);

    this.view.screens.addChild(this.titleScreen);
    
    // testing
    //GAME.seenTutorial = 1;
    //this.reset();
    //this.soundManager.mute();
    //this.view.screens.addChild(this.gamecompleteScreen);

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

            if (this.player.position.y < 200 && !this.view.platformView){
                this.view.toPlatformView();
            }

            if (this.player.position.y > GAME.height - 200 && this.view.platformView){
                this.view.toNormalView();
            }

        }
        this.view.update();

    }
};

GAME.Engine.prototype.reset = function(){

    this.view.screens.removeChild(this.view.screens.getChildAt(0));
    this.view.progressbar.reset();
    this.view.progressbar.show();
    this.player.reset();
    this.tonto.reset();
    this.view.reset();
    this.foregroundManager.reset();
    this.sectionManager.reset();

    GAME.level = GAME_LEVEL.START;

    GAME.counter = 0;
    GAME.gameover = 0;
    this.soundManager.playMusic("game-music");

}

GAME.Engine.prototype.onGameOver = function(){

    this.soundManager.playSound("gameover-sound");
    // set some things in game over
    var current_pos = Math.round((this.player.position.x / 10) - GAME_MILESTONES[1]);
    var perc = ((current_pos / GAME.GOAL_DISTANCE)*100);
    this.gameoverScreen.setProgress(perc);

    GAME.gameover = 1;
    this.view.progressbar.hide();

    this.view.fade.addChild(this.view.blackFill);

    this.view.screens.addChild(this.gameoverScreen);
    this.soundManager.playMusic("failed-music");

}

GAME.Engine.prototype.onGameComplete = function(){

    this.soundManager.playSound("gameover-sound");
    // set some things in game complete
    var time = this.view.progressbar.timeDisplay.text
    this.gamecompleteScreen.setTime(time);

    GAME.gameover = 1;
    this.view.progressbar.hide();

    this.view.fade.addChild(this.view.blackFill);

    this.view.screens.addChild(this.gamecompleteScreen);
    this.soundManager.playMusic("complete-music");

    ga('send', 'event', 'Game', 'Complete');

}

GAME.Engine.prototype.onTouch = function() {

    if (!GAME.pause){
        if (GAME.tutorial){
            this.view.tutorial.skip();
        } else {
            this.player.jump();
        }
    }
	
}
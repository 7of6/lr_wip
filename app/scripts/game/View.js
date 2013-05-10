//--------------------------------------------------------------------------
//  View Class
//--------------------------------------------------------------------------
GAME.View = function(engineRef) {
	console.log("View");

    var self = this;

	this.engine = engineRef;
	this.renderer = PIXI.autoDetectRenderer(800, 480);
	this.stage = new PIXI.Stage(0x000000, true);

	this.container = new PIXI.DisplayObjectContainer;
    this.platformView = false;

    // hud
    this.hud = new PIXI.DisplayObjectContainer;
    this.progressbar = new GAME.ProgressBar();
    this.hud.addChild(this.progressbar);

    // sound
    this.soundButton = new PIXI.DisplayObjectContainer;
    this.soundOn = new PIXI.Sprite(PIXI.Texture.fromFrame("sound_on.png"));
    this.soundOff = new PIXI.Sprite(PIXI.Texture.fromFrame("sound_off.png"));
    this.soundOff.position.x = 0;
    this.soundOff.position.y = 3;

    this.soundButton.addChild(this.soundOn);

    this.soundButton.position.x = GAME.width - 40;
    this.soundButton.position.y = 10;
    this.soundButton.setInteractive(true);
    this.soundButton.buttonMode = true;
    this.soundButton.mousedown = this.soundButton.touchstart = function(){ self.soundToggle(); }

    this.hud.addChild(this.soundButton);

    // screens
    this.screens = new PIXI.DisplayObjectContainer;

    // footer
    this.footer = new GAME.Footer;
    this.footer.position.y = 405;
    this.hud.addChild(this.footer);

    // non-interactive background items
    this.gameBG = new PIXI.DisplayObjectContainer;
    // interactive foreground items
    this.gameFG = new PIXI.DisplayObjectContainer;
    // player
    this.playerHolder = new PIXI.DisplayObjectContainer;
    
    this.container.addChild(this.gameBG);
    this.container.addChild(this.gameFG);
    this.container.addChild(this.playerHolder);
    this.container.addChild(this.screens);
    
    this.stage.addChild(this.container);
    this.stage.addChild(this.hud);

	this.background = new GAME.BackgroundManager(this.engine);

	this.gameBG.addChild(this.background);

}
GAME.View.constructor = GAME.View;


GAME.View.prototype.update = function() {

    this.renderer.render(this.stage);

    this.progressbar.setProgress((this.engine.player.position.x / 10) / GAME.GOAL_DISTANCE);

};

GAME.View.prototype.reset = function(){
    this.background.reset();

    this.gameFG.position.y = 0;
    this.playerHolder.position.y = 0;
    this.background.middistance.position.y = 0;
    this.platformView = false;
    
}

GAME.View.prototype.resize = function(width, height) {
    GAME.width = width;
    GAME.height = height;
    this.renderer.resize(width, height);
    this.background.width = width;
    this.progressbar.position.x = (width - this.progressbar.width) / 2;
    this.footer.position.x = (width - 800) / 2;
    this.screens.position.x = (width - 800) / 2;
    this.soundButton.position.x = width - 40;
 
};

GAME.View.prototype.soundToggle = function(){
    this.engine.soundManager.toggleMute();  

    if (this.engine.soundManager.isMute){
        this.soundButton.removeChild(this.soundOn);
        this.soundButton.addChild(this.soundOff);
    } else {
        this.soundButton.removeChild(this.soundOff);
        this.soundButton.addChild(this.soundOn);
    }
}

GAME.View.prototype.toPlatformView = function(){

    this.platformView = true;
    // move the view up for rooftops
    TweenMax.to(this.gameFG.position, 1, {y:150, delay:1});
    TweenMax.to(this.playerHolder.position, 1, {y:150, delay:1});
    TweenMax.to(this.background.middistance.position, 1, {y:150, delay:1});

}

GAME.View.prototype.toNormalView = function(){

    this.platformView = false;
    // move the view back down to floor level
    TweenMax.to(this.gameFG.position, 1, {y:0, delay:0});
    TweenMax.to(this.playerHolder.position, 1, {y:0, delay:0});
    TweenMax.to(this.background.middistance.position, 1, {y:0, delay:0});

}

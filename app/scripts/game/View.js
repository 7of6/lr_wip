//--------------------------------------------------------------------------
//  View Class
//--------------------------------------------------------------------------
GAME.View = function(engineRef) {

    var self = this;

	this.engine = engineRef;
	this.renderer = PIXI.autoDetectRenderer(800, 480);
	this.stage = new PIXI.Stage(0x000000, true);

	this.container = new PIXI.DisplayObjectContainer;
    this.platformView = false;

    // hud
    this.hud = new PIXI.DisplayObjectContainer;
    this.progressbar = new GAME.ProgressBar(this.engine);
    this.hud.addChild(this.progressbar);
    this.tutorial = new GAME.Tutorial(this.engine);

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

    this.whiteFill = new PIXI.Sprite(PIXI.Texture.fromFrame("white_block.png"));
    this.whiteFill.anchor.x = 0.25;
    this.whiteFill.anchor.y = 0.25;
    this.whiteFill.width = GAME.width * 2;
    this.whiteFill.height = GAME.height * 2;   

    this.blackFill = new PIXI.Sprite(PIXI.Texture.fromFrame("black_block.png"));
    this.blackFill.anchor.x = 0.25;
    this.blackFill.anchor.y = 0.25;
    this.blackFill.width = GAME.width * 2;
    this.blackFill.height = GAME.height * 2;   

    // footer
    this.footer = new GAME.Footer(engineRef);
    this.footer.position.y = 405;
    this.hud.addChild(this.footer);

    // non-interactive background items
    this.gameBG = new PIXI.DisplayObjectContainer;
    // non-interactive midground items
    this.gameMG = new PIXI.DisplayObjectContainer;
    // interactive foreground items
    this.gameFG = new PIXI.DisplayObjectContainer;

    // fade holder
    this.fade = new PIXI.DisplayObjectContainer;

    // player
    this.playerHolder = new PIXI.DisplayObjectContainer;
    
    this.container.addChild(this.gameBG);
    this.container.addChild(this.gameMG);
    this.container.addChild(this.gameFG);
    this.container.addChild(this.playerHolder);
    this.container.addChild(this.fade);
    this.container.addChild(this.screens);
    
    this.stage.addChild(this.container);
    this.stage.addChild(this.hud);

	this.backgroundManager = new GAME.BackgroundManager(this.engine);

	this.gameBG.addChild(this.backgroundManager);

    this.fade.addChild(this.blackFill);

}
GAME.View.constructor = GAME.View;


GAME.View.prototype.update = function() {

    if (!GAME.gameover && !GAME.pause){
        this.progressbar.update();
    }

    this.renderer.render(this.stage);

};

GAME.View.prototype.reset = function(){
    this.backgroundManager.reset();

    this.gameFG.position.y = 0;
    this.playerHolder.position.y = 0;
    this.backgroundManager.middistance.position.y = 0;
    this.platformView = false;
    this.fade.removeChild(this.blackFill);
    
}

GAME.View.prototype.resize = function(width, height) {
    GAME.width = width;
    GAME.height = height;
    this.renderer.resize(width, height);
    this.backgroundManager.width = width;
    this.progressbar.position.x = (width - this.progressbar.width) / 2;
    this.footer.position.x = (width - 800) / 2;
    this.screens.position.x = (width - 800) / 2;
    this.soundButton.position.x = width - 40;
    this.tutorial.resize(); 
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

GAME.View.prototype.flashScreen = function(){

    var self = this;

    this.fade.addChild(this.whiteFill);
    TweenMax.to(this.whiteFill, 0.5, {alpha:0, delay:0.2, onComplete:function(){

        self.fade.removeChild(self.whiteFill);
        self.whiteFill.alpha = 1;

    }});
}

GAME.View.prototype.toPlatformView = function(){

    this.platformView = true;
    // move the view up for rooftops
    TweenMax.to(this.gameFG.position, 1, {y:150, delay:0});
    TweenMax.to(this.gameMG.position, 1, {y:150, delay:0});
    TweenMax.to(this.playerHolder.position, 1, {y:150, delay:0});
    TweenMax.to(this.backgroundManager.middistance.position, 1, {y:150, delay:0});
    TweenMax.to(this.backgroundManager.train.position, 1, {y:150 + 171, delay:0});

}

GAME.View.prototype.toNormalView = function(){

    this.platformView = false;
    // move the view back down to floor level
    TweenMax.to(this.gameFG.position, 1, {y:0, delay:0});
    TweenMax.to(this.gameMG.position, 1, {y:0, delay:0});
    TweenMax.to(this.playerHolder.position, 1, {y:0, delay:0});
    TweenMax.to(this.backgroundManager.middistance.position, 1, {y:0, delay:0});
    TweenMax.to(this.backgroundManager.train.position, 1, {y:171, delay:0});

}

//--------------------------------------------------------------------------
//  View Class
//--------------------------------------------------------------------------
GAME.View = function(engineRef) {
	console.log("View");
	this.engine = engineRef;
	this.renderer = PIXI.autoDetectRenderer(800, 480);
	this.stage = new PIXI.Stage(0x000000, true);

	this.container = new PIXI.DisplayObjectContainer;

    // hud
    this.hud = new PIXI.DisplayObjectContainer;
    this.progressbar = new GAME.ProgressBar();
    this.hud.addChild(this.progressbar);

    // screens
    this.screens = new PIXI.DisplayObjectContainer;

    // footer
    this.footer = new PIXI.Sprite(PIXI.Texture.fromFrame("footer.jpg"));
    this.footer.position.y = 405;
    this.hud.addChild(this.footer);

    // non-interactive background items
    this.gameBG = new PIXI.DisplayObjectContainer;
    // interactive foreground items
    this.gameFG = new PIXI.DisplayObjectContainer;
    
    this.container.addChild(this.gameBG);
    this.container.addChild(this.gameFG);
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
    
}

GAME.View.prototype.resize = function(width, height) {
    GAME.width = width;
    GAME.height = height;
    this.renderer.resize(width, height);
    this.background.width = width;
    this.progressbar.position.x = (width - this.progressbar.width) / 2;
 
};

GAME.View.prototype.toPlatformView = function(){

    // move the view up for rooftops
    TweenMax.to(this.gameFG.position, 1, {y:100, delay:1});
    TweenMax.to(this.background.middistance.position, 1, {y:100, delay:1});

}

GAME.View.prototype.toNormalView = function(){

    // move the view back down to floor level
    TweenMax.to(this.gameFG.position, 1, {y:0, delay:1});
    TweenMax.to(this.background.middistance.position, 1, {y:0, delay:1});

}

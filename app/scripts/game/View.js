//--------------------------------------------------------------------------
//  View Class
//--------------------------------------------------------------------------
GAME.View = function(engineRef) {
	console.log("View");
	this.engine = engineRef;
	this.renderer = PIXI.autoDetectRenderer(800, 450);
	this.stage = new PIXI.Stage;

	this.container = new PIXI.DisplayObjectContainer;
    this.hud = new PIXI.DisplayObjectContainer;
    // non-interactive background items
    this.gameBG = new PIXI.DisplayObjectContainer;
    // interactive foreground items
    this.gameFG = new PIXI.DisplayObjectContainer;
    
    this.container.addChild(this.gameBG);
    this.container.addChild(this.gameFG);
    
    this.stage.addChild(this.container);
    this.stage.addChild(this.hud);

	this.background = GAME.LO_MODE ? new GAME.LoBackground : new GAME.BackgroundManager();

	this.gameBG.addChild(this.background);

}
GAME.View.constructor = GAME.View;


GAME.View.prototype.update = function() {

    this.renderer.render(this.stage);

};

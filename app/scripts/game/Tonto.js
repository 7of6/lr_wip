//--------------------------------------------------------------------------
//  Tonto Class
//--------------------------------------------------------------------------
GAME.Tonto = function(engineRef){

	this.engine = engineRef;

	this.position = new PIXI.Point;

	// defaults
	this.position.y = 355;
    this.position.x = -100;
    this.currentAnimSpeed = 0.3;

    this.baseSpeed = 4;
    this.speed = new PIXI.Point(this.baseSpeed, 0);

	// animation frames
	this.runningFrames = [
		PIXI.Texture.fromFrame("scout_run_final_75percent.swf/0000"),
		PIXI.Texture.fromFrame("scout_run_final_75percent.swf/0001"),
		PIXI.Texture.fromFrame("scout_run_final_75percent.swf/0002"),
		PIXI.Texture.fromFrame("scout_run_final_75percent.swf/0003"),
		PIXI.Texture.fromFrame("scout_run_final_75percent.swf/0004"),
		PIXI.Texture.fromFrame("scout_run_final_75percent.swf/0005"),
		PIXI.Texture.fromFrame("scout_run_final_75percent.swf/0006"),
		PIXI.Texture.fromFrame("scout_run_final_75percent.swf/0007")
	];

	this.view = new PIXI.MovieClip(this.runningFrames);
	this.view.anchor.x = 0.5;
    this.view.anchor.y = 1;

	this.view.animationSpeed = this.currentAnimSpeed;
  
    this.view.position.x = this.position.x;
    this.view.position.y = this.position.y;

}

GAME.Tonto.constructor = GAME.Tonto;

GAME.Tonto.prototype.catchUp = function(){
	
	this.view.play();
	TweenMax.to(this.view.position, 2, {x:40, delay:3});

}

GAME.Tonto.prototype.fallBack = function(){

	var self = this;

	TweenMax.to(this.view.position, 2, {x:-100, delay:3, onComplete:function(){
		self.view.stop();
	}});
}

GAME.Tonto.prototype.reset = function(){

	TweenMax.killTweensOf(this.view.position);
	this.view.position.x = -100;
	this.view.animationSpeed = this.currentAnimSpeed;
}
//--------------------------------------------------------------------------
//  Tonto Class
//--------------------------------------------------------------------------
GAME.Tonto = function(engineRef){
	console.log("Tonto");

	this.engine = engineRef;

	this.position = new PIXI.Point;

	// defaults
	this.position.y = 338;
    this.position.x = 40;
    this.currentAnimSpeed = 0.3;

    this.baseSpeed = 4;
    this.speed = new PIXI.Point(this.baseSpeed, 0);

	// animation frames
	this.runningFrames = [
		PIXI.Texture.fromFrame("scout_run_final_v2.swf/0000"),
		PIXI.Texture.fromFrame("scout_run_final_v2.swf/0001"),
		PIXI.Texture.fromFrame("scout_run_final_v2.swf/0002"),
		PIXI.Texture.fromFrame("scout_run_final_v2.swf/0003"),
		PIXI.Texture.fromFrame("scout_run_final_v2.swf/0004"),
		PIXI.Texture.fromFrame("scout_run_final_v2.swf/0005"),
		PIXI.Texture.fromFrame("scout_run_final_v2.swf/0006"),
		PIXI.Texture.fromFrame("scout_run_final_v2.swf/0007")
	];

	this.view = new PIXI.MovieClip(this.runningFrames);
	this.view.anchor.x = 0.5;
    this.view.anchor.y = 1;

	this.view.animationSpeed = this.currentAnimSpeed;
    this.view.play();

    this.view.position.x = this.position.x;
    this.view.position.y = this.position.y;

}

GAME.Tonto.constructor = GAME.Tonto;

GAME.Tonto.prototype.update = function() {

    this.position.x += this.speed.x;
  
    this.view.position.x = this.position.x - GAME.camera.x;
    this.view.position.y = this.position.y - GAME.camera.y;
}
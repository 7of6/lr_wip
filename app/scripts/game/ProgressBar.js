//--------------------------------------------------------------------------
//  Progress Bar Class
//--------------------------------------------------------------------------
GAME.ProgressBar = function(engineRef){
	PIXI.DisplayObjectContainer.call(this);

	this.engine = engineRef;

	this.position.y = -100;
	this.BULLET_START = 4;
	this.BAR_MAX = 285;
	this.time = 0;
	this.last_time = 0;

	var barContainer = PIXI.Texture.fromFrame("progress_bar.png");

	this.width = barContainer.width;
	this.addChild(new PIXI.Sprite(barContainer));
	this.position.x = Math.round((GAME.width - this.width) / 2);

	// text 
	this.distanceText = new PIXI.Text(GAME.LOCALISED.DISTANCE + ":", {font: "25px InGameFont", fill: "#f26622", stroke: "#333333", strokeThickness: 4});
	this.distanceText.anchor.x = 0;
	this.distanceText.anchor.y = 0;
	this.distanceText.position.x = 15;
	this.distanceText.position.y = 15;

	this.addChild(this.distanceText);

	this.timeText = new PIXI.Text(GAME.LOCALISED.TIME + ":", {font: "25px InGameFont", fill: "#f26622", stroke: "#333333", strokeThickness: 4});
	this.timeText.anchor.x = 0;
	this.timeText.anchor.y = 0;
	this.timeText.position.x = 440;
	this.timeText.position.y = 15;

	this.addChild(this.timeText);

	this.timeDisplay = new PIXI.Text("0:00", {font: "40px InGameFont", fill: "#ffffff", stroke: "#333333", strokeThickness: 4});
	this.timeDisplay.anchor.x = 0;
	this.timeDisplay.anchor.y = 0;
	this.timeDisplay.position.x = 490;
	this.timeDisplay.position.y = 5;

	this.addChild(this.timeDisplay);

	// progress

	var progressContainer = new PIXI.DisplayObjectContainer;
	progressContainer.position.x = 106;
	progressContainer.position.y = 15;


	var barLeft = new PIXI.Sprite(PIXI.Texture.fromFrame("bar_inner_left.png"));
	barLeft.position.x = 0;
	barLeft.position.y = 12;
	progressContainer.addChild(barLeft);

	this.bar = new PIXI.Sprite(PIXI.Texture.fromFrame("bar_inner.png"));
	this.bar.position.x = 2;
	this.bar.position.y = 11;
	this.bar.width = 1;
	progressContainer.addChild(this.bar);


	this.bullet = new PIXI.Sprite(PIXI.Texture.fromFrame("silver_bullet.png"));
	this.bullet.position.y = 0;
	this.bullet.position.x = this.BULLET_START;
	progressContainer.addChild(this.bullet);

	this.addChild(progressContainer);

}
GAME.ProgressBar.constructor = GAME.ProgressBar;
GAME.ProgressBar.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);

//--------------------------------------------------------------------------
//  API
//--------------------------------------------------------------------------
GAME.ProgressBar.prototype.update = function(){
	
	this.setProgress((this.engine.player.position.x / 10) / GAME.GOAL_DISTANCE);

	if (this.last_time != this.time){
		this.timeDisplay.setText(Math2.formatTime(this.time));
		this.last_time = this.time;
	}

}

GAME.ProgressBar.prototype.reset = function(){
	this.time = 0;
	this.timeDisplay.setText("0:00");
	window.clearInterval(this.timer);
}

GAME.ProgressBar.prototype.show = function(){
	TweenMax.to(this.position, 0.5, {y:0});
}

GAME.ProgressBar.prototype.hide = function(){
	TweenMax.to(this.position, 0.5, {y:-100});
}


GAME.ProgressBar.prototype.setProgress = function(perc){

	var perc = (perc > 1) ? 1 : perc;

	this.bar.width = Math.round(this.BAR_MAX * perc);
	this.bullet.position.x = Math.round(this.BAR_MAX * perc + this.BULLET_START - this.bullet.width);

}

GAME.ProgressBar.prototype.startTime = function(){

	var self = this;
    
	this.timer = window.setInterval(function()
	{

		if (!GAME.pause && !GAME.gameover){

			self.time += 100; 

		}

	}, 1000);
}

GAME.ProgressBar.prototype.stopTime = function(){
	window.clearInterval(this.timer);
}
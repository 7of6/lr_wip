//--------------------------------------------------------------------------
//  Progress Bar Class
//--------------------------------------------------------------------------
GAME.ProgressBar = function(){
	PIXI.DisplayObjectContainer.call(this);

	this.position.y = -100;
	this.BULLET_START = 110;
	this.BAR_MAX = 285;
	this.time = 0;

	var barContainer = PIXI.Texture.fromFrame("progress_bar.png");

	this.width = barContainer.width;
	this.addChild(new PIXI.Sprite(barContainer));
	this.position.x = Math.round((GAME.width - this.width) / 2);

	// text 
	this.distanceText = new PIXI.Text(" ", "25px InGameFont", "#f26622", "#333333", 4);
	this.distanceText.anchor.x = 0;
	this.distanceText.anchor.y = 0;
	this.distanceText.position.x = 15;
	this.distanceText.position.y = 15;

	this.addChild(this.distanceText);

	this.timeText = new PIXI.Text(" ", "25px InGameFont", "#f26622", "#333333", 4);
	this.timeText.anchor.x = 0;
	this.timeText.anchor.y = 0;
	this.timeText.position.x = 440;
	this.timeText.position.y = 15;

	this.addChild(this.timeText);

	this.timeDisplay = new PIXI.Text("0:00", "40px InGameFont", "#ffffff", "#333333", 4);
	this.timeDisplay.anchor.x = 0;
	this.timeDisplay.anchor.y = 0;
	this.timeDisplay.position.x = 490;
	this.timeDisplay.position.y = 5;

	this.addChild(this.timeDisplay);

	// progress
	var barLeft = new PIXI.Sprite(PIXI.Texture.fromFrame("bar_inner_left.png"));
	barLeft.position.x = 106;
	barLeft.position.y = 27;
	this.addChild(barLeft);

	this.bar = new PIXI.Sprite(PIXI.Texture.fromFrame("bar_inner.png"));
	this.bar.position.x = 108;
	this.bar.position.y = 26;
	this.bar.width = 1;
	this.addChild(this.bar);


	this.bullet = new PIXI.Sprite(PIXI.Texture.fromFrame("silver_bullet.png"));
	this.bullet.position.y = 15;
	this.bullet.position.x = this.BULLET_START;
	this.addChild(this.bullet);

	this.startTime();

	this.setProgress(0);

	this.localiseText();

}
GAME.ProgressBar.constructor = GAME.ProgressBar;
GAME.ProgressBar.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);

//--------------------------------------------------------------------------
//  API
//--------------------------------------------------------------------------
GAME.ProgressBar.prototype.reset = function(){
	this.time = 0;
}

GAME.ProgressBar.prototype.show = function(){
	TweenMax.to(this.position, 0.5, {y:0});
}

GAME.ProgressBar.prototype.hide = function(){
	TweenMax.to(this.position, 0.5, {y:-100});
}


GAME.ProgressBar.prototype.setProgress = function(perc){

	var perc = (perc > 1) ? 1 : perc;

	this.bar.width = this.BAR_MAX * perc;
	this.bullet.position.x = this.BAR_MAX * perc + this.BULLET_START - this.bullet.width;

}

GAME.ProgressBar.prototype.startTime = function(){

	var minutes = 0,
	seconds = 0,
    elapsed = "0:00",
    self = this;
    
	window.setInterval(function()
	{

		if (!GAME.paused && !GAME.gameover){

			self.time += 100;
		    elapsed = Math.floor(self.time / 100);

		    if (elapsed >= 60){
		    	minutes = Math.floor(elapsed / 60);
		    }

		    seconds = elapsed - (60 * minutes);

		    if (seconds < 10){
		    	seconds = "0" + seconds;
		    }
		    
		    self.timeDisplay.setText( minutes + ":" + seconds );

		}

	}, 1000);
}

GAME.ProgressBar.prototype.localiseText = function(){

	this.distanceText.setText("Distance:");
	this.timeText.setText("Time:");

}
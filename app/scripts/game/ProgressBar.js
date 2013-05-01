//--------------------------------------------------------------------------
//  Progress Bar Class
//--------------------------------------------------------------------------
GAME.ProgressBar = function(){
	PIXI.DisplayObjectContainer.call(this);

	BULLET_START = 110;
	BAR_MAX = 285;

	var barContainer = PIXI.Texture.fromFrame("progress_bar.png");

	this.width = barContainer.width;
	this.addChild(new PIXI.Sprite(barContainer));
	this.position.x = Math.round((GAME.width - this.width) / 2);

	// text 
	distanceText = new PIXI.Text(" ", "25px InGameFont", "#f26622", "#333333", 4);
		distanceText.anchor.x = 0;
		distanceText.anchor.y = 0;
		distanceText.position.x = 15;
		distanceText.position.y = 15;

	this.addChild(distanceText);

	timeText = new PIXI.Text(" ", "25px InGameFont", "#f26622", "#333333", 4);
		timeText.anchor.x = 0;
		timeText.anchor.y = 0;
		timeText.position.x = 440;
		timeText.position.y = 15;

	this.addChild(timeText);

	timeDisplay = new PIXI.Text("0:00", "40px InGameFont", "#ffffff", "#333333", 4);
		timeDisplay.anchor.x = 0;
		timeDisplay.anchor.y = 0;
		timeDisplay.position.x = 490;
		timeDisplay.position.y = 5;

	this.addChild(timeDisplay);

	// progress
	var barLeft = new PIXI.Sprite(PIXI.Texture.fromFrame("bar_inner_left.png"));
	barLeft.position.x = 106;
	barLeft.position.y = 27;
	this.addChild(barLeft);

	bar = new PIXI.Sprite(PIXI.Texture.fromFrame("bar_inner.png"));
	bar.position.x = 108;
	bar.position.y = 26;
	bar.width = 1;
	this.addChild(bar);


	bullet = new PIXI.Sprite(PIXI.Texture.fromFrame("silver_bullet.png"));
	bullet.position.y = 15;
	bullet.position.x = BULLET_START;
	this.addChild(bullet);

	this.startTime();

	this.setProgress(0);

	TweenMax.delayedCall(0.2, this.localiseText);

}
GAME.ProgressBar.constructor = GAME.ProgressBar;
GAME.ProgressBar.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);

//--------------------------------------------------------------------------
//  API
//--------------------------------------------------------------------------

GAME.ProgressBar.prototype.setProgress = function(perc){

	perc = (perc > 1) ? 1 : perc;

	bar.width = BAR_MAX * perc;
	bullet.position.x = BAR_MAX * perc + BULLET_START - bullet.width;

}

GAME.ProgressBar.prototype.startTime = function(){

	var time = 0,
	minutes = 0,
	seconds = 0,
    elapsed = "0:00";
	window.setInterval(function()
	{
	    time += 100;
	    elapsed = Math.floor(time / 100);

	    if (elapsed >= 60){
	    	minutes = Math.floor(elapsed / 60);
	    }

	    seconds = elapsed - (60 * minutes);

	    if (seconds < 10){
	    	seconds = "0" + seconds;
	    }
	    
	    timeDisplay.setText( minutes + ":" + seconds );

	}, 1000);
}

GAME.ProgressBar.prototype.localiseText = function(){

	distanceText.setText("Distance:");
	timeText.setText("Time:");

}
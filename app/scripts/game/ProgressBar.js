//--------------------------------------------------------------------------
//  Progress Bar Class
//--------------------------------------------------------------------------
GAME.ProgressBar = function(){
	PIXI.DisplayObjectContainer.call(this);

	var bar = PIXI.Texture.fromFrame("progress_bar.png");

	this.width = bar.width;
	this.addChild(new PIXI.Sprite(bar));
	this.position.x = Math.round((GAME.width - this.width) / 2);
 
	distanceText = new PIXI.Text(" ", "25px haettenschweilerregular", "#f26622", "#333333", 4);
		distanceText.anchor.x = 0;
		distanceText.anchor.y = 0;
		distanceText.position.x = 15;
		distanceText.position.y = 15;

	this.addChild(distanceText);

	timeText = new PIXI.Text(" ", "25px haettenschweilerregular", "#f26622", "#333333", 4);
		timeText.anchor.x = 0;
		timeText.anchor.y = 0;
		timeText.position.x = 440;
		timeText.position.y = 15;

	this.addChild(timeText);

	timeDisplay = new PIXI.Text(" ", "40px haettenschweilerregular", "#ffffff", "#333333", 4);
		timeDisplay.anchor.x = 0;
		timeDisplay.anchor.y = 0;
		timeDisplay.position.x = 490;
		timeDisplay.position.y = 5;

	this.addChild(timeDisplay);

	this.startTime();

	TweenMax.delayedCall(0.2, this.localiseText);

}
GAME.ProgressBar.constructor = GAME.ProgressBar;
GAME.ProgressBar.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);

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
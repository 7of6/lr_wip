//--------------------------------------------------------------------------
//  Game Complete Screen Class
//--------------------------------------------------------------------------
GAME.GameComplete = function(engineRef){
	console.log("Game Complete");

    PIXI.DisplayObjectContainer.call(this);

    var self = this;

    this.engine = engineRef;

    // background
    this.addChild(new PIXI.Sprite(PIXI.Texture.fromFrame("game_over_win.jpg")));

    // status
    var missionText = new PIXI.Text("MISSION", {font: "27px InGameFont", fill: "#ffffff", align: "left"});
    missionText.position.x = 467;
    missionText.position.y = 65;
    this.addChild(missionText);
    var failedText = new PIXI.Text("COMPLETE!", {font: "51px InGameFont", fill: "#ffffff", align: "left"});
    failedText.position.x = 543;
    failedText.position.y = 52;
    this.addChild(failedText);

    var distanceText = new PIXI.Text("TIME:", {font: "25px InGameFont", fill: "#000000", align: "left"});
    distanceText.position.x = 460;
    distanceText.position.y = 152;
    this.addChild(distanceText);
    this.resultText = new PIXI.Text("0:00", {font: "78px InGameFont", fill: "#f26825", align: "left"});
    this.resultText.position.x = 510;
    this.resultText.position.y = 114;
    this.addChild(this.resultText);

    // social buttons
    var shareText = new PIXI.Text("SHARE SCORE", {font: "18px InGameFont", fill: "#ffffff", align: "left"});
    shareText.position.x = 460;
    shareText.position.y = 238;
    this.addChild(shareText);

    this.facebook = new PIXI.Sprite(PIXI.Texture.fromFrame("facebook_button.png"));
    this.facebook.position.x = 580;
    this.facebook.position.y = 239;
    this.addChild(this.facebook);
    this.facebook.setInteractive(true);
    this.facebook.buttonMode = true;
    this.facebook.mousedown = this.facebook.touchstart = this.handleFacebook;

    this.twitter = new PIXI.Sprite(PIXI.Texture.fromFrame("twitter_button.png"));
    this.twitter.position.x = 628;
    this.twitter.position.y = 239;
    this.addChild(this.twitter);
    this.twitter.setInteractive(true);
    this.twitter.buttonMode = true;
    this.twitter.mousedown = this.twitter.touchstart = this.handleTwitter;

    // trailer
    var trailerText = new PIXI.Text("WATCH THE TRAILER", {font: "18px InGameFont", fill: "#ffffff", align: "left"});
    trailerText.position.x = 345;
    trailerText.position.y = 365;
    this.addChild(trailerText);

    // play button
    this.playButton = new PIXI.DisplayObjectContainer();
    this.playButton.position.x = 552;
    this.playButton.position.y = 298;
    var playText = new PIXI.Text("PLAY", {font: "40px InGameFont", fill: "#ffffff", align: "left"});

    this.playButton.addChild(playText);

    var arrow = new PIXI.Sprite(PIXI.Texture.fromFrame("play_button.png"));
    arrow.position.x = playText.width + 10;
    arrow.position.y = 8;
    this.playButton.addChild(arrow);

    this.addChild(this.playButton);
    this.playButton.setInteractive(true);
    this.playButton.buttonMode = true;
    this.playButton.mousedown = this.playButton.touchstart = function(data){self.handlePlay(data)};

}

GAME.GameComplete.constructor = GAME.GameComplete;
GAME.GameComplete.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);

GAME.GameComplete.prototype.setTime = function(time){
    this.resultText.setText(time);
}

GAME.GameComplete.prototype.handleFacebook = function(data){
    console.log("facebook click");
}

GAME.GameComplete.prototype.handleTwitter = function(data){
    console.log("twitter click");
}

GAME.GameComplete.prototype.handlePlay = function(data){
    console.log("play click");
    this.engine.reset();
}
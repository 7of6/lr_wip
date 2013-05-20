//--------------------------------------------------------------------------
//  Game Over Screen Class
//--------------------------------------------------------------------------
GAME.GameOver = function(engineRef){

    PIXI.DisplayObjectContainer.call(this);

    var self = this;

    this.engine = engineRef;

    // background
    this.addChild(new PIXI.Sprite(PIXI.Texture.fromFrame("game_over_fail.jpg")));

    // status
    var missionText = new PIXI.Text(GAME.LOCALISED.MISSION, {font: "27px InGameFont", fill: "#ffffff"});
    missionText.position.x = 467;
    missionText.position.y = 65;
    this.addChild(missionText);
    var failedText = new PIXI.Text(GAME.LOCALISED.FAILED, {font: "51px InGameFont", fill: "#ffffff"});
    failedText.position.x = 543;
    failedText.position.y = 52;
    this.addChild(failedText);

    var distanceText = new PIXI.Text(GAME.LOCALISED.DISTANCE.toUpperCase() + ":", {font: "25px InGameFont", fill: "#000000"});
    distanceText.position.x = 454;
    distanceText.position.y = 152;
    this.addChild(distanceText);
    this.percText = new PIXI.Text("0%", {font: "78px InGameFont", fill: "#f26825"});
    this.percText.position.x = 540;
    this.percText.position.y = 114;
    this.addChild(this.percText);

    // social buttons
    var shareText = new PIXI.Text(GAME.LOCALISED.SHARE, {font: "18px InGameFont", fill: "#ffffff"});
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
    this.trailerButton = new PIXI.DisplayObjectContainer();
    var trailerBackground = new PIXI.Sprite(PIXI.Texture.fromFrame("trailer_button.png"));
    this.trailerButton.addChild(trailerBackground);

    var trailerText = new PIXI.Text(GAME.LOCALISED.WATCH_TRAILER, {font: "18px InGameFont", fill: "#ffffff"});
    trailerText.position.x = 50;
    trailerText.position.y = 88;
    this.trailerButton.addChild(trailerText);

    this.trailerButton.position.x = 290;
    this.trailerButton.position.y = 280;
    this.addChild(this.trailerButton);
    this.trailerButton.setInteractive(true);
    this.trailerButton.buttonMode = true;
    this.trailerButton.mousedown = this.trailerButton.touchstart = function(data){self.handleTrailer(data)};

    // play button
    this.playButton = new PIXI.DisplayObjectContainer();
    this.playButton.position.x = 552;
    this.playButton.position.y = 298;
    var playText = new PIXI.Text(GAME.LOCALISED.TRY_AGAIN, {font: "40px InGameFont", fill: "#ffffff"});

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

GAME.GameOver.constructor = GAME.GameOver;
GAME.GameOver.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);

GAME.GameOver.prototype.setProgress = function(perc){
    this.percText.setText(perc.toFixed(1) + "%");
}

GAME.GameOver.prototype.handleFacebook = function(data){
    window.open(GAME.LOCALISED.FACEBOOK_SHARE, "_blank");
    ga('send', 'event', 'Game', 'Facebook Share', 'Game Over');
}

GAME.GameOver.prototype.handleTwitter = function(data){
    window.open(GAME.LOCALISED.TWITTER_SHARE, "_blank");
    ga('send', 'event', 'Game', 'Twitter Share', 'Game Over');
}

GAME.GameOver.prototype.handlePlay = function(data){
    this.engine.reset();
    ga('send', 'event', 'Game', 'Play', 'Game Over');
}

GAME.GameOver.prototype.handleTrailer = function(data){
    GAME.openTrailer();
    ga('send', 'event', 'Game', 'Trailer', 'Game Over');
}
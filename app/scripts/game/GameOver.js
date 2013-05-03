//--------------------------------------------------------------------------
//  Game Over Screen Class
//--------------------------------------------------------------------------
GAME.GameOver = function(engineRef, gameWon){
	console.log("Game Over");

    PIXI.DisplayObjectContainer.call(this);

    var self = this;

    this.engine = engineRef;

    // background
    this.addChild(new PIXI.Sprite(PIXI.Texture.fromFrame("game_over_fail.jpg")));

    // social buttons
    this.facebook = new PIXI.Sprite(PIXI.Texture.fromFrame("facebook_button.png"));
    this.facebook.position.x = 580;
    this.facebook.position.y = 239;
    this.addChild(this.facebook);
    this.facebook.setInteractive(true);
    this.facebook.mousedown = this.facebook.touchstart = this.handleFacebook;

    this.twitter = new PIXI.Sprite(PIXI.Texture.fromFrame("twitter_button.png"));
    this.twitter.position.x = 628;
    this.twitter.position.y = 239;
    this.addChild(this.twitter);
    this.twitter.setInteractive(true);
    this.twitter.mousedown = this.twitter.touchstart = this.handleTwitter;

    // play button
    this.playButton = new PIXI.DisplayObjectContainer();
    this.playButton.position.x = 552;
    this.playButton.position.y = 298;
    var playText = new PIXI.Text("TRY AGAIN", "40px InGameFont", "#ffffff");
    this.playButton.addChild(playText);

    var arrow = new PIXI.Sprite(PIXI.Texture.fromFrame("play_button.png"));
    arrow.position.x = playText.position.x + playText.width + 10;
    arrow.position.y = 8;
    this.playButton.addChild(arrow);

    this.addChild(this.playButton);
    this.playButton.setInteractive(true);
    this.playButton.mousedown = this.playButton.touchstart = function(data){self.handlePlay(data)};


}

GAME.GameOver.constructor = GAME.GameOver;
GAME.GameOver.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);

GAME.GameOver.prototype.handleFacebook = function(data){
    console.log("facebook click");
}

GAME.GameOver.prototype.handleTwitter = function(data){
    console.log("twitter click");
}

GAME.GameOver.prototype.handlePlay = function(data){
    console.log("play click");
    this.engine.reset();
}
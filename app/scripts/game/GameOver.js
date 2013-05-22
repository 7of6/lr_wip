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
    var missionText = new PIXI.Text(GAME.LOCALISED.MISSION, {font: "25px Anton", fill: "#ffffff"});
    missionText.anchor.x = 1;
    missionText.position.x = 540;
    missionText.position.y = 65;
    if (GAME.isFireFox){
        missionText.position.y += 6;
    }
    this.addChild(missionText);

    var failedText = new PIXI.Text(GAME.LOCALISED.FAILED, {font: "46px Anton", fill: "#ffffff"});
    failedText.position.x = 545;
    failedText.position.y = 52;
    if (GAME.isFireFox){
        failedText.position.y += 14;
    }
    this.addChild(failedText);

    var distanceText = new PIXI.Text(GAME.LOCALISED.DISTANCE.toUpperCase() + ":", {font: "25px Anton", fill: "#000000"});
    distanceText.position.x = 526;
    distanceText.position.y = 152;
    if (GAME.isFireFox){
        distanceText.position.y += 8;
    }
    distanceText.anchor.x = 1;
    this.addChild(distanceText);

    this.percText = new PIXI.Text("0", {font: "70px Anton", fill: "#f26825"});
    this.percText.position.x = 530;
    this.percText.position.y = 116;
    if (GAME.isFireFox){
        this.percText.position.y += 26;
    }
    this.addChild(this.percText);

    this.percSymbol = new PIXI.Text("%", {font: "40px Anton", fill: "#f26825"});
    this.percSymbol.position.x = this.percText.position.x + this.percText.width + 2;
    this.percSymbol.position.y = 148;
    if (GAME.isFireFox){
        this.percSymbol.position.y += 16;
    }
    this.addChild(this.percSymbol);

    // social buttons
    var shareText = new PIXI.Text(GAME.LOCALISED.SHARE, {font: "18px Anton", fill: "#ffffff"});
    shareText.position.x = 460;
    shareText.position.y = 238;
    if (GAME.isFireFox){
        shareText.position.y += 5;
    }
    this.addChild(shareText);

    this.facebook = new PIXI.Sprite(PIXI.Texture.fromFrame("facebook_off.png"));
    this.facebook.position.x = 565;
    this.facebook.position.y = 234;
    this.addChild(this.facebook);
    this.facebook.setInteractive(true);
    this.facebook.buttonMode = true;
    this.facebook.mousedown = this.facebook.touchstart = function(data){self.handleFacebook(data)};

    if (!GAME.isMobile){

        this.facebook.mouseover = function(){
            self.facebook.setTexture(PIXI.Texture.fromFrame("facebook_on.png"));
        };
        this.facebook.mouseout = function(){
            self.facebook.setTexture(PIXI.Texture.fromFrame("facebook_off.png"));
        };

    }

    this.twitter = new PIXI.Sprite(PIXI.Texture.fromFrame("twitter_off.png"));
    this.twitter.position.x = 617;
    this.twitter.position.y = 232;
    this.addChild(this.twitter);
    this.twitter.setInteractive(true);
    this.twitter.buttonMode = true;
    this.twitter.mousedown = this.twitter.touchstart = function(data){self.handleTwitter(data)};

    if (!GAME.isMobile){

        this.twitter.mouseover = function(){
            self.twitter.setTexture(PIXI.Texture.fromFrame("twitter_on.png"));
        };
        this.twitter.mouseout = function(){
            self.twitter.setTexture(PIXI.Texture.fromFrame("twitter_off.png"));
        };

    }

    // trailer
    var trailerButton = new PIXI.DisplayObjectContainer();
    var trailerBackground = new PIXI.Sprite(PIXI.Texture.fromFrame("trailer_button.png"));
    trailerBackground.position.x = 20;
    trailerButton.addChild(trailerBackground);

    this.trailerHighlight = new PIXI.Sprite(PIXI.Texture.fromFrame("trailer_off.png"));
    this.trailerHighlight.position.y = 83;
    trailerButton.addChild(this.trailerHighlight);

    var trailerText = new PIXI.Text(GAME.LOCALISED.WATCH_TRAILER, {font: "18px Anton", fill: "#ffffff"});
    trailerText.position.x = 40;
    trailerText.position.y = 88;
    if (GAME.isFireFox){
        trailerText.position.y += 5;
    }
    trailerButton.addChild(trailerText);

    trailerButton.position.x = 290;
    trailerButton.position.y = 280;
    this.addChild(trailerButton);
    trailerButton.setInteractive(true);
    trailerButton.buttonMode = true;
    trailerButton.mousedown = trailerButton.touchstart = function(data){self.handleTrailer(data)};
    if (!GAME.isMobile){

        trailerButton.mouseover = function(){
            self.trailerHighlight.setTexture(PIXI.Texture.fromFrame("trailer_on.png"));
        };
        trailerButton.mouseout = function(){
            self.trailerHighlight.setTexture(PIXI.Texture.fromFrame("trailer_off.png"));
        };

    }

    // play button
    var playButton = new PIXI.DisplayObjectContainer();
    playButton.position.x = 499;
    playButton.position.y = 287;

    this.playButtonBG = new PIXI.Sprite(PIXI.Texture.fromFrame("play_off.png"));
    playButton.addChild(this.playButtonBG);


    var playText = new PIXI.Text(GAME.LOCALISED.TRY_AGAIN, {font: "40px Anton", fill: "#ffffff"});
    playText.position.x = 70;
    playText.position.y = 7;

    if (GAME.isFireFox){
        playText.position.y += 14;
    }
    playButton.addChild(playText);

    var arrow = new PIXI.Sprite(PIXI.Texture.fromFrame("play_button.png"));
    arrow.position.x = playText.position.x + playText.width + 10;
    arrow.position.y = 19;
    playButton.addChild(arrow);

    this.addChild(playButton);
    playButton.setInteractive(true);
    playButton.buttonMode = true;
    playButton.mousedown = playButton.touchstart = function(data){self.handlePlay(data)};

    if (!GAME.isMobile){

        playButton.mouseover = function(){
            self.playButtonBG.setTexture(PIXI.Texture.fromFrame("play_on.png"));
        };
        playButton.mouseout = function(){
            self.playButtonBG.setTexture(PIXI.Texture.fromFrame("play_off.png"));
        };

    }

}

GAME.GameOver.constructor = GAME.GameOver;
GAME.GameOver.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);

GAME.GameOver.prototype.setProgress = function(perc){
    this.percText.setText(perc.toFixed(1));
    this.percText.updateText();
    this.percSymbol.position.x = this.percText.position.x + this.percText.width + 2;
}

GAME.GameOver.prototype.handleFacebook = function(data){

    var shareData = GAME.LOCALISED.FACEBOOK_SHARE.replace("{{result}}", this.percText.text + "%");

    window.open(shareData, "_blank");
    ga('send', 'event', 'Game', 'Facebook Share', 'Game Over');
}

GAME.GameOver.prototype.handleTwitter = function(data){

    var shareData = GAME.LOCALISED.TWITTER_SHARE.replace("{{result}}", this.percText.text + "%25");

    window.open(shareData, "_blank");
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
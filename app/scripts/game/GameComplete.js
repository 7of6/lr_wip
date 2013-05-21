//--------------------------------------------------------------------------
//  Game Complete Screen Class
//--------------------------------------------------------------------------
GAME.GameComplete = function(engineRef){

    PIXI.DisplayObjectContainer.call(this);

    var self = this;

    this.engine = engineRef;

    // background
    this.addChild(new PIXI.Sprite(PIXI.Texture.fromFrame("game_over_win.jpg")));

    // status
    var missionText = new PIXI.Text(GAME.LOCALISED.MISSION, {font: "25px Anton", fill: "#ffffff"});
    missionText.position.x = 540;
    missionText.position.y = 65;
    missionText.anchor.x = 1;
    if (GAME.isFireFox){
        missionText.position.y += 6;
    }
    this.addChild(missionText);
    var failedText = new PIXI.Text(GAME.LOCALISED.COMPLETE, {font: "46px Anton", fill: "#ffffff"});
    failedText.position.x = 545;
    failedText.position.y = 52;
    if (GAME.isFireFox){
        failedText.position.y += 14;
    }
    this.addChild(failedText);

    var distanceText = new PIXI.Text(GAME.LOCALISED.TIME.toUpperCase() + ":", {font: "25px Anton", fill: "#000000"});
    distanceText.position.x = 506;
    distanceText.position.y = 152;
    if (GAME.isFireFox){
        distanceText.position.y += 6;
    }
    distanceText.anchor.x = 1;
    this.addChild(distanceText);
    this.resultText = new PIXI.Text("0:00", {font: "74px Anton", fill: "#f26825"});
    this.resultText.position.x = 510;
    this.resultText.position.y = 114;
    if (GAME.isFireFox){
        this.resultText.position.y += 26;
    }
    this.addChild(this.resultText);

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
    this.facebook.mousedown = this.facebook.touchstart = this.handleFacebook;

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
    this.twitter.mousedown = this.twitter.touchstart = this.handleTwitter;

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


    var playText = new PIXI.Text(GAME.LOCALISED.REPLAY, {font: "40px Anton", fill: "#ffffff"});
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

GAME.GameComplete.constructor = GAME.GameComplete;
GAME.GameComplete.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);

GAME.GameComplete.prototype.setTime = function(time){
    this.resultText.setText(time);
}

GAME.GameComplete.prototype.handleFacebook = function(data){
    window.open(GAME.LOCALISED.FACEBOOK_SHARE, "_blank");
    ga('send', 'event', 'Game', 'Facebook Share', 'Game Complete');
}

GAME.GameComplete.prototype.handleTwitter = function(data){
    window.open(GAME.LOCALISED.TWITTER_SHARE, "_blank");
    ga('send', 'event', 'Game', 'Twitter Share', 'Game Complete');
}

GAME.GameComplete.prototype.handlePlay = function(data){
    this.engine.reset();
    ga('send', 'event', 'Game', 'Play', 'Game Complete');
}

GAME.GameComplete.prototype.handleTrailer = function(data){
    GAME.openTrailer();
    ga('send', 'event', 'Game', 'Trailer', 'Game Complete');
}
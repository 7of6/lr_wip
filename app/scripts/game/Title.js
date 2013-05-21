//--------------------------------------------------------------------------
//  Title Screen Class
//--------------------------------------------------------------------------
GAME.Title = function(engineRef){

	PIXI.DisplayObjectContainer.call(this);

    var self = this;

    this.engine = engineRef;

    // background
    this.addChild(new PIXI.Sprite(PIXI.Texture.fromFrame("title_screen.jpg")));

    // play button
    var playButton = new PIXI.DisplayObjectContainer();

    this.playButtonBG = new PIXI.Sprite(PIXI.Texture.fromFrame("play_off.png"));
    playButton.addChild(this.playButtonBG);

    playButton.position.x = 499;
    playButton.position.y = 287;

    var playText = new PIXI.Text(GAME.LOCALISED.PLAY, {font: "40px Anton", fill: "#ffffff", align: "left"});
    playText.position.x = 90;
    playText.position.y = 9;
    if (GAME.isFireFox){
        playText.position.y += 13;
    }
    playButton.addChild(playText);

    var arrow = new PIXI.Sprite(PIXI.Texture.fromFrame("play_button.png"));
    arrow.position.x = playText.position.x + playText.width + 10;
    arrow.position.y = 20;
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

GAME.Title.constructor = GAME.Title;
GAME.Title.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);

GAME.Title.prototype.handlePlay = function(data){

    this.engine.reset();
    ga('send', 'event', 'Game', 'Play', 'Title Screen');
    
}
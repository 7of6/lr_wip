//--------------------------------------------------------------------------
//  Title Screen Class
//--------------------------------------------------------------------------
GAME.Title = function(engineRef){
	console.log("Title");

	PIXI.DisplayObjectContainer.call(this);

    var self = this;

    this.engine = engineRef;

    // background
    this.addChild(new PIXI.Sprite(PIXI.Texture.fromFrame("title_screen.jpg")));

    // play button
    this.playButton = new PIXI.DisplayObjectContainer();
    this.playButton.position.x = 600;
    this.playButton.position.y = 298;
    var playText = new PIXI.Text("PLAY", {font: "40px InGameFont", fill: "#ffffff", align: "left"});
    console.log(playText.width, playText.height);
    this.playButton.addChild(playText);

    var arrow = new PIXI.Sprite(PIXI.Texture.fromFrame("play_button.png"));
    arrow.position.x = 74;
    arrow.position.y = 8;
    this.playButton.addChild(arrow);

    

    this.addChild(this.playButton);
    this.playButton.setInteractive(true);
    this.playButton.buttonMode = true;
    this.playButton.mousedown = this.playButton.touchstart = function(data){self.handlePlay(data)};


}

GAME.Title.constructor = GAME.Title;
GAME.Title.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);

GAME.Title.prototype.handlePlay = function(data){
    console.log("play click");
    this.engine.reset();
}
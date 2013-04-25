GAME = GAME || {};
GAME.JoyBackground = function() {
    PIXI.DisplayObjectContainer.call(this);
    this.width = 1E3;
    this.scrollPosition = 1500;
    this.swoosh = new GAME.BackgroundElement(PIXI.Texture.fromImage("img/stretched_hyper_tile.jpg"), 0, this);
    this.swoosh.speed = 0.7;
    this.scale.y = 1.7;
    this.scale.x = 4
};
GAME.JoyBackground.constructor = GAME.LowFiBackground;
GAME.JoyBackground.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
GAME.JoyBackground.prototype.updateTransform = function() {
    this.scrollPosition = GAME.camera.x + 4E3;
    this.swoosh.setPosition(this.scrollPosition);
    PIXI.DisplayObjectContainer.prototype.updateTransform.call(this)
};
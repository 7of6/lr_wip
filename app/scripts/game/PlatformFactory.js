//--------------------------------------------------------------------------
//  Platform Factory Class
//--------------------------------------------------------------------------
GAME.PlatformFactory = function() {

	this.platformAssets = ["crates.png", "wagon.png"];

    this.platformPool = new GAME.ObjectPool(GAME.Platform)
};
GAME.PlatformFactory.constructor = GAME.PlatformFactory;

GAME.PlatformFactory.prototype.getPlatform = function() {
    var obj = this.platformPool.getObject();
    return obj;
};

//--------------------------------------------------------------------------
//  Platform Class
//--------------------------------------------------------------------------
GAME.Platform = function() {
    PIXI.Sprite.call(this, PIXI.Texture.fromFrame("crates.png"));
    this.anchor.x = 0;
    this.anchor.y = 1;
};
GAME.Platform.constructor = GAME.Platform;
GAME.Platform.prototype = Object.create(PIXI.Sprite.prototype);
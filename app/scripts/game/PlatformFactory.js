//--------------------------------------------------------------------------
//  Platform Factory Class
//--------------------------------------------------------------------------
GAME.PlatformFactory = function() {

	this.platformAssets = ["crates.png", "wagon.png"];

    this.platformPool = new GAME.ObjectPool(GAME.Platform)
};
GAME.PlatformFactory.constructor = GAME.PlatformFactory;

//--------------------------------------------------------------------------
//  API
//--------------------------------------------------------------------------
GAME.PlatformFactory.prototype.getPlatform = function() {
    var obj = this.platformPool.getObject();
    return obj;
};

GAME.PlatformFactory.prototype.getStepUp = function() {
    var s1 = new PIXI.Sprite(PIXI.Texture.fromFrame("crates.png"));
    	s1.anchor.x = 0;
    	s1.anchor.y = 1;
    var s2 = new PIXI.Sprite(PIXI.Texture.fromFrame("wagon.png"));
    	s2.anchor.x = 0;
    	s2.anchor.y = 1;

    var obj = {
    	'step1': s1,
    	'step2': s2
    };

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



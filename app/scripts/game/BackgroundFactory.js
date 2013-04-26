//--------------------------------------------------------------------------
//  Background Factory Class
//--------------------------------------------------------------------------
GAME.BackgroundFactory = function() {

	backgroundTextures = ["bg_town_house1.png","bg_town_house2.png","bg_town_house3.png","bg_town_house4.png","bg_town_house5.png","bg_town_house6.png","bg_town_house7.png","bg_town_house8.png","corral.png","gallows.png"];
    this.backgroundPool = new GAME.ObjectPool(GAME.BackgroundItem);
};
GAME.BackgroundFactory.constructor = GAME.BackgroundFactory;

GAME.BackgroundFactory.prototype.getBackground = function() {
    var obj = this.backgroundPool.getObject();
    return obj;
};

//--------------------------------------------------------------------------
//  BackgroundItem Class
//--------------------------------------------------------------------------
GAME.BackgroundItem = function() {
    PIXI.Sprite.call(this, PIXI.Texture.fromFrame(backgroundTextures[Math2.randomInt(0, backgroundTextures.length - 1)]));
    this.anchor.x = 0;
    this.anchor.y = 1;
};
GAME.BackgroundItem.constructor = GAME.BackgroundItem;
GAME.BackgroundItem.prototype = Object.create(PIXI.Sprite.prototype);
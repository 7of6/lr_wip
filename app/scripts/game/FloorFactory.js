//--------------------------------------------------------------------------
//  Floor Factory Class
//--------------------------------------------------------------------------
GAME.FloorFactory = function() {
    this.floorPool = new GAME.ObjectPool(GAME.Floor)
};
GAME.FloorFactory.constructor = GAME.FloorFactory;

GAME.FloorFactory.prototype.getFloor = function() {
    var obj = this.floorPool.getObject();
    return obj;
};

//--------------------------------------------------------------------------
//  Floor Sprite Class
//--------------------------------------------------------------------------
GAME.Floor = function() {
    PIXI.Sprite.call(this, PIXI.Texture.fromFrame("floor.png"))
};
GAME.Floor.constructor = GAME.Floor;
GAME.Floor.prototype = Object.create(PIXI.Sprite.prototype);
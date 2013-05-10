//--------------------------------------------------------------------------
//  Floor Factory Class
//--------------------------------------------------------------------------
GAME.FloorFactory = function() {
    this.floorPool = new GAME.ObjectPool(GAME.Floor);
    this.trackPool = new GAME.ObjectPool(GAME.Track);
    this.floorLeftPool = new GAME.ObjectPool(GAME.FloorLeft);
    this.floorRightPool = new GAME.ObjectPool(GAME.FloorRight);
    this.bridgePool = new GAME.ObjectPool(GAME.Bridge);
};
GAME.FloorFactory.constructor = GAME.FloorFactory;

GAME.FloorFactory.prototype.getFloor = function() {
    var obj = this.floorPool.getObject();
    return obj;
};

GAME.FloorFactory.prototype.getTrack = function() {
    var obj = this.trackPool.getObject();
    return obj;
};

GAME.FloorFactory.prototype.getBridge = function() {
    var obj = this.bridgePool.getObject();
    return obj;
};

GAME.FloorFactory.prototype.getFloorCap = function(direction){
	var obj;

	if (direction == "left"){
		obj = this.floorLeftPool.getObject();
	}else{
		obj = this.floorRightPool.getObject();
	}

	return obj;
}

//--------------------------------------------------------------------------
//  Floor Sprite Class
//--------------------------------------------------------------------------
GAME.Floor = function() {
    PIXI.Sprite.call(this, PIXI.Texture.fromFrame("floor_tile.png"));
    this.collidable = 1;
};
GAME.Floor.constructor = GAME.Floor;
GAME.Floor.prototype = Object.create(PIXI.Sprite.prototype);

GAME.FloorLeft = function(){
	PIXI.Sprite.call(this, PIXI.Texture.fromFrame("floor_face_left.png"));
	this.anchor.x = 0.6;
	this.collidable = 0;
}
GAME.FloorLeft.constructor = GAME.FloorLeft;
GAME.FloorLeft.prototype = Object.create(PIXI.Sprite.prototype);

GAME.FloorRight = function(){
	PIXI.Sprite.call(this, PIXI.Texture.fromFrame("floor_face_right.png"));
	this.anchor.x = 0.3;
	this.collidable = 0;
}
GAME.FloorRight.constructor = GAME.FloorRight;
GAME.FloorRight.prototype = Object.create(PIXI.Sprite.prototype);

GAME.Bridge = function(){
	PIXI.Sprite.call(this, PIXI.Texture.fromFrame("bridge.png"));
	this.collidable = 0;
}
GAME.Bridge.constructor = GAME.Bridge;
GAME.Bridge.prototype = Object.create(PIXI.Sprite.prototype);

//--------------------------------------------------------------------------
//  Track Sprite Class
//--------------------------------------------------------------------------
GAME.Track = function() {
    PIXI.Sprite.call(this, PIXI.Texture.fromFrame("track.png"));
    this.collidable = 0;
    this.anchor.y = 0.5;
};
GAME.Track.constructor = GAME.Track;
GAME.Track.prototype = Object.create(PIXI.Sprite.prototype);
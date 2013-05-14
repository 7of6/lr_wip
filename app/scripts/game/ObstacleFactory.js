//--------------------------------------------------------------------------
//  Obstacle Factory Class
//--------------------------------------------------------------------------
GAME.ObstacleFactory = function(engineRef) {

	GAME.obstacleTextures = [];
	GAME.largeObstacleTextures = [];

	this.desertTextures = ["bush4.png","bush5.png","rock1.png","rock2.png"];
	this.largeDesertTextures = ["large_rock.png", "wall.png"];

	this.indianTextures = ["bush4.png","bush5.png","rock1.png","rock2.png", "fire.png"];
	this.largeIndianTextures = ["large_rock.png", "wall.png"];

	this.townTextures = ["bales.png","barrels.png","box.png","sack.png"];
	this.largeTownTextures = ["crate.png", "cart.png"];

    this.obstaclePool = new GAME.ObjectPool(GAME.ObstacleItem);
    this.largeObstaclePool = new GAME.ObjectPool(GAME.LargeObstacleItem);
    
};
GAME.ObstacleFactory.constructor = GAME.ObstacleFactory;

GAME.ObstacleFactory.prototype.getObstacle = function() {
    var obj = this.obstaclePool.getObject();
    return obj;
};

GAME.ObstacleFactory.prototype.getLargeObstacle = function() {
    var obj = this.largeObstaclePool.getObject();
    return obj;
};

GAME.ObstacleFactory.prototype.setTextures = function(texture){

	switch(texture){
		case GAME_LEVEL.DESERT:
			GAME.obstacleTextures = this.desertTextures;
			GAME.largeObstacleTextures = this.largeDesertTextures;
		break;
		case GAME_LEVEL.INDIAN_VILLAGE:
			GAME.obstacleTextures = this.indianTextures;
			GAME.largeObstacleTextures = this.largeIndianTextures;
		break;
		case GAME_LEVEL.TOWN:
			GAME.obstacleTextures = this.townTextures;
			GAME.largeObstacleTextures = this.largeTownTextures;
		break;
	}	
}

//--------------------------------------------------------------------------
//  ObstacleItem Class
//--------------------------------------------------------------------------
GAME.ObstacleItem = function() {
	var texture = GAME.obstacleTextures[Math2.randomInt(0, GAME.obstacleTextures.length - 1)];
    PIXI.Sprite.call(this, PIXI.Texture.fromFrame(texture));
    this.anchor.x = 0;
    this.anchor.y = 1;
    this.isHit = 0;
};
GAME.ObstacleItem.constructor = GAME.ObstacleItem;
GAME.ObstacleItem.prototype = Object.create(PIXI.Sprite.prototype);

//--------------------------------------------------------------------------
//  Large ObstacleItem Class
//--------------------------------------------------------------------------
GAME.LargeObstacleItem = function() {
	var texture = GAME.largeObstacleTextures[Math2.randomInt(0, GAME.largeObstacleTextures.length - 1)];
    PIXI.Sprite.call(this, PIXI.Texture.fromFrame(texture));
    this.anchor.x = 0;
    this.anchor.y = 1;
    this.isHit = 0;
    this.isLarge = 1;
};
GAME.LargeObstacleItem.constructor = GAME.LargeObstacleItem;
GAME.LargeObstacleItem.prototype = Object.create(PIXI.Sprite.prototype);
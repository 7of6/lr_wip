//--------------------------------------------------------------------------
//  Obstacle Factory Class
//--------------------------------------------------------------------------
GAME.ObstacleFactory = function(engineRef) {

	GAME.obstacleTextures = [];

	this.desertTextures = ["bush4.png","bush5.png","rock1.png","rock2.png"];
	this.indianTextures = ["bush4.png","bush5.png","rock1.png","rock2.png", "fire.png"];
	this.townTextures = ["bales.png","barrels.png","box.png","sack.png"];
    this.obstaclePool = new GAME.ObjectPool(GAME.ObstacleItem);
    
};
GAME.ObstacleFactory.constructor = GAME.ObstacleFactory;

GAME.ObstacleFactory.prototype.getObstacle = function() {
    var obj = this.obstaclePool.getObject();
    return obj;
};

GAME.ObstacleFactory.prototype.setTextures = function(texture){

	switch(texture){
		case GAME_LEVEL.DESERT:
			GAME.obstacleTextures = this.desertTextures;
		break;
		case GAME_LEVEL.INDIAN_VILLAGE:
			GAME.obstacleTextures = this.indianTextures;
		break;
		case GAME_LEVEL.TOWN:
			GAME.obstacleTextures = this.townTextures;
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
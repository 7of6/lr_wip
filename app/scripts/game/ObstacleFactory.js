//--------------------------------------------------------------------------
//  Obstacle Factory Class
//--------------------------------------------------------------------------
GAME.ObstacleFactory = function(engineRef) {

	obstacleTextures = ["bush1.png","bush2.png","bush3.png","bush4.png","bush5.png","rock1.png","rock2.png"];
    this.obstaclePool = new GAME.ObjectPool(GAME.ObstacleItem);
    
};
GAME.ObstacleFactory.constructor = GAME.ObstacleFactory;

GAME.ObstacleFactory.prototype.getObstacle = function() {
    var obj = this.obstaclePool.getObject();
    return obj;
};

//--------------------------------------------------------------------------
//  ObstacleItem Class
//--------------------------------------------------------------------------
GAME.ObstacleItem = function() {
    PIXI.Sprite.call(this, PIXI.Texture.fromFrame(obstacleTextures[Math2.randomInt(0, obstacleTextures.length - 1)]));
    this.anchor.x = 0;
    this.anchor.y = 1;
    this.isHit = 0;
};
GAME.ObstacleItem.constructor = GAME.ObstacleItem;
GAME.ObstacleItem.prototype = Object.create(PIXI.Sprite.prototype);
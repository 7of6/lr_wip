//--------------------------------------------------------------------------
//  Obstacle Manager Class
//--------------------------------------------------------------------------
GAME.ObstacleManager = function(engineRef) {
    this.engine = engineRef;
    this.count = 0;
    this.Obstacles = [];
    this.ObstaclePool = new GAME.ObjectPool(GAME.Obstacle)
};
GAME.ObstacleManager.constructor = GAME.ObstacleManager;
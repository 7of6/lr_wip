var GAME = GAME || {};
GAME.GameObjectPool = function(a) {
    this.classType = a;
    this.pool = []
};
GAME.GameObjectPool.constructor = GAME.GameObjectPool;
GAME.GameObjectPool.prototype.getObject = function() {
    var a = this.pool.pop();
    a || (a = new this.classType);
    return a
};
GAME.GameObjectPool.prototype.returnObject = function() {};

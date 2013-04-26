//--------------------------------------------------------------------------
//  Object Pool Class
//--------------------------------------------------------------------------
GAME.ObjectPool = function(type) {
    this.classType = type;
    this.pool = []
};

GAME.ObjectPool.constructor = GAME.ObjectPool;

GAME.ObjectPool.prototype.getObject = function() {
    var obj = this.pool.pop();
    obj || (obj = new this.classType);
    return obj
};

GAME.ObjectPool.prototype.returnObject = function(obj) {
	//this.pool.push(obj);
};
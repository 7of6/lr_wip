GAME = GAME || {};
laserCount = 0;
GAME.EnemyManager = function(a) {
    this.engine = a;
    this.enemies = [];
    this.enemyPool = new GAME.GameObjectPool(GAME.Enemy);
    this.spawnCount = 0
};
GAME.EnemyManager.constructor = GAME.EnemyManager;
GAME.EnemyManager.prototype.update = function() {
    for (var a = 0; a < this.enemies.length; a++) {
        var b = this.enemies[a];
        b.update();
        b.view.position.x < -100 - GAME.xOffset && !this.engine.steve.isDead && (this.enemyPool.returnObject(b), this.enemies.splice(a, 1), this.engine.view.gameFront.removeChild(b.view), a--)
    }
};
GAME.EnemyManager.prototype.addEnemy = function(a, b) {
    var c = this.enemyPool.getObject();
    c.position.x = a;
    c.position.y = b;
    this.enemies.push(c);
    this.engine.view.gameFront.addChild(c.view)
};
GAME.EnemyManager.prototype.destroyAll = function() {
    for (var a = 0; a < this.enemies.length; a++) {
        var b = this.enemies[a];
        b.reset();
        this.enemyPool.returnObject(b);
        this.engine.view.gameFront.removeChild(b.view)
    }
    this.enemies = []
};
GAME.EnemyManager.prototype.destroyAllOffScreen = function() {
    for (var a = 0; a < this.enemies.length; a++) {
        var b = this.enemies[a];
        b.x > GAME.camera.x + GAME.width && (this.enemyPool.returnObject(b), this.engine.view.game.removeChild(b.view), this.enemies.splice(a, 1), a--)
    }
};

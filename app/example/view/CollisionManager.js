var GAME = GAME || {}, laserCount = 0;
GAME.CollisionManager = function(a) {
    this.engine = a
};
GAME.CollisionManager.constructor = GAME.CollisionManager;
GAME.CollisionManager.prototype.update = function() {
    this.playerVsBlock();
    this.playerVsPickup();
    this.playerVsFloor()
};
GAME.CollisionManager.prototype.playerVsBlock = function() {
    for (var a = this.engine.enemyManager.enemies, b = this.engine.steve, c = 0; c < a.length; c++) {
        var d = a[c],
            e = d.position.x - b.position.x;
        e > -d.width / 2 && e < d.width / 2 && (e = d.position.y - b.position.y, e > -d.height / 2 - 20 && e < d.height / 2 && !b.joyRiding && (b.die(), this.engine.gameover(), d.hit()))
    }
};
GAME.CollisionManager.prototype.playerVsPickup = function() {
    for (var a = this.engine.pickupManager.pickups, b = this.engine.steve, c = 0; c < a.length; c++) {
        var d = a[c];
        if (!d.isPickedUp) {
            var e = d.position.x - b.position.x;
            e > -d.width / 2 && e < d.width / 2 && (e = d.position.y - b.position.y, e > -d.height / 2 && e < d.height / 2 && (this.engine.pickupManager.removePickup(c), this.engine.pickup()))
        }
    }
};
GAME.CollisionManager.prototype.playerVsFloor = function() {
    var a = this.engine.floorManager.floors,
        b = this.engine.steve,
        c = a.length;
    b.onGround = !1;
    if (610 < b.position.y) if (this.engine.isPlaying) b.boil(), this.engine.view.doSplash(), this.engine.gameover();
    else {
        b.speed.x *= 0.95;
        interactive || (interactive = !0, this.engine.view.doSplash(), showGameover());
        return
    }
    for (var d = 0; d < c; d++) {
        var e = a[d].x - b.position.x + 1135;
        if (477 < b.position.y && 0 < e && 1135 > e) {
            if (b.isDead) {
                b.bounce++;
                if (2 < b.bounce) return;
                b.view.setTexture(b.crashFrames[b.bounce]);
                b.speed.y *= -0.7;
                b.speed.x *= 0.8;
                b.rotationSpeed = 0 < b.rotationSpeed ? -0.3 * Math.random() : 0 == b.rotationSpeed ? 0.3 * Math.random() : 0
            } else b.speed.y = -0.3;
            b.isFlying || (b.position.y = 478, b.onGround = !0)
        }
    }
    0 > b.position.y && (b.position.y = 0, b.speed.y *= 0)
};
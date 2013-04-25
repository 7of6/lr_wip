GAME = GAME || {};
GAME.HIGH_MODE = !0;
GAME.camera = new PIXI.Point;
GAME.height;
GAME.RprEngine = function() {
    this.onGameover;
    this.steve = new GAME.Steve;
    this.view = new GAME.RprView(this);
    this.segmentManager = new GAME.SegmentManager(this);
    this.enemyManager = new GAME.EnemyManager(this);
    this.pickupManager = new GAME.PickupManager(this);
    this.floorManager = new GAME.FloorManager(this);
    this.collisionManager = new GAME.CollisionManager(this);
    this.view.game.addChild(this.steve.view);
    this.bulletMult = 1;
    this.score = this.pickupCount = 0;
    this.joyrideMode = !1;
    this.joyrideCountdown = 0;
    this.isPlaying = this.steve.view.visible = !1;
    this.levelCount = 0
};
GAME.RprEngine.prototype.start = function() {
    this.isPlaying = !0;
    this.score = 0;
    this.steve.level = 1;
    this.steve.position.y = 477;
    this.steve.speed.y = 0;
    this.steve.speed.x = this.steve.baseSpeed;
    this.steve.view.rotation = 0;
    this.steve.isFlying = !1;
    this.steve.isDead = !1;
    this.steve.view.play();
    this.steve.view.visible = !0;
    this.segmentManager.chillMode = !1;
    this.bulletMult = 1;
    this.segmentManager.reset();
    this.enemyManager.destroyAll();
    this.pickupManager.destroyAll()
};
GAME.RprEngine.prototype.update = function() {
    GAME.time.update();
    var a = 0;
    0 < a && (a = 0); - 70 > a && (a = -70);
    GAME.camera.y = a;
    this.steve.update();
    this.collisionManager.update();
    this.segmentManager.update();
    this.floorManager.update();
    this.enemyManager.update();
    this.pickupManager.update();
    this.joyrideMode && (this.joyrideCountdown -= GAME.time.DELTA_TIME, 0 >= this.joyrideCountdown && this.joyrideComplete());
    this.levelCount += GAME.time.DELTA_TIME;
    3600 < this.levelCount && (this.levelCount = 0, this.steve.level += 0.05, GAME.time.speed += 0.05);
    this.view.update()
};
GAME.RprEngine.prototype.reset = function() {
    this.enemyManager.destroyAll();
    this.floorManager.destroyAll();
    this.segmentManager.reset();
    this.view.zoom = 1;
    this.levelCount = this.pickupCount = 0;
    this.steve.level = 1;
    this.view.game.addChild(this.steve.view)
};
GAME.RprEngine.prototype.joyrideComplete = function() {
    this.joyrideMode = !1;
    this.pickupCount = 0;
    this.bulletMult += 0.3;
    this.view.normalMode();
    this.steve.normalMode();
    this.enemyManager.destroyAll()
};
GAME.RprEngine.prototype.gameover = function() {
    this.isPlaying = !1;
    this.segmentManager.chillMode = !0;
    interactive = !1;
    this.onGameover();
    this.view.game.addChild(this.steve.view);
    TweenLite.to(this.view, 0.5, {
        zoom: 2,
        ease: Cubic.easeOut
    })
};
GAME.RprEngine.prototype.gameoverReal = function() {
    this.onGameoverReal()
};
GAME.RprEngine.prototype.pickup = function() {
    this.joyrideMode ? this.score += 10 : (this.score += 10, this.view.score.jump(), this.pickupCount++, this.pickupCount >= 50 * this.bulletMult && !this.steve.isDead && (this.pickupCount = 0, this.joyrideMode = !0, this.joyrideCountdown = 600, this.view.joyrideMode(), this.steve.joyrideMode(), this.steve.position.x = 0, GAME.camera.x = game.steve.position.x - 100, this.enemyManager.destroyAll(), this.pickupManager.destroyAll(), this.floorManager.destroyAll(), this.segmentManager.reset()))
};
Time = function() {
    this.DELTA_TIME = 1;
    this.lastTime = Date.now();
    this.frames = 0;
    this.speed = 1
};
Time.constructor = Time;
Time.prototype.update = function() {
    this.frames++;
    var a = Date.now();
    this.frames = 0;
    this.DELTA_TIME = 0.06 * (a - this.lastTime);
    this.DELTA_TIME *= this.speed;
    2.3 < this.DELTA_TIME && (this.DELTA_TIME = 2.3);
    this.lastTime = a
};
GAME.time = new Time;
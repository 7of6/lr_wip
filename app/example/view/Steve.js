GAME = GAME || {};
GAME.Steve = function() {
    this.position = new PIXI.Point;
    this.runningFrames = [PIXI.Texture.fromFrameId("characterRUNscaled_01.png"), PIXI.Texture.fromFrameId("characterRUNscaled_02.png"), PIXI.Texture.fromFrameId("characterRUNscaled_03.png"), PIXI.Texture.fromFrameId("characterRUNscaled_04.png"), PIXI.Texture.fromFrameId("characterRUNscaled_05.png"), PIXI.Texture.fromFrameId("characterRUNscaled_06.png"), PIXI.Texture.fromFrameId("characterRUNscaled_07.png"), PIXI.Texture.fromFrameId("characterRUNscaled_08.png"), PIXI.Texture.fromFrameId("characterRUNscaled_09.png")];
    this.flyingFrames = [PIXI.Texture.fromFrameId("characterFLATflying_01.png"), PIXI.Texture.fromFrameId("characterFLATflying_02.png"), PIXI.Texture.fromFrameId("characterFLATflying_03.png")];
    this.crashFrames = [PIXI.Texture.fromFrameId("characterFALLscaled3.png"), PIXI.Texture.fromFrameId("characterFALLscaled1.png"), PIXI.Texture.fromFrameId("characterFALLscaled3.png")];
    this.view = new PIXI.MovieClip(this.flyingFrames);
    this.view.animationSpeed = 0.23;
    this.view.play();
    this.view.anchor.x = 0.5;
    this.view.anchor.y = 0.5;
    this.ground = this.position.y = 477;
    this.gravity = 0.3;
    this.baseSpeed = 8;
    this.speed = new PIXI.Point(this.baseSpeed, 0);
    this.activeCount = 0;
    this.isFlying = !1;
    this.accel = 0;
    this.width = 26;
    this.height = 37;
    this.onGround = !1;
    this.rotationSpeed = 0;
    this.joyRiding = !1;
    this.level = 1;
    this.realAnimationSpeed = 0.23
};
GAME.Steve.constructor = GAME.Steve;
GAME.Steve.prototype.update = function() {
    this.isDead ? this.updateDieing() : this.updateRunning()
};
GAME.Steve.prototype.joyrideMode = function() {
    this.joyRiding = !0;
    TweenLite.to(this.speed, 0.3, {
        x: 20,
        ease: Cubic.easeIn
    });
    this.realAnimationSpeed = 0.92
};
GAME.Steve.prototype.normalMode = function() {
    this.joyRiding = !1;
    TweenLite.to(this.speed, 0.6, {
        x: this.baseSpeed,
        ease: Cubic.easeOut
    });
    this.realAnimationSpeed = 0.23
};
GAME.Steve.prototype.updateRunning = function() {
    this.view.animationSpeed = this.realAnimationSpeed * GAME.time.DELTA_TIME * this.level;
    this.isActive && (this.isFlying = !0);
    this.isFlying ? (this.accel = 0.6, this.speed.y -= this.accel * GAME.time.DELTA_TIME, 0 < this.speed.y && (this.speed.y -= 0.3 * GAME.time.DELTA_TIME)) : 0 > this.speed.y && (this.speed.y += 0.05 * GAME.time.DELTA_TIME);
    this.speed.y += this.gravity * GAME.time.DELTA_TIME;
    8 < this.speed.y && (this.speed.y = 8); - 9 > this.speed.y && (this.speed.y = -9);
    this.position.x += this.speed.x * GAME.time.DELTA_TIME * this.level;
    this.position.y += this.speed.y * GAME.time.DELTA_TIME;
    this.onGround != this.onGroundCache && (this.onGroundCache = this.onGround, this.view.textures = this.onGround ? this.runningFrames : this.flyingFrames);
    GAME.camera.x = this.position.x - 100;
    this.view.position.x = this.position.x - GAME.camera.x;
    this.view.position.y = this.position.y - GAME.camera.y;
    this.view.rotation += 0.1 * (0.05 * this.speed.y - this.view.rotation)
};
GAME.Steve.prototype.updateDieing = function() {
    this.speed.x *= 0.999;
    this.onGround && (this.speed.y *= 0.99);
    this.speed.y += 0.1;
    this.accel += 0.1 * (0 - this.accel) * GAME.time.DELTA_TIME;
    this.speed.y += this.gravity * GAME.time.DELTA_TIME;
    this.position.x += this.speed.x * GAME.time.DELTA_TIME;
    this.position.y += this.speed.y * GAME.time.DELTA_TIME;
    GAME.camera.x = this.position.x - 100;
    this.view.position.x = this.position.x - GAME.camera.x;
    this.view.position.y = this.position.y - GAME.camera.y;
    this.view.rotation = 5 > this.speed.x ? this.view.rotation + this.rotationSpeed * (this.speed.x / 5) * GAME.time.DELTA_TIME : this.view.rotation + this.rotationSpeed * GAME.time.DELTA_TIME
};
GAME.Steve.prototype.jump = function() {
    this.isDead && 5 > this.speed.x && (this.isDead = !1, this.speed.x = 10);
    this.position.y != this.ground ? this.isFlying = !0 : (this.isActive = !0, this.activeCount = 0)
};
GAME.Steve.prototype.die = function() {
    this.isDead || (TweenLite.to(GAME.time, 0.5, {
        speed: 0.1,
        ease: Cubic.easeOut,
        onComplete: function() {
            TweenLite.to(GAME.time, 2, {
                speed: 1,
                delay: 1
            })
        }
    }), this.isDead = !0, this.bounce = 0, this.speed.x = 15, this.speed.y = -15, this.rotationSpeed = 0.3, this.view.stop(), this.view.setTexture(this.crashFrames[0]))
};
GAME.Steve.prototype.boil = function() {
    this.isDead || (this.isDead = !0)
};
GAME.Steve.prototype.fall = function() {
    this.isFlying = this.isActive = !1
};
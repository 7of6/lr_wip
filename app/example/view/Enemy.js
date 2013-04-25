var GAME = GAME || {}, enemyFrames;
GAME.Enemy = function() {
    this.position = new PIXI.Point;
    this.view = new PIXI.Sprite(PIXI.Texture.fromFrameId("spike_box.png"));
    this.view.anchor.x = 0.5;
    this.view.anchor.y = 0.5;
    this.height = this.width = 150
};
GAME.Enemy.constructor = GAME.Enemy;
GAME.Enemy.prototype.reset = function() {
    this.explosion && (this.view.removeChild(this.explosion), this.explosion.reset());
    this.view.width = 157
};
GAME.Enemy.prototype.hit = function() {
    this.explosion || (this.explosion = new GAME.Explosion);
    this.explosion.explode();
    this.view.addChild(this.explosion);
    this.view.width = 1
};
GAME.Enemy.prototype.update = function() {
    this.view.position.x = this.position.x - GAME.camera.x;
    this.view.position.y = this.position.y
};

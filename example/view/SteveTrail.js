GAME.SteveTrail = function(a) {
    this.stage = a;
    this.target = new PIXI.Point;
    this.particals = [];
    this.particalPool = new GAME.GameObjectPool(Partical);
    this.max = 100;
    this.count = 0
};
GAME.SteveTrail.constructor = GAME.SteveTrail;
GAME.SteveTrail.prototype.update = function() {
    if (this.target.isFlying && !this.target.isDead && (this.count++, this.count % 3)) {
        var a = this.particalPool.getObject();
        this.stage.addChild(a);
        a.position.x = this.target.view.position.x + 10 * Math.random() - 5 - 20;
        a.position.y = this.target.view.position.y + 50;
        a.direction = 0;
        a.dirSpeed = 0.5 < Math.random() ? -0.1 : 0.1;
        a.sign = this.particals.length % 2 ? -1 : 1;
        a.scaly = 2 * Math.random() - 1;
        a.speed.y = 3 * this.target.accel;
        a.alphay = 2;
        a.rotation = 2 * Math.random() * Math.PI;
        a.scale.x = a.scale.y = 0.2 + 0.5 * Math.random();
        this.particals.push(a)
    }
    for (var b = 0; b < this.particals.length; b++) a = this.particals[b], a.dirSpeed += 0.0030 * a.sign, 2 < a.dirSpeed && (a.dirSpeed = 2), a.direction += a.dirSpeed, a.speed.x = Math.sin(a.direction), a.speed.y = Math.cos(a.direction), a.position.x += 5 * a.speed.x * a.scaly, a.position.y += 3 * a.speed.y, a.alphay *= 0.85, a.rotation += 0.1 * a.speed.x, a.alpha = 1 < a.alphay ? 1 : a.alphay, 0.01 > a.alpha && (this.stage.removeChild(a), this.particals.splice(b, 1), this.particalPool.returnObject(a), b--)
};
Partical = function() {
    PIXI.Sprite.call(this, PIXI.Texture.fromFrameId("starPops0004.png"));
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
    this.speed = new PIXI.Point
};
Partical.constructor = Partical;
Partical.prototype = Object.create(PIXI.Sprite.prototype);
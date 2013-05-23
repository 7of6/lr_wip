GAME.SteveTrailFire = function(a) {
    this.stage = a;
    this.target = new PIXI.Point;
    this.particals = [];
    this.particalPool = new GAME.GameObjectPool(ParticalFire);
    this.max = 100;
    this.count = 0;
    this.mOffset = mat3.identity();
    this.mOffset[2] = -30;
    this.mOffset[5] = 30;
    this.spare = mat3.identity()
};
GAME.SteveTrailFire.constructor = GAME.SteveTrailFire;
GAME.SteveTrailFire.prototype.update = function() {
    if (this.target.isDead && (this.mOffset, mat3.multiply(this.mOffset, this.target.view.localTransform, this.spare), this.count++, this.count % 3)) {
        var a = this.particalPool.getObject();
        this.stage.addChild(a);
        a.position.x = this.spare[2];
        a.position.y = this.spare[5];
        a.speed.x = 1 + 2 * Math.random();
        a.speed.y = 1 + 2 * Math.random();
        a.speed.x *= -1;
        a.speed.y *= 1;
        a.alphay = 2;
        a.rotation = 2 * Math.random() * Math.PI;
        a.scale.x = a.scale.y = 0.2 + 0.5 * Math.random();
        this.particals.push(a)
    }
    for (var b = 0; b < this.particals.length; b++) a = this.particals[b], a.scale.x = a.scale.y *= 1.02, a.alphay *= 0.85, a.alpha = 1 < a.alphay ? 1 : a.alphay, a.position.x += 2 * a.speed.x, a.position.y += 2 * a.speed.y, 0.01 > a.alpha && (this.stage.removeChild(a), this.particals.splice(b, 1), this.particalPool.returnObject(a), b--)
};
ParticalFire = function() {
    PIXI.Sprite.call(this, PIXI.Texture.fromFrameId("fireCloud.png"));
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
    this.speed = new PIXI.Point
};
ParticalFire.constructor = ParticalFire;
ParticalFire.prototype = Object.create(PIXI.Sprite.prototype);
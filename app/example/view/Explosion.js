GAME.Explosion = function() {
    PIXI.DisplayObjectContainer.call(this);
    this.particals = [];
    this.top = new ExplosionPartical("asplodeInner02.png");
    this.bottom = new ExplosionPartical("asplodeInner01.png");
    this.top.position.y = -20;
    this.bottom.position.y = 20;
    this.top.position.x = 20;
    this.bottom.position.x = 20;
    this.anchor = new PIXI.Point;
    this.addChild(this.top);
    this.addChild(this.bottom);
    this.particals = [this.top, this.bottom];
    for (var a = 0; 5 > a; a++) this.particals.push(new ExplosionPartical("asplodeSpike_01.png")), this.particals.push(new ExplosionPartical("asplodeSpike_02.png"));
    this.clouds = [];
    for (a = 0; 5 > a; a++) {
        var b = new PIXI.Sprite.fromFrame("dustSwirl.png");
        this.clouds.push(b);
        this.addChild(b)
    }
    this.reset()
};
GAME.Explosion.constructor = GAME.Explosion;
GAME.Explosion.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
GAME.Explosion.prototype.explode = function() {
    this.exploding = !0
};
GAME.Explosion.prototype.reset = function() {
    for (var a = 0; 5 > a; a++) {
        var b = this.clouds[a];
        b.anchor.x = 0.5;
        b.anchor.y = 0.5;
        b.scaleTarget = 2 + 2 * Math.random();
        b.scale.x = b.scale.x = 0.5;
        b.alpha = 0.75;
        b.position.x = 150 * (Math.random() - 0.5);
        b.position.y = 150 * (Math.random() - 0.5);
        b.speed = new PIXI.Point(20 * Math.random() - 10, 20 * Math.random() - 10);
        b.state = 0;
        b.rotSpeed = 0.05 * Math.random()
    }
    for (a = 0; a < this.particals.length; a++) {
        b = this.particals[a];
        this.addChild(b);
        var c = 2 * a / this.particals.length * Math.PI,
            d = 7 + Math.random();
        b.directionX = Math.cos(c) * d;
        b.directionY = Math.sin(c) * d;
        b.rotation = -c;
        b.rotationSpeed = 0.02 * Math.random()
    }
};
GAME.Explosion.prototype.updateTransform = function() {
    PIXI.DisplayObjectContainer.prototype.updateTransform.call(this);
    if (this.exploding) {
        for (var a = 0; a < this.clouds.length; a++) {
            var b = this.clouds[a];
            b.rotation += b.rotSpeed;
            0 == b.state ? (b.scale.x += 0.4 * (b.scaleTarget - b.scale.x), b.scale.y = b.scale.x, b.scale.x > b.scaleTarget - 0.1 && (b.state = 1)) : (b.position.x += 0.05 * b.speed.x, b.position.y += 0.05 * b.speed.y)
        }
        for (a = 0; a < this.particals.length; a++) b = this.particals[a], b.directionY += 0.1, b.directionX *= 0.99, b.position.x += b.directionX,
        b.position.y += b.directionY, b.rotation += b.rotationSpeed
    }
};
ExplosionPartical = function(a) {
    PIXI.Sprite.call(this, PIXI.Texture.fromFrameId(a));
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
    this.speed = new PIXI.Point
};
ExplosionPartical.constructor = ExplosionPartical;
ExplosionPartical.prototype = Object.create(PIXI.Sprite.prototype);
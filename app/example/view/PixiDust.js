GAME.PixiDust = function() {
    PIXI.DisplayObjectContainer.call(this);
    this.particals = [];
    this.particalPool = new GAME.GameObjectPool(ParticalDust);
    this.max = GAME.HIGH_MODE ? 100 : 10;
    for (var a = this.count = 0; a < this.max; a++) {
        var b = this.particalPool.getObject();
        b.home.x = Math.random() * -GAME.width;
        b.position.y = b.home.y = 110640 * Math.random();
        b.speed = new PIXI.Point(0.2 * (Math.random() - 0.5), 0.4 * (Math.random() - 0.5));
        this.particals.push(b);
        this.addChild(b)
    }
    this.focalLength = 150
};
GAME.PixiDust.constructor = GAME.PixiDust;
GAME.PixiDust.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
GAME.PixiDust.prototype.update = function() {
    for (var a = 0; a < this.particals.length; a++) {
        var b = this.particals[a],
            c = this.focalLength / (this.focalLength + b.z),
            c = this.focalLength / (this.focalLength + b.z);
        b.scale.x = b.scale.y = c;
        b.home.x += b.speed.x;
        b.position.y += b.speed.y;
        b.position.x = 1.5 * (b.home.x - GAME.camera.x) * c;
        b.position.x %= GAME.width;
        0 > b.position.x && (b.position.x += GAME.width);
        b.position.y %= 640;
        0 > b.position.y && (b.position.y += 640)
    }
};
ParticalDust = function() {
    ParticalDust.globalCount++;
    PIXI.Sprite.call(this, PIXI.Texture.fromFrameId(ParticalDust.frames[ParticalDust.globalCount % 3]));
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
    this.z = 500 * Math.random();
    this.rotation = 2 * Math.random() * Math.PI;
    this.home = new PIXI.Point;
    this.alpha = 0.5
};
ParticalDust.globalCount = 0;
ParticalDust.frames = ["mote01.png", "mote02.png", "mote03.png"];
ParticalDust.constructor = Partical;
ParticalDust.prototype = Object.create(PIXI.Sprite.prototype);
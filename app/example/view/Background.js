GAME = GAME || {};
GAME.Background = function() {
    PIXI.DisplayObjectContainer.call(this);
    this.width = 1E3;
    this.scrollPosition = 1500;
    this.foggyTrees = new GAME.BackgroundElement(PIXI.Texture.fromFrameId("05_far_BG.jpg"), 40, this);
    this.rearSilhouette = new GAME.BackgroundElement(PIXI.Texture.fromFrameId("03_rear_silhouette.png"), 358, this);
    this.rearCanopy = new GAME.BackgroundElement(PIXI.Texture.fromFrameId("03_rear_canopy.png"), 0, this);
    this.tree1 = PIXI.Sprite.fromFrame("02_tree_1.png");
    this.tree1.anchor.x = 0.5;
    this.addChild(this.tree1);
    this.tree2 = PIXI.Sprite.fromFrame("02_tree_2.png");
    this.tree2.anchor.x = 0.5;
    this.tree2.position.y = 50;
    this.addChild(this.tree2);
    this.farCanopy = new GAME.BackgroundElement(PIXI.Texture.fromFrameId("02_front_canopy.png"), 0, this);
    this.vines = new GAME.Vines(this);
    this.roofLeaves = new GAME.BackgroundElement(PIXI.Texture.fromFrameId("00_roof_leaves.png"), 0, this);
    this.frontSilhouette = new GAME.BackgroundElement(PIXI.Texture.fromFrameId("01_front_silhouette.png"), 424, this);
    this.foggyTrees.speed = 0.5;
    this.rearSilhouette.speed = 0.6;
    this.rearCanopy.speed = 0.6;
    this.farCanopy.speed = 0.75;
    this.frontSilhouette.speed = 0.8;
    this.roofLeaves.speed = 1
};
GAME.Background.constructor = GAME.Background;
GAME.Background.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
GAME.Background.prototype.updateTransform = function() {
    this.scrollPosition = GAME.camera.x + 4E3;
    var a = 1.5 * -this.scrollPosition / 2,
        a = a % (this.width + 556),
        a = a + (this.width + 556),
        a = a - this.tree1.width / 2;
    this.tree1.position.x = a - GAME.xOffset;
    a = 1.5 * -(this.scrollPosition + this.width / 2) / 2;
    a %= this.width + 556;
    a += this.width + 556;
    a -= this.tree2.width / 2;
    this.tree2.position.x = a - GAME.xOffset;
    this.foggyTrees.setPosition(this.scrollPosition);
    this.rearSilhouette.setPosition(this.scrollPosition);
    this.rearCanopy.setPosition(this.scrollPosition);
    this.farCanopy.setPosition(this.scrollPosition);
    this.frontSilhouette.setPosition(this.scrollPosition);
    this.roofLeaves.setPosition(this.scrollPosition);
    this.vines.setPosition(this.scrollPosition);
    PIXI.DisplayObjectContainer.prototype.updateTransform.call(this)
};
GAME.Vines = function(a) {
    this.vines = [];
    this.owner = a;
    for (var b = 0; 10 > b; b++) {
        var c = new PIXI.Sprite.fromFrame("01_hanging_flower3.png");
        c.offset = 100 * b + 50 * Math.random();
        c.speed = (1.5 + 0.25 * Math.random()) / 2;
        c.position.y = -200 * Math.random();
        a.addChild(c);
        c.position.x = 200;
        this.vines.push(c)
    }
    this.speed = 1
};
GAME.Vines.prototype.setPosition = function(a) {
    for (var b = 0; b < this.vines.length; b++) {
        var c = this.vines[b],
            d = -(a + c.offset) * c.speed,
            d = d % this.owner.width,
            d = d + this.owner.width;
        c.position.x = d
    }
};
GAME.Background.prototype.joyRideMode = function() {};
GAME.Background.prototype.normalMode = function() {};
GAME.BackgroundElement = function(a, b, c) {
    this.sprites = [];
    this.spriteWidth = a.width - 1;
    var d = Math.ceil(940 / this.spriteWidth);
    3 > d && (d = 3);
    for (var e = 0; e < d; e++) {
        var f = new PIXI.Sprite(a);
        f.position.y = b;
        c.addChild(f);
        this.sprites.push(f)
    }
    this.speed = 1
};
GAME.BackgroundElement.prototype.setPosition = function(a) {
    for (var b = this.spriteWidth, c = 0; c < this.sprites.length; c++) {
        var d = -a * this.speed,
            d = d + c * b,
            d = d % (b * this.sprites.length),
            d = d + 2 * b;
        this.sprites[c].position.x = Math.floor(d) - GAME.xOffset
    }
};
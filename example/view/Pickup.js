var GAME = GAME || {}, pickupTextures;
GAME.Pickup = function() {
    pickupTextures || (pickupTextures = "pickup_01.png pickup_02.png pickup_03.png pickup_04.png pickup_05.png pickup_06.png pickup_07.png pickup_08.png".split(" "));
    this.position = new PIXI.Point;
    this.view = new PIXI.DisplayObjectContainer;
    this.clip = new PIXI.Sprite(PIXI.Texture.fromFrameId(pickupTextures[Math2.randomInt(0, pickupTextures.length - 1)]));
    this.clip.anchor.x = 0.5;
    this.clip.anchor.y = 0.5;
    this.shine = PIXI.Sprite.fromFrame("pickupShine.png");
    this.shine.anchor.x = this.shine.anchor.y = 0.5;
    this.shine.scale.x = this.shine.scale.y = 1;
    this.shine.alpha = 0.5;
    GAME.lowMode || this.view.addChild(this.shine);
    this.view.addChild(this.clip);
    this.height = this.width = 100;
    this.count = 300 * Math.random()
};
GAME.Pickup.constructor = GAME.Pickup;
GAME.Pickup.prototype.reset = function() {};
GAME.Pickup.prototype.update = function() {
    this.isPickedUp ? (this.view.scale.x = 1 - this.ratio, this.view.scale.y = 1 - this.ratio, this.position.x = this.pickupPosition.x + (this.steve.position.x - this.pickupPosition.x) * this.ratio, this.position.y = this.pickupPosition.y + (this.steve.position.y - this.pickupPosition.y) * this.ratio) : (this.count += 0.1 * GAME.time.DELTA_TIME, this.clip.scale.x = 0.75 + 0.1 * Math.sin(this.count), this.clip.scale.y = 0.75 - 0.1 * Math.cos(this.count), this.clip.rotation = 0.2 * Math.sin(1.5 * this.count), this.shine.rotation = 0.2 * this.count);
    this.view.position.x = this.position.x - GAME.camera.x;
    this.view.position.y = this.position.y
};
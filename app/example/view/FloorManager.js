GAME = GAME || {};
GAME.FloorManager = function(a) {
    this.engine = a;
    this.count = 0;
    this.floors = [];
    this.floorPool = new GAME.GameObjectPool(GAME.Floor)
};
GAME.FloorManager.constructor = GAME.FloorManager;
GAME.FloorManager.prototype.update = function() {
    for (var a = 0; a < this.floors.length; a++) {
        var b = this.floors[a];
        b.position.x = b.x - GAME.camera.x - 16;
        b.position.x < -1135 - GAME.xOffset - 16 && (this.floorPool.returnObject(b), this.floors.splice(a, 1), a--, this.engine.view.gameFront.removeChild(b))
    }
};
GAME.FloorManager.prototype.addFloor = function(a) {
    var b = this.floorPool.getObject();
    b.x = a;
    b.position.y = 482;
    this.engine.view.gameFront.addChild(b);
    this.floors.push(b)
};
GAME.FloorManager.prototype.destroyAll = function() {
    for (var a = 0; a < this.floors.length; a++) {
        var b = this.floors[a];
        console.log(b);
        this.floorPool.returnObject(b);
        this.engine.view.gameFront.removeChild(b)
    }
    this.floors = []
};
GAME.Floor = function() {
    PIXI.Sprite.call(this, PIXI.Texture.fromFrameId("00_forest_floor.png"))
};
GAME.Floor.constructor = PIXI.Floor;
GAME.Floor.prototype = Object.create(PIXI.Sprite.prototype);
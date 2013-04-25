GAME = GAME || {};
GAME.SegmentManager = function(a) {
    this.engine = a;
    this.sections = data;
    this.count = 0;
    this.currentSegment = data[0];
    this.startSegment = {
        length: 2270,
        floor: [0, 1135],
        blocks: [],
        coins: []
    };
    this.chillMode = !0;
    this.position = this.last = 0
};
GAME.SegmentManager.constructor = GAME.SegmentManager;
GAME.SegmentManager.prototype.reset = function(a) {
    a && (this.count = 0);
    this.currentSegment = this.startSegment;
    this.currentSegment.start = -200;
    for (a = 0; a < this.currentSegment.floor.length; a++) this.engine.floorManager.addFloor(this.currentSegment.start + this.currentSegment.floor[a])
};
GAME.SegmentManager.prototype.update = function() {
    this.position = GAME.camera.x + 2 * width;
    if (this.position - this.currentSegment.start > this.currentSegment.length) if (this.engine.joyrideMode) {
        var a = this.startSegment;
        a.start = this.currentSegment.start + this.currentSegment.length;
        this.currentSegment = a;
        for (a = 0; a < this.currentSegment.floor.length; a++) this.engine.floorManager.addFloor(this.currentSegment.start + this.currentSegment.floor[a])
    } else {
        a = this.sections[this.count % this.sections.length];
        a.start = this.currentSegment.start + this.currentSegment.length;
        this.currentSegment = a;
        for (a = 0; a < this.currentSegment.floor.length; a++) this.engine.floorManager.addFloor(this.currentSegment.start + this.currentSegment.floor[a]);
        for (var b = this.currentSegment.blocks, c = b.length / 2, a = 0; a < c; a++) this.engine.enemyManager.addEnemy(this.currentSegment.start + b[2 * a], b[2 * a + 1]);
        b = this.currentSegment.coins;
        c = b.length / 2;
        for (a = 0; a < c; a++) this.engine.pickupManager.addPickup(this.currentSegment.start + b[2 * a], b[2 * a + 1]);
        this.count++
    }
};
var PIXI = PIXI || {};
PIXI.StressTest = function(a) {
    this.callback = a;
    this.stage = new PIXI.Stage;
    this.renderer = PIXI.autoDetectRenderer(500, 500);
    document.body.appendChild(this.renderer.view);
    this.cover = document.createElement("div");
    this.cover.style.width = this.cover.style.height = "500px";
    this.cover.style.background = "#25284a";
    document.body.appendChild(this.cover);
    this.renderer.view.style.position = "absolute";
    this.cover.style.position = "absolute";
    this.cover.style.zIndex = 2;
    this.duration = 3;
    var b = this;
    this.texture = PIXI.Texture.fromImage("img/testImage.png");
    this.texture.baseTexture.addEventListener("loaded", function() {
        b.begin()
    });
    this.frameRate = []
};
PIXI.StressTest.constructor = PIXI.StressTest;
PIXI.StressTest.prototype.begin = function() {
    this.testSprites = [];
    for (var a = 0; 300 > a; a++) {
        var b = new PIXI.Sprite(this.texture);
        b.anchor.x = 0.5;
        b.anchor.y = 0.5;
        this.stage.addChild(b);
        b.position.x = 50 + 400 * Math.random();
        b.position.y = 50 + 400 * Math.random();
        this.testSprites.push(b)
    }
    this.renderer.render(this.stage);
    this.startTime = Date.now();
    this.lastTime = Date.now();
    var c = this;
    requestAnimFrame(function() {
        c.update()
    })
};
PIXI.StressTest.prototype.update = function() {
    for (var a = Date.now(), b = 0; b < this.testSprites.length; b++) this.testSprites[b].rotation += 0.3;
    this.renderer.render(this.stage);
    b = a - this.lastTime;
    this.frameRate.push(0.06 * b);
    this.lastTime = a;
    if (a - this.startTime < 1E3 * this.duration) {
        var c = this;
        requestAnimFrame(function() {
            c.update()
        })
    } else document.body.removeChild(this.renderer.view), document.body.removeChild(this.cover), this.renderer = this.cover = null, this.result = this.frameRate.length / this.duration, this.callback && this.callback()
};

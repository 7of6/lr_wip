GAME = GAME || {};
GAME.Score = function() {
    PIXI.DisplayObjectContainer.call(this);
    this.ratio = 0;
    this.glyphs = {
        "0": "number_00.png",
        1: "number_01.png",
        2: "number_02.png",
        3: "number_03.png",
        4: "number_04.png",
        5: "number_05.png",
        6: "number_06.png",
        7: "number_07.png",
        8: "number_08.png",
        9: "number_09.png",
        ",": "number_comma.png"
    };
    for (a in this.glyphs) this.glyphs[a] = PIXI.Texture.fromFrameId(this.glyphs[a]);
    this.digits = [];
    for (var a = 0; 8 > a; a++) this.digits[a] = new PIXI.Sprite(this.glyphs[a]), this.addChild(this.digits[a]);
    this.setScore(formatScore(12345))
};
GAME.Score.constructor = PIXI.Score;
GAME.Score.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
GAME.Score.prototype.setScore = function(a) {
    a = formatScore(a)
        .split("");
    for (var b = 0, c = 0; c < a.length; c++) {
        var d = this.digits[c];
        d.visible = !0;
        d.setTexture(this.glyphs[a[c]]);
        d.position.x = b;
        b += d.width + -10
    }
    for (c = 0; c < this.digits.length; c++) this.digits[c].position.x -= b;
    for (c = a.length; c < this.digits.length; c++) this.digits[c].visible = !1
};
GAME.Score.prototype.jump = function() {
    this.ratio = 2.2
};

function formatScore(a) {
    a = a.toString()
        .split("");
    for (var b = "", c = a.length, d = c % 3 - 1, e = 0; e < c; e++) b += a[e], 0 == (e - d) % 3 && e != c - 1 && (b += ",");
    return b
};
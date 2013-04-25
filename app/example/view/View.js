GAME = GAME || {};
GAME.RprView = function(a) {
    this.engine = a;
    this.renderer = PIXI.autoDetectRenderer(600, 800);
    GAME.HIGH_MODE = this.renderer instanceof PIXI.WebGLRenderer;
    this.stage = new PIXI.Stage;
    this.container = new PIXI.DisplayObjectContainer;
    this.hud = new PIXI.DisplayObjectContainer;
    this.game = new PIXI.DisplayObjectContainer;
    this.gameFront = new PIXI.DisplayObjectContainer;
    this.container.addChild(this.game);
    this.container.addChild(this.gameFront);
    this.stage.addChild(this.container);
    this.stage.addChild(this.hud);
    this.normalBackground = GAME.lowMode ? new GAME.LowFiBackground : new GAME.Background(this.gameFront);
    this.joyBackground = new GAME.JoyBackground;
    this.lava = new GAME.Lava(this.gameFront);
    this.powerBar = new GAME.PowerBar;
    this.score = new GAME.Score;
    this.score.position.x = 300;
    this.background = this.normalBackground;
    this.game.addChild(this.background);
    this.hud.addChild(this.powerBar);
    this.hud.addChild(this.score);
    this.trail = new GAME.SteveTrail(this.game);
    this.trail2 = new GAME.SteveTrailFire(this.game);
    this.powerBar.alpha = 0;
    this.count = this.score.alpha = 0;
    this.zoom = 1;
    this.white = PIXI.Sprite.fromImage("img/whiteSquare.jpg");
    GAME.xOffset = this.container.position.x;
    this.dust = new GAME.PixiDust;
    this.container.addChild(this.dust);
    this.splash = new GAME.Splash;
    this.splash.position.y = 300;
    this.splash.position.x = 300;
    this.game.addChild(this.splash)
};
GAME.RprView.constructor = GAME.RprView;
GAME.RprView.prototype.showHud = function() {
    this.score.alpha = 1;
    this.score.position.x = GAME.width + 300;
    TweenLite.to(this.score.position, 1, {
        x: GAME.width - 295 - 20,
        ease: Elastic.easeOut
    });
    this.powerBar.alpha = 1;
    this.powerBar.position.x = GAME.width;
    TweenLite.to(this.powerBar.position, 1, {
        x: GAME.width - 295,
        ease: Elastic.easeOut,
        delay: 0.3
    })
};
GAME.RprView.prototype.hideHud = function() {};
GAME.RprView.prototype.update = function() {
    this.count += 0.01;
    if (!GAME.lowMode) {
        var a = -GAME.width / 2;
        this.container.position.x = (a + (-this.engine.steve.view.position.x - a) * (this.zoom - 1)) * this.zoom;
        this.container.position.y = -this.engine.steve.view.position.y * this.zoom;
        this.container.position.x += GAME.width / 2;
        this.container.position.y += GAME.height / 2;
        GAME.xOffset = this.container.position.x;
        0 < this.container.position.y && (this.container.position.y = 0);
        a = -GAME.height * this.zoom;
        a += GAME.height;
        this.container.position.y < a && (this.container.position.y = a);
        this.container.scale.x = this.zoom;
        this.container.scale.y = this.zoom
    }
    this.trail.target = this.engine.steve;
    this.trail2.target = this.engine.steve;
    this.trail.update();
    this.trail2.update();
    this.dust.update();
    this.lava.setPosition(GAME.camera.x + 4E3);
    this.score.setScore(Math.round(this.engine.score));
    this.powerBar.bar.scale.x = this.engine.pickupCount / (50 * this.engine.bulletMult) * (248 / 252);
    this.renderer.render(this.stage)
};
GAME.RprView.prototype.joyrideMode = function() {
    this.game.removeChild(this.background);
    this.background = this.joyBackground;
    this.game.addChildAt(this.background, 0);
    this.stage.addChild(this.white);
    this.white.alpha = 1;
    TweenLite.to(this.white, 0.7, {
        alpha: 0,
        ease: Sine.easeOut
    })
};
GAME.RprView.prototype.doSplash = function() {
    this.splash.splash(this.engine.steve.position)
};
GAME.RprView.prototype.normalMode = function() {
    this.game.removeChild(this.background);
    this.background = this.normalBackground;
    this.game.addChildAt(this.background, 0);
    this.stage.addChild(this.white);
    this.white.alpha = 1;
    TweenLite.to(this.white, 0.5, {
        alpha: 0,
        ease: Sine.easeOut
    })
};
GAME.RprView.prototype.resize = function(a, b) {
    GAME.width = a;
    GAME.height = b;
    this.renderer.resize(a, b);
    this.background.width = a;
    this.score.position.x = a - 295 - 20;
    this.score.position.y = 12;
    this.white.scale.x = a / 16;
    this.white.scale.y = b / 16;
    this.powerBar.position.x = a - 295;
    this.powerBar.position.y = 12
};
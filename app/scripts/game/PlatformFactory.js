//--------------------------------------------------------------------------
//  Platform Factory Class
//--------------------------------------------------------------------------
GAME.PlatformFactory = function() {

    GAME.platformTextures = [];

	this.townTextures = ["house1.png", "house2.png", "house3.png", "house4.png", "long_house.png"];
    this.canyonTextures = ["canyon_platform_small.png", "canyon_platform_medium.png", "canyon_platform_large.png"];
    this.platformPool = new GAME.ObjectPool(GAME.Platform)
};
GAME.PlatformFactory.constructor = GAME.PlatformFactory;

//--------------------------------------------------------------------------
//  API
//--------------------------------------------------------------------------
GAME.PlatformFactory.prototype.setTextures = function(texture){

    switch(texture){
        case GAME_LEVEL.TOWN:
            GAME.platformTextures = this.townTextures;
        break;
        case GAME_LEVEL.CANYONS:
            GAME.platformTextures = this.canyonTextures;
        break;
    }   
}

GAME.PlatformFactory.prototype.getPlatform = function() {
    var obj = this.platformPool.getObject();
    return obj;
};

GAME.PlatformFactory.prototype.getStepUp = function() {

    var s1, s2;

    if (GAME.platformTextures === this.townTextures){
        s1 = new PIXI.Sprite(PIXI.Texture.fromFrame("crates.png"));
        s1.anchor.x = 0;
        s1.anchor.y = 1;
        s1.hitHeight = s1.height + 5;
        s2 = new PIXI.Sprite(PIXI.Texture.fromFrame("hay_barn.png"));
        s2.anchor.x = 0;
        s2.anchor.y = 1;
        s2.hitHeight = s2.height + 5;
    }

    if (GAME.platformTextures === this.canyonTextures){
        s1 = new PIXI.DisplayObjectContainer();

        var platform = new PIXI.Sprite(PIXI.Texture.fromFrame("canyon_platform_loop.png"));
        platform.position.x = 80;
        platform.position.y = -80;

        var cap = new PIXI.Sprite(PIXI.Texture.fromFrame("canyon_step_up.png"));
        cap.position.y = -80;
        cap.position.x = -20;

        s1.addChild(platform);
        s1.addChild(cap);
        s1.hitHeight = 80;
        s1.width = 300;


        s2 = new PIXI.DisplayObjectContainer();

        var platform = new PIXI.Sprite(PIXI.Texture.fromFrame("canyon_platform_loop.png"));
        platform.position.x = 80;
        platform.position.y = -160;

        var cap = new PIXI.Sprite(PIXI.Texture.fromFrame("canyon_step_up.png"));
        cap.position.y = -160;
        cap.position.x = -20;

        var end = new PIXI.Sprite(PIXI.Texture.fromFrame("canyon_end_right1.png"));
        end.position.y = -160;
        end.position.x = platform.width - 60;

        s2.addChild(platform);
        s2.addChild(cap);
        s2.addChild(end);
        s2.hitHeight = 160;
        s2.width = platform.width + 100;
    }

    

    var obj = {
    	'step1': s1,
    	'step2': s2
    };

    return obj;
};

//--------------------------------------------------------------------------
//  Platform Class
//--------------------------------------------------------------------------
GAME.Platform = function() {
    var texture = GAME.platformTextures[Math2.randomInt(0, GAME.platformTextures.length - 1)];
    PIXI.Sprite.call(this, PIXI.Texture.fromFrame(texture));
    this.anchor.x = 0;
    this.anchor.y = 1;

    if(GAME.platformTextures === this.townTextures){

        // define hitbox for houses
        switch (texture) {
            case "house1.png":
                this.hitHeight = 133;
            break;
            case "house2.png":
                this.hitHeight = 195;
            break;
            case "house3.png":
                this.hitHeight = 195;
            break;
            case "house4.png":
                this.hitHeight = 240;
            break;
            case "long_house.png":
                this.hitHeight = 183;
            break;
            default:
                this.hitHeight = this.height + 5;
            break;
        }

    } else {

        this.hitHeight = this.height;

    }

};
GAME.Platform.constructor = GAME.Platform;
GAME.Platform.prototype = Object.create(PIXI.Sprite.prototype);



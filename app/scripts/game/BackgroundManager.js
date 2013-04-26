//--------------------------------------------------------------------------
//  Background Manager Class
//--------------------------------------------------------------------------
GAME.BackgroundManager = function(engineRef){
	console.log("BackgroundManager");
	PIXI.DisplayObjectContainer.call(this);

    this.engine = engineRef;

    // object pool
    this.backgrounds = [];
    this.nextbg = this.spawnCount = 0;

    this.width = 1600;
	this.scrollPosition;

	this.distance = new GAME.MultiTileBackgroundElement(["bg1.jpg","bg2.jpg","bg1.jpg","bg2.jpg"], this);
	this.distance.speed = 0.2;

    this.middistance = new PIXI.DisplayObjectContainer();
    this.addChild(this.middistance);
    this.middistance.speed = 0.4;

    this.backgroundFactory = new GAME.BackgroundFactory();

}

GAME.BackgroundManager.constructor = GAME.BackgroundManager;
GAME.BackgroundManager.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);

	//--------------------------------------------------------------------------
	//  Override Update
	//--------------------------------------------------------------------------
	GAME.BackgroundManager.prototype.updateTransform = function() {

		this.scrollPosition = GAME.camera.x + 10000;
        this.distance.setPosition(this.scrollPosition);

        // move everything in the backgrounds pool
        for (var i=0; i<this.backgrounds.length;i++){

            obj = this.backgrounds[i];

            obj.position.x -= this.engine.player.speed.x * this.middistance.speed;

            if (obj.position.x < 0 - obj.width){
                this.backgroundFactory.backgroundPool.returnObject(obj);
                this.backgrounds.splice(i, 1);
                i--;
                this.middistance.removeChild(obj);
            }

        }

        // randomly add a background to the middistance
        this.spawnCount += this.engine.player.speed.x * this.middistance.speed;
        this.nextbg < this.spawnCount && (this.spawnCount = 0, this.addBackground(GAME.width + 40, 329));
	    
	    PIXI.DisplayObjectContainer.prototype.updateTransform.call(this)
	};

    GAME.BackgroundManager.prototype.addBackground = function(a,b) {

        var c = this.backgroundFactory.getBackground();
        c.position.x = a;
        c.position.y = b;
        this.backgrounds.push(c);
        this.middistance.addChild(c)

        this.nextbg = c.width;
    }

//--------------------------------------------------------------------------
//  Repeatable Background Element Class
//--------------------------------------------------------------------------
GAME.BackgroundElement = function(asset, yPos, target){

	this.sprites = [];
    this.spriteWidth = asset.width - 1;
    var slices = Math.ceil(940 / this.spriteWidth);
    3 > slices && (slices = 3);

    for (var i = 0; i < slices; i++) {

        var element = new PIXI.Sprite(asset);
        element.position.y = yPos;
        target.addChild(element);
        this.sprites.push(element)
    }
    this.speed = 1

}

GAME.BackgroundElement.prototype.setPosition = function(scrollPos) {

    for (var width = this.spriteWidth, i = 0; i < this.sprites.length; i++) {

    	var newPos = -scrollPos * this.speed,
            newPos = newPos + i * width,
            newPos = newPos % (width * this.sprites.length),
            newPos = newPos + 2 * width;

        this.sprites[i].position.x = Math.floor(newPos);

    }

};

//--------------------------------------------------------------------------
//  MultiTile Background Element Class
//--------------------------------------------------------------------------
GAME.MultiTileBackgroundElement = function(assets, target, align, yPos){

    align = align || 0; yPos = yPos || 0;
	
	this.sprites = [];
		
	for (var i=0; i<assets.length; i++){

		var element = new PIXI.Sprite(PIXI.Texture.fromFrame(assets[i]));
        element.position.y = yPos;
        target.addChild(element);
		this.sprites.push(element);

        if (align){
            element.anchor.y = 1;
        }

	}

	this.spriteWidth = element.width;
	this.speed = 1;

}

GAME.MultiTileBackgroundElement.constructor = GAME.MultiTileBackgroundElement;
GAME.MultiTileBackgroundElement.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);

GAME.MultiTileBackgroundElement.prototype.setPosition = function(scrollPos) {

    for (var width = this.spriteWidth - 1, i = 0; i < this.sprites.length; i++) {

    	var newPos = -scrollPos * this.speed,
            newPos = newPos + i * width,
            newPos = newPos % (width * this.sprites.length),
            newPos = newPos + 2 * width;

        this.sprites[i].position.x = Math.floor(newPos);

    }

};
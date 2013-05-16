//--------------------------------------------------------------------------
//  Background Manager Class
//--------------------------------------------------------------------------
GAME.BackgroundManager = function(engineRef){

	PIXI.DisplayObjectContainer.call(this);

    this.engine = engineRef;

    // object pool
    this.backgrounds = [];
    this.nextbg = this.spawnCount = 0;
    this.hasMiddistance = 0;
    this.hasTrain = 0;
    this.rangerDroppedOff = 0;

    this.FLOOR_Y = 339;
    this.width = 1600;
	this.scrollPosition;
    this.scrollOffset = 10000;

	this.distance = new GAME.MultiTileBackgroundElement(["bg1.jpg","bg2.jpg","bg1.jpg","bg2.jpg"], this);
	this.distance.speed = 0.2;

    this.middistance = new PIXI.DisplayObjectContainer();
    this.addChild(this.middistance);
    this.middistance.speed = 0.4;

    this.train = new GAME.Train();  
    this.train.position.y = 171;
    this.train.speed = 0.08;
   //this.train.speed = 0.5;

    this.backgroundFactory = new GAME.BackgroundFactory();

}

GAME.BackgroundManager.constructor = GAME.BackgroundManager;
GAME.BackgroundManager.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);

//--------------------------------------------------------------------------
//  Override Update
//--------------------------------------------------------------------------
GAME.BackgroundManager.prototype.updateTransform = function() {

    if (!GAME.gameover){

    	this.scrollPosition = GAME.camera.x + this.scrollOffset;
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

        // move the train
        if (this.hasTrain){
            this.train.position.x -= this.engine.player.speed.x * this.train.speed;

            if (this.train.position.x <= this.engine.player.view.position.x && !this.rangerDroppedOff){

                // drop off the ranger
                this.engine.foregroundManager.dropOffRanger();
                this.rangerDroppedOff = true;

            }

        }

        // randomly add a background to the middistance
        this.spawnCount += this.engine.player.speed.x * this.middistance.speed;

        if (this.hasMiddistance){
            this.nextbg < this.spawnCount && (this.spawnCount = 0, this.addBackground(GAME.width + 40, this.FLOOR_Y));
        }

    }
    
    PIXI.DisplayObjectContainer.prototype.updateTransform.call(this);
};

GAME.BackgroundManager.prototype.addBackground = function(x,y) {

    var obj = this.backgroundFactory.getBackground();
    obj.position.x = x;
    obj.position.y = y;
    this.backgrounds.push(obj);
    this.middistance.addChild(obj)

    this.nextbg = obj.width;
}

GAME.BackgroundManager.prototype.addTrain = function() {

    var obj = this.backgroundFactory.getTrainStation();
    obj.position.x = GAME.width + 40;
    obj.position.y = this.FLOOR_Y;
    this.backgrounds.push(obj);
    this.middistance.addChild(obj);

    this.nextbg = obj.width;

    this.train.position.x = GAME.width + 60;
    this.addChild(this.train);
    this.hasTrain = true;
}

GAME.BackgroundManager.prototype.reset = function(){

    for (var i=0; i<this.backgrounds.length;i++){
        var obj = this.backgrounds[i];
        this.middistance.removeChild(obj);
    }
    this.backgrounds = [];

    this.rangerDroppedOff = false;
    this.train.reset();

    if (this.hasTrain){

        this.removeChild(this.train);
        this.hasTrain = false;

    }

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
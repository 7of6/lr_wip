//--------------------------------------------------------------------------
//  Background Manager Class
//--------------------------------------------------------------------------
GAME.BackgroundManager = function(){
	console.log("BackgroundManager");
	PIXI.DisplayObjectContainer.call(this);

	this.scrollPosition;

	this.distance = new GAME.MultiTileBackgroundElement(["bg1.jpg","bg2.jpg","bg1.jpg","bg2.jpg"], this);
	this.distance.speed = 0.2;

}

GAME.BackgroundManager.constructor = GAME.BackgroundManager;
GAME.BackgroundManager.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);

	//--------------------------------------------------------------------------
	//  Override Update
	//--------------------------------------------------------------------------
	GAME.BackgroundManager.prototype.updateTransform = function() {

		this.scrollPosition = GAME.camera.x + 10000;
		this.distance.setPosition(this.scrollPosition);
			    
	    PIXI.DisplayObjectContainer.prototype.updateTransform.call(this)
	};

//--------------------------------------------------------------------------
//  Background Element Class
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
GAME.MultiTileBackgroundElement = function(assets, target){
	
	this.sprites = [];
		
	for (var i=0; i<assets.length; i++){

		var element = new PIXI.Sprite(PIXI.Texture.fromFrame(assets[i]));
        target.addChild(element);
		this.sprites.push(element);

	}

	this.spriteWidth = element.width;
	this.speed = 1;

}

GAME.MultiTileBackgroundElement.constructor = GAME.MultiTileBackgroundElement;
GAME.MultiTileBackgroundElement.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);

GAME.MultiTileBackgroundElement.prototype.setPosition = function(scrollPos) {

    for (var width = this.spriteWidth, i = 0; i < this.sprites.length; i++) {

    	var newPos = -scrollPos * this.speed,
            newPos = newPos + i * width,
            newPos = newPos % (width * this.sprites.length),
            newPos = newPos + 2 * width;

        this.sprites[i].position.x = Math.floor(newPos);

    }

};
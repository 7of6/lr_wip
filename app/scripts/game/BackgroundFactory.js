//--------------------------------------------------------------------------
//  Background Factory Class
//--------------------------------------------------------------------------
GAME.BackgroundFactory = function() {

	GAME.backgroundTextures = [];

	this.desertTextures = [];
	this.townTextures = ["bg_town_house1.png","bg_town_house2.png","bg_town_house3.png","bg_town_house4.png","bg_town_house5.png","bg_town_house6.png","bg_town_house7.png","bg_town_house8.png","corral.png","gallows.png"];
	this.indianTextures = ["tipi_closed.png","tipi_open.png","tipi_partial.png","tipi_group.png"];
   
    this.backgroundPool = new GAME.ObjectPool(GAME.BackgroundItem);

    this.setTextures(GAME_LEVEL.TOWN);
};
GAME.BackgroundFactory.constructor = GAME.BackgroundFactory;

GAME.BackgroundFactory.prototype.getBackground = function() {
    var obj = this.backgroundPool.getObject();
    return obj;
};

GAME.BackgroundFactory.prototype.setTextures = function(texture){

	switch(texture){
		case GAME_LEVEL.DESERT:
			GAME.backgroundTextures = this.desertTextures;
		break;
		case GAME_LEVEL.INDIAN_VILLAGE:
			GAME.backgroundTextures = this.indianTextures;
		break;
		case GAME_LEVEL.TOWN:
			GAME.backgroundTextures = this.townTextures;
		break;
	}
	
}

//--------------------------------------------------------------------------
//  BackgroundItem Class
//--------------------------------------------------------------------------
GAME.BackgroundItem = function() {
    PIXI.Sprite.call(this, PIXI.Texture.fromFrame(GAME.backgroundTextures[Math2.randomInt(0, GAME.backgroundTextures.length - 1)]));
    this.anchor.x = 0;
    this.anchor.y = 1;
};
GAME.BackgroundItem.constructor = GAME.BackgroundItem;
GAME.BackgroundItem.prototype = Object.create(PIXI.Sprite.prototype);
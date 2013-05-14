GAME.Message = function(message){
	PIXI.DisplayObjectContainer.call(this);

	var self = this;

	this.bg = new PIXI.MovieClip([
		PIXI.Texture.fromFrame("brush_stroke.swf/0000"),
		PIXI.Texture.fromFrame("brush_stroke.swf/0001"),
		PIXI.Texture.fromFrame("brush_stroke.swf/0002"),
		PIXI.Texture.fromFrame("brush_stroke.swf/0003"),
		PIXI.Texture.fromFrame("brush_stroke.swf/0004"),
		PIXI.Texture.fromFrame("brush_stroke.swf/0005"),
		PIXI.Texture.fromFrame("brush_stroke.swf/0006"),
		PIXI.Texture.fromFrame("brush_stroke.swf/0007"),
		PIXI.Texture.fromFrame("brush_stroke.swf/0008"),
		PIXI.Texture.fromFrame("brush_stroke.swf/0009"),
		PIXI.Texture.fromFrame("brush_stroke.swf/0010")
	]);

	this.messageText = new PIXI.Text(message, {font:"40px InGameFont", fill:"#000000"});
	this.messageText.anchor.x = 0.5;
	this.messageText.anchor.y = 0.5;
	this.messageText.position.x = Math.round(GAME.width / 2);
	this.messageText.position.y = Math.round(GAME.height / 2) - 15;	

	this.bg.animationSpeed = 0.5;
	this.bg.anchor.x = 0.5;
	this.bg.anchor.y = 0.5;
	this.bg.position.x = GAME.width / 2;
	this.bg.position.y = GAME.height / 2 - 20;
	this.bg.loop = false;
	this.bg.onComplete = function(){self.showText()};
	this.bg.play();
	this.addChild(this.bg);

}
GAME.Message.constructor = GAME.Message;
GAME.Message.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);

GAME.Message.prototype.showText = function(){

	var self = this;

	this.addChild(this.messageText);

	TweenMax.to(this.messageText.scale, 0.2, {x:1, y:1, startAt:{x:2, y:2}});
	TweenMax.to(this.messageText.scale, 0.1, {x:1, y:1, startAt:{x:0.9, y:0.9}, delay:0.2});
	TweenMax.to(this.bg.scale, 0.1, {x:1, y:1, startAt:{x:0.9, y:0.9}, delay:0.2, onComplete:function(){self.removeText()}});

}

GAME.Message.prototype.removeText = function(){

	var self = this;

	TweenMax.to(this, 0.5, {alpha:0, delay:1, onComplete:function(){self.destroy()}});
}

GAME.Message.prototype.destroy = function(){
	this.parent.removeChild(this);
}
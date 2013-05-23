GAME.Message = function(message, small, start){
	PIXI.DisplayObjectContainer.call(this);

	var self = this;

	if (small){

		this.bg = new PIXI.MovieClip([
			PIXI.Texture.fromFrame("brush_stroke.swf/0000"),
			PIXI.Texture.fromFrame("brush_stroke.swf/0001"),
			PIXI.Texture.fromFrame("brush_stroke.swf/0002"),
			PIXI.Texture.fromFrame("brush_stroke.swf/0003"),
			PIXI.Texture.fromFrame("brush_stroke.swf/0004")
		]);

	} else {

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

	}


	this.bg.animationSpeed = 0.5;

	if (small){

		this.bg.anchor.x = 0.38;

	}else{

		this.bg.anchor.x = 0.5;
		
	}

	this.bg.anchor.y = 0.5;

	this.bg.position.x = GAME.width / 2;
	this.bg.position.y = GAME.height / 2 - 20;
	this.bg.loop = false;
	
	this.bg.play();
	this.addChild(this.bg);


	if (start){


		this.bg.onComplete = function(){self.showStart()};

		this.oneText = new PIXI.Text("1", {font:"38px Anton", fill:"#000000"});
		this.oneText.anchor.x = 0.5;
		this.oneText.anchor.y = 0.5;
		this.oneText.position.x = Math.round(GAME.width / 2);
		this.oneText.position.y = Math.round(GAME.height / 2) - 18;	
	    if (GAME.isFireFox){
	        this.oneText.position.y += 13;
	    }
	    this.oneText.alpha = 0;
		this.addChild(this.oneText);

		this.twoText = new PIXI.Text("2", {font:"38px Anton", fill:"#000000"});
		this.twoText.anchor.x = 0.5;
		this.twoText.anchor.y = 0.5;
		this.twoText.position.x = Math.round(GAME.width / 2);
		this.twoText.position.y = Math.round(GAME.height / 2) - 18;	
	    if (GAME.isFireFox){
	        this.twoText.position.y += 13;
	    }
	    this.twoText.alpha = 0;
		this.addChild(this.twoText);

		this.threeText = new PIXI.Text("3", {font:"38px Anton", fill:"#000000"});
		this.threeText.anchor.x = 0.5;
		this.threeText.anchor.y = 0.5;
		this.threeText.position.x = Math.round(GAME.width / 2);
		this.threeText.position.y = Math.round(GAME.height / 2) - 18;	
	    if (GAME.isFireFox){
	        this.threeText.position.y += 13;
	    }
	    this.threeText.alpha = 0;
		this.addChild(this.threeText);

		this.messageText = new PIXI.Text(message, {font:"38px Anton", fill:"#000000"});
		this.messageText.anchor.x = 0.5;
		this.messageText.anchor.y = 0.5;
		this.messageText.position.x = Math.round(GAME.width / 2);
		this.messageText.position.y = Math.round(GAME.height / 2) - 18;	
	    if (GAME.isFireFox){
	        this.messageText.position.y += 13;
	    }
	    this.messageText.alpha = 0;
		this.addChild(this.messageText);


	}else{

		this.bg.onComplete = function(){self.showText()};

		this.messageText = new PIXI.Text(message, {font:"38px Anton", fill:"#000000"});
		this.messageText.anchor.x = 0.5;
		this.messageText.anchor.y = 0.5;
		this.messageText.position.x = Math.round(GAME.width / 2);
		this.messageText.position.y = Math.round(GAME.height / 2) - 18;	
	    if (GAME.isFireFox){
	        this.messageText.position.y += 13;
	    }
	    this.messageText.alpha = 0;
		this.addChild(this.messageText);


	}

}
GAME.Message.constructor = GAME.Message;
GAME.Message.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);

GAME.Message.prototype.showStart = function(){

	var self = this;

	// 3
	TweenMax.to(this.threeText, 0, {startAt:{alpha:1}});
	TweenMax.to(this.threeText.scale, 0.2, {x:1, y:1, startAt:{x:2, y:2}});
	TweenMax.to(this.threeText.scale, 0.1, {x:1, y:1, startAt:{x:0.9, y:0.9}, delay:0.2});
	TweenMax.to(this.bg.scale, 0.1, {x:1, y:1, startAt:{x:0.9, y:0.9}, delay:0.2, onComplete:function(){self.removeText(self.threeText)}});

	// 2
	TweenMax.to(this.twoText, 0, {startAt:{alpha:1}, delay:0.6});
	TweenMax.to(this.twoText.scale, 0.2, {x:1, y:1, startAt:{x:2, y:2}, delay:0.6});
	TweenMax.to(this.twoText.scale, 0.1, {x:1, y:1, startAt:{x:0.9, y:0.9}, delay:0.8});
	TweenMax.to(this.bg.scale, 0.1, {x:1, y:1, startAt:{x:0.9, y:0.9}, delay:0.8, onComplete:function(){self.removeText(self.twoText)}});

	// 1
	TweenMax.to(this.oneText, 0, {startAt:{alpha:1}, delay:1.2});
	TweenMax.to(this.oneText.scale, 0.2, {x:1, y:1, startAt:{x:2, y:2}, delay:1.2});
	TweenMax.to(this.oneText.scale, 0.1, {x:1, y:1, startAt:{x:0.9, y:0.9}, delay:1.4});
	TweenMax.to(this.bg.scale, 0.1, {x:1, y:1, startAt:{x:0.9, y:0.9}, delay:1.4, onComplete:function(){self.removeText(self.oneText)}});

	// go
	TweenMax.to(this.messageText, 0, {startAt:{alpha:1}, delay:1.8});
	TweenMax.to(this.messageText.scale, 0.2, {x:1, y:1, startAt:{x:2, y:2}, delay:1.8});
	TweenMax.to(this.messageText.scale, 0.1, {x:1, y:1, startAt:{x:0.9, y:0.9}, delay:2});
	TweenMax.to(this.bg.scale, 0.1, {x:1, y:1, startAt:{x:0.9, y:0.9}, delay:2, onComplete:function(){self.removeMessage()}});


}

GAME.Message.prototype.removeText = function(target){

	TweenMax.to(target, 0.3, {alpha:0});
}

GAME.Message.prototype.showText = function(){

	var self = this;

	this.messageText.alpha = 1;

	TweenMax.to(this.messageText.scale, 0.2, {x:1, y:1, startAt:{x:2, y:2}});
	TweenMax.to(this.messageText.scale, 0.1, {x:1, y:1, startAt:{x:0.9, y:0.9}, delay:0.2});
	TweenMax.to(this.bg.scale, 0.1, {x:1, y:1, startAt:{x:0.9, y:0.9}, delay:0.2, onComplete:function(){self.removeMessage()}});

}

GAME.Message.prototype.removeMessage = function(){

	var self = this;

	TweenMax.to(this, 0.5, {alpha:0, delay:1, onComplete:function(){self.destroy()}});
}

GAME.Message.prototype.destroy = function(){
	this.parent.removeChild(this);
}
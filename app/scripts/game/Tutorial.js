GAME.Tutorial = function(engineRef){
	PIXI.DisplayObjectContainer.call(this);
	
	var self = this;
	this.engine = engineRef;

	this.tutorialIndex = 0;
	this.tutorialCopy = [
		"Silver is the Lone Ranger's trusty steed,\nalways there to help save the day...",
		"Your mission is to collect the Lone Ranger\nat the Indian Camp, then race through town\nand help him stop the runaway train...",
		"Press 'Space', click the mouse or touch\nthe screen to jump",
		"Hitting small obstacles will slow you\ndown. Hitting large obstacles will end\nthe game. Good luck!"
	];

	this.bgTexture = PIXI.Texture.fromFrame("intro_panel.png");
	var bg = new PIXI.Sprite(this.bgTexture);
	this.addChild(bg);

	var titleText = new PIXI.Text("HOW TO PLAY", {font:"33px InGameFont", fill:"#ffffff", stroke: "#666666", strokeThickness: 4});
	titleText.position.x = Math.round((this.bgTexture.width - titleText.width)/ 2);
	titleText.position.y = 10;
	this.addChild(titleText);

	this.instructionText = new PIXI.Text(this.tutorialCopy[0],{font:"bold italic 18px Arial", fill:"#000000"});
	this.instructionText.position.x = 20;
	this.instructionText.position.y = 60;
	this.addChild(this.instructionText);

	this.continueText = new PIXI.Text("Click to continue", {font:"bold italic 20px Arial", fill:"#000000"});
	this.continueText.position.x = Math.round((this.bgTexture.width - this.continueText.width) - 40);
	this.continueText.position.y = 160;
	this.addChild(this.continueText);
	

	this.position.x = Math.round((GAME.width - this.bgTexture.width) / 2);
	this.position.y = Math.round((GAME.height - this.bgTexture.height) / 2) - 20;


}
GAME.Tutorial.constructor = GAME.Tutorial;
GAME.Tutorial.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);

GAME.Tutorial.prototype.skip = function(){

	var self = this;

	TweenMax.to(this.continueText, 0.5, {alpha:0});
	TweenMax.to(this.instructionText, 0.5, {alpha:0, onComplete:function(){
		self.swapToNext();
	}})

}

GAME.Tutorial.prototype.swapToNext = function(){

	var self = this;

	this.tutorialIndex ++;

	if (this.tutorialIndex < this.tutorialCopy.length){

		this.instructionText.setText(this.tutorialCopy[this.tutorialIndex]);
		
		TweenMax.to(this.continueText, 0.5, {alpha:1});
		TweenMax.to(this.instructionText, 0.5, {alpha:1});

	} else {

		this.engine.view.hud.addChild(new GAME.Message("3, 2, 1, GO!"));
		this.engine.sectionManager.setMilestones();
		this.engine.player.cutScene = 0;
		GAME.tutorial = 0;
		GAME.seenTutorial = 1;
		this.destroy();

	}

}

GAME.Tutorial.prototype.resize = function(){
	this.position.x = Math.round((GAME.width - this.bgTexture.width) / 2);
	this.position.y = Math.round((GAME.height - this.bgTexture.height) / 2) - 20;
}

GAME.Tutorial.prototype.destroy = function(){
	this.parent.removeChild(this);
}
//--------------------------------------------------------------------------
//  Footer Class
//--------------------------------------------------------------------------
GAME.Footer = function(){

	PIXI.DisplayObjectContainer.call(this);

    var self = this;


    // background
    this.addChild(new PIXI.Sprite(PIXI.Texture.fromFrame("footer.jpg")));

    // site button
    var siteButton = new PIXI.DisplayObjectContainer();
    siteButton.position.x = 60;
    siteButton.position.y = 21;
    var siteText = new PIXI.Text("WEBSITE", {font: "26px InGameFont", fill: "#000000", align: "left"});
    siteButton.addChild(siteText);

    this.addChild(siteButton);
    siteButton.setInteractive(true);
    siteButton.buttonMode = true;
    siteButton.mousedown = siteButton.touchstart = this.handleSite;

    // trailer button
    var trailerButton = new PIXI.DisplayObjectContainer();
    trailerButton.position.x = 676;
    trailerButton.position.y = 22;
    var trailerText = new PIXI.Text("TRAILER", {font: "26px InGameFont", fill: "#000000", align: "left"});
    trailerButton.addChild(trailerText);

    this.addChild(trailerButton);
    trailerButton.setInteractive(true);
    trailerButton.buttonMode = true;
    trailerButton.mousedown = trailerButton.touchstart = this.handleTrailer;

    // in cinemas text
    var cinemaText = new PIXI.Text("IN CINEMAS\nSOON", {font: "italic 14px Arial", fill: "#ffffff", align: "center"});
    cinemaText.position.x = 230;
    cinemaText.position.y = 20;
    this.addChild(cinemaText);

    // social buttons
    var facebook = new PIXI.Sprite(PIXI.Texture.fromFrame("facebook_button.png"));
    facebook.position.x = 512;
    facebook.position.y = 29;
    facebook.setInteractive(true);
    facebook.buttonMode = true;
    facebook.mousedown = facebook.touchstart = this.handleFacebook;
    this.addChild(facebook);

    var twitter = new PIXI.Sprite(PIXI.Texture.fromFrame("twitter_button.png"));
    twitter.position.x = 562;
    twitter.position.y = 29;
    twitter.setInteractive(true);
    twitter.buttonMode = true;
    twitter.mousedown = twitter.touchstart = this.handleTwitter;
    this.addChild(twitter);

}

GAME.Footer.constructor = GAME.Footer;
GAME.Footer.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);

GAME.Footer.prototype.handleFacebook = function(data){
    console.log("facebook click");
}

GAME.Footer.prototype.handleTwitter = function(data){
    console.log("twitter click");
}

GAME.Footer.prototype.handleSite = function(data){
    console.log("site click");
}

GAME.Footer.prototype.handleTrailer = function(data){
    console.log("trailer click");

    GAME.openTrailer();

}
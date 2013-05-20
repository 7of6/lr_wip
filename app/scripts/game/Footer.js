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
    siteButton.position.x = 130;
    siteButton.position.y = 25;
    var siteText = new PIXI.Text(GAME.LOCALISED.WEBSITE, {font: "20px InGameFont", fill: "#000000"});
    siteText.anchor.x = 1;
    siteButton.addChild(siteText);

    this.addChild(siteButton);
    siteButton.setInteractive(true);
    siteButton.buttonMode = true;
    siteButton.mousedown = siteButton.touchstart = this.handleSite;

    // trailer button
    var trailerButton = new PIXI.DisplayObjectContainer();
    trailerButton.position.x = 676;
    trailerButton.position.y = 25;
    var trailerText = new PIXI.Text(GAME.LOCALISED.TRAILER, {font: "20px InGameFont", fill: "#000000"});
    trailerButton.addChild(trailerText);

    this.addChild(trailerButton);
    trailerButton.setInteractive(true);
    trailerButton.buttonMode = true;
    trailerButton.mousedown = trailerButton.touchstart = this.handleTrailer;

    // in cinemas text
    var cinemaText = new PIXI.Text(GAME.LOCALISED.CTA, {font: "italic 14px Arial", fill: "#ffffff", align: "center"});
    cinemaText.position.x = 380;
    cinemaText.position.y = 25;
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

    // copyright
    var copyright = new PIXI.Text(GAME.LOCALISED.COPYRIGHT, {font: "italic 9px Arial", fill: "#87878d"});
    copyright.anchor.x = 1;
    copyright.position.x = GAME.width - 8;
    copyright.position.y = 62;
    this.addChild(copyright);


}

GAME.Footer.constructor = GAME.Footer;
GAME.Footer.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);

GAME.Footer.prototype.handleFacebook = function(data){
    window.open(GAME.LOCALISED.FACEBOOK_LINK, "_blank");
    ga('send', 'event', 'Game', 'Facebook', 'Footer');
}

GAME.Footer.prototype.handleTwitter = function(data){
    window.open(GAME.LOCALISED.TWITTER_LINK, "_blank");
    ga('send', 'event', 'Game', 'Twitter', 'Footer');
}

GAME.Footer.prototype.handleSite = function(data){
    window.open(GAME.LOCALISED.WEBSITE_LINK, "_blank");
    ga('send', 'event', 'Game', 'Official Site', 'Footer');
}

GAME.Footer.prototype.handleTrailer = function(data){
    GAME.openTrailer();
    ga('send', 'event', 'Game', 'Trailer', 'Footer');
}
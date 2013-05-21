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

    this.siteButtonBG = new PIXI.Sprite(PIXI.Texture.fromFrame("footer_website_off.png"));
    siteButton.addChild(this.siteButtonBG);
    siteButton.position.x = 14;
    siteButton.position.y = 17;

    var siteText = new PIXI.Text(GAME.LOCALISED.WEBSITE, {font: "20px Anton", fill: "#000000"});
    siteText.position.x = 50;
    siteText.position.y = 8;

    if (GAME.isFireFox){
        siteText.position.y += 7;
    }
    siteButton.addChild(siteText);

    var siteButtonIcon = new PIXI.Sprite(PIXI.Texture.fromFrame("footer_website_icon.png"));
    siteButtonIcon.position.x = siteText.position.x + siteText.width + 10;
    siteButtonIcon.position.y = 15;
    siteButton.addChild(siteButtonIcon);

    this.addChild(siteButton);
    siteButton.setInteractive(true);
    siteButton.buttonMode = true;
    siteButton.mousedown = siteButton.touchstart = this.handleSite;

    if (!GAME.isMobile){

        siteButton.mouseover = function(){
            self.siteButtonBG.setTexture(PIXI.Texture.fromFrame("footer_website_on.png"));
        };
        siteButton.mouseout = function(){
            self.siteButtonBG.setTexture(PIXI.Texture.fromFrame("footer_website_off.png"));
        };

    }

    // trailer button
    var trailerButton = new PIXI.DisplayObjectContainer();
    this.trailerButtonBG = new PIXI.Sprite(PIXI.Texture.fromFrame("footer_trailer_off.png"));
    trailerButton.addChild(this.trailerButtonBG);
    trailerButton.position.x = 601;
    trailerButton.position.y = 17;

    var trailerButtonIcon = new PIXI.Sprite(PIXI.Texture.fromFrame("footer_trailer_icon.png"));
    trailerButtonIcon.position.x = 40;
    trailerButtonIcon.position.y = 11;
    trailerButton.addChild(trailerButtonIcon);

    var trailerText = new PIXI.Text(GAME.LOCALISED.TRAILER, {font: "20px Anton", fill: "#000000"});
    trailerText.position.x = 70;
    trailerText.position.y = 8;

    if (GAME.isFireFox){
        trailerText.position.y += 7;
    }
    trailerButton.addChild(trailerText);


    this.addChild(trailerButton);
    trailerButton.setInteractive(true);
    trailerButton.buttonMode = true;
    trailerButton.mousedown = trailerButton.touchstart = this.handleTrailer;

    if (!GAME.isMobile){

        trailerButton.mouseover = function(){
            self.trailerButtonBG.setTexture(PIXI.Texture.fromFrame("footer_trailer_on.png"));
        };
        trailerButton.mouseout = function(){
            self.trailerButtonBG.setTexture(PIXI.Texture.fromFrame("footer_trailer_off.png"));
        };

    }

    // in cinemas text
    var cinemaText = new PIXI.Text(GAME.LOCALISED.CTA, {font: "italic 14px Titillium Web", fill: "#ffffff", align: "center"});
    cinemaText.position.x = 390;
    cinemaText.position.y = 18;
    if (GAME.isFireFox){
        cinemaText.position.y += 6;
    }
    this.addChild(cinemaText);

    // social buttons
    this.facebook = new PIXI.Sprite(PIXI.Texture.fromFrame("facebook_off.png"));
    this.facebook.position.x = 497;
    this.facebook.position.y = 24;
    this.facebook.setInteractive(true);
    this.facebook.buttonMode = true;
    this.facebook.mousedown = this.facebook.touchstart = this.handleFacebook;
    this.addChild(this.facebook);

    if (!GAME.isMobile){

        this.facebook.mouseover = function(){
            self.facebook.setTexture(PIXI.Texture.fromFrame("facebook_on.png"));
        };
        this.facebook.mouseout = function(){
            self.facebook.setTexture(PIXI.Texture.fromFrame("facebook_off.png"));
        };

    }

    this.twitter = new PIXI.Sprite(PIXI.Texture.fromFrame("twitter_off.png"));
    this.twitter.position.x = 549;
    this.twitter.position.y = 22;
    this.twitter.setInteractive(true);
    this.twitter.buttonMode = true;
    this.twitter.mousedown = this.twitter.touchstart = this.handleTwitter;

    if (!GAME.isMobile){

        this.twitter.mouseover = function(){
            self.twitter.setTexture(PIXI.Texture.fromFrame("twitter_on.png"));
        };
        this.twitter.mouseout = function(){
            self.twitter.setTexture(PIXI.Texture.fromFrame("twitter_off.png"));
        };

    }

    this.addChild(this.twitter);

    // copyright
    var copyright = new PIXI.Text(GAME.LOCALISED.COPYRIGHT, {font: "italic 9px Titillium Web", fill: "#87878d"});
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
//--------------------------------------------------------------------------
//  Train Class
//--------------------------------------------------------------------------
GAME.Train = function(engineRef){
	console.log("Train");
	PIXI.DisplayObjectContainer.call(this);

    this.engine = engineRef;

    this.carriages = [];

    // animations
    this.wheelFrames = [
        PIXI.Texture.fromFrame("train_running_gear_75percent.swf/0000"),
        PIXI.Texture.fromFrame("train_running_gear_75percent.swf/0001"),
        PIXI.Texture.fromFrame("train_running_gear_75percent.swf/0002"),
        PIXI.Texture.fromFrame("train_running_gear_75percent.swf/0003"),
        PIXI.Texture.fromFrame("train_running_gear_75percent.swf/0004"),
        PIXI.Texture.fromFrame("train_running_gear_75percent.swf/0005"),
        PIXI.Texture.fromFrame("train_running_gear_75percent.swf/0006"),
        PIXI.Texture.fromFrame("train_running_gear_75percent.swf/0007")
    ];

    // carriage
    var carriage;
    carriage = new GAME.TrainCarriage("second");
    this.addChild(carriage);
    this.carriages.push(carriage);

    // ranger
    this.ranger = new PIXI.Sprite(PIXI.Texture.fromFrame("ranger_train.png"));
    this.ranger.position.x = -12;
    this.ranger.position.y = 36;
    this.ranger.alpha = 0;
    carriage.addChild(this.ranger);

    carriage = new GAME.TrainCarriage("first");
    carriage.position.x = carriage.position.x + carriage.width - 33;
    this.addChild(carriage);
    this.carriages.push(carriage);

    // tender
    this.tender_body = new PIXI.Sprite(PIXI.Texture.fromFrame("coal_tender.png"));
    this.tender_body.position.x = carriage.position.x + carriage.width - 25;
    this.tender_body.position.y = 35;
    this.addChild(this.tender_body);

    // engine
    this.running_gear = new PIXI.MovieClip(this.wheelFrames);
    this.running_gear.animationSpeed = 0.35;
    this.running_gear.play();
    this.addChild(this.running_gear);

    this.ranger2 = new PIXI.Sprite(PIXI.Texture.fromFrame("ranger_train.png"));
    this.ranger2.position.x = 30;
    this.ranger2.position.y = -44;
    this.ranger2.alpha = 0;
    this.running_gear.addChild(this.ranger2);

    this.engine_body = new PIXI.Sprite(PIXI.Texture.fromFrame("locomotive.png"));
    this.engine_body.position.x = this.tender_body.position.x + this.tender_body.width - 52;
    this.running_gear.position.x = this.engine_body.position.x - 40;
    this.running_gear.position.y = 82;
    this.addChild(this.engine_body);

}

GAME.Train.constructor = GAME.Train;
GAME.Train.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);

GAME.Train.prototype.reset = function(){

    for (var i=0;i<this.carriages.length;i++){
        this.carriages[i].reflection.play();
    }
    this.running_gear.animationSpeed = 0.35;
    this.ranger.alpha = 0;
    this.ranger2.alpha = 0;

}

GAME.Train.prototype.slowDown = function(){
    for (var i=0;i<this.carriages.length;i++){
        this.carriages[i].reflection.stop();
    }
}


GAME.TrainCarriage = function(type){
    PIXI.DisplayObjectContainer.call(this);

    // animations
    this.firstclassreflectionFrames = [
        PIXI.Texture.fromFrame("carriage_reflections_1st_class.swf/0000"),
        PIXI.Texture.fromFrame("carriage_reflections_1st_class.swf/0001"),
        PIXI.Texture.fromFrame("carriage_reflections_1st_class.swf/0002"),
        PIXI.Texture.fromFrame("carriage_reflections_1st_class.swf/0003"),
        PIXI.Texture.fromFrame("carriage_reflections_1st_class.swf/0004"),
        PIXI.Texture.fromFrame("carriage_reflections_1st_class.swf/0005"),
        PIXI.Texture.fromFrame("carriage_reflections_1st_class.swf/0006"),
        PIXI.Texture.fromFrame("carriage_reflections_1st_class.swf/0007"),
        PIXI.Texture.fromFrame("carriage_reflections_1st_class.swf/0008"),
        PIXI.Texture.fromFrame("carriage_reflections_1st_class.swf/0009"),
        PIXI.Texture.fromFrame("carriage_reflections_1st_class.swf/0010"),
        PIXI.Texture.fromFrame("carriage_reflections_1st_class.swf/0011"),
        PIXI.Texture.fromFrame("carriage_reflections_1st_class.swf/0012"),
        PIXI.Texture.fromFrame("carriage_reflections_1st_class.swf/0013")
    ];

    this.secondclassreflectionFrames = [
        PIXI.Texture.fromFrame("carriage_reflections_2nd_class.swf/0000"),
        PIXI.Texture.fromFrame("carriage_reflections_2nd_class.swf/0001"),
        PIXI.Texture.fromFrame("carriage_reflections_2nd_class.swf/0002"),
        PIXI.Texture.fromFrame("carriage_reflections_2nd_class.swf/0003"),
        PIXI.Texture.fromFrame("carriage_reflections_2nd_class.swf/0004"),
        PIXI.Texture.fromFrame("carriage_reflections_2nd_class.swf/0005"),
        PIXI.Texture.fromFrame("carriage_reflections_2nd_class.swf/0006"),
        PIXI.Texture.fromFrame("carriage_reflections_2nd_class.swf/0007"),
        PIXI.Texture.fromFrame("carriage_reflections_2nd_class.swf/0008"),
        PIXI.Texture.fromFrame("carriage_reflections_2nd_class.swf/0009"),
        PIXI.Texture.fromFrame("carriage_reflections_2nd_class.swf/0010"),
        PIXI.Texture.fromFrame("carriage_reflections_2nd_class.swf/0011"),
        PIXI.Texture.fromFrame("carriage_reflections_2nd_class.swf/0012"),
        PIXI.Texture.fromFrame("carriage_reflections_2nd_class.swf/0013")
    ];

    if (type == "first"){

        this.carriage_body = new PIXI.Sprite(PIXI.Texture.fromFrame("carriage_1st_class.png"));
        this.carriage_body.position.x = 0;
        this.carriage_body.position.y = -2;
        this.addChild(this.carriage_body);

        this.reflection = new PIXI.MovieClip(this.firstclassreflectionFrames);
        this.reflection.animationSpeed = 0.35;
        this.reflection.position.x = 2;
        this.reflection.position.y = -4;
        this.reflection.play();
        this.addChild(this.reflection);

    }else{

        this.carriage_body = new PIXI.Sprite(PIXI.Texture.fromFrame("carriage_2nd_class.png"));
        this.carriage_body.position.x = 0;
        this.carriage_body.position.y = 8;
        this.addChild(this.carriage_body);

        this.reflection = new PIXI.MovieClip(this.secondclassreflectionFrames);
        this.reflection.animationSpeed = 0.35;
        this.reflection.position.x = 2;
        this.reflection.position.y = 10;
        this.reflection.play();
        this.addChild(this.reflection);

    }

    this.width = this.carriage_body.width;

    return this;

}
GAME.TrainCarriage.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
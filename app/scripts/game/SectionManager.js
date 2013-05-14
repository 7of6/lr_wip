//--------------------------------------------------------------------------
//  Section Manager Class
//--------------------------------------------------------------------------
GAME.SectionManager = function(engineRef){
	console.log("SectionManager");

	this.engine = engineRef;

}

GAME.SectionManager.constructor = GAME.SectionManager;


GAME.SectionManager.prototype.update = function(){

	var current_pos = Math.round((GAME.camera.x + 140)/10);

	if (current_pos > GAME_MILESTONES[GAME.level]){
		GAME.level ++;

		console.log("Scene change", GAME.level);

		switch (GAME.level){
			case GAME_LEVEL.TUTORIAL:
				if (!GAME.seenTutorial){
					this.engine.player.cutScene = 1;
					GAME.tutorial = 1;
					this.engine.view.hud.addChild(this.engine.view.tutorial);
				}else{
					this.setMilestones();
				}
			break;
			case GAME_LEVEL.DESERT:
				this.engine.view.progressbar.startTime();
				this.engine.view.hud.addChild(new GAME.Message("GET TO THE INDIAN VILLAGE"));
				// desert obstacles, no midbackground, no platforms, no gaps
				this.engine.foregroundManager.obstacleFactory.setTextures(GAME_LEVEL.DESERT);
				this.engine.view.backgroundManager.hasMiddistance = 0;
				this.engine.foregroundManager.hasFloorGaps = 0;
				this.engine.foregroundManager.obstacleMax = 2;
				this.engine.foregroundManager.hasLargeObjects = 1;

			break;
			case GAME_LEVEL.INDIAN_VILLAGE:

				// desert + indian obstacles, indian midbackground, no platforms, no gaps
				this.engine.view.backgroundManager.hasMiddistance = 1;
				this.engine.foregroundManager.hasFloorGaps = 0;
				this.engine.view.backgroundManager.backgroundFactory.setTextures(GAME_LEVEL.INDIAN_VILLAGE);
				this.engine.foregroundManager.obstacleFactory.setTextures(GAME_LEVEL.INDIAN_VILLAGE);

			break;
			case GAME_LEVEL.INDIAN_VILLAGE_RANGER:

				// cut scene
				this.engine.foregroundManager.addRanger();
				this.engine.tonto.catchUp();
				this.engine.foregroundManager.hasLargeObjects = 0;
				this.engine.foregroundManager.obstacleMax = 0;

			break;
			case GAME_LEVEL.DESERT_INTERLUDE:

				// desert filler 
				this.engine.view.hud.addChild(new GAME.Message("GET TO THE TRAIN"));
				this.engine.view.backgroundManager.hasMiddistance = 0;
				this.engine.foregroundManager.obstacleFactory.setTextures(GAME_LEVEL.DESERT);
				this.engine.foregroundManager.hasLargeObjects = 1;
				this.engine.foregroundManager.obstacleMax = 2;
			break;
			case GAME_LEVEL.TOWN:

				// town obstacles, town midbackground, no platforms, no gaps
				this.engine.view.backgroundManager.hasMiddistance = 1;
				this.engine.view.backgroundManager.backgroundFactory.setTextures(GAME_LEVEL.TOWN);
				this.engine.foregroundManager.obstacleFactory.setTextures(GAME_LEVEL.TOWN);

			break;
			case GAME_LEVEL.TOWN_ROOFTOPS:

				// town obstacles, town midbackground, platforms, no gaps
				this.engine.foregroundManager.obstacleMax = 0;
				this.engine.foregroundManager.hasLargeObjects = 0;
				this.engine.view.backgroundManager.hasMiddistance = 1;
				this.engine.foregroundManager.obstacleFactory.setTextures(GAME_LEVEL.TOWN);
				this.engine.view.backgroundManager.backgroundFactory.setTextures(GAME_LEVEL.TOWN);
				this.engine.foregroundManager.platformFactory.setTextures(GAME_LEVEL.TOWN);
				this.engine.foregroundManager.hasPlatforms = 1;
				this.engine.foregroundManager.addStepUp();
				this.engine.tonto.fallBack();

			break;
			case GAME_LEVEL.TRAIN_STATION:

				// desert obstacles, train midbackground, no platforms, gaps
				this.engine.view.backgroundManager.hasMiddistance = 0;
				this.engine.foregroundManager.obstacleMax = 0;
				this.engine.foregroundManager.hasPlatforms = 0;
				this.engine.foregroundManager.initTrack();
				this.engine.view.backgroundManager.addTrain();
				this.engine.view.backgroundManager.train.speed = 0.05;
				this.engine.tonto.catchUp();
			break;
			case GAME_LEVEL.TRAIN_CHASE:

				this.engine.view.hud.addChild(new GAME.Message("CATCH THAT TRAIN"));
				// desert obstacles, train midbackground, no platforms, gaps
				this.engine.foregroundManager.obstacleFactory.setTextures(GAME_LEVEL.DESERT);
				this.engine.foregroundManager.obstacleMax = 1;
				//this.engine.foregroundManager.hasFloorGaps = 1;
				this.engine.foregroundManager.hasFloorGaps = 0;
				this.engine.tonto.fallBack();

			break;
			case GAME_LEVEL.TRAIN_RANGER:

				// cut scene
				this.engine.foregroundManager.hasFloorGaps = 0;

			break;
			case GAME_LEVEL.CANYONS:

				this.engine.view.hud.addChild(new GAME.Message("GET TO THE ENGINE"));
				// desert obstacles, train midbackground, platforms, no gaps
				this.engine.foregroundManager.obstacleMax = 1;
				this.engine.view.backgroundManager.backgroundFactory.setTextures(GAME_LEVEL.CANYONS);
				this.engine.foregroundManager.platformFactory.setTextures(GAME_LEVEL.CANYONS);
				this.engine.foregroundManager.hasPlatforms = 1;
				this.engine.foregroundManager.addStepUp();
				this.engine.foregroundManager.hasFloor = 0;
				this.engine.foregroundManager.hasTrack = 0;
				this.engine.view.backgroundManager.train.speed = 0.09;

			break;
			case GAME_LEVEL.CANYONS_INTERLUDE:

				// no platforms, gaps or obstacles
				this.engine.foregroundManager.resetFloor();
				this.engine.foregroundManager.hasPlatforms = 0;
				this.engine.foregroundManager.obstacleMax = 0;
				this.engine.foregroundManager.hasTrack = 1;
				this.engine.tonto.catchUp();
			break;
			case GAME_LEVEL.DESERT_TRAIN:
				// cut scene
				this.engine.view.hud.addChild(new GAME.Message("GREAT JOB!"));
				this.engine.view.backgroundManager.train.ranger2.alpha = 1;
				this.engine.view.backgroundManager.train.speed = 0;

				this.engine.view.progressbar.stopTime();
				this.engine.view.backgroundManager.train.slowDown();
				TweenMax.to(this.engine.player.speed, 2, {x:0});
				TweenMax.to(this.engine.player.view, 2, {animationSpeed:0});
				TweenMax.to(this.engine.tonto.view, 2, {animationSpeed:0});
				TweenMax.to(this.engine.view.backgroundManager.train.running_gear, 2, {animationSpeed:0});
				this.engine.player.cutScene = 1;

				TweenMax.delayedCall(3, this.engine.onGameComplete, null, this.engine);

			break;
		}

		
	}

}

GAME.SectionManager.prototype.reset = function(){
	// no obstacles, no midbackground, no platforms, no gaps
	this.engine.foregroundManager.obstacleFactory.setTextures(GAME_LEVEL.DESERT);
	this.engine.view.backgroundManager.hasMiddistance = 0;
	this.engine.foregroundManager.hasFloorGaps = 0;
	this.engine.foregroundManager.obstacleMax = 0;
	this.engine.foregroundManager.hasPlatforms = 0;
	this.engine.foregroundManager.hasLargeObjects = 0;
	this.engine.foregroundManager.hasFloor = 1;
	this.engine.foregroundManager.hasTrack = 0;
}

GAME.SectionManager.prototype.setMilestones = function(){
	// TUTORIAL
	GAME_MILESTONES[1] = GAME_MILESTONES[0] + Math.round((GAME.camera.x + 140)/10) + 100;
	/*// DESERT
	GAME_MILESTONES[2] = GAME_MILESTONES[1] + 10;
	// INDIAN VILLAGE
	GAME_MILESTONES[3] = GAME_MILESTONES[2] + 10;
	// GET RANGER CUTSCENE
	GAME_MILESTONES[4] = GAME_MILESTONES[3] + 10;
	// DESERT INTERLUDE
	GAME_MILESTONES[5] = GAME_MILESTONES[4] + 100;
	// TOWN
	GAME_MILESTONES[6] = GAME_MILESTONES[5] + 100;
	// ROOFTOPS
	GAME_MILESTONES[7] = GAME_MILESTONES[6] + 100;
	// TRAIN STATION
	GAME_MILESTONES[8] = GAME_MILESTONES[7] + 200;
	// TRAIN CHASE
	GAME_MILESTONES[9] = GAME_MILESTONES[8] + 10;
	// TRAIN RANGER
	GAME_MILESTONES[10] = GAME_MILESTONES[9] + 400;
	// CANYONS
	GAME_MILESTONES[11] = GAME_MILESTONES[10] + 10;
	// CANYONS INTERLUDE
	GAME_MILESTONES[12] = GAME_MILESTONES[11] + 400;
	// DESERT_TRAIN
	GAME_MILESTONES[13] = GAME_MILESTONES[12] + 100;*/

	// DESERT
	GAME_MILESTONES[2] = GAME_MILESTONES[1] + 600;
	// INDIAN VILLAGE
	GAME_MILESTONES[3] = GAME_MILESTONES[2] + 400;
	// GET RANGER CUTSCENE
	GAME_MILESTONES[4] = GAME_MILESTONES[3] + 200;
	// DESERT INTERLUDE
	GAME_MILESTONES[5] = GAME_MILESTONES[4] + 500;
	// TOWN
	GAME_MILESTONES[6] = GAME_MILESTONES[5] + 800;
	// ROOFTOPS
	GAME_MILESTONES[7] = GAME_MILESTONES[6] + 1000;
	// TRAIN STATION
	GAME_MILESTONES[8] = GAME_MILESTONES[7] + 200;
	// TRAIN CHASE
	GAME_MILESTONES[9] = GAME_MILESTONES[8] + 1000;
	// TRAIN RANGER
	GAME_MILESTONES[10] = GAME_MILESTONES[9] + 400;
	// CANYONS
	GAME_MILESTONES[11] = GAME_MILESTONES[10] + 1000;
	// CANYONS INTERLUDE
	GAME_MILESTONES[12] = GAME_MILESTONES[11] + 400;
	// DESERT_TRAIN
	GAME_MILESTONES[13] = GAME_MILESTONES[12] + 100;

	GAME.GOAL_DISTANCE = GAME_MILESTONES[13];
}

//--------------------------------------------------------------------------
//  Level Object
//--------------------------------------------------------------------------
var GAME_LEVEL = {
	START: 0,
	TUTORIAL: 1,
    DESERT: 2,
    INDIAN_VILLAGE: 3,
    INDIAN_VILLAGE_RANGER: 4,
    DESERT_INTERLUDE: 5,
    TOWN: 6,
    TOWN_ROOFTOPS: 7,
    TRAIN_STATION: 8,
    TRAIN_CHASE: 9,
    TRAIN_RANGER: 10,
    CANYONS: 11,
    CANYONS_INTERLUDE: 12,
    DESERT_TRAIN: 13
};

var GAME_MILESTONES = {};

// DISTANCE FROM LAST MILESTONE

// START
GAME_MILESTONES[0] = 0;
// TUTORIAL
GAME_MILESTONES[1] = GAME_MILESTONES[0] + 10000000;

GAME.GOAL_DISTANCE = GAME_MILESTONES[1];


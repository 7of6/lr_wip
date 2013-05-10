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
				//this.engine.view.hud.addChild(new GAME.Message("3, 2, 1, GO!"));
			break;
			case GAME_LEVEL.DESERT:
				this.engine.view.hud.addChild(new GAME.Message("GET TO THE INDIAN VILLAGE"));
				// desert obstacles, no midbackground, no platforms, no gaps
				this.engine.foregroundManager.obstacleFactory.setTextures(GAME_LEVEL.DESERT);
				this.engine.view.background.hasMiddistance = 0;
				this.engine.foregroundManager.hasFloorGaps = 0;
				this.engine.foregroundManager.obstacleMax = 0;


				// testing
				/*
				this.engine.foregroundManager.obstacleMax = 1;
				this.engine.view.background.hasMiddistance = 1;
				this.engine.foregroundManager.obstacleFactory.setTextures(GAME_LEVEL.TOWN);
				this.engine.view.background.backgroundFactory.setTextures(GAME_LEVEL.TOWN);
				this.engine.foregroundManager.platformFactory.setTextures(GAME_LEVEL.TOWN);
				this.engine.foregroundManager.hasPlatforms = 1;
				this.engine.foregroundManager.addStepUp();
				*/
				this.engine.foregroundManager.obstacleMax = 1;
				this.engine.view.background.hasMiddistance = 1;
				this.engine.foregroundManager.obstacleFactory.setTextures(GAME_LEVEL.CANYONS);
				this.engine.view.background.backgroundFactory.setTextures(GAME_LEVEL.CANYONS);
				this.engine.foregroundManager.platformFactory.setTextures(GAME_LEVEL.CANYONS);
				this.engine.foregroundManager.hasPlatforms = 1;
				this.engine.foregroundManager.addStepUp();
				this.engine.foregroundManager.hasFloor = 0;
	

			break;
			case GAME_LEVEL.DESERT_END:

				// testing
				this.engine.foregroundManager.resetFloor();

				this.engine.foregroundManager.hasFloorGaps = 0;
				this.engine.foregroundManager.obstacleFactory.setTextures(GAME_LEVEL.DESERT);
				this.engine.foregroundManager.hasPlatforms = 0;
			break;
			case GAME_LEVEL.INDIAN_VILLAGE:

				// desert + indian obstacles, indian midbackground, no platforms, no gaps
				this.engine.view.background.hasMiddistance = 1;
				this.engine.foregroundManager.hasFloorGaps = 0;
				this.engine.view.background.backgroundFactory.setTextures(GAME_LEVEL.INDIAN_VILLAGE);
				this.engine.foregroundManager.obstacleFactory.setTextures(GAME_LEVEL.INDIAN_VILLAGE);

			break;
			case GAME_LEVEL.INDIAN_VILLAGE_RANGER:

				// cut scene

			break;
			case GAME_LEVEL.DESERT_INTERLUDE:
				this.engine.view.hud.addChild(new GAME.Message("GET TO THE TRAIN"));
				this.engine.view.background.hasMiddistance = 0;
				this.engine.foregroundManager.obstacleFactory.setTextures(GAME_LEVEL.DESERT);
			break;
			case GAME_LEVEL.TOWN:

				// town obstacles, town midbackground, no platforms, no gaps
				this.engine.view.background.hasMiddistance = 1;
				this.engine.view.background.backgroundFactory.setTextures(GAME_LEVEL.TOWN);
				this.engine.foregroundManager.obstacleFactory.setTextures(GAME_LEVEL.TOWN);

			break;
			case GAME_LEVEL.TOWN_ROOFTOPS:

				// town obstacles, town midbackground, platforms, no gaps

			break;
			case GAME_LEVEL.TRAIN:

				// desert obstacles, train midbackground, no platforms, gaps
				this.engine.view.hud.addChild(new GAME.Message("CATCH THAT TRAIN"));
				this.engine.view.background.hasMiddistance = 0;
				this.engine.foregroundManager.obstacleFactory.setTextures(GAME_LEVEL.DESERT);

			break;
			case GAME_LEVEL.CANYONS:

				// desert obstacles, train midbackground, platforms, no gaps

			break;
			case GAME_LEVEL.DESERT_TRAIN:

				// cut scene
				this.engine.view.hud.addChild(new GAME.Message("GREAT JOB!"));

			break;
		}

		
	}

}

GAME.SectionManager.prototype.reset = function(){
	// no obstacles, no midbackground, no platforms, no gaps
	this.engine.foregroundManager.obstacleFactory.setTextures(GAME_LEVEL.DESERT);
	this.engine.view.background.hasMiddistance = 0;
	this.engine.foregroundManager.hasFloorGaps = 0;
	this.engine.foregroundManager.obstacleMax = 0;
	this.engine.foregroundManager.hasFloor = 1;
}

//--------------------------------------------------------------------------
//  Level Object
//--------------------------------------------------------------------------
var GAME_LEVEL = {
	START: 0,
	TUTORIAL: 1,
    DESERT: 2,
    DESERT_END: 3,
    INDIAN_VILLAGE: 4,
    INDIAN_VILLAGE_RANGER: 5,
    DESERT_INTERLUDE: 6,
    TOWN: 7,
    TOWN_ROOFTOPS: 8,
    TRAIN: 9,
    CANYONS: 10,
    DESERT_TRAIN: 11
};

var GAME_MILESTONES = {};

// DISTANCE FROM LAST MILESTONE

// START
GAME_MILESTONES[0] = 0;

// TUTORIAL
GAME_MILESTONES[1] = GAME_MILESTONES[0] + 200;

// DESERT
GAME_MILESTONES[2] = GAME_MILESTONES[1] + 1000;

// DESERT END
GAME_MILESTONES[3] = GAME_MILESTONES[2] + 400;

// INDIAN VILLAGE
GAME_MILESTONES[4] = GAME_MILESTONES[3] + 500;

// GET RANGER CUTSCENE
GAME_MILESTONES[5] = GAME_MILESTONES[4] + 200;

// DESERT INTERLUDE
GAME_MILESTONES[6] = GAME_MILESTONES[5] + 500;

// TOWN
GAME_MILESTONES[7] = GAME_MILESTONES[6] + 1000;

// ROOFTOPS
GAME_MILESTONES[8] = GAME_MILESTONES[7] + 50000;

// TRAIN STATION
GAME_MILESTONES[9] = GAME_MILESTONES[8] + 500;

// CANYONS
GAME_MILESTONES[10] = GAME_MILESTONES[9] + 500;

// TRAIN CAUGHT CUTSCENE
GAME_MILESTONES[11] = GAME_MILESTONES[10] + 500;

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
				this.engine.view.hud.addChild(new GAME.Message("3, 2, 1, GO!"));
			break;
			case GAME_LEVEL.DESERT:
				this.engine.view.hud.addChild(new GAME.Message("GET TO THE INDIAN VILLAGE"));
				// desert obstacles, no midbackground, no platforms, no gaps
				this.engine.view.background.hasMiddistance = 0;
				this.engine.foregroundManager.hasFloorGaps = 1;
				this.engine.foregroundManager.obstacleMax = 2;

			break;
			case GAME_LEVEL.INDIAN_VILLAGE:

				// desert + indian obstacles, indian midbackground, no platforms, no gaps
				this.engine.view.background.hasMiddistance = 1;
				this.engine.foregroundManager.hasFloorGaps = 0;
				this.engine.view.background.backgroundFactory.setTextures(GAME_LEVEL.INDIAN_VILLAGE);

			break;
			case GAME_LEVEL.INDIAN_VILLAGE_RANGER:

				// cut scene

			break;
			case GAME_LEVEL.DESERT_INTERLUDE:
				this.engine.view.hud.addChild(new GAME.Message("GET TO THE TRAIN"));
				this.engine.view.background.hasMiddistance = 0;
			break;
			case GAME_LEVEL.TOWN:

				// town obstacles, town midbackground, no platforms, no gaps
				this.engine.view.background.hasMiddistance = 1;
				this.engine.view.background.backgroundFactory.setTextures(GAME_LEVEL.TOWN);

			break;
			case GAME_LEVEL.TOWN_ROOFTOPS:

				// town obstacles, town midbackground, platforms, no gaps

			break;
			case GAME_LEVEL.TRAIN:

				// desert obstacles, train midbackground, no platforms, gaps
				this.engine.view.hud.addChild(new GAME.Message("CATCH THAT TRAIN"));
				this.engine.view.background.hasMiddistance = 0;

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
    TRAIN: 8,
    CANYONS: 9,
    DESERT_TRAIN: 10
};

var GAME_MILESTONES = {};

// DISTANCE FROM LAST MILESTONE

// START
GAME_MILESTONES[0] = 0;

// TUTORIAL
GAME_MILESTONES[1] = GAME_MILESTONES[0] + 500;

// DESERT
GAME_MILESTONES[2] = GAME_MILESTONES[1] + 500;

// INDIAN VILLAGE
GAME_MILESTONES[3] = GAME_MILESTONES[2] + 500;

// GET RANGER CUTSCENE
GAME_MILESTONES[4] = GAME_MILESTONES[3] + 500;

// DESERT INTERLUDE
GAME_MILESTONES[5] = GAME_MILESTONES[4] + 500;

// TOWN
GAME_MILESTONES[6] = GAME_MILESTONES[5] + 500;

// ROOFTOPS
GAME_MILESTONES[7] = GAME_MILESTONES[6] + 500;

// TRAIN STATION
GAME_MILESTONES[8] = GAME_MILESTONES[7] + 500;

// CANYONS
GAME_MILESTONES[9] = GAME_MILESTONES[8] + 500;

// TRAIN CAUGHT CUTSCENE
GAME_MILESTONES[10] = GAME_MILESTONES[9] + 500;

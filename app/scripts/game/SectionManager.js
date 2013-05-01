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
			case GAME_LEVEL.DESERT:

				// desert obstacles, no midbackground, no platforms, no gaps
				this.engine.view.background.hasMiddistance = 0;
				this.engine.foregroundManager.hasFloorGaps = 1;

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
				this.engine.view.background.hasMiddistance = 0;

			break;
			case GAME_LEVEL.CANYONS:

				// desert obstacles, train midbackground, platforms, no gaps

			break;
			case GAME_LEVEL.DESERT_TRAIN:

				// cut scene

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
	TUTORIAL: 0,
    DESERT: 1,
    INDIAN_VILLAGE: 2,
    INDIAN_VILLAGE_RANGER: 3,
    DESERT_INTERLUDE: 4,
    TOWN: 5,
    TOWN_ROOFTOPS: 6,
    TRAIN: 7,
    CANYONS: 8,
    DESERT_TRAIN: 9
};

var GAME_MILESTONES = {
	0: 500,
	1: 1000,
	2: 1500,
	3: 2000,
	4: 2500,
	5: 6000,
	6: 7000,
	7: 8000
};
//--------------------------------------------------------------------------
//  Collision Manager Class
//--------------------------------------------------------------------------
GAME.CollisionManager = function(engineRef) {
    this.engine = engineRef;
};
GAME.CollisionManager.constructor = GAME.CollisionManager;

GAME.CollisionManager.prototype.update = function() {
    //this.playerVsObstacle();
    this.playerVsPlatform();
    this.playerVsFloor();
};


GAME.CollisionManager.prototype.playerVsObstacle = function() {
	/*
    for (var a = this.engine.enemyManager.enemies, b = this.engine.steve, c = 0; c < a.length; c++) {
        var d = a[c],
            e = d.position.x - b.position.x;
        e > -d.width / 2 && e < d.width / 2 && (e = d.position.y - b.position.y, e > -d.height / 2 - 20 && e < d.height / 2 && !b.joyRiding && (b.die(), this.engine.gameover(), d.hit()))
    }
    */
};

GAME.CollisionManager.prototype.playerVsPlatform = function() {

    var platformArray = this.engine.foregroundManager.objectPools.platforms,
        player = this.engine.player;

    for (var a = this.engine.foregroundManager.objectPools.platforms, b = this.engine.player, c = 0; c < a.length; c++) {

        if (player.position.x + player.width / 2 > a[c].x){

            if (player.position.y >= a[c].position.y - a[c].height && player.isJumping){

                player.onGround = 1;
                player.position.y = a[c].position.y - a[c].height;
                player.isJumping = 0;


            }

        }

    }

/*
    for (var a = this.engine.foregroundManager.objectPools.platforms, b = this.engine.player, c = 0; c < a.length; c++) {

        var d = a[c];
        var e = d.position.x - b.position.x;

        //console.log(e);

        e > -d.width / 2 && e < d.width / 2 && (e = d.position.y - b.position.y, e > -d.height / 2 && e < d.height / 2 && (console.log("hit")))
        
    }*/

};

GAME.CollisionManager.prototype.playerVsFloor = function() {

	var floorArr = this.engine.foregroundManager.objectPools.floor,
	    player = this.engine.player;

	 
    	for (var i=0;i<floorArr.length;i++){

    		if (player.position.y > floorArr[i].position.y){

    			player.onGround = 1;
                player.position.y = floorArr[i].position.y;
                player.isJumping = 0;

    		}

    	}

}
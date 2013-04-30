//--------------------------------------------------------------------------
//  Collision Manager Class
//--------------------------------------------------------------------------
GAME.CollisionManager = function(engineRef) {
    this.engine = engineRef;
};
GAME.CollisionManager.constructor = GAME.CollisionManager;

GAME.CollisionManager.prototype.update = function() {

    this.engine.player.onGround = 0;

    this.playerVsObstacle();
    this.playerVsPlatform();
    this.playerVsFloor();
};


GAME.CollisionManager.prototype.playerVsObstacle = function() {

  var obstacleArr = this.engine.foregroundManager.objectPools.obstacles,
      player = this.engine.player;


    for (var i=0;i<obstacleArr.length;i++){

      if (!obstacleArr[i].isHit){

        var collide = this.calculateIntersection(this.getPlayerBounds(),new PIXI.Rectangle(obstacleArr[i].x, obstacleArr[i].position.y - obstacleArr[i].height, obstacleArr[i].width, obstacleArr[i].height), player.speed.x, player.speed.y);

        if (collide && !player.isJumping){

            obstacleArr[i].isHit = 1;
            player.hitObstacle();

            TweenMax.to(obstacleArr[i], 0.6, {alpha:0});
            TweenMax.to(obstacleArr[i].position, 0.2, {x:obstacleArr[i].position.x + 30,y:obstacleArr[i].position.y - 10, yoyo:true, repeat:1});

        }

      }

    }
	
};

GAME.CollisionManager.prototype.playerVsPlatform = function() {

    var platformArray = this.engine.foregroundManager.objectPools.platforms,
        player = this.engine.player;


    for (var i=0;i<platformArray.length;i++){

        var collide = this.calculateIntersection(this.getPlayerBounds(),new PIXI.Rectangle(platformArray[i].x, platformArray[i].position.y - platformArray[i].height, platformArray[i].width, platformArray[i].height), player.speed.x, player.speed.y);

        if (collide && !player.isJumping){

            if (collide.height - player.speed.y > 40) {

                player.speed.x = 0;
                player.position.x -= Math.round(collide.width);

                // game over

            } else {

                if (player.wasJumping || player.isFalling){
                  player.jumpComplete();
                }

                player.speed.y = 0;
                player.position.y -= Math.round(collide.height) - 4;
                player.onGround = 1;

                break;

            }

        }

    }

};

GAME.CollisionManager.prototype.playerVsFloor = function() {

	var floorArr = this.engine.foregroundManager.objectPools.floor,
	    player = this.engine.player;

    for (var i=0;i<floorArr.length;i++){

      if (floorArr[i].collidable){

        var collide = this.calculateIntersection(this.getPlayerBounds(),new PIXI.Rectangle(floorArr[i].x, floorArr[i].position.y, floorArr[i].width, floorArr[i].height), player.speed.x, player.speed.y);

        if (collide && !player.isJumping){

          if (collide.height - player.speed.y > 40) {

            player.speed.x = 0;
            player.position.x -= Math.round(collide.width);

          } else {

            if (player.wasJumping || player.isFalling){
              player.jumpComplete();
            }

            player.onGround = 1;
            player.speed.y = 0;
            player.position.y -= Math.round(collide.height) - 8;

            break;

          }

        }

      }

    }


}

GAME.CollisionManager.prototype.getPlayerBounds = function(){

    var player = this.engine.player;

    var bounds = new PIXI.Rectangle(player.position.x + 80, player.position.y - player.height, player.width - 120, player.height);

    return bounds;

}

GAME.CollisionManager.prototype.calculateIntersection = function(rect1, rect2, x, y) {

  // prevent x|y from being null||undefined
  x = x || 0; y = y || 0;
 
  // first we have to calculate the
  // center of each rectangle and half of
  // width and height
  var dx, dy, r1={}, r2={};
  r1.cx = rect1.x+x+(r1.hw = (rect1.width /2));
  r1.cy = rect1.y+y+(r1.hh = (rect1.height/2));
  r2.cx = rect2.x + (r2.hw = (rect2.width /2));
  r2.cy = rect2.y + (r2.hh = (rect2.height/2));
 
  dx = Math.abs(r1.cx-r2.cx) - (r1.hw + r2.hw);
  dy = Math.abs(r1.cy-r2.cy) - (r1.hh + r2.hh);
 
  if (dx < 0 && dy < 0) {
    return {width:-dx,height:-dy};
  } else {
    return null;
  }
}
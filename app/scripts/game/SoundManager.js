// --------------------------------------------------------------------------
// Sound Manager
// -------------------------------------------------------------------------- 
GAME.SoundManager = function(){

    this.currentMusic = null;

}

GAME.SoundManager.prototype.playMusic = function(sound){

    console.log("playMusic");

    if (this.currentMusic != null){
        this.currentMusic.stop();
    }  
    this.currentMusic = createjs.Sound.play(sound, createjs.Sound.INTERRUPT_NONE, 0, 0, -1, 0.5);          

}

GAME.SoundManager.prototype.playSound = function(sound){
    createjs.Sound.play(sound, createjs.Sound.INTERRUPT_ANY, 0, 0, 0);
}

GAME.SoundManager.prototype.mute = function(){
    createjs.Sound.setMute(true);
}

GAME.SoundManager.prototype.unmute = function(){
    createjs.Sound.setMute(false);
}
var Math2 = {};

Math2.randomInt = function(from, to)
{
	to += 1;
	return Math.floor(Math.random()*(to-from) + from);
}

Math2.formatTime = function(time)
{

	var elapsed, 
		minutes = 0, 
		seconds = 0;

	elapsed = Math.floor(time / 100);

    if (elapsed >= 60){
    	minutes = Math.floor(elapsed / 60);
    }

    seconds = elapsed - (60 * minutes);

    if (seconds < 10){
    	seconds = "0" + seconds;
    }

    return minutes + ":" + seconds;

}
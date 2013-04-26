var Math2 = {};

Math2.randomInt = function(from, to)
{
	to += 1;
	return Math.floor(Math.random()*(to-from) + from);
}
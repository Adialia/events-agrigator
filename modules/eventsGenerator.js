exports.generateEvents = function() {
  var name, date, time, place;
  var events = {};
  var Events = function(name, date, time, place){
	this.name = name;
	this.date = date;
	this.time = time;
	this.place = place;  		
  }

  function randomWord(size) {
        var result = '';
        var words = 'qwertyuiopasdfghjklzxcvbnm';
        var maxPosition = words.length - 1;
            for(var i = 0; i < size; i++ ) {
                position = Math.floor ( Math.random() * maxPosition );
                result = result + words.substring(position, position + 1);
            }
        return result;
    }

  function randomNumber(min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
  }
	for(var j = 0; j < 10000; j++){
		name = randomWord(3);
		date = randomNumber(1, 30) + '.' + randomNumber(1, 12) + '.' + randomNumber(2016, 2020);
		time = randomNumber(0, 23) + ':' + randomNumber(0, 59);
		place = randomWord(3);
		
		events[name] = new Events(name, date, time, place);
	}
		return events;
	
};


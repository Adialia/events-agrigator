exports.generate = function(){	
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
    return randomWord(3);
}
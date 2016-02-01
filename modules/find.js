exports.findEvent = function(obj, target){
		var finded = {};
		var i = 1;
		finded.find = target;
		if(obj[target] != undefined){
			finded[i] = obj[target];
			i++;
		}else{
			for(var name in obj){
				for(var key in obj[name]){
					if(obj[name][key] == target){
						finded[i] = obj[name];
						i++;
					}
				}	
			}
		}
		if(finded[1] === undefined){
			finded.result = "No matches found!";
		}

	return finded;
}

var globalValue;

exports.setGlobal = function(val){
	globalValue = val;
}

exports.getGlobal = function(){
	console.log(globalValue);
	return globalValue;
}
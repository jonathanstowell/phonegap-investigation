var workout_repository = {};

(function(index) {
	
	workout_repository = index;
	
	index.getAll = function() {
		var ret = [];
		
		for(i=0; i < window.localStorage.length; i++){
			ret.push(JSON.parse(window.localStorage.getItem(window.localStorage.key(i))));
		}
		
		return ret;
	}
	
	index.totalDistance = function() {
		var all = index.getAll();
		
		var total_km = 0;
		
		for(i = 0; i < all.length; i++){
			total_km += all[i].distance;
		}
		
		return total_km;
	}
	
	index.isUniqueName = function(key) {
		return window.localStorage.getItem(key) === null;
	}
	
	index.getByKey = function(key) {
		return JSON.parse(window.localStorage.getItem(key));
	}
	
	index.getByIndex = function(index) {
		return JSON.parse(window.localStorage.getItem(window.localStorage.key(index)));
	}
	
	index.save = function(key, item) {
		window.localStorage.setItem(key, ko.toJSON(item));
	}
	
	index.deleteItem = function(key) {
		window.localStorage.removeItem(key);
	}
	
	index.clear = function() {
		window.localStorage.clear();
	}
	
	index.count = function() {
		return window.localStorage.length;
	}
	
} (workout_repository))
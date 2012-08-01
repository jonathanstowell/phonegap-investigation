var workout_repository = {};

(function(index) {
	
	workout_repository = index;
	
	index.getAll = function() {
		var ret = [];
		
		for(i=0; i < window.localStorage.length; i++){
			ret.push(JSON.parse(window.localStorage.getItem(window.localStorage.key(i))));
		}
		
		return ret;
	};
	
	index.totalDistance = function() {
		if (index.exists('totalDistance') == false) {
			return window.localStorage.getItem('totalDistance');
		}
		
		return "0.00";
	};
	
	index.exists = function(key) {
		return window.localStorage.getItem(key) === null;
	};
	
	index.getByKey = function(key) {
		return JSON.parse(window.localStorage.getItem(key));
	};
	
	index.getByIndex = function(index) {
		return JSON.parse(window.localStorage.getItem(window.localStorage.key(index)));
	};
	
	index.save = function(key, item) {
		index.updateTotalDistance(item.distance);
		window.localStorage.setItem(key, ko.toJSON(item));
	};
	
	index.updateTotalDistance = function(distance) {
		if (index.exists('totalDistance') == false) {
			window.localStorage.setItem('totalDistance', distance);
		} else {
			var count = window.localStorage.getItem('totalDistance');
			
			if (count) {
				window.localStorage.setItem('totalDistance', parseInt(count) + parseInt(distance));
			} else {
				window.localStorage.setItem('totalDistance', distance);
			}
		}
	};
	
	index.deleteItem = function(key) {
		var item = index.getByKey(key);
		index.updateTotalDistance(-item.distance);
		window.localStorage.removeItem(key);
	};
	
	index.clear = function() {
		window.localStorage.clear();
	};
	
	index.count = function() {
		return window.localStorage.length;
	};
	
} (workout_repository))
var db_access = {};

(function(index) {
	
	db_access = index;
	
	var lib;
	
	index.get = function() {
		if (lib == null) {
			lib = new localStorageDB("cycletracker");
		}
		
		return lib;
	};
} (db_access))
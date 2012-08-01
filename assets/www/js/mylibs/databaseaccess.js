var db_access = {};

(function(index) {
	
	db_access = index;
	
	var lib;
	
	var initialise = function() {
		lib.createTable("workouts", ["name", "trackingData", "startDateTime", "endDateTime", "distance"]);
		lib.createTable("distance", ["total"]);
		lib.commit();
	};
	
	index.get = function() {
		if (lib == null) {
			lib = new localStorageDB("cycletracker");
			if(lib.isNew()) {
				initialise();
			}
		}
		
		return lib;
	};
} (db_access))
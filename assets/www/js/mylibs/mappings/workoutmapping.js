var workout_mapping = {};

(function(index) {
	
	workout_mapping = index;
	
	index.map = function() {
		var db = db_access.get();
		
		if (db.tableExists('workouts') == false) {
			db.createTable("workouts", ["name", "trackingData", "startDateTime", "endDateTime", "distance"]);
			db.commit();
		}
	};
	
} (workout_mapping))
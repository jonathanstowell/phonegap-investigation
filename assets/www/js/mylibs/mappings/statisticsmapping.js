var distance_mapping = {};

(function(index) {
	
	distance_mapping = index;
	
	index.map = function() {
		var db = db_access.get();
		
		if (db.tableExists('statistics') == false) {
			db.createTable("statistics", ["id", "overallworkouts", "overalldistance"]);
			db.commit();
		}
	};
	
} (distance_mapping))
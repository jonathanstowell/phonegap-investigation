var statistics_weekly_mapping = {};

(function(index) {
	
	statistics_weekly_mapping = index;
	
	index.map = function() {
		var db = db_access.get();
		
		if (db.tableExists('statisticsweekly') == false) {
			db.createTable("statisticsweekly", ["week", "year", "overallworkouts", "overalldistance"]);
			db.commit();
		}
	};
	
} (statistics_weekly_mapping))
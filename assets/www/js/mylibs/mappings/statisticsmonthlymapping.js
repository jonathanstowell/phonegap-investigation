var statistics_monthly_mapping = {};

(function(index) {
	
	statistics_monthly_mapping = index;
	
	index.map = function() {
		var db = db_access.get();
		
		if (db.tableExists('statisticsmonthly') == false) {
			db.createTable("statisticsmonthly", ["month", "year", "overallworkouts", "overalldistance"]);
			db.commit();
		}
	};
	
} (statistics_monthly_mapping))
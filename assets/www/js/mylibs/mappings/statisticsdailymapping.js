var statistics_daily_mapping = {};

(function(index) {
	
	statistics_daily_mapping = index;
	
	index.map = function() {
		var db = db_access.get();
		
		if (db.tableExists('statisticsdaily') == false) {
			db.createTable("statisticsdaily", ["day", "month", "year", "overallworkouts", "overalldistance"]);
			db.commit();
		}
	};
	
} (statistics_daily_mapping))
var statistics_overall_mapping = {};

(function(index) {
	
	statistics_overall_mapping = index;
	
	index.map = function() {
		var db = db_access.get();
		
		if (db.tableExists('statisticsoverall') == false) {
			db.createTable("statisticsoverall", ["overallworkouts", "overalldistance"]);
			db.commit();
		}
	};
	
} (statistics_overall_mapping))
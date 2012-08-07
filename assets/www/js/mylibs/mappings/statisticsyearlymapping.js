var statistics_yearly_mapping = {};

(function(index) {
	
	statistics_yearly_mapping = index;
	
	index.map = function() {
		var db = db_access.get();
		
		if (db.tableExists('statisticsyearly') == false) {
			db.createTable("statisticsyearly", ["year", "overallworkouts", "overalldistance"]);
			db.commit();
		}
	};
	
} (statistics_yearly_mapping))
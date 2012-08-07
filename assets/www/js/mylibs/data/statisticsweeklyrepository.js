var statistic_weekly_repository = {};

(function(index) {
	
	statistic_weekly_repository = index;
	
	var db = function() {	
		statistics_weekly_mapping.map();
		return db_access.get();
	};
	
	index.get = function(week, year) {
		if (index.exists(week, year) == false)
			return null;
		
		return db().query("statisticsweekly", function(row) { if(row.week == week && row.year == year) { return true; } else { return false; } }, 1)[0];
	};
	
	index.currentweeksoverallworkouts = function() {
		var today = new Date();
		var item = index.get(today.getWeek(), today.getFullYear());
		
		if (item == null)
			return "0";

		return item.overallworkouts;
	};
	
	index.currentweeksoveralldistance = function() {
		var today = new Date();
		var item = index.get(today.getWeek(), today.getFullYear());
		
		if (item == null)
			return "0.00";

		return item.overalldistance;
	};
	
	index.exists = function(week, year) {
		return db().query("statisticsweekly", function(row) { if(row.week == week && row.year == year) { return true; } else { return false; } }, 1)[0] != null;
	};
	
	index.save = function(item) {
		if (index.exists(item.week, item.year) == false) {

			db().insert("statisticsweekly", item);
			db().commit();
		
			jQuery(document).trigger('weeklyStatisticCreated', [item]);
		}
	};
	
	index.update = function(item) {
		if (index.exists(item.week, item.year)) {
			db().update("statisticsweekly", function(row) { if(row.ID == item.ID) { return true; } }, function(row) { row = item; return row; });
			db().commit();
		
			jQuery(document).trigger('weeklyStatisticUpdated', [item]);
		}
	}
	
	index.deleteItem = function(id) {
		db().deleteRows("statisticsweekly", { id: id });
		db().commit();
		
		jQuery(document).trigger('weeklyStatisticDeleted');
	};
	
	index.clear = function() {
		db().deleteRows("statisticsweekly");
		db().commit();
		
		jQuery(document).trigger('weeklyStatisticsCleared');
	};
	
	index.drop = function() {
		db().dropTable("statisticsweekly");
		db().commit();
	};
	
	index.count = function() {
		return db().rowCount("statisticsweekly");
	};
	
} (statistic_weekly_repository))
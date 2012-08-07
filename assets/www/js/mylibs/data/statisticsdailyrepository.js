var statistic_daily_repository = {};

(function(index) {
	
	statistic_daily_repository = index;
	
	var db = function() {	
		statistics_daily_mapping.map();
		return db_access.get();
	};
	
	index.get = function(day, month, year) {
		if (index.exists(day, month, year) == false)
			return null;
		
		return db().query("statisticsdaily", function(row) { if(row.day == day && row.month == month && row.year = year) { return true; } else { return false; } }, 1);
	};
	
	index.todaysoverallworkouts = function() {
		var today = new Date();
		var item = index.get(today.getDate(), today.getMonth(), today.getFullYear());
		
		if (item == null)
			return "0";

		return item.overallworkouts;
	};
	
	index.todaysoveralldistance = function() {
		var today = new Date();
		var item = index.get(today.getDate(), today.getMonth(), today.getFullYear());
		
		if (item == null)
			return "0.00";

		return item.overalldistance;
	};
	
	index.exists = function(day, month, year) {
		return db().query("statisticsdaily", function(row) { if(row.day == day && row.month == month && row.year = year) { return true; } else { return false; } }, 1) != null;
	};
	
	index.save = function(item) {	
		if (index.exists(item.day, item.month, item.year) == false) {
			db().insert("statisticsdaily", item);
			db().commit();
		
			jQuery(document).trigger('dailyStatisticCreated', [item]);
		}
	};
	
	index.update = function(item) {
		if (index.exists(item.day, item.month, item.year)) {
			db().update("statisticsdaily", function(row) { if(row.ID == item.ID) { return true; } }, function(row) { row = item; return row; });
			db().commit();
		
			jQuery(document).trigger('dailyStatisticUpdated', [item]);
		}
	}
	
	index.deleteItem = function(id) {
		db().deleteRows("statisticsdaily", { id: id });
		db().commit();
		
		jQuery(document).trigger('dailyStatisticDeleted');
	};
	
	index.clear = function() {
		db().deleteRows("statisticsdaily");
		db().commit();
		
		jQuery(document).trigger('dailyStatisticsCleared');
	};
	
	index.drop = function() {
		db().dropTable("statisticsdaily");
		db().commit();
	};
	
	index.count = function() {
		return db().rowCount("statisticsdaily");
	};
	
} (statistic_daily_repository))
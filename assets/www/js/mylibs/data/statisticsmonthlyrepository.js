var statistic_monthly_repository = {};

(function(index) {
	
	statistic_monthly_repository = index;
	
	var db = function() {	
		statistics_monthly_mapping.map();
		return db_access.get();
	};
	
	index.get = function(month, year) {
		if (index.exists(month, year) == false)
			return null;
		
		return db().query("statisticsmonthly", function(row) { if(row.month == month && row.year = year) { return true; } else { return false; } }, 1);
	};
	
	index.currentmonthsoverallworkouts = function() {
		var today = new Date();
		var item = index.get(today.getMonth(), today.getFullYear());
		
		if (item == null)
			return "0";

		return item.overallworkouts;
	};
	
	index.currentmonthsoveralldistance = function() {
		var today = new Date();
		var item = index.get(today.getMonth(), today.getFullYear());
		
		if (item == null)
			return "0.00";

		return item.overalldistance;
	};
	
	index.exists = function(month, year) {
		return db().query("statisticsmonthly", function(row) { if(row.month == month && row.year = year) { return true; } else { return false; } }, 1) != null;
	};
	
	index.save = function(item) {
		if (index.exists() == false) {

			db().insert("statisticsmonthly", item);
			db().commit();
		
			jQuery(document).trigger('monthlyStatisticCreated', [item]);
		}
	};
	
	index.update = function(item) {
		if (index.exists()) {
			db().update("statisticsmonthly", function(row) { if(row.id == 1) { return true; } }, function(row) { row = item; return row; });
			db().commit();
		
			jQuery(document).trigger('monthlyStatisticUpdated', [item]);
		}
	}
	
	index.deleteItem = function(id) {
		db().deleteRows("statisticsmonthly", { id: id });
		db().commit();
		
		jQuery(document).trigger('monthlyStatisticDeleted');
	};
	
	index.clear = function() {
		db().deleteRows("statisticsmonthly");
		db().commit();
		
		jQuery(document).trigger('monthlyStatisticsCleared');
	};
	
	index.drop = function() {
		db().dropTable("statisticsmonthly");
		db().commit();
	};
	
	index.count = function() {
		return db().rowCount("statisticsmonthly");
	};
	
} (statistic_monthly_repository))
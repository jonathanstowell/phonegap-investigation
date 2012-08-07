var statistic_yearly_repository = {};

(function(index) {
	
	statistic_yearly_repository = index;
	
	var db = function() {	
		statistics_yearly_mapping.map();
		return db_access.get();
	};
	
	index.get = function(year) {
		if (index.exists(month, year) == false)
			return null;
		
		return db().query("statisticsyearly", function(row) { if(row.year = year) { return true; } else { return false; } }, 1);
	};
	
	index.currentyearsoverallworkouts = function() {
		var today = new Date();
		var item = index.get(today.getFullYear());
		
		if (item == null)
			return "0";

		return item.overallworkouts;
	};
	
	index.currentyearsoveralldistance = function() {
		var today = new Date();
		var item = index.get(today.getFullYear());
		
		if (item == null)
			return "0.00";

		return item.overalldistance;
	};
	
	index.exists = function(year) {
		return db().query("statisticsyearly", function(row) { if(row.year = year) { return true; } else { return false; } }, 1) != null;
	};
	
	index.save = function(item) {
		if (index.exists() == false) {

			db().insert("statisticsyearly", item);
			db().commit();
		
			jQuery(document).trigger('yearlyStatisticCreated', [item]);
		}
	};
	
	index.update = function(item) {
		if (index.exists()) {
			db().update("statisticsyearly", function(row) { if(row.id == 1) { return true; } }, function(row) { row = item; return row; });
			db().commit();
		
			jQuery(document).trigger('yearlyStatisticUpdated', [item]);
		}
	}
	
	index.deleteItem = function(id) {
		db().deleteRows("statisticsyearly", { id: id });
		db().commit();
		
		jQuery(document).trigger('yearlyStatisticDeleted');
	};
	
	index.clear = function() {
		db().deleteRows("statisticsyearly");
		db().commit();
		
		jQuery(document).trigger('yearlyStatisticsCleared');
	};
	
	index.drop = function() {
		db().dropTable("statisticsyearly");
		db().commit();
	};
	
	index.count = function() {
		return db().rowCount("statisticsyearly");
	};
	
} (statistic_yearly_repository))
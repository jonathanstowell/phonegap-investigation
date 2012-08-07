var statistic_overall_repository = {};

(function(index) {
	
	statistic_overall_repository = index;
	
	var db = function() {	
		statistics_overall_mapping.map();
		return db_access.get();
	};
	
	index.get = function() {
		if (index.exists() == false)
			return null;
		
		return db().query("statistics")[0];
	};
	
	index.overallworkouts = function() {
		var item = index.get();
		
		if (item == null)
			return "0";

		return item.overallworkouts;
	};
	
	index.overalldistance = function() {
		var item = index.get();
		
		if (item == null)
			return "0.00";

		return item.overalldistance;
	};
	
	index.exists = function(key) {
		return index.count() == 1;
	};
	
	index.save = function(distance) {
		if (index.exists() == false) {
			distance.id = 1;
			db().insert("statistics", distance);
			db().commit();
		
			jQuery(document).trigger('statisticCreated', [distance]);
		}
	};
	
	index.update = function(distance) {
		if (index.exists()) {
			db().update("statistics", function(row) { if(row.id == 1) { return true; } }, function(row) { row = distance; return row; });
			db().commit();
		
			jQuery(document).trigger('statisticUpdated', [distance]);
		}
	}
	
	index.deleteItem = function(key) {
		db().deleteRows("statistics", { id: 1 });
		db().commit();
		
		jQuery(document).trigger('statisticDeleted');
	};
	
	index.clear = function() {
		db().deleteRows("statistics");
		db().commit();
		
		jQuery(document).trigger('statisticCleared');
	};
	
	index.drop = function() {
		db().dropTable("statistics");
		db().commit();
	};
	
	index.count = function() {
		return db().rowCount("statistics");
	};
	
} (statistic_overall_repository))
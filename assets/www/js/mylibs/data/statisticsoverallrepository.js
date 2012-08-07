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
		
		return db().query("statisticsoverall")[0];
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
			db().insert("statisticsoverall", distance);
			db().commit();
		
			jQuery(document).trigger('statisticCreated', [distance]);
		}
	};
	
	index.update = function(item) {
		if (index.exists()) {
			db().update("statisticsoverall", function(row) { if(row.ID == item.ID) { return true; } }, function(row) { row = item; return row; });
			db().commit();
		
			jQuery(document).trigger('statisticUpdated', [item]);
		}
	}
	
	index.deleteItem = function(id) {
		db().deleteRows("statisticsoverall", { id: id });
		db().commit();
		
		jQuery(document).trigger('statisticDeleted');
	};
	
	index.clear = function() {
		db().deleteRows("statisticsoverall");
		db().commit();
		
		jQuery(document).trigger('statisticCleared');
	};
	
	index.drop = function() {
		db().dropTable("statisticsoverall");
		db().commit();
	};
	
	index.count = function() {
		return db().rowCount("statisticsoverall");
	};
	
} (statistic_overall_repository))
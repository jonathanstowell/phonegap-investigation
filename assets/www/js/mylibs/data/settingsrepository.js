var settings_repository = {};

(function(index) {
	
	settings_repository = index;
	
	var db = function() {	
		statistics_overall_mapping.map();
		return db_access.get();
	};
	
	index.get = function() {
		if (index.exists() == false)
			return null;
		
		return db().query("settings")[0];
	};
	
	index.exists = function(key) {
		return index.count() == 1;
	};
	
	index.save = function(item) {
		if (index.exists() == false) {
			db().insert("settings", item);
			db().commit();
		
			jQuery(document).trigger('settingsCreated', [item]);
		}
	};
	
	index.update = function(item) {
		if (index.exists()) {
			db().update("settings", function(row) { if(row.ID == item.ID) { return true; } }, function(row) { row = item; return row; });
			db().commit();
		
			jQuery(document).trigger('settingsUpdated', [item]);
		}
	}
	
	index.deleteItem = function(id) {
		db().deleteRows("settings", { id: id });
		db().commit();
		
		jQuery(document).trigger('settingsDeleted');
	};
	
	index.clear = function() {
		db().deleteRows("settings");
		db().commit();
		
		jQuery(document).trigger('settingsCleared');
	};
	
	index.drop = function() {
		db().dropTable("settings");
		db().commit();
	};
	
	index.count = function() {
		return db().rowCount("settings");
	};
	
} (settings_repository))
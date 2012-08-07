var settings_mapping = {};

(function(index) {
	
	settings_mapping = index;
	
	index.map = function() {
		var db = db_access.get();
		
		if (db.tableExists('settings') == false) {
			db.createTable("settings", ["syncrides", "syncphotos"]);
			db.commit();
		}
	};
	
} (settings_mapping))
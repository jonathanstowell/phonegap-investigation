var workout_repository = {};

(function(index) {
	
	workout_repository = index;
	
	var db = function() {	
		workout_mapping.map();
		return db_access.get();
	};
	
	index.getAll = function() {
		return db().query("workouts");
	};
	
	index.getPaged = function(page, take) {
		return db().query("workouts", function(row) { if(row.ID >= (page - 1) * take && row.ID <= (page * take)) { return true; } else { return false; } }, take);
	};
	
	index.exists = function(key) {
		return db().query("workouts", function(row) { if(row.name == key) { return true; } else { return false; } }, 1)[0] != null;
	};
	
	index.getByKey = function(key) {
		return db().query("workouts", function(row) { if(row.name == key) { return true; } else { return false; } })[0];
	};
	
	index.save = function(item) {
		db().insert("workouts", item);
		db().commit();
		
		jQuery(document).trigger('workoutCreated', [item]);
	};
	
	index.deleteItem = function(key) {
		var item = index.getByKey(key);
		
		if (item == null)
			return;
		
		db().deleteRows("workouts", { name: key });
		db().commit();
		
		jQuery(document).trigger('workoutDeleted', [item]);
	};
	
	index.clear = function() {
		db().deleteRows("workouts");
		db().commit();
		
		jQuery(document).trigger('workoutsCleared');
	};
	
	index.drop = function() {
		db().dropTable("workouts");
		db().commit();
	};
	
	index.count = function() {
		return db().rowCount("workouts");
	};
	
	index.validate = function(item) {
		var errors = new Array();
		
		if (!item.name) {
			errors.push({ value: "Name is required." });
		}
		
		if (item.name && workout_repository.exists(item.name)) {
			errors.push({ value: "Name must be unique." });
		}
		
		if (item.distance <= 0) {
			errors.push({ value: "A workout must be longer than 0km." });
		}
		
		if (errors.length > 0) {
			errors.unshift({ value: "We were not able to save your workout." });
			return { result: false, errors: errors };
		}
			
		return { result: true, errors: errors };
	};
	
} (workout_repository))
var workout_validation = {};

(function(index) {
	
	workout_validation = index;
	
	index.validate = function(item) {
		var errors = new Array();
		
		if (!item.name()) {
			errors.push({ value: "Name is required." })
		}
		
		if (workout_repository.exists(item.name()) == false) {
			errors.push({ value: "Name must be unique." })
		}
		
		if (errors.length > 0)
			return { result: false, errors: errors };
			
		return { result: true, errors: errors };
	};
	
} (workout_validation))
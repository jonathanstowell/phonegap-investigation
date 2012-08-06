var workout_validation = {};

(function(index) {
	
	workout_validation = index;
	
	index.validate = function(item, container) {
		container.removeAll();
		
		if (!item.name()) {
			container.push({ value: "Name is required." })
		}
		
		if (item.name() && workout_repository.exists(item.name())) {
			container.push({ value: "Name must be unique." })
		}
		
		if (container.length > 0)
			return { result: false, errors: errors };
			
		return { result: true, errors: errors };
	};
	
} (workout_validation))
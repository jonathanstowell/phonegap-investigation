statistics_monthly_workout_created_event_handler = {};

(function(index) {
	
	statistics_monthly_workout_created_event_handler = index;
	
	jQuery(document).bind('workoutCreated', function (event, workout) {
		var today = new Date();
		
		var month = today.getMonth();
		var year = today.getFullYear();
		
		var item = statistic_monthly_repository.get(month, year);
		
		if (item == null) {
			statistic_monthly_repository.save({ month: month, year: year, overallworkouts: 1, overalldistance: parseFloat(workout.distance) });
		} else {
			item.overallworkouts = parseFloat(item.overallworkouts) + 1;
			item.overalldistance = parseFloat(item.overalldistance) + parseFloat(workout.distance);
			
			statistic_monthly_repository.update(item);
		}
		
	});
	
} (statistics_monthly_workout_created_event_handler))
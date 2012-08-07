statistics_workout_created_event_handler = {};

(function(index) {
	
	statistics_workout_created_event_handler = index;
	
	jQuery(document).bind('workoutCreated', function (event, workout) {
		var item = statistic_overall_repository.get();
		
		if (item == null) {
			statistic_overall_repository.save({ overallworkouts: 1, overalldistance: parseFloat(workout.distance) });
		} else {
			item.overallworkouts = parseFloat(item.overallworkouts) + 1;
			item.overalldistance = parseFloat(item.overalldistance) + parseFloat(workout.distance);
			
			statistic_overall_repository.update(item);
		}
		
	});
	
} (statistics_workout_created_event_handler))
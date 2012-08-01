statistics_workout_created_event_handler = {};

(function(index) {
	
	statistics_workout_created_event_handler = index;
	
	jQuery(document).bind('workoutCreated', function (event, workout) {
		var item = statistic_repository.get();
		
		if (item == null) {
			statistic_repository.save({ overallworkouts: 1, overalldistance: parseFloat(workout.distance) });
		} else {
			item.overallworkouts += 1;
			item.overalldistance += parseFloat(workout.distance);
			
			statistic_repository.update(item);
		}
		
	});
	
} (statistics_workout_created_event_handler))
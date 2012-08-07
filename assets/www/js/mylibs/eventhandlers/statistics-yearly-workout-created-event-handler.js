statistics_yearly_workout_created_event_handler = {};

(function(index) {
	
	statistics_yearly_workout_created_event_handler = index;
	
	jQuery(document).bind('workoutCreated', function (event, workout) {
		var today = new Date();
		
		var year = today.getFullYear();
		
		var item = statistic_yearly_repository.get(year);
		
		if (item == null) {
			statistic_yearly_repository.save({ year: year, overallworkouts: 1, overalldistance: parseFloat(workout.distance) });
		} else {
			item.overallworkouts = parseFloat(item.overallworkouts) + 1;
			item.overalldistance = parseFloat(item.overalldistance) + parseFloat(workout.distance);
			
			statistic_yearly_repository.update(item);
		}
		
	});
	
} (statistics_yearly_workout_created_event_handler))
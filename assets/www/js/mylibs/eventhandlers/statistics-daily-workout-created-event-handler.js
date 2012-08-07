statistics_daily_workout_created_event_handler = {};

(function(index) {
	
	statistics_daily_workout_created_event_handler = index;
	
	jQuery(document).bind('workoutCreated', function (event, workout) {
		var today = new Date();
		
		var day = today.getDate();
		var month = today.getMonth();
		var year = today.getFullYear();
		
		var item = statistic_daily_repository.get(day, month, year);
		
		if (item == null) {
			statistic_daily_repository.save({ day: day, month: month, year: year, overallworkouts: 1, overalldistance: parseFloat(workout.distance) });
		} else {
			item.overallworkouts = parseFloat(item.overallworkouts) + 1;
			item.overalldistance = parseFloat(item.overalldistance) + parseFloat(workout.distance);
			
			statistic_daily_repository.update(item);
		}
		
	});
	
} (statistics_daily_workout_created_event_handler))
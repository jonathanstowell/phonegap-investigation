statistics_weekly_workout_created_event_handler = {};

(function(index) {
	
	statistics_weekly_workout_created_event_handler = index;
	
	jQuery(document).bind('workoutCreated', function (event, workout) {
		var today = new Date();
		
		var week = today.getWeek();
		var year = today.getFullYear();
		
		var item = statistic_weekly_repository.get(week, year);
		
		if (item == null) {
			statistic_weekly_repository.save({ week: week, year: year, overallworkouts: 1, overalldistance: parseFloat(workout.distance) });
		} else {
			item.overallworkouts = parseFloat(item.overallworkouts) + 1;
			item.overalldistance = parseFloat(item.overalldistance) + parseFloat(workout.distance);
			
			statistic_weekly_repository.update(item);
		}
		
	});
	
} (statistics_weekly_workout_created_event_handler))
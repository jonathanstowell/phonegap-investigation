workout_clear_event_handler = {};

(function(index) {
	
	workout_clear_event_handler = index;
	
	jQuery(document).bind('clear-all', function (event, workout) {
		workout_repository.drop();
	});
	
} (workout_clear_event_handler))
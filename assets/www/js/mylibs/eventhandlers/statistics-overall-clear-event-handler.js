statistics_clear_event_handler = {};

(function(index) {
	
	statistics_clear_event_handler = index;
	
	jQuery(document).bind('clear-all', function (event, workout) {
		statistic_daily_repository.drop();
		statistic_monthly_repository.drop();
		statistic_yearly_repository.drop();
		statistic_overall_repository.drop();
	});
	
} (statistics_clear_event_handler))
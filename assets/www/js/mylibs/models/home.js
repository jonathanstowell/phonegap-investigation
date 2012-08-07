var home_model = {};

(function(index) {
	
	home_model = index;
	
	index.dailyRideCount = ko.observable();
	index.dailyDistanceCount = ko.observable();
	
	index.monthlyRideCount = ko.observable();
	index.monthlyDistanceCount = ko.observable();
	
	index.yearlyRideCount = ko.observable();
	index.yearlyDistanceCount = ko.observable();
	
	index.overallRideCount = ko.observable();
	index.overallDistanceCount = ko.observable();
	
	jQuery('#home').live('pageshow', function () {
		index.dailyRideCount(statistic_daily_repository.todaysoverallworkouts());
		index.dailyDistanceCount(statistic_daily_repository.todaysoveralldistance());
		
		index.monthlyRideCount(statistic_monthly_repository.currentmonthsoverallworkouts());
		index.monthlyDistanceCount(statistic_monthly_repository.currentmonthsoveralldistance());
		
		index.yearlyRideCount(statistic_yearly_repository.currentyearsoverallworkouts());
		index.yearlyDistanceCount(statistic_yearly_repository.currentyearsoveralldistance());
		
		index.overallRideCount(statistic_overall_repository.overallworkouts());
		index.overallDistanceCount(statistic_overall_repository.overalldistance());
	});
	
	jQuery(function(){
		ko.applyBindings(index, jQuery("#home")[0]);
	});
	
} (home_model))
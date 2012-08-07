var home_model = {};

(function(index) {
	
	home_model = index;
	
	index.rideCount = ko.observable();
	index.distanceCount = ko.observable();
	
	jQuery('#home').live('pageshow', function () {
		index.rideCount(statistic_overall_repository.overallworkouts());
		index.distanceCount(statistic_overall_repository.overalldistance());
	});
	
	jQuery(function(){
		ko.applyBindings(index, jQuery("#home")[0]);
	});
	
} (home_model))
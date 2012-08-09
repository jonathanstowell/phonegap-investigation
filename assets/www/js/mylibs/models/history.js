var history_model = {};

(function(index) {
	
	history_model = index;
	
	index.pageNumber = ko.observable(1);
	
	index.tracks = ko.observableArray([]);
	index.tracksCount = ko.observable();
	
	index.raiseDetails = function(obj) {
		jQuery(document).trigger('rideDetails', [obj.name])
	};
	
	index.shouldDisableButtons = ko.computed(function() {
		if (index.pageNumber() <= 1) {
			jQuery('#history-prev').button('disable');
		} else {
			jQuery('#history-prev').button('enable');
		}
		
		if (index.pageNumber() > (index.tracksCount() / 10)) {
			jQuery('#history-next').button('disable');
		} else {
			jQuery('#history-next').button('enable');
		}
	});
	
	index.page = function(type) {
		var original = index.pageNumber();
		
		if (type == "next")
			index.pageNumber(index.pageNumber() + 1);
		else
			index.pageNumber(index.pageNumber() - 1);
		
		if (index.pageNumber() < 1 || index.pageNumber() - 1 > (index.tracksCount() / 10)) {
			index.pageNumber(original);
			return;
		}
		
		index.tracks.removeAll();
		
		var items = workout_repository.getPaged(index.pageNumber(), 10);
		
		for(i=0; i < items.length; i++){
			index.tracks.push(items[i]);
		}
		
		jQuery("#history-tracklist").listview('refresh');
	};
	
	jQuery('#history').live('pageshow', function () {
		jQuery.mobile.loading('show');
		
		index.tracks.removeAll();
		
		var items = workout_repository.getPaged(index.pageNumber(), 10);
		index.tracksCount(workout_repository.count());
		
		for(i=0; i < items.length; i++){
			index.tracks.push(items[i]);
		}
		
		jQuery("#history-tracklist").listview('refresh');
		
		jQuery.mobile.loading('hide');
	});
	
	jQuery(function(){
		ko.applyBindings(index, jQuery("#history")[0]);
	});
	
} (history_model))
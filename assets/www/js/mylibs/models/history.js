var history_model = {};

(function(index) {
	
	history_model = index;
	
	var page = 1;
	index.tracks = ko.observableArray([]);
	index.tracksCount = ko.observable();
	
	index.raiseDetails = function(obj) {
		jQuery(document).trigger('rideDetails', [obj.name])
	};
	
	index.page = function(type) {
		var original = page;
		
		if (type == "next")
			page = page + 1;
		else
			page = page - 1;
		
		if (page < 1 || page - 1 > (index.tracksCount() / 10)) {
			page = original;
			return;
		}
		
		index.tracks.removeAll();
		
		var items = workout_repository.getPaged(page, 10);
		
		for(i=0; i < items.length; i++){
			index.tracks.push(items[i]);
		}
		
		jQuery("#history-tracklist").listview('refresh');
	};
	
	jQuery('#history').live('pageshow', function () {
		index.tracks.removeAll();
		
		var items = workout_repository.getPaged(page, 10);
		index.tracksCount(workout_repository.count());
		
		for(i=0; i < items.length; i++){
			index.tracks.push(items[i]);
		}
		
		jQuery("#history-tracklist").listview('refresh');
	});
	
	jQuery(function(){
		ko.applyBindings(index, jQuery("#history")[0]);
	});
	
} (history_model))
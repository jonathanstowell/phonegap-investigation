var history_model = {};

(function(index) {
	
	history_model = index;
	
	index.tracks = ko.observableArray([]);
	
	index.raiseDetails = function(obj) {
		jQuery(document).trigger('rideDetails', [obj.name])
	};
	
	jQuery('#history').live('pageshow', function () {
		index.tracks.removeAll();
		
		var items = workout_repository.getAll();
		
		for(i=0; i < items.length; i++){
			index.tracks.push(items[i]);
		}
		
		jQuery("#history-tracklist").listview('refresh');
	});
	
	jQuery(function(){
		ko.applyBindings(index, jQuery("#history")[0]);
	});
	
} (history_model))
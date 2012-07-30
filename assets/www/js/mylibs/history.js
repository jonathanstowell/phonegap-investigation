var history_model = {};

(function(index) {
	
	history_model = index;
	
	index.tracks = ko.observableArray([]);
	
	index.raiseDetails = function(obj) {
		jQuery(document).trigger('rideDetails', [obj.name])
	};
	
	jQuery('#history').live('pageshow', function () {
		index.tracks.removeAll();
		
		for(i=0; i < window.localStorage.length; i++){
			index.tracks.push({ name: window.localStorage.key(i) });
		}
		
		jQuery("#history-tracklist").listview('refresh');
	});
	
	jQuery(function(){
		ko.applyBindings(index, jQuery("#history")[0]);
	});
	
} (history_model))
var track_info_model = {};

(function(index) {
	
	track_info_model = index;
	
	index.name = ko.observable();
	index.trackingData = ko.observableArray([]);
	index.map = null;
	index.hasMap = ko.observable(false);
	index.distance = ko.observable();
	
	jQuery(document).bind('rideDetails', function (event, key) {
		index.clear();
		
		var item = workout_repository.getByKey(key);
		
		index.name(item.name);
		index.distance(item.distance);
		
		if (item.trackingData[0] != null) {
			var pos = new google.maps.LatLng(item.trackingData[0].coords.latitude, item.trackingData[0].coords.longitude);
			
			if (index.map == null)
				index.map = new google.maps.Map(jQuery("#track-info-map-canvas")[0], { zoom: 15, center: pos, mapTypeId: google.maps.MapTypeId.ROADMAP });
			else
				index.map.setCenter(pos);
			
			var trackCoords = [];
	
		    for(i=0; i < item.trackingData.length; i++){
		    	index.trackingData.push(item.trackingData[i]);
		    	trackCoords.push(new google.maps.LatLng(item.trackingData[i].coords.latitude, item.trackingData[i].coords.longitude));
		    }
		    
		    var trackPath = new google.maps.Polyline({
		      path: trackCoords,
		      strokeColor: "#FF0000",
		      strokeOpacity: 1.0,
		      strokeWeight: 2
		    });
	
		    trackPath.setMap(index.map);
		    index.hasMap(true);
		}
		
		jQuery.mobile.changePage("#track-info", "slide", false, false);
    });
	
	index.clear = function() {
		index.name("");
		index.hasMap(false);
		index.trackingData.removeAll();
	}
	
	index.deleteItem = function() {
		workout_repository.deleteItem(index.name());
		jQuery.mobile.changePage("#history", "slide", false, false);
	}
	
	jQuery(function(){
		ko.applyBindings(index, jQuery("#track-info")[0]);
	});
	
} (track_info_model))
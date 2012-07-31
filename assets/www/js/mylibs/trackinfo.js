var track_info_model = {};

(function(index) {
	
	track_info_model = index;
	
	index.name = ko.observable();
	index.trackingData = ko.observableArray([]);
	index.map = null;
	
	index.distance = ko.computed(function() {
		var total_km = 0;

		for(i = 0; i < index.trackingData().length; i++){
		    
		    if(i == (index.trackingData().length - 1)){
		        break;
		    }
		    
		    total_km += gps_distance(index.trackingData()[i].coords.latitude, index.trackingData()[i].coords.longitude, index.trackingData()[i+1].coords.latitude, index.trackingData()[i+1].coords.longitude);
		}
		
		return total_km.toFixed(2);
	});
	
	jQuery(document).bind('rideDetails', function (event, key) {
		var item = workout_repository.getByKey(key);
		
		index.name(item.name);
		index.trackingData(item.trackingData);
		
		var pos = new google.maps.LatLng(index.trackingData[0].coords.latitude, index.trackingData[0].coords.longitude);
		
		index.map = new google.maps.Map(jQuery("#track-info-map-canvas")[0], { zoom: 10, center: pos, mapTypeId: google.maps.MapTypeId.ROADMAP });
		
		var trackCoords = [];

	    for(i=0; i < index.trackingData().length - 1; i++){
	    	trackCoords.push(new google.maps.LatLng(index.trackingData[i].coords.latitude, index.trackingData[i].coords.longitude));
	    }
	    
	    var trackPath = new google.maps.Polyline({
	      path: trackCoords,
	      strokeColor: "#FF0000",
	      strokeOpacity: 1.0,
	      strokeWeight: 2
	    });

	    trackPath.setMap(index.map);
		
		jQuery.mobile.changePage("#track-info", "slide", false, false);
    });
	
	jQuery(function(){
		ko.applyBindings(index, jQuery("#track-info")[0]);
	});
	
} (track_info_model))
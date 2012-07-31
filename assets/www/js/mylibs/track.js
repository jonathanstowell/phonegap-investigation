var tracking_model = {};

(function(index) {
	
	tracking_model = index;
	
	index.name = ko.observable();
	index.watch = null;
	index.isTracking = ko.observable(false);
	index.startDateTime = ko.observable();
	index.endDateTime = ko.observable();
	index.latitude = ko.observable();
	index.longitude = ko.observable();
	index.map = null;
	index.errors = ko.observableArray([]);
	
	index.currentTrackingData = ko.observableArray([]);
	
	index.startTracking = function() {
		
		if(index.validate() == false)
			return;
		
		index.isTracking(true);
		index.startDateTime(new Date());
		
		index.watch = navigator.geolocation.watchPosition(function(position) {
			index.latitude(position.coords.latitude);
			index.longitude(position.coords.longitude);
			
			index.currentTrackingData.push(position);
			
			var pos = new google.maps.LatLng(index.latitude(), index.longitude());
			
			if (index.map == null)
				index.map = new google.maps.Map(jQuery("#track-map-canvas")[0], { zoom: 15, center: pos, mapTypeId: google.maps.MapTypeId.ROADMAP });
			else
				index.map.setCenter(pos);
			
			var trackCoords = [];

		    for(i=0; i < index.currentTrackingData().length; i++){
		    	trackCoords.push(new google.maps.LatLng(index.currentTrackingData()[i].coords.latitude, index.currentTrackingData()[i].coords.longitude));
		    }
		    
		    var trackPath = new google.maps.Polyline({
		      path: trackCoords,
		      strokeColor: "#FF0000",
		      strokeOpacity: 1.0,
		      strokeWeight: 2
		    });

		    trackPath.setMap(index.map);
		    
		}, function(error) {
			console.log(error);
		}, 
		{ timeout: 1500, enableHighAccuracy: true });
	};
	
	index.stopTracking = function() {
		index.isTracking(false);
		index.endDateTime(new Date());
		
		workout_repository.save(index.name(), { name: index.name(), trackingData: index.currentTrackingData(), startDateTime: index.startDateTime(), endDateTime: index.endDateTime(), distance: index.distance() });
		
		index.clear();
	};
	
	index.distance = ko.computed(function(){
		var total_km = 0;

		for(i = 0; i < index.currentTrackingData().length; i++){
		    
		    if(i == (index.currentTrackingData().length - 1)){
		        break;
		    }
		    
		    total_km += gps_distance(index.currentTrackingData()[i].coords.latitude, index.currentTrackingData()[i].coords.longitude, index.currentTrackingData()[i+1].coords.latitude, index.currentTrackingData()[i+1].coords.longitude);
		}
		
		return total_km.toFixed(2);
	});
	
	index.validate = function() {
		index.errors.removeAll();
		
		if (!index.name()) {
			index.errors.push({ value: "Name is required." })
		}
		
		if (workout_repository.isUniqueName(index.name()) == false) {
			index.errors.push({ value: "Name must be unique." })
		}
		
		if (index.errors().length > 0)
			return false;
			
		return true;
	}
	
	jQuery('#tracking').live('pageshow', function () {
		index.errors.removeAll();
	});
	
	index.clear = function(){
		if (index.watch != null) {
			navigator.geolocation.clearWatch(index.watch);
		}
		
		index.map = null;
		index.name("");
		index.latitude("");
		index.longitude("");
		index.startDateTime("");
		index.endDateTime("");
	};
	
	jQuery(function(){
		ko.applyBindings(index, jQuery("#tracking")[0]);
	});
	
} (tracking_model))
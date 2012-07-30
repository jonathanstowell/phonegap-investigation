var tracking_model = {};

(function(index) {
	
	tracking_model = index;
	
	index.name = ko.observable();
	index.watch = null;
	index.isTracking = ko.observable(false);
	index.latitude = ko.observable();
	index.longitude = ko.observable();
	index.map = null;
	
	index.currentTrackingData = ko.observableArray([]);
	
	index.startTracking = function() {
		index.isTracking(true);
		
		index.watch = navigator.geolocation.watchPosition(function(position) {
			index.latitude(position.coords.latitude);
			index.longitude(position.coords.longitude);
			
			if (index.map == null)
				index.map = new google.maps.Map(document.getElementById("map-canvas"), { zoom: 5, center: new google.maps.LatLng(index.latitude(), index.longitude()), mapTypeId: google.maps.MapTypeId.ROADMAP });
			else
				index.map.panTo(new google.maps.LatLng(index.latitude(), index.longitude()));
			
			index.currentTrackingData.push(position);
		}, function(error) {
			console.log(error);
		}, 
		{ timeout: 1500, enableHighAccuracy: true });
	};
	
	index.stopTracking = function() {
		index.isTracking(false);
		navigator.geolocation.clearWatch(index.watch);
		index.map = null;
		window.localStorage.setItem(index.name(), ko.toJSON(index.currentTrackingData));
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
	
	jQuery(function(){
		ko.applyBindings(index, jQuery("#tracking")[0]);
	});
	
} (tracking_model))
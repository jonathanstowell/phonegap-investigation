var tracking_model = {};

(function(index) {
	
	tracking_model = index;
	
	var timerProcessIdentifier;
	var watch = null;
	var map = null;
	var timerInstance = null;
	
	index.name = ko.observable();
	index.isTracking = ko.observable(false);
	index.isWaitingForGPS = ko.observable(false);
	index.hasConnection = ko.observable(false);
	index.startDateTime = ko.observable();
	index.elapsedTime = ko.observable();
	index.endDateTime = ko.observable();
	index.latitude = ko.observable();
	index.longitude = ko.observable();
	index.errors = ko.observableArray([]);
	
	index.currentTrackingData = ko.observableArray([]);
	
	index.startTracking = function() {
		
		if(index.validate() == false) {
			return;
		}
		
		index.isTracking(true);
		index.isWaitingForGPS(true);
		
		index.startDateTime(new Date());
		
		watch = navigator.geolocation.watchPosition(function(position) {
			
			index.isWaitingForGPS(false);
			index.hasConnection(connection_helper.hasConnection());
			
			index.latitude(position.coords.latitude);
			index.longitude(position.coords.longitude);
			
			if (index.currentTrackingData().length == 0) {
				timerProcessIdentifier = setInterval('tracking_model.timer()', 1000);
				console.log("Start Timer Process ID:" + timerProcessIdentifier);
			}
			
			index.currentTrackingData.push(position);
			
			var size = fullScreen(0, 1),
	    		w = size.width,
	    		h = size.height;
	
			jQuery("#track-map-canvas")
	        	.attr("width", w)
	        	.attr("height", h);
				 
			jQuery("#track-map-canvas").css({ "width": w, "height" : h });
			
			var pos = new google.maps.LatLng(index.latitude(), index.longitude());
			
			if (map == null)
				map = new google.maps.Map(jQuery("#track-map-canvas")[0], { zoom: 15, center: pos, mapTypeId: google.maps.MapTypeId.ROADMAP });
			else
				map.setCenter(pos);
			
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

		    trackPath.setMap(map);
		    setTimeout(function() { google.maps.event.trigger(map,'resize'); map.setCenter(pos); }, 500);
		    
			}, function(error) {
				console.log(error);
			}, 
			{ timeout: 1500, enableHighAccuracy: true });	
	};
	
	index.stopTracking = function() {
		index.isTracking(false);
		index.isWaitingForGPS(false);
		index.endDateTime(new Date());
		workout_repository.save({ name: index.name(), trackingData: index.currentTrackingData(), startDateTime: index.startDateTime(), endDateTime: index.endDateTime(), distance: index.distance() });	
		jQuery(document).trigger('rideDetails', [index.name()]);
		index.clear();
	};
	
	index.distance = ko.computed(function(){
		return totalDistanceFromCoords(index.currentTrackingData());
	});
	
	index.timer = function() {
		if (timerInstance == null) {
			timerInstance = new timer();
		}
		
		index.elapsedTime(timerInstance.getElapsedTime(index.startDateTime()));
	};
	
	index.validate = function() {
		index.errors.removeAll();
		
		if (!index.name()) {
			index.errors.push({ value: "Name is required." })
		}
		
		if (index.name() && workout_repository.exists(index.name())) {
			index.errors.push({ value: "Name must be unique." })
		}
		
		jQuery("#track-errors-container").listview('refresh');
		
		if (index.errors().length > 0)
			return false;
			
		return true;
	};
	
	jQuery('#tracking').live('pageshow', function () {
		index.errors.removeAll();
	});
	
	index.clear = function(){
		if (watch != null) { clearInterval(watch); }	
		if (timerInstance != null) { clearInterval(timerProcessIdentifier); }
		
		map = null;
		timer = null;
		index.name("");
		index.latitude("");
		index.longitude("");
		index.startDateTime("");
		index.endDateTime("");
		index.currentTrackingData.removeAll();
		index.errors.removeAll();
	};
	
	jQuery(document).bind('online', function(){
		index.hasConnection(true);
	});
		
	jQuery(document).bind('offline', function(){
		index.hasConnection(false);
	});
	
	jQuery(function(){
		ko.applyBindings(index, jQuery("#tracking")[0]);
	});
	
} (tracking_model))
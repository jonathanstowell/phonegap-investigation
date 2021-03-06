var tracking_model = {};

(function(index) {
	
	tracking_model = index;
	
	var timerProcessIdentifier = null;
	var watch = null;
	var maphelper = new GoogleMapsHelper();
	var lastPosition = null;
	
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
	index.showMap = ko.observable(false);
	index.imagePath = ko.observable();
	
	index.currentTrackingData = ko.observableArray([]);
	
	index.startTracking = function() {
		
		if(index.validate() == false) {
			return;
		}
		
		index.isTracking(true);
		index.isWaitingForGPS(true);
		
		index.startDateTime(new Date());
		
		watch = navigator.geolocation.watchPosition(function(position) {		
			if (lastPosition == null || (position.coords.latitude != lastPosition.coords.latitude || position.coords.longitude != lastPosition.coords.longitude)) {
				index.isWaitingForGPS(false);
				index.hasConnection(connection_helper.hasConnection());
				
				index.latitude(position.coords.latitude);
				index.longitude(position.coords.longitude);
				
				if (index.currentTrackingData().length == 0) {
					timerProcessIdentifier = setInterval('tracking_model.timer()', 1000);
				}
					
				index.currentTrackingData.push(position);
				
				maphelper.produceMapFromCoords("#track-map-canvas", index.currentTrackingData(), true, index.viewPicture);
				index.showMap(true);
				
				lastPosition = position;
			}		
		}, function(error) {
			console.log(error);
		}, 
		{ timeout: 1000, enableHighAccuracy: true });	
	};
	
	index.stopTracking = function() {
		index.isTracking(false);
		index.isWaitingForGPS(false);
		index.endDateTime(new Date());
		
		var toSave = index.toJS();
		var result = workout_repository.validate(toSave);
		
		if (result.result == true) {
			workout_repository.save({ name: index.name(), trackingData: index.currentTrackingData(), startDateTime: index.startDateTime(), endDateTime: index.endDateTime(), distance: index.distance() });	
			jQuery(document).trigger('rideDetails', [index.name()]);
		} else {
			for (var i = 0; i < result.errors.length; i++) {
				index.errors.push(result.errors[i]);
			}
			
			jQuery("#track-errors-container").listview('refresh');
		}
	};
	
	index.takePhoto = function() {
		navigator.camera.getPicture(function(imageURI) {
			
			navigator.geolocation.getCurrentPosition(function(position) {
				index.latitude(position.coords.latitude);
				index.longitude(position.coords.longitude);
				
				position.imageURI = imageURI;
				
				index.currentTrackingData.push(position);
				
				console.log(position.imageURI);
			}, function(error) {
				console.log(error);
			});	
		}, function(error) {
			console.log(error);
		}, 
		{ quality: 50, destinationType: navigator.camera.DestinationType.FILE_URI });
	};
	
	index.viewPicture = function(position) {
		var size = screen_helper.fullScreen(0, 1),
			w = size.width,
			h = size.height;

		jQuery("#track-picture").css({ "width": w, "height" : h });
		
		index.imagePath(position.imageURI);
	
		index.showMap(false);
	};
	
	index.returnToMap = function() {
		index.showMap(true);
	};
	
	index.distance = ko.computed(function(){
		return map_helper.totalDistanceFromCoords(index.currentTrackingData());
	});
	
	index.timer = function() {
		index.elapsedTime(time_helper.elapsedTime(index.startDateTime()));
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
		if (timerProcessIdentifier != null) { clearInterval(timerProcessIdentifier); }
		
		map = null;
		timerProcessIdentifier = null;
		index.name("");
		index.latitude("");
		index.longitude("");
		index.startDateTime("");
		index.endDateTime("");
		index.currentTrackingData.removeAll();
		index.errors.removeAll();
		maphelper.clear();
	};
	
	index.toJS = function(){
		return { name: index.name(), trackingData: index.currentTrackingData(), startDateTime: index.startDateTime(), endDateTime: index.endDateTime(), distance: index.distance() };
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
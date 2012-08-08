var track_info_model = {};

(function(index) {
	
	track_info_model = index;
	
	index.name = ko.observable();
	index.trackingData = ko.observableArray([]);
	var maphelper = new GoogleMapsHelper();
	index.hasMap = ko.observable(false);
	index.hasConnection = ko.observable(false);
	index.distance = ko.observable();
	index.startDateTime = ko.observable();
	index.endDateTime = ko.observable();
	
	index.startDateTimeDisplay = ko.computed(function() {
		if (typeof index.startDateTime() != 'undefined')
			return index.startDateTime().format("dddd, mmmm dS, yyyy, h:MM:ss TT");
		
		return index.startDateTime();
	});
	
	index.endDateTimeDisplay = ko.computed(function() {
		if (typeof index.endDateTime() != 'undefined')
			return index.endDateTime().format("dddd, mmmm dS, yyyy, h:MM:ss TT");
		
		return index.endDateTime();
	});
	
	index.elapsedTime = ko.computed(function() {
		return time_helper.elapsedTimeBetween(index.startDateTime(), index.endDateTime());
	});
	
	jQuery(document).bind('rideDetails', function (event, key) {
		index.clear();
		
		var item = workout_repository.getByKey(key);
		
		index.name(item.name);
		index.distance(item.distance);
		index.startDateTime(new Date(item.startDateTime));
		index.endDateTime(new Date(item.endDateTime));
		index.hasConnection(connection_helper.hasConnection());
		
		if (item.trackingData[0] != null) {
		    for(i=0; i < item.trackingData.length; i++){
		    	index.trackingData.push(item.trackingData[i]);
		    }

			maphelper.produceMapFromCoords("#track-info-map-canvas", index.trackingData());
		    index.hasMap(true);
		}
		
		jQuery.mobile.changePage("#track-info", "slide", false, false);
    });
	
	index.clear = function() {
		index.name("");
		index.hasMap(false);
		index.trackingData.removeAll();
		maphelper.clear();
	};
	
	index.deleteItem = function() {
		workout_repository.deleteItem(index.name());
		jQuery.mobile.changePage("#history", "slide", false, false);
	};
	
	jQuery(document).bind('online', function(){
		index.hasConnection(true);
	});
		
	jQuery(document).bind('offline', function(){
		index.hasConnection(false);
	});
	
	jQuery(function(){
		ko.applyBindings(index, jQuery("#track-info")[0]);
	});
	
} (track_info_model))
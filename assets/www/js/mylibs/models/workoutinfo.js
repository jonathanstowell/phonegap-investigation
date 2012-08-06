var track_info_model = {};

(function(index) {
	
	track_info_model = index;
	
	index.name = ko.observable();
	index.trackingData = ko.observableArray([]);
	var map = null;
	index.hasMap = ko.observable(false);
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
		if (typeof index.startDateTime() != 'undefined' && typeof index.endDateTime() != 'undefined') {
			var timeend = index.endDateTime();
			var diff = timeend.getTime() - index.startDateTime().getTime();
			
			timeend.setTime(diff);
			
			var hours_passed = timeend.getHours();
			if(hours_passed < 10){
				hours_passed = "0" + hours_passed;
			}
			
			var minutes_passed = timeend.getMinutes();
			if(minutes_passed < 10){
				minutes_passed = "0" + minutes_passed;
			}
			
			var seconds_passed = timeend.getSeconds();
			if(seconds_passed < 10){
				seconds_passed = "0" + seconds_passed;
			}
			
			return hours_passed + "h " + minutes_passed + "m " + seconds_passed + "s";
		}
		else {
			return "Not Set";
		}
	});
	
	jQuery(document).bind('rideDetails', function (event, key) {
		index.clear();
		
		var item = workout_repository.getByKey(key);
		
		index.name(item.name);
		index.distance(item.distance);
		index.startDateTime(new Date(item.startDateTime));
		index.endDateTime(new Date(item.endDateTime));
		
		var size = fullScreen(0, 1),
        	w = size.width,
        	h = size.height;

	    jQuery("#track-info-map-canvas")
	        .attr("width", w)
	        .attr("height", h);
				 
	    jQuery("#track-info-map-canvas").css({ "width": w, "height" : h });
		
		if (item.trackingData[0] != null) {
			console.log("Coords" + item.trackingData[0].coords.latitude + " " + item.trackingData[0].coords.longitude)
			
			var pos = new google.maps.LatLng(item.trackingData[0].coords.latitude, item.trackingData[0].coords.longitude);
			map = new google.maps.Map(jQuery("#track-info-map-canvas")[0], { zoom: 15, center: pos, mapTypeId: google.maps.MapTypeId.ROADMAP });
			
			var trackCoords = [];
			
			console.log("length = " + item.trackingData.length);
			
		    for(i=0; i < item.trackingData.length; i++){
		    	index.trackingData.push(item.trackingData[i]);
		    	trackCoords.push(new google.maps.LatLng(item.trackingData[i].coords.latitude, item.trackingData[i].coords.longitude));
		    	console.log(i + " Coords " + item.trackingData[i].coords.latitude + " " + item.trackingData[i].coords.longitude)
		    }
		    
		    var trackPath = new google.maps.Polyline({
		      path: trackCoords,
		      strokeColor: "#FF0000",
		      strokeOpacity: 1.0,
		      strokeWeight: 2
		    });
	
		    trackPath.setMap(map);
		    setTimeout(function() { google.maps.event.trigger(map,'resize'); map.setCenter(pos); }, 500);
		    index.hasMap(true);
		}
		
		jQuery.mobile.changePage("#track-info", "slide", false, false);
    });
	
	index.clear = function() {
		index.name("");
		index.hasMap(false);
		index.trackingData.removeAll();
	};
	
	index.deleteItem = function() {
		workout_repository.deleteItem(index.name());
		jQuery.mobile.changePage("#history", "slide", false, false);
	};
	
	jQuery(function(){
		ko.applyBindings(index, jQuery("#track-info")[0]);
	});
	
} (track_info_model))
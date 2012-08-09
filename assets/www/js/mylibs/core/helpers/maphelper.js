var map_helper = {};

(function(index) {
	
	map_helper = index;
	
	index.gps_distance = function(lat1, lon1, lat2, lon2)
	{
		// http://www.movable-type.co.uk/scripts/latlong.html
	    var R = 6371; // km
	    var dLat = (lat2-lat1) * (Math.PI / 180);
	    var dLon = (lon2-lon1) * (Math.PI / 180);
	    var lat1 = lat1 * (Math.PI / 180);
	    var lat2 = lat2 * (Math.PI / 180);

	    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
	            Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
	    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	    var d = R * c;
	    
	    return d;
	};
	
	index.totalDistanceFromCoords = function(items) {
		var total_km = 0;

		for(i = 0; i < items.length; i++){
		    
		    if(i == (items.length - 1)){
		        break;
		    }
		    
		    total_km += index.gps_distance(items[i].coords.latitude, items[i].coords.longitude, items[i+1].coords.latitude, items[i+1].coords.longitude);
		}
		
		return total_km.toFixed(2);
	};
	
} (map_helper))

function GoogleMapsHelper() {
	
	var map = null;
	
	this.produceMapFromCoords = function(selector, currentTrackingData, useAnimation, pictureCallback) {
		var size = screen_helper.fullScreen(0, 1),
			w = size.width,
			h = size.height;

		jQuery(selector).css({ "width": w, "height" : h });
	
		var pos = new google.maps.LatLng(currentTrackingData[currentTrackingData.length - 1].coords.latitude, currentTrackingData[currentTrackingData.length - 1].coords.longitude);
		
		if (map == null)
			map = new google.maps.Map(jQuery(selector)[0], { zoom: 15, center: pos, mapTypeId: google.maps.MapTypeId.ROADMAP });
		else
			map.setCenter(pos);
		
		var trackCoords = [];

	    for(i=0; i < currentTrackingData.length; i++){
	    	var latLng = new google.maps.LatLng(currentTrackingData[i].coords.latitude, currentTrackingData[i].coords.longitude);
	    	
	    	trackCoords.push(latLng);
	    	
	    	console.log(currentTrackingData[i].imageURI);
	    	if (typeof currentTrackingData[i].imageURI != 'undefined') {
	    		console.log(currentTrackingData[i].imageURI);
	    		
	    		var animation = useAnimation ? google.maps.Animation.DROP : null;
	    		
		    	var marker = new google.maps.Marker({
		            position: latLng,
		            map: map,
		            animation: google.maps.Animation.DROP,
		        });
		    	
		    	var infoWindow = new google.maps.InfoWindow();
		    	
		    	google.maps.event.addListener(marker, 'click', function() {
		    	    map.setCenter(marker.getPosition());
		    	    pictureCallback(marker.position);
		    	});
	    	}
	    }
	    
	    var trackPath = new google.maps.Polyline({
	      path: trackCoords,
	      strokeColor: "#FF0000",
	      strokeOpacity: 1.0,
	      strokeWeight: 2
	    });

	    trackPath.setMap(map);
	    
	    setTimeout(function() { google.maps.event.trigger(map,'resize'); map.setCenter(pos); }, 500);
	};
	
	this.clear = function() {
		map = null;
	};
}
var map_helpers = {};

(function(index) {
	
	map_helpers = index;
	
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
	
} (map_helpers))
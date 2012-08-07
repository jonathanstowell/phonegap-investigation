function gps_distance(lat1, lon1, lat2, lon2)
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
}

function timer() {
	this.getElapsedTime = function(startdate) {
		var timeend = new Date();
		var diff = timeend.getTime() - startdate.getTime();
		
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
	};
}

function totalDistanceFromCoords(items) {
	var total_km = 0;

	for(i = 0; i < items.length; i++){
	    
	    if(i == (items.length - 1)){
	        break;
	    }
	    
	    total_km += gps_distance(items[i].coords.latitude, items[i].coords.longitude, items[i+1].coords.latitude, items[i+1].coords.longitude);
	}
	
	return total_km.toFixed(2);
}

function fullScreen(padding, border) {
    var scrWidth = $(window).width() - 30,
        scrHeight = $(window).height() - 30;

    return {
        'width': scrWidth,
        'height': scrHeight
    };
};
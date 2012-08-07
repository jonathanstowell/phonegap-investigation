var time_helper = {};

(function(index) {
	
	time_helper = index;
	
	index.elapsedTime = function(startdate) {
		var timeend = new Date();
		
		if (startdate == '')
			return;
		
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
	
	index.elapsedTimeBetween = function(startdate, timeend) {
		if (typeof startdate == 'undefined' || typeof timeend == 'undefined') {
			return "Not Set";
		}
		
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
	
} (time_helper))
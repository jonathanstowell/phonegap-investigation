var screen_helper = {};

(function(index) {
	
	screen_helper = index;
	
	index.fullScreen = function(padding, border) {
		var scrWidth = $(window).width() - 30,
        scrHeight = $(window).height() - 30;

		return {
			'width': scrWidth,
			'height': scrHeight
		};
	};
	
} (screen_helper))
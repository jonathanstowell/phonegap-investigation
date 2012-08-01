var settings_model = {};

(function(index) {
	
	settings_model = index;
	
	index.clear = function() {
		jQuery(document).trigger('clear-all');
	};
	
	jQuery(function(){
		ko.applyBindings(index, jQuery("#settings")[0]);
	});
	
} (settings_model))
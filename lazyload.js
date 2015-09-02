;
(function(factory) {
	if (typeof define === 'function' && define.amd) {
		return define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		module.exports = factory(window.jQuery);
	} else {
		return factory(window.jQuery);
	}
})(function($) {
	var Lazyload = function(){

	};

	Lazyload.prototype = {

	};

	if(!$.fn.hasOwnProperty("lazyload")){
		$.fn.lazyload = new Lazyload();
	}
});
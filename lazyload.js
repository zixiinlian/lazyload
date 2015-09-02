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
	var defaultOptins = {
		threshold: 0,
		placeholder: ''
	};

	var Lazyload = function(element, opitons){
		this.element = element;
		this.options = $.extend({}, defaultOptins, options);
	};

	Lazyload.prototype = {
		loader: function(){
			var _winHeight = $(window).height(),
				_winScrollTop = document.body.scrollTop || document.documentElement.scrollTop;
				
			$this.each(function () {
				var $self = $(this);
				if ($self.is('img')) {
					if ($self.attr('data-original')) {
						var _offsetTop = $self.offset().top;
						if ((_offsetTop - settings.threshold) <= (_winHeight + _winScrollTop)) {
							$self.attr('src', $self.attr('data-original'));
							$self.removeAttr('data-original');
						}
					}
				}
				else {
					if ($self.attr('data-original')) {
						if ($self.css('background-image') == 'none') {
							$self.css('background-image', 'url(' + settings.placeholder + ')');
						}
						var _offsetTop = $self.offset().top;
						if ((_offsetTop - settings.threshold) <= (_winHeight + _winScrollTop)) {
							$self.css('background-image', 'url(' + $self.attr('data-original') + ')');
							$self.removeAttr('data-original');
						}
					}
				}
			});
		},
		initEvent: function(){
			var self = this;

			$(window).on("resize", function(){
				self.loader();
			});
		}
	};

	if (!$.fn.hasOwnProperty("lazyload")) {
		$.fn.lazyload = function(options) {
			var args = Array.prototype.slice.call(arguments, 1),
				res = this;

			this.each(function(i, _element) {
				var element = $(_element),
					calendar = element.data('lazyload'),
					singleRes;

				if (typeof options === 'string') {
					if (calendar && $.isFunction(calendar[options])) {
						singleRes = calendar[options].apply(calendar, args);
						if (!i) {
							res = singleRes;
						}
						if (options === 'destroy') {
							element.removeData('lazyload');
						}
					}
				} else if (!calendar) {
					calendar = new Lazyload(element, options);
					element.data('lazyload', calendar);
				}
			});

			return res;
		};
	}
});
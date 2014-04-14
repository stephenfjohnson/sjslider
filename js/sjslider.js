(function ($) {
	$.fn.sjslider = function(options) {
		var defaults = {
			speed      : 1000,
			pause      : 2000,
			transition : 'slide'

		},

		options = $.extend(defaults, options);

		this.each(function() {
			var $this = $(this);

			$this.wrap('<div class="slider-wrap" />');

			if(options.pause <= options.speed) options.pause = options.speed + 100;

			$this.css({
				'width'    : '99999px',
				'position' : 'relative',
				'padding'  : 0
			});

			if (options.transition === 'slide') {
				$this.children().css({
					'float' 	 : 'left',
					'list-style' : 'none' 
				});

				$('.slider-wrap').css({
					'width'    : $this.children().width(),
					'overflow' : 'hidden'
				});
			}

			if (options.transition === 'fade') {
				$this.children().css({
					'width'    : $this.children().width(),
					'position' : 'absolute',
					'left'     : 0
				});

				for(var i = $this.children().length - 1, y = 0; i >= 0; i--, y++) {
					$this.children().eq(y).css('zIndex', i + 99);
				} 

				fade();

				} // End Fade If

				if (options.transition === 'slide') slide();

				function fade () {
					setInterval(function() {
						$this.children(':first').animate({ 'opacity' : 0}, options.speed, function() {
							$this
							.children(':first')
							.css('opacity' , 1)
							.css('zIndex', $this.children(':last').css('zIndex') - 1)
							.appendTo($this);
						})
					}, options.pause);
				} // End Fade




				function slide () {
					setInterval(function() {
						$this.animate({ 'left' : '-' + $this.parent().width()}, options.speed, function() {
							$this
							.css('left', 0)
							.children(':first')
							.appendTo($this);
						})
					}, options.pause);
				} // End Slide

		});
	}


})(jQuery);

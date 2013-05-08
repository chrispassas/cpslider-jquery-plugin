(function( $ ){
  $.fn.cpSlider = function(options) {

		// default configuration properties
		var defaults = {
			prevBtnClass: 	'prev-button',
			nextBtnClass: 	'next-button',
			easingType:		'linear',
			duration:		'slow',
			sliderSelector:	'ul',
			paginationClass: 'dot',
			continuous: 	false,
			auto: 			false,
			interval: 		5000,
			btnInactiveClass: 'inactive',
			currentPageClass: false,
			autoCenterSelector: false
		};

		var options = $.extend(defaults, options);

		this.each(function() {
			var sliderContainer = this;
			var currentSlide = 0;
			var lastSlideIndex = (jQuery(options.sliderSelector+" li",this).length - 1);
			var slideCount = jQuery(options.sliderSelector+" li",this).length;
			var slideMarginLeft = 0;
			var slideWidth = jQuery(options.sliderSelector+" li:first",this).outerWidth();

			function slideToPrevious() {
				if(options.continuous) {
					if(currentSlide==0) {
						ulWidth = ulWidth + ulWidth;
						jQuery(options.sliderSelector).css('width',ulWidth+"px");
						var clone = jQuery("li",sliderContainer).clone()
						clone.appendTo(options.sliderSelector);
						slideMarginLeft = (ulWidth/2) * (-1);
						jQuery(options.sliderSelector,sliderContainer).css("margin-left",slideMarginLeft+"px");
						slideMarginLeft = slideMarginLeft + slideWidth;

						jQuery(options.sliderSelector,sliderContainer).animate({
							"margin-left":slideMarginLeft+"px"
						},options.duration,options.easingType,function(){
							slideMarginLeft = (-1)*( (ulWidth / 2) - slideWidth);
							jQuery(options.sliderSelector,sliderContainer).css("margin-left",slideMarginLeft+"px");
							clone.remove();
							ulWidth = ulWidth / 2;
							jQuery(options.sliderSelector).css('width',ulWidth+"px");
						});
						currentSlide = lastSlideIndex;
					}
					else {
						currentSlide --
						slideMarginLeft = slideMarginLeft + slideWidth;
						jQuery(options.sliderSelector,sliderContainer).animate({
							"margin-left":slideMarginLeft+"px"
						},options.duration,options.easingType);
					}
					jQuery("."+options.paginationClass,sliderContainer).removeClass('active');
					jQuery("."+options.paginationClass+":eq("+currentSlide+")",sliderContainer).addClass('active');
				}
				else {
					if(currentSlide!=0) {
						currentSlide --;
						slideMarginLeft = slideMarginLeft + slideWidth;
						jQuery(options.sliderSelector,sliderContainer).animate({
							"margin-left":slideMarginLeft+"px"
						},options.duration,options.easingType);
						jQuery("."+options.paginationClass,sliderContainer).removeClass('active');
						jQuery("."+options.paginationClass+":eq("+currentSlide+")",sliderContainer).addClass('active');
					}
				}
				if(options.currentPageClass) {
					slideUpdateCurrentPage(currentSlide+1);
				}
			}	//slideToPrevious

			function slideToNext() {
				if(options.continuous) {
					if(currentSlide==lastSlideIndex) {
						ulWidth = ulWidth + ulWidth;
						jQuery(options.sliderSelector).css('width',ulWidth+"px");
						var clone = jQuery("li",sliderContainer).clone()
						clone.appendTo(options.sliderSelector);
						slideMarginLeft = slideMarginLeft - slideWidth;
						jQuery(options.sliderSelector,sliderContainer).animate({
							"margin-left":slideMarginLeft+"px"
						},options.duration,options.easingType,function(){
							slideMarginLeft = 0;
							jQuery(options.sliderSelector,sliderContainer).css("margin-left",slideMarginLeft+"px");
							clone.remove();
							ulWidth = ulWidth / 2;
							jQuery(options.sliderSelector).css('width',ulWidth+"px");
						});
						currentSlide = 0;
					}
					else {
						currentSlide ++;
						slideMarginLeft = slideMarginLeft - slideWidth;
						jQuery(options.sliderSelector,sliderContainer).animate({
							"margin-left":slideMarginLeft+"px"
						},options.duration,options.easingType);
					}
					jQuery("."+options.paginationClass,sliderContainer).removeClass('active');
					jQuery("."+options.paginationClass+":eq("+currentSlide+")",sliderContainer).addClass('active');
				}
				else {
					if(currentSlide!=lastSlideIndex) {
						currentSlide ++;
						slideMarginLeft = slideMarginLeft - slideWidth;
						jQuery(options.sliderSelector,sliderContainer).animate({
							"margin-left":slideMarginLeft+"px"
						},options.duration,options.easingType);
						jQuery("."+options.paginationClass,sliderContainer).removeClass('active');
						jQuery("."+options.paginationClass+":eq("+currentSlide+")",sliderContainer).addClass('active');
					}
				}
				if(options.currentPageClass) {
					slideUpdateCurrentPage(currentSlide+1);
				}
			}	//slideNextPrevious

			function slideUpdateCurrentPage(pageNumber) {
				jQuery("."+options.currentPageClass,sliderContainer).html(pageNumber);
			}

			function slideTo(slideIndex) {
				clearInterval(rotateInterval);
				if(currentSlide!=slideIndex) {
					if(slideIndex==0) {
						slideMarginLeft = 0;
					}
					else {
						slideMarginLeft = (-1) * (Math.abs(slideWidth*slideIndex));
					}
					currentSlide = slideIndex;
					jQuery(options.sliderSelector,sliderContainer).animate({
						"margin-left":slideMarginLeft+"px"
					},options.duration,options.easingType);
					jQuery("."+options.paginationClass,sliderContainer).removeClass('active');
					jQuery("."+options.paginationClass+":eq("+currentSlide+")",sliderContainer).addClass('active');
				}
				else {
					return false;
				}
			}

			jQuery("."+options.prevBtnClass,this).click(function() {
				clearInterval(rotateInterval);
				slideToPrevious()
				if(!options.continuous) {
					if(currentSlide==0){
						jQuery("."+options.prevBtnClass,sliderContainer).addClass(options.btnInactiveClass);
						jQuery("."+options.nextBtnClass,sliderContainer).removeClass(options.btnInactiveClass);
					}
					else {
						jQuery("."+options.prevBtnClass,sliderContainer).removeClass(options.btnInactiveClass);
						jQuery("."+options.nextBtnClass,sliderContainer).removeClass(options.btnInactiveClass);
					}
				}
			});
			jQuery("."+options.nextBtnClass,this).click(function() {
				clearInterval(rotateInterval);
				slideToNext();
				if(!options.continuous) {
					if(currentSlide==lastSlideIndex){
						jQuery("."+options.nextBtnClass,sliderContainer).addClass(options.btnInactiveClass);
						jQuery("."+options.prevBtnClass,sliderContainer).removeClass(options.btnInactiveClass);
					}
					else {
						jQuery("."+options.nextBtnClass,sliderContainer).removeClass(options.btnInactiveClass);
						jQuery("."+options.prevBtnClass,sliderContainer).removeClass(options.btnInactiveClass);
					}
				}
			});
			jQuery("."+options.paginationClass,this).click(function() {
				slideTo(jQuery(this).index());
			});

			//Setup
			var ulWidth = 0;
			jQuery(options.sliderSelector+" li",this).each(function(index) {
				ulWidth = ulWidth + jQuery(this).outerWidth();
			});
			if(jQuery(options.sliderSelector+" li",this).length>1) {
				if(options.auto) {
					options.continuous = true; 	//If auto then continuous required
					var rotateInterval = setInterval(function(){
						slideToNext();
					},options.interval);
				}
				jQuery(options.sliderSelector,this).css('width',ulWidth+"px");
				jQuery("."+options.paginationClass+":first",this).addClass('active');
				if(options.autoCenterSelector) {
					var paginationItemWidth = jQuery("."+options.paginationClass+":first",sliderContainer).outerWidth();
					var totalPaginationWidth = (paginationItemWidth * slideCount);
					var sliderContainerWidth = jQuery(sliderContainer).width();
					var positionLeft = (sliderContainerWidth/2) - (totalPaginationWidth/2);
					jQuery(options.autoCenterSelector,this).css('left',positionLeft+"px");
				}

				jQuery("."+options.paginationClass).css("cursor","pointer");
			}
			else {
				jQuery("."+options.nextBtnClass,sliderContainer).hide();
				jQuery("."+options.prevBtnClass,sliderContainer).hide();
				jQuery("."+options.paginationClass,sliderContainer).hide();
			}
		});	//this.each
	};
})(jQuery);

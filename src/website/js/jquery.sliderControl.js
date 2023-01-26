(function($){
	"use strict";
	var defaults = {
		appendTo: "",
		contentContainer: ""
	};
	var id=0;
	var methods =
	{
		init : function(options){
			return this.each(function(){
				options = $.extend(defaults, options);
				var self = $(this);
				var expando = "slider_control_" + self.sliderControl("uniqueId");//self.get(0)[jQuery.expando];
				self.data("expando", expando);
				//slider content
				if(options.contentContainer!="")
				{
					options.contentContainer.addClass("slider_" + expando + "_content_container");
					options.contentContainer.children().each(function(index){
						$(this).attr("id", "slide_" + expando + "_" + index + "_content");
					});
				}
				//slider controls
				var sliderControl = $("<ul class='slider_navigation' id='slider_navigation_" + expando + "'>");
				sliderControl.append("<li class='slider_bar' style='width:" + (100/self.children().length) + "%;'></li>");
				$(this).children().each(function(index){
					$(this).attr("id", "slide_" + expando + "_" + index);
					sliderControl.append($("<li class='slider_control' style='width:" + (100/self.children().length) + "%;'><a id='" + $(this).attr("id") + "_control' href='#' title='" + (index+1) + "'><span class='top_border'></span><span class='slider_control_bar'></span>" + (index+1) + "</a>"));
				});
				if(options.appendTo=="")
					self.after(sliderControl);
				else
					options.appendTo.append(sliderControl);
				$("#slider_navigation_" + expando + " .slider_control a").on("click", function(event){
					event.preventDefault();
					if(!$(this).hasClass("inactive"))
					{
						var self2 = $(this).parent();
						self.trigger("isScrolling", function(isScrolling){
							if(!isScrolling)
								self.trigger("slideTo", $("#slider_navigation_" + expando + " .slider_control").index(self2));
						});
					}
				});
			});
		},
		uniqueId : function(){
			return id++;
		}
	};

	jQuery.fn.sliderControl = function(method){
		if(methods[method])
			return methods[method].apply(this, arguments);
		else if(typeof(method)==='object' || !method)
			return methods.init.apply(this, arguments);
	};
})(jQuery);
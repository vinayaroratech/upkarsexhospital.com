"use strict";
if (!Date.prototype.toISOString) {
	Date.prototype.toISOString = function () {
		function pad(n) { return n < 10 ? '0' + n : n }
		return this.getUTCFullYear() + '-'
			+ pad(this.getUTCMonth() + 1) + '-'
			+ pad(this.getUTCDate()) + 'T'
			+ pad(this.getUTCHours()) + ':'
			+ pad(this.getUTCMinutes()) + ':'
			+ pad(this.getUTCSeconds()) + 'Z';
	};
}
function getRandom(min, max) {
	return ((Math.floor(Math.random() * (max - min))) + min);
}
function onAfterSlide(obj) {
	var currentSlide = obj.items.visible;
	var expando = $(this).data("expando");//$(this).get(0)[jQuery.expando];
	$("#slider_navigation_" + expando + " .slider_control").addClass("inactive");
	$("#" + $(currentSlide).attr("id") + "_content").fadeIn(200, function () {
		$("#slider_navigation_" + expando + " .slider_control").removeClass("inactive");
	});
}
function onBeforeSlide(obj) {
	var prevSlide = obj.items.old;
	var currentSlide = obj.items.visible;
	var expando = $(this).data("expando");//$(this).get(0)[jQuery.expando];
	$(".slider_" + expando + "_content_container .slider_content").fadeOut(200);
	var position = $($("#" + $(currentSlide).attr("id") + "_control")).position();
	var positionPrev = $($("#" + $(prevSlide).attr("id") + "_control")).position();
	$("#slider_navigation_" + expando + " .slider_control_bar").css("display", "none");
	$("#slider_navigation_" + expando + " .slider_bar").css({
		"display": "block",
		"margin-left": (typeof (positionPrev) != "undefined" ? positionPrev.left : 0) + "px"
	});
	$("#slider_navigation_" + expando + " .slider_bar").animate({
		'margin-left': (typeof (position) != "undefined" ? position.left : 0) + "px"
	}, 750, "easeInOutQuint", function () {
		$(this).css("display", "none");
		$("#" + $(currentSlide).attr("id") + "_control").children("#slider_navigation_" + expando + " .slider_control_bar").css("display", "block");
	});
}
var map = null;
function gm_authFailure() {
	if ($("#map").length)
		alert('Please define Google Maps API Key.\nReplace YOUR_API_KEY with the key generated on https://developers.google.com/maps/documentation/javascript/get-api-key\nin below line before the </head> closing tag <script type="text/javascript" src="//maps.google.com/maps/api/js?key=YOUR_API_KEY"></script>');
}
jQuery(document).ready(function ($) {
	//mobile menu
	$(".mobile_menu select").change(function () {
		window.location.href = $(this).val();
		return;
	});

	//slider
	$(".slider").carouFredSel({
		responsive: true,
		prev: {
			onAfter: onAfterSlide,
			onBefore: onBeforeSlide,
			easing: "easeInOutQuint",
			duration: 750
		},
		next: {
			onAfter: onAfterSlide,
			onBefore: onBeforeSlide,
			easing: "easeInOutQuint",
			duration: 750
		},
		auto: {
			play: true,
			pauseDuration: 5000,
			onAfter: onAfterSlide,
			onBefore: onBeforeSlide,
			easing: "easeInOutQuint",
			duration: 750
		}
	},
		{
			wrapper: {
				classname: "caroufredsel_wrapper caroufredsel_wrapper_slider"
			}
		});
	$(".slider").sliderControl({
		appendTo: $(".slider_content_box"),
		contentContainer: $(".slider_content_box")
	});

	//image carousel
	//image carousel with preloader
	var imageCarousel = function () {
		$(".image_carousel").each(function (index) {
			$(this).addClass("mc_preloader_" + index);
			$(".mc_preloader_" + index + " img:first").attr('src', $(".mc_preloader_" + index + " img:first").attr('src') + '?i=' + getRandom(1, 100000));
			$(".mc_preloader_" + index + " img:first").one("load", function () {
				$(this).prev(".mc_preloader").remove();
				$(this).fadeIn();
				var carouselOptions = {
					responsive: true,
					prev: {
						onAfter: onAfterSlide,
						onBefore: onBeforeSlide,
						easing: "easeInOutQuint",
						duration: 750
					},
					next: {
						onAfter: onAfterSlide,
						onBefore: onBeforeSlide,
						easing: "easeInOutQuint",
						duration: 750
					},
					auto: {
						play: false,
						pauseDuration: 5000,
						onAfter: onAfterSlide,
						onBefore: onBeforeSlide,
						easing: "easeInOutQuint",
						duration: 750
					}
				};
				$(".mc_preloader_" + index).carouFredSel(carouselOptions);
				if ($(".mc_preloader_" + index).children().length > 1) {
					$(".mc_preloader_" + index).sliderControl({
						appendTo: "",
						contentContainer: ""
					});
				}
				$(".mc_preloader_" + index + " li img").css("display", "block");
				$(".mc_preloader_" + index).trigger('configuration', ['debug', false, true]); //for width
				$(".mc_preloader_" + index).trigger('configuration', ['debug', false, true]); //for height
			}).each(function () {
				if (this.complete)
					$(this).load();
			});
		});
	};
	imageCarousel();

	/*$("ul.gallery_item_details_list").css({
		"height": 0,
		"display": "none"
	});
	$(".gallery_item_details_list li.gallery_item_details").css("display", "none");*/

	//horizontal carousel
	$(".horizontal_carousel").carouFredSel({
		items: {
			visible: 4
		},
		scroll: {
			items: 1,
			easing: "swing",
			pauseOnHover: true
		},
		auto: {
			play: false,
			items: 1
		}
	});
	$(".our_clinic").trigger("configuration", {
		prev: '#our_clinic_prev',
		next: '#our_clinic_next'
	});
	$(".carousel").trigger("configuration", {
		prev: '#carousel_prev',
		next: '#carousel_next'
	});
	setTimeout(function () {
		$(".testimonials").trigger("configuration", {
			items: {
				visible: 2
			},
			prev: '#testimonials_prev',
			next: '#testimonials_next'
		});
	}, 1000);

	//training_classes
	$(".accordion").accordion({
		event: 'change',
		heightStyle: 'content'/*,
		active: false,
		collapsible: true*/
	});
	$(".accordion.wide").on("accordionactivate", function (event, ui) {
		if (typeof ($("#" + $(ui.newHeader).attr("id")).offset()) != "undefined") {
			$("html, body").animate({ scrollTop: $("#" + $(ui.newHeader).attr("id")).offset().top }, 400);
		}
	});
	$(".tabs").on("tabsbeforeactivate", function (event, ui) {
		$("html, body").animate({ scrollTop: $("#" + $(ui.newTab).children("a").attr("id")).offset().top }, 400);
	});
	$(".tabs").on("tabsactivate", function (event, ui) {
		$(window).trigger("resize");
	});
	$(".tabs").tabs({
		event: 'change',
		show: true,
		create: function () {
			$("html, body").scrollTop(0);
		}
	});

	//image controls
	var currentControls;
	$(".gallery_box").on({
		mouseenter: function () {
			var width = $(this).find("img").first().width();
			var height = $(this).find("img").first().height();
			currentControls = $(this).find(".controls");
			if (typeof (currentControls) != "undefined") {
				var currentControlsWidth = currentControls.outerWidth();
				var currentControlsHeight = currentControls.outerHeight();
				currentControls.stop();
				currentControls.css({
					"display": "block",
					"margin-left": (width / 2 - currentControlsWidth / 2) + "px",
					"top": (height) + "px"
				});
				currentControls.animate({ "top": (height / 2 - currentControlsHeight / 2) + "px" }, 250, 'easeInOutCubic');
			}
		},
		mouseleave: function () {
			if (typeof (currentControls) != "undefined") {
				currentControls.stop();
				currentControls.css("display", "block");
				var height = $(this).find("img").first().height();
				currentControls.animate({ "top": (height) + "px" }, 250, 'easeInOutCubic', function () {
					$(this).css("display", "none");
				});
			}
		}
	});

	//browser history
	$(".tabs .ui-tabs-nav a").on("click", function () {
		if ($(this).attr("href").substr(0, 4) != "http")
			$.bbq.pushState($(this).attr("href"));
		else
			window.location.href = $(this).attr("href");
	});
	$(".ui-accordion .ui-accordion-header").on("click", function () {
		$.bbq.pushState("#" + $(this).attr("id").replace("accordion-", ""));
	});

	//tabs box navigation
	$(".tabs_box_navigation").on("mouseover", function () {
		$(this).find("ul").removeClass("tabs_box_navigation_hidden");
	});
	$(".tabs_box_navigation a").on("click", function () {
		$(".tabs_box_navigation_selected .selected").removeClass("selected");
		$(this).parent().addClass("selected");
		$(this).parent().parent().parent().children('span').text($(this).text());
		$(this).parent().parent().addClass("tabs_box_navigation_hidden");
	});
	$(".contact_form .tabs_box_navigation a").on("click", function (event) {
		event.preventDefault();
		$(this).parent().parent().parent().children("[type='hidden']").first().val($.trim($(this).text()));
	});

	//hashchange
	$(window).on("hashchange", function (event) {
		var hashSplit = $.param.fragment().split("-");
		var hashString = "";
		for (var i = 0; i < hashSplit.length - 1; i++)
			hashString = hashString + hashSplit[i] + (i + 1 < hashSplit.length - 1 ? "-" : "");
		if (hashSplit[0].substr(0, 7) != "filter=") {
			$('.ui-accordion .ui-accordion-header#accordion-' + decodeURIComponent($.param.fragment())).trigger("change");
			$(".tabs_box_navigation a[href='#" + decodeURIComponent($.param.fragment()) + "']").trigger("click");
			$('.ui-accordion .ui-accordion-header#accordion-' + decodeURIComponent(hashString)).trigger("change");
		}
		$('.tabs .ui-tabs-nav [href="#' + decodeURIComponent(hashString) + '"]').trigger("change");
		$('.tabs .ui-tabs-nav [href="#' + decodeURIComponent($.param.fragment()) + '"]').trigger("change");
		if (hashSplit[0].substr(0, 7) != "filter=")
			$('.tabs .ui-accordion .ui-accordion-header#accordion-' + decodeURIComponent($.param.fragment())).trigger("change");
		$(".testimonials, .scrolling_list").trigger('configuration', ['debug', false, true]);
		$(".image_carousel").trigger('configuration', ['debug', false, true]);

		// get options object from hash
		var hashOptions = $.deparam.fragment();

		if (typeof (hashOptions.filter) != "undefined") {
			// apply options from hash
			$(".isotope_filters a").removeClass("selected");
			if ($('.isotope_filters a[href="#filter=' + hashOptions.filter + '"]').length)
				$('.isotope_filters a[href="#filter=' + hashOptions.filter + '"]').addClass("selected");
			else
				$(".isotope_filters li:first a").addClass("selected");
			$(".gallery:not('.horizontal_carousel')").isotope(hashOptions);
			//$(".timetable_isotope").isotope(hashOptions);
		}

		//open gallery details
		if (location.hash.substr(1, 21) == "gallery-details-close" || typeof (hashOptions.filter) != "undefined") {
			$(".gallery_item_details_list").animate({ height: '0' }, {
				duration: 200, easing: 'easeOutQuint', complete: function () {
					$(this).css("display", "none")
					$(".gallery_item_details_list .gallery_item_details").css("display", "none");
				}
			});
		}
		else if (location.hash.substr(1, 15) == "gallery-details") {
			var detailsBlock = $(location.hash);
			$(".gallery_item_details_list .gallery_item_details").css("display", "none");
			detailsBlock.css("display", "block");
			var galleryItem = $("#gallery-item-" + location.hash.substr(17));
			detailsBlock.find(".prev").attr("href", (galleryItem.prevAll(":not('.isotope-hidden')").first().length ? galleryItem.prevAll(":not('.isotope-hidden')").first().find(".open_details").attr("href") : $(".gallery:not('.horizontal_carousel')").children(":not('.isotope-hidden')").last().find(".open_details").attr("href")));
			detailsBlock.find(".next").attr("href", (galleryItem.nextAll(":not('.isotope-hidden')").first().length ? galleryItem.nextAll(":not('.isotope-hidden')").first().find(".open_details").attr("href") : $(".gallery:not('.horizontal_carousel')").children(":not('.isotope-hidden')").first().find(".open_details").attr("href")));
			var visible = parseInt($(".gallery_item_details_list").css("height")) == 0 ? false : true;
			var galleryItemDetailsOffset;
			if (!visible) {
				$(".gallery_item_details_list").css("display", "block").animate({ height: detailsBlock.height() }, 500, 'easeOutQuint', function () {
					$(this).css("height", "100%");
					$(location.hash + " .image_carousel").trigger('configuration', ['debug', false, true]);
					$(window).trigger("resize");
				});
				galleryItemDetailsOffset = $(".gallery_item_details_list").offset();
				$("html, body").animate({ scrollTop: galleryItemDetailsOffset.top - 10 }, 400);
			}
			else {
				/*$(".gallery_item_details_list").animate({height:'0'},{duration:200,easing:'easeOutQuint',complete:function() 
				{
					$(this).css("display", "none")*/
				//$(".gallery_item_details_list").css("height", "100%");
				galleryItemDetailsOffset = $(".gallery_item_details_list").offset();
				$("html, body").animate({ scrollTop: galleryItemDetailsOffset.top - 10 }, 400);
				$(location.hash + " .image_carousel").trigger('configuration', ['debug', false, true]);
				$(window).trigger("resize");
				/*$(".gallery_item_details_list").css("display", "block").animate({height:detailsBlock.height()},{duration:500,easing:'easeOutQuint'});
			}});*/
			}
		}
	}).trigger("hashchange");

	//tweets
	/*$.getJSON('https://api.twitter.com/1/statuses/user_timeline/Upkarsexhospital.json?count=10&include_rts=true&callback=?', function(data)
	{
		if(data.length)
		{
			var list=$(".latest_tweets");
			var date;
			$(data).each(function(index,value)
			{
				if($.browser.msie)
					date = new Date(Date.parse(value.created_at.replace(/( \+)/, ' UTC$1'))).toISOString();
				else
					date = new Date(Date.parse(value.created_at)).toISOString();
				list.append($('<li class="icon_small_arrow right_white">').append($('<p>').html(linkify(value.text)+'<abbr class="timeago" title="'+date+'">'+date+'</abbr>')));
			});

			$('.latest_tweets a').attr('target','_blank');

			list.carouFredSel({
				direction: "up",
				items: {
					visible: 3
				},
				scroll: {
					items: 1,
					easing: "swing",
					pauseOnHover: true,
					height: "variable"
				},
				prev: '#latest_tweets_prev',
				next: '#latest_tweets_next',
				auto: {
					play: false
				}
			});	
			$("abbr.timeago").timeago();
		}
	});*/

	//timeago
	$("abbr.timeago").timeago();

	//footer recent posts, most commented, most viewed, scrolling list
	$(".latest_tweets, .footer_recent_posts, .footer_male_sexual_dysfunction_list, .footer_female_sexual_dysfunction_list, .most_commented, .most_viewed, .scrolling_list_0, .male_sexual_dysfunction_list, .female_sexual_dysfunction_list, .skin_care_list").carouFredSel({
		direction: "up",
		items: {
			visible: 3
		},
		scroll: {
			items: 1,
			easing: "swing",
			pauseOnHover: true,
			height: "variable"
		},
		auto: {
			play: false
		}
	});
	$(".latest_tweets").trigger("configuration", {
		items: {
			visible: ($(".latest_tweets").children().length > 2 ? 3 : $(".latest_tweets").children().length)
		},
		prev: '#latest_tweets_prev',
		next: '#latest_tweets_next'
	});
	$(".footer_recent_posts").trigger("configuration", {
		prev: '#footer_recent_posts_prev',
		next: '#footer_recent_posts_next'
	});
	$(".footer_male_sexual_dysfunction_list").trigger("configuration", {
		prev: '#footer_male_sexual_dysfunction_list_prev',
		next: '#footer_male_sexual_dysfunction_list_next'
	});
	$(".most_commented").trigger("configuration", {
		prev: '#most_commented_prev',
		next: '#most_commented_next'
	});
	$(".most_viewed").trigger("configuration", {
		prev: '#most_viewed_prev',
		next: '#most_viewed_next'
	});
	$(".scrolling_list_0").trigger("configuration", {
		prev: '#scrolling_list_0_prev',
		next: '#scrolling_list_0_next'
	});
	$(".male_sexual_dysfunction_list").trigger("configuration", {
		prev: '#male_sexual_dysfunction_list_prev',
		next: '#male_sexual_dysfunction_list_next'
	});
	$(".footer_female_sexual_dysfunction_list").trigger("configuration", {
		prev: '#footer_female_sexual_dysfunction_list_prev',
		next: '#footer_female_sexual_dysfunction_list_next'
	});
	$(".female_sexual_dysfunction_list").trigger("configuration", {
		prev: '#female_sexual_dysfunction_list_prev',
		next: '#female_sexual_dysfunction_list_next'
	});
	$(".skin_care_list").trigger("configuration", {
		prev: '#skin_care_list_prev',
		next: '#skin_care_list_next'
	});

	if ($("#map").length && typeof (google) != "undefined") {
		//google map
		var coordinate = new google.maps.LatLng(-37.732304, 144.868641);
		var mapOptions = {
			zoom: 12,
			center: coordinate,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			streetViewControl: false,
			mapTypeControl: false
		};

		map = new google.maps.Map(document.getElementById("map"), mapOptions);
		new google.maps.Marker({
			position: new google.maps.LatLng(-37.732304, 144.868641),
			map: map,
			icon: new google.maps.MarkerImage("images/map_pointer.png", new google.maps.Size(38, 45), null, new google.maps.Point(18, 44))
		});
	}

	//window resize
	function windowResize() {
		$(".horizontal_carousel").trigger('configuration', ['debug', false, true]);
		$(".training_classes").accordion("resize");
		$(".slider:not('.ui-slider,.form_field')").trigger('configuration', ['debug', false, true]);
		if (map != null)
			map.setCenter(coordinate);
		if ($(".gallery:not('.horizontal_carousel')").length) {
			$(".gallery:not('.horizontal_carousel')").isotope({
				masonry: {
					//columnWidth: 225,
					gutter: ($(".gallery:not('.horizontal_carousel')").width() > 462 ? 30 : 12)
				}
			});
		}
		setTimeout(function () {
			$(".image_carousel").trigger('configuration', ['debug', false, true]);
		}, 1);
		$(".latest_tweets, .footer_recent_posts, .footer_male_sexual_dysfunction_list, .footer_female_sexual_dysfunction_list, .most_commented, .most_viewed, .scrolling_list_0, .male_sexual_dysfunction_list, .female_sexual_dysfunction_list").trigger('configuration', ['debug', false, true]);
	}
	$(window).resize(windowResize);
	window.addEventListener('orientationchange', windowResize);

	//scroll top
	$("a[href='#top']").on("click", function () {
		$("html, body").animate({ scrollTop: 0 }, "slow");
		return false;
	});

	//comments number scroll
	$(".single .comments_number").on("click", function (event) {
		event.preventDefault();
		var offset = $("#comments_list").offset();
		$("html, body").animate({ scrollTop: offset.top - 10 }, 400);
	});

	//reply button scroll
	$(".reply_button").on("click", function (event) {
		event.preventDefault();
		var offset = $("#comment_form").offset();
		$("html, body").animate({ scrollTop: offset.top - 10 }, 400);
		$("#cancel_comment").css('display', 'block');
	});

	//cancel comment button
	$("#cancel_comment").on("click", function (event) {
		event.preventDefault();
		$(this).css('display', 'none');
	});

	//hint
	$(".search input[type='text']").hint();

	//tooltip
	$(".tooltip").on("mouseover click", function () {
		var position = $(this).position();
		var tooltip_text = $(this).children(".tooltip_text");
		tooltip_text.css("width", $(this).outerWidth() + "px");
		tooltip_text.css("height", tooltip_text.height() + "px");
		tooltip_text.css({ "top": position.top - tooltip_text.innerHeight() + "px", "left": position.left + "px" });
	});

	//isotope
	$(".gallery:not('.horizontal_carousel')").isotope({
		masonry: {
			//columnWidth: 225,
			gutter: ($(".gallery:not('.horizontal_carousel')").width() > 462 ? 30 : 12)
		}
	});
	//$(".timetable_isotope").isotope();

	//fancybox
	$(".fancybox").fancybox({
		'speedIn': 600,
		'speedOut': 200,
		'transitionIn': 'elastic',
		'cyclic': 'true'
	});
	$(".fancybox-video").on('click', function () {
		$.fancybox(
			{
				'autoScale': false,
				'speedIn': 600,
				'speedOut': 200,
				'transitionIn': 'elastic',
				'width': (this.href.indexOf("vimeo") != -1 ? 600 : 680),
				'height': (this.href.indexOf("vimeo") != -1 ? 338 : 495),
				'href': (this.href.indexOf("vimeo") != -1 ? this.href : this.href.replace(new RegExp("watch\\?v=", "i"), 'embed/')),
				'type': 'iframe',
				'swf':
				{
					'wmode': 'transparent',
					'allowfullscreen': 'true'
				}
			});
		return false;
	});
	$(".fancybox-iframe").fancybox({
		'speedIn': 600,
		'speedOut': 200,
		'transitionIn': 'elastic',
		'width': '75%',
		'height': '75%',
		'autoScale': false,
		'titleShow': false,
		'type': 'iframe'
	});

	//contact form
	if ($(".contact_form").length)
		$(".contact_form")[0].reset();
	$(".contact_form").on("submit", function (event) {
		event.preventDefault();
		var data = $(this).serializeArray();
		$("#contact_form .block").block({
			message: false,
			overlayCSS: {
				opacity: '0.3',
				"backgroundColor": "#FFF"
			}
		});
		$.ajax({
			url: $(".contact_form").attr("action"),
			data: data,
			type: "post",
			dataType: "json",
			success: function (json) {
				$("#contact_form [name='submit'], #contact_form [name='first_name'], #contact_form [name='last_name'], #contact_form [name='email'], #contact_form [name='message']").qtip('destroy');
				if (typeof (json.isOk) != "undefined" && json.isOk) {
					if (typeof (json.submit_message) != "undefined" && json.submit_message != "") {
						$("#contact_form [name='submit']").qtip(
							{
								style: {
									classes: 'ui-tooltip-success'
								},
								content: {
									text: json.submit_message
								},
								position: {
									my: "right center",
									at: "left center"
								}
							}).qtip('show');
						$(".contact_form")[0].reset();
						$(".contact_form [name='department']").val("");
						$(".contact_form .tabs_box_navigation_selected>span").text("Select department");
					}
				}
				else {
					if (typeof (json.submit_message) != "undefined" && json.submit_message != "") {
						$("#contact_form [name='submit']").qtip(
							{
								style: {
									classes: 'ui-tooltip-error'
								},
								content: {
									text: json.submit_message
								},
								position: {
									my: "right center",
									at: "left center"
								}
							}).qtip('show');
					}
					if (typeof (json.error_first_name) != "undefined" && json.error_first_name != "") {
						$("#contact_form [name='first_name']").qtip(
							{
								style: {
									classes: 'ui-tooltip-error'
								},
								content: {
									text: json.error_first_name
								},
								position: {
									my: "bottom center",
									at: "top center"
								}
							}).qtip('show');
					}
					if (typeof (json.error_last_name) != "undefined" && json.error_last_name != "") {
						$("#contact_form [name='last_name']").qtip(
							{
								style: {
									classes: 'ui-tooltip-error'
								},
								content: {
									text: json.error_last_name
								},
								position: {
									my: "bottom center",
									at: "top center"
								}
							}).qtip('show');
					}
					if (typeof (json.error_email) != "undefined" && json.error_email != "") {
						$("#contact_form [name='email']").qtip(
							{
								style: {
									classes: 'ui-tooltip-error'
								},
								content: {
									text: json.error_email
								},
								position: {
									my: "bottom center",
									at: "top center"
								}
							}).qtip('show');
					}
					if (typeof (json.error_message) != "undefined" && json.error_message != "") {
						$("#contact_form [name='message']").qtip(
							{
								style: {
									classes: 'ui-tooltip-error'
								},
								content: {
									text: json.error_message
								},
								position: {
									my: "bottom center",
									at: "top center"
								}
							}).qtip('show');
					}
				}
				$("#contact_form .block").unblock();
			}
		});
	});
	//translation
	/*
	$.datepicker.regional['fr'] = {
		renderer: $.ui.datepicker.defaultRenderer,
		monthNames: ['Janvier','Février','Mars','Avril','Mai','Juin',
		'Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
		monthNamesShort: ['Jan','Fév','Mar','Avr','Mai','Jun',
		'Jul','Aoû','Sep','Oct','Nov','Déc'],
		dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
		dayNamesShort: ['Dim','Lun','Mar','Mer','Jeu','Ven','Sam'],
		dayNamesMin: ['Di','Lu','Ma','Me','Je','Ve','Sa'],
		dateFormat: 'dd/mm/yyyy',
		firstDay: 1,
		prevText: '&#x3c;Préc', prevStatus: 'Voir le mois précédent',
		prevJumpText: '&#x3c;&#x3c;', prevJumpStatus: 'Voir l\'année précédent',
		nextText: 'Suiv&#x3e;', nextStatus: 'Voir le mois suivant',
		nextJumpText: '&#x3e;&#x3e;', nextJumpStatus: 'Voir l\'année suivant',
		currentText: 'Courant', currentStatus: 'Voir le mois courant',
		todayText: 'Aujourd\'hui', todayStatus: 'Voir aujourd\'hui',
		clearText: 'Effacer', clearStatus: 'Effacer la date sélectionnée',
		closeText: 'Fermer', closeStatus: 'Fermer sans modifier',
		yearStatus: 'Voir une autre année', monthStatus: 'Voir un autre mois',
		weekText: 'Sm', weekStatus: 'Semaine de l\'année',
		dayStatus: '\'Choisir\' le DD d MM',
		defaultStatus: 'Choisir la date',
		isRTL: false
	};
	$.datepicker.setDefaults($.datepicker.regional['fr']);*/
	$(".contact_form [name='date_of_birth']").datepicker({
		dateFormat: "dd-mm-yy"
	});
	$(".closing_in").each(function () {
		var self = $(this);
		var time = parseInt(self.children(".seconds").text());
		var id = setInterval(function () {
			time--;
			self.children(".seconds").text(time);
			if (time == 0) {
				self.parent().prev(".notification_box").fadeOut(500, function () {
					$(this).remove();
				});
				self.remove();
				clearInterval(id);
			}
		}, 1000);
	});

	function animateElements() {
		$('.animated_element').each(function () {
			var elementPos = $(this).offset().top;
			var topOfWindow = $(window).scrollTop();
			if (elementPos < topOfWindow + $(window).height() - 20) {
				var elementClasses = $(this).attr('class').split(' ');
				var animation = "fadeIn";
				var duration = 600;
				var delay = 0;
				for (var i = 0; i < elementClasses.length; i++) {
					if (elementClasses[i].indexOf('animation-') != -1)
						animation = elementClasses[i].replace('animation-', '');
					if (elementClasses[i].indexOf('duration-') != -1)
						duration = elementClasses[i].replace('duration-', '');
					if (elementClasses[i].indexOf('delay-') != -1)
						delay = elementClasses[i].replace('delay-', '');
				}
				$(this).addClass(animation);
				$(this).css({ "animation-duration": duration + "ms" });
				$(this).css({ "animation-delay": delay + "ms" });
				$(this).css({ "transition-delay": delay + "ms" });
			}
		});
		$('.box_header').each(function () {
			var elementPos = $(this).offset().top;
			var topOfWindow = $(window).scrollTop();
			if (elementPos < topOfWindow + $(window).height() - 30) {
				$(this).addClass("slide");
			}
		});
	}
	animateElements();
	$(window).scroll(animateElements);
});
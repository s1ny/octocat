 
$(document).ready(function() {
	// инициализируем галерею
	$(".fancybox").fancybox();

	// инициализируем слайдеры
    $('.slider ul').each(function() {
		$(this).jcarousel({
			vertical: false,
			wrap: 'circular',
			scroll: 1
		});
	});
    
});

/**
 * Обработка при загрузке страницы
 */
$(function() {
    
    // устанавливаем дату для счетчиков (этот код служит лишь для генерации времени без PHP
	var myDate = new Date ();
	var day = myDate.getDate(); 
	day = day + 13; 
	myDate.setDate(day);
	myDate.setHours(0);
	myDate.setMinutes(0);
	myDate.setSeconds(0);
	$(".counter").attr("time", Math.floor(myDate.valueOf() / 1000));

	// инициализируем счетчики
	$(".counter").kkcountdown({
		dayText : 'День',
		daysText : 'Дней',
		hoursText : 'Часов',
		minutesText : 'Минут',
		secondsText : 'Секунд',
		displayZeroDays : false,
		oneDayClass : 'one-day'
	});
	
	// Добавляем маску к вводу телефона
	$("input[name='phone']").each(function() {
		$(this).mask("+7 (999) 999-9999");
	});
	
	$("a.call").click(function() {
		$('#callForm').reveal({
			 animation: 'fade',
			 animationspeed: 100
		});
	});	
    
    $.fn.modal = function(options){
		options = $.extend({
			center: true,
			onStart: true,
			close: "#js-modal-close",
			context: ".order",
			delayHide: "400",
			delayShow: "600"
		}, options);
		var center = options.center;
		var close = options.close;
		var context = options.context;
		var delayHide = options.delayHide;
		var delayShow = options.delayShow;
		var onStart = options.onStart;
		var $modal = this;

		function init(){
			if (center) {
				$modal.show();
				var $mContext = $modal.find(context);
				var height = $mContext.outerHeight();
				$mContext.css({	
					"top": "50%",
					"bottom": "auto",
					"left": "0",
					"right": "0",
					"margin-top": -Math.floor(height/2),
					"margin-left": "auto",
					"margin-right": "auto",
					"margin-bottom": "0"
				});
			}
			$modal.hide();
		}		
		var modalHide = function(){
			$modal.fadeOut(delayHide);
			$modal.toggleClass('active');
            $("#backGround").fadeOut(500);
		};
		var modalShow = function(){
			$modal.fadeIn(delayShow);
			$modal.toggleClass('active');
            $("#backGround").fadeIn(500);
		}

		$(close).click(modalHide);
		
		$(document).keydown(function(event){
			event = event || window.event;
			if (event.which == 27) {
				if ($modal.hasClass("active")) {
					modalHide();
				}
			}
		});
		
		init();
		
		if (onStart) {
			modalShow();;
		}
	};

	$('form').submit(function(event){
		event = event || window.event;
		var data = $(this).serialize();
		var answer = $.post("mail.php", data).done(function(msg){
			$(".modal2 .message p").html(msg);
			$(".modal2").modal({
				close : '.modal2 .close',
				context : '.context'
			});
            $("#callForm").find('.close-reveal-modal').click();
		});	
		event.preventDefault();		
	});
    
    
});
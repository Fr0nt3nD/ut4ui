var ac = new AudioContext();
function beep () {
	if (soundOn) {
		var osc = ac.createOscillator();
		osc.frequency.value = 200;
		osc.connect(ac.destination);
	    osc.start(0);
	    osc.stop(ac.currentTime + 0.2);
	};
}

var soundOn = true;

$(document).ready(function() {
	// $('.menu-top a').mouseenter(beep);


	var menu = $('.menu-top');
		bang = $(".helpers audio")[0];

	
	$('.help', $('a.item-toplevel', menu).siblings('.submenu')).html($('a.item-toplevel', menu).attr('data-help'));
	$('a.item-toplevel', menu).mouseenter(function() {
		beep();

		$('.help', $(this).siblings('.submenu')).html($(this).attr('data-help'));
	});
	$('a.option', menu).mouseenter(function() {
		beep();
		var item = $(this),
			hint = item.attr('data-help');
		$('.help', item.closest('.submenu')).html(hint);
	});
	$(document).on('modalShow',function() {
		if (soundOn) {
			bang.pause();
			bang.play();
		};
	})
	$('#soundtoggle').on('click',function() {
		$(this).toggleClass('off');
		soundOn = (soundOn) ? false : true;
	});

	initPlugins();
	initNotifications();



	// $('#fullscreen').on('click',function () {
	// 	$(document).fullScreen(true);
	// })


	$( ".weapon-priority" ).sortable();
	

})

function initNotifications () {
	var cont = $('#section_notification'),
		btns = $('.effeckt-button', cont),
		timeoutShow, timeoutHide;

	initButtons();



	timeoutShow = setTimeout(function() {
		cont.addClass('show');
		timeoutHide = setTimeout(function() {
			cont.removeClass('show');
		}, 5000);
	}, 10000);

	function initButtons() {
		btns.each(function() {
			var btn = $(this);
			btn.on('click',function() {
				clearTimeout(timeoutHide);
				cont.removeClass('show');
			});
		})
	}

}


function initPlugins () {
	var els = $('[data-plugin]');

	els.each(function() {
		var el = $(this),
			plugins = el.attr('data-plugin').split(' ');

			for (i in plugins) {

				switch(plugins[i]) {

					case 'jslider':
						initSlider(el);
						break;

					case 'select2':
						break;

				}

			}

	});
}

function initSlider (element) {
	var elemtId = element.attr('id');
	var sliderContainer = $('<div id="slider_' + elemtId + '" />').insertBefore(element);
	sliderContainer.slider({ value: getRandomNumber(0,100) });
}

function getRandomNumber(min, max) {
	return Math.random() * (max - min) + min;
}

var viewFullScreen = document.getElementById("fullscreen");
if (viewFullScreen) {
    viewFullScreen.addEventListener("click", function () {
        var docElm = document.documentElement;
        if (docElm.requestFullscreen) {
            docElm.requestFullscreen();
        }
        else if (docElm.msRequestFullscreen) {
            docElm.msRequestFullscreen();
        }
        else if (docElm.mozRequestFullScreen) {
            docElm.mozRequestFullScreen();
        }
        else if (docElm.webkitRequestFullScreen) {
            docElm.webkitRequestFullScreen();
        }
    }, false);
}
$(document).ready(function() {
		var isMobile = {Android: function() {return navigator.userAgent.match(/Android/i);},BlackBerry: function() {return navigator.userAgent.match(/BlackBerry/i);},iOS: function() {return navigator.userAgent.match(/iPhone|iPad|iPod/i);},Opera: function() {return navigator.userAgent.match(/Opera Mini/i);},Windows: function() {return navigator.userAgent.match(/IEMobile/i);},any: function() {return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());}};
	if(isMobile.any()){
	}
		var act="click";
	if(isMobile.iOS()){
		var act="touchstart";
	}
	//ZOOM
	if($('.zoom').length>0){
		$('.zoom').fancybox({
			helpers:{
				overlay:{locked: false},
				title:{type: 'inside'}
			}
		});
	}
	$('.pl').click(function(event) {
			$('.popup').removeClass('active').hide();
			//$('body').addClass('lock');
			$('.popup-'+$(this).data('p')).fadeIn(300).delay(300).addClass('active');
			if($('.popup').find('.slick-slider').length>0){
				if($(this).data('id')!=null){
					$('.popup').find('.slick-slider').slick('goTo',$(this).data('id'));
				}
				$('.popup').find('.slick-slider').slick('setPosition').addClass('active');
			}
			return false;
	});
	function popupclose(){
		$('.popup').removeClass('active').fadeOut(300);
		$('body').removeClass('lock');
	}
	$('.popup').click(function(e) {
		if (!$(e.target).is(".popup>.popup-table>.cell *") || $(e.target).is(".popup-close") || $(e.target).is(".popup__close")) {
			popupclose();
			return false;
		}
	});
	function ibg(){
		$.each($('.ibg'), function(index, val) {
			if($(this).find('img').length>0){
				$(this).css('background-image','url("'+$(this).find('img').attr('src')+'")');
			}
		});
	}
		ibg();

	if($('.topblock').length>0){
		$('.topblock').next('.breadcrumbs').addClass('noborder');
	}
		
	//Клик вне области
	$(document).on('click touchstart',function(e) {
		if (!$(e.target).is(".select *")) {
			$('.select').removeClass('active');
		};
	});


	if(!isMobile.any()){
		$('.header-menu-list>li').hover(function() {
			$(this).addClass('hover');
		}, function() {
			$(this).removeClass('hover');
		});
		$('.header-menu-list>li').click(function() {
			$(this).addClass('hover');
		}, function() {
			$(this).removeClass('hover');
		});
	}else{
		$('.header-menu-list-mob>li').click(function() {
			$(this).toggleClass('hover');
			$(this).find('.header-submenu-mob').slideToggle(300);
		});
	}

	$('.header-menu-search-form__input').focus(function(event) {
		$('.header-menu-mob').animate({scrollTop: $('.header-menu-search').offset().top,},100, function() {});
	});

	$('.header-menu__icon').click(function(event) {
		$(this).toggleClass('active');
		$('.header-menu-mob').toggleClass('active');
		$('body').toggleClass('lock');
	});
	//Adaptive functions
	function adaptive_index() {
			var w=$(window).outerWidth();
		if(w<767){
			if($('.companymodule-leftside .companymodule-content-body').length==0){
				$('.companymodule-content-body').insertAfter('.companymodule__logo');
			}
		}else{
			if($('.companymodule-leftside .companymodule-content-body').length>0){
				$('.companymodule-content-body').insertAfter('.companymodule-content__label');
			}
		}
	}
	//SLIDERS
	if($('.about-slider').length>0){
		$('.about-slider-item').slick({
			dots: false,
			arrows: true,
			accessibility:false,
			slidesToShow:1,
			autoplaySpeed: 3000,
			appendArrows:$('.about-slider-arrows .containerbig'),
			nextArrow:'<button type="button" class="slick-next"></button>',
			prevArrow:'<button type="button" class="slick-prev"></button>',
			responsive: [{
				breakpoint: 992,
				settings: {
					adaptiveHeight:true
				}
			}]
		});
	}
});
const animItems = document.querySelectorAll('._anim-items');

if (animItems.length > 0) {
	window.addEventListener('scroll', animOnScroll);
	function animOnScroll() {
		for (let index = 0; index < animItems.length; index++) {
			const animItem = animItems[index];
			const animItemHeight = animItem.offsetHeight;
			const animItemOffset = offset(animItem).top;
			const animStart = 4;

			let animItemPoint = window.innerHeight - animItemHeight / animStart;
			if (animItemHeight > window.innerHeight) {
				animItemPoint = window.innerHeight - window.innerHeight / animStart;
			}

			if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
				animItem.classList.add('_active');
			} else {
				if (!animItem.classList.contains('_anim-no-hide')) {
					animItem.classList.remove('_active');
				}
			}
		}
	}
	function offset(el) {
		const rect = el.getBoundingClientRect(),
			scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
			scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
	}

	setTimeout(() => {
		animOnScroll();
	}, 300);
}



(function() {

    const smoothScroll = function (targetEl, duration) {
        const headerElHeight =  document.querySelector('.header-body').clientHeight;
        let target = document.querySelector(targetEl);
        let targetPosition = target.getBoundingClientRect().top - headerElHeight;
        let startPosition = window.pageYOffset;
        let startTime = null;
    
        const ease = function(t,b,c,d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        };
    
        const animation = function(currentTime){
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, targetPosition, duration);
            window.scrollTo(0,run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };
        requestAnimationFrame(animation);

    };

    const scrollTo = function () {
        const links = document.querySelectorAll('.js-scroll');
        links.forEach(each => {
            each.addEventListener('click', function () {
                const currentTarget = this.getAttribute('href');
                smoothScroll(currentTarget, 1000);
            });
        });
    };
    scrollTo();
}());


$('.header-actions__lupe').click(function(event) {
	$(this).addClass('active');
	$('.header-search').addClass('active');
});


$(document).ready(function() {


    // Slider Event

    $('.gallery-sliderFor').slick({
        prevArrow: '<button type="button" class="slick-prev"><svg viewBox="0 0 14 26" svg"><path d="M11.9557 12.6474L12.3096 13.0013L11.9554 13.3549L0.864263 24.4243C0.712239 24.5763 0.712239 24.8241 0.864263 24.9761L0.511629 25.3287L0.864264 24.9761C1.01429 25.1261 1.25369 25.1266 1.40553 24.9653L1.41072 24.9598L1.41607 24.9544L13.1153 13.2552C13.189 13.1814 13.2293 13.0727 13.2293 12.9793C13.2293 12.8707 13.1934 12.7815 13.1153 12.7034L1.41607 1.00416C1.26405 0.852131 1.01629 0.852131 0.864263 1.00416C0.712238 1.15618 0.712238 1.40394 0.864263 1.55596L11.9557 12.6474Z"/></svg></button>',
        nextArrow: '<button type="button" class="slick-next"><svg viewBox="0 0 14 26" svg"><path d="M11.9557 12.6474L12.3096 13.0013L11.9554 13.3549L0.864263 24.4243C0.712239 24.5763 0.712239 24.8241 0.864263 24.9761L0.511629 25.3287L0.864264 24.9761C1.01429 25.1261 1.25369 25.1266 1.40553 24.9653L1.41072 24.9598L1.41607 24.9544L13.1153 13.2552C13.189 13.1814 13.2293 13.0727 13.2293 12.9793C13.2293 12.8707 13.1934 12.7815 13.1153 12.7034L1.41607 1.00416C1.26405 0.852131 1.01629 0.852131 0.864263 1.00416C0.712238 1.15618 0.712238 1.40394 0.864263 1.55596L11.9557 12.6474Z"/></svg></button>',
        dots: true,
        arrows: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 500,
        asNavFor: '.gallery-sliderNav',
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    dots: false
                }
            }
        ]
    });
    $('.gallery-sliderNav').slick({
        prevArrow: '<button type="button" class="slick-prev"><svg viewBox="0 0 14 26" svg"><path d="M11.9557 12.6474L12.3096 13.0013L11.9554 13.3549L0.864263 24.4243C0.712239 24.5763 0.712239 24.8241 0.864263 24.9761L0.511629 25.3287L0.864264 24.9761C1.01429 25.1261 1.25369 25.1266 1.40553 24.9653L1.41072 24.9598L1.41607 24.9544L13.1153 13.2552C13.189 13.1814 13.2293 13.0727 13.2293 12.9793C13.2293 12.8707 13.1934 12.7815 13.1153 12.7034L1.41607 1.00416C1.26405 0.852131 1.01629 0.852131 0.864263 1.00416C0.712238 1.15618 0.712238 1.40394 0.864263 1.55596L11.9557 12.6474Z"/></svg></button>',
        nextArrow: '<button type="button" class="slick-next"><svg viewBox="0 0 14 26" svg"><path d="M11.9557 12.6474L12.3096 13.0013L11.9554 13.3549L0.864263 24.4243C0.712239 24.5763 0.712239 24.8241 0.864263 24.9761L0.511629 25.3287L0.864264 24.9761C1.01429 25.1261 1.25369 25.1266 1.40553 24.9653L1.41072 24.9598L1.41607 24.9544L13.1153 13.2552C13.189 13.1814 13.2293 13.0727 13.2293 12.9793C13.2293 12.8707 13.1934 12.7815 13.1153 12.7034L1.41607 1.00416C1.26405 0.852131 1.01629 0.852131 0.864263 1.00416C0.712238 1.15618 0.712238 1.40394 0.864263 1.55596L11.9557 12.6474Z"/></svg></button>',
        dots: true,
        arrows: true,
        infinite: true,
        centerMode: true,
        variableWidth: true,
        adaptiveHeight: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        touchThreshold: 200,
        speed: 500,
        lazyLoad: 'ondemand',
        asNavFor: '.gallery-sliderFor',
        responsive: [
            {
                breakpoint: 575,
                settings: {
                    dots: false,
                    variableWidth: false,
                    adaptiveHeight: false,
                    slidesToShow: 1,
                    touchThreshold: 5,
                }
            }
        ]
    });
    $('.reviews-slider').slick({
        prevArrow: '<button type="button" class="slick-prev"><svg viewBox="0 0 14 26" svg"><path d="M11.9557 12.6474L12.3096 13.0013L11.9554 13.3549L0.864263 24.4243C0.712239 24.5763 0.712239 24.8241 0.864263 24.9761L0.511629 25.3287L0.864264 24.9761C1.01429 25.1261 1.25369 25.1266 1.40553 24.9653L1.41072 24.9598L1.41607 24.9544L13.1153 13.2552C13.189 13.1814 13.2293 13.0727 13.2293 12.9793C13.2293 12.8707 13.1934 12.7815 13.1153 12.7034L1.41607 1.00416C1.26405 0.852131 1.01629 0.852131 0.864263 1.00416C0.712238 1.15618 0.712238 1.40394 0.864263 1.55596L11.9557 12.6474Z"/></svg></button>',
        nextArrow: '<button type="button" class="slick-next"><svg viewBox="0 0 14 26" svg"><path d="M11.9557 12.6474L12.3096 13.0013L11.9554 13.3549L0.864263 24.4243C0.712239 24.5763 0.712239 24.8241 0.864263 24.9761L0.511629 25.3287L0.864264 24.9761C1.01429 25.1261 1.25369 25.1266 1.40553 24.9653L1.41072 24.9598L1.41607 24.9544L13.1153 13.2552C13.189 13.1814 13.2293 13.0727 13.2293 12.9793C13.2293 12.8707 13.1934 12.7815 13.1153 12.7034L1.41607 1.00416C1.26405 0.852131 1.01629 0.852131 0.864263 1.00416C0.712238 1.15618 0.712238 1.40394 0.864263 1.55596L11.9557 12.6474Z"/></svg></button>',
        dots: true,
        arrows: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 500,
        responsive: [
            {
                breakpoint: 575,
                settings: {
                    dots: false
                }
            }
        ]
    });
    $('.popup-sliderFor').slick({
        prevArrow: '<button type="button" class="slick-prev"><svg viewBox="0 0 14 26" svg"><path d="M11.9557 12.6474L12.3096 13.0013L11.9554 13.3549L0.864263 24.4243C0.712239 24.5763 0.712239 24.8241 0.864263 24.9761L0.511629 25.3287L0.864264 24.9761C1.01429 25.1261 1.25369 25.1266 1.40553 24.9653L1.41072 24.9598L1.41607 24.9544L13.1153 13.2552C13.189 13.1814 13.2293 13.0727 13.2293 12.9793C13.2293 12.8707 13.1934 12.7815 13.1153 12.7034L1.41607 1.00416C1.26405 0.852131 1.01629 0.852131 0.864263 1.00416C0.712238 1.15618 0.712238 1.40394 0.864263 1.55596L11.9557 12.6474Z"/></svg></button>',
        nextArrow: '<button type="button" class="slick-next"><svg viewBox="0 0 14 26" svg"><path d="M11.9557 12.6474L12.3096 13.0013L11.9554 13.3549L0.864263 24.4243C0.712239 24.5763 0.712239 24.8241 0.864263 24.9761L0.511629 25.3287L0.864264 24.9761C1.01429 25.1261 1.25369 25.1266 1.40553 24.9653L1.41072 24.9598L1.41607 24.9544L13.1153 13.2552C13.189 13.1814 13.2293 13.0727 13.2293 12.9793C13.2293 12.8707 13.1934 12.7815 13.1153 12.7034L1.41607 1.00416C1.26405 0.852131 1.01629 0.852131 0.864263 1.00416C0.712238 1.15618 0.712238 1.40394 0.864263 1.55596L11.9557 12.6474Z"/></svg></button>',
        dots: false,
        arrows: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 500,
        asNavFor: '.popup-sliderNav',
        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    arrows: true
                }
            }
        ]
    });
    $('.popup-sliderNav').slick({
        prevArrow: '<button type="button" class="slick-prev"><svg viewBox="0 0 14 26" svg"><path d="M11.9557 12.6474L12.3096 13.0013L11.9554 13.3549L0.864263 24.4243C0.712239 24.5763 0.712239 24.8241 0.864263 24.9761L0.511629 25.3287L0.864264 24.9761C1.01429 25.1261 1.25369 25.1266 1.40553 24.9653L1.41072 24.9598L1.41607 24.9544L13.1153 13.2552C13.189 13.1814 13.2293 13.0727 13.2293 12.9793C13.2293 12.8707 13.1934 12.7815 13.1153 12.7034L1.41607 1.00416C1.26405 0.852131 1.01629 0.852131 0.864263 1.00416C0.712238 1.15618 0.712238 1.40394 0.864263 1.55596L11.9557 12.6474Z"/></svg></button>',
        nextArrow: '<button type="button" class="slick-next"><svg viewBox="0 0 14 26" svg"><path d="M11.9557 12.6474L12.3096 13.0013L11.9554 13.3549L0.864263 24.4243C0.712239 24.5763 0.712239 24.8241 0.864263 24.9761L0.511629 25.3287L0.864264 24.9761C1.01429 25.1261 1.25369 25.1266 1.40553 24.9653L1.41072 24.9598L1.41607 24.9544L13.1153 13.2552C13.189 13.1814 13.2293 13.0727 13.2293 12.9793C13.2293 12.8707 13.1934 12.7815 13.1153 12.7034L1.41607 1.00416C1.26405 0.852131 1.01629 0.852131 0.864263 1.00416C0.712238 1.15618 0.712238 1.40394 0.864263 1.55596L11.9557 12.6474Z"/></svg></button>',
        dots: false,
        arrows: true,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        focusOnSelect: true,
        speed: 500,
        lazyLoad: 'ondemand',
        asNavFor: '.popup-sliderFor'
	});
});


$('.js-thumb').click(function() {
	var clicked = $(this);
	var newSelection = clicked.data('big');
	$('.js-photo').html("<img src='" + newSelection + "'></a>").hide().fadeIn('slow');
	clicked.parent().find('.js-thumb').removeClass('active');
	clicked.addClass('active');
});

$(document).ready(function () {
	$('.product-tabs-triggers-item').click(function (e) {
	  e.preventDefault();
	  $('.product-tabs-triggers-item').removeClass('active');
	  $('.product-tabs-item').removeClass('active');
  
	  $(this).addClass('active');
	  $($(this).attr('href')).addClass('active');
	});
  
	$('.product-tabs-triggers-item:first').click();
  });
  $('.box-slider').slick({
	prevArrow: '<button type="button" class="slick-prev"><svg viewBox="0 0 451.846 451.847"><path d="M345.441,248.292L151.154,442.573c-12.359,12.365-32.397,12.365-44.75,0c-12.354-12.354-12.354-32.391,0-44.744L278.318,225.92L106.409,54.017c-12.354-12.359-12.354-32.394,0-44.748c12.354-12.359,32.391-12.359,44.75,0l194.287,194.284c6.177,6.18,9.262,14.271,9.262,22.366C354.708,234.018,351.617,242.115,345.441,248.292z"/></svg></button>',
	nextArrow: '<button type="button" class="slick-next"><svg viewBox="0 0 451.846 451.847"><path d="M345.441,248.292L151.154,442.573c-12.359,12.365-32.397,12.365-44.75,0c-12.354-12.354-12.354-32.391,0-44.744L278.318,225.92L106.409,54.017c-12.354-12.359-12.354-32.394,0-44.748c12.354-12.359,32.391-12.359,44.75,0l194.287,194.284c6.177,6.18,9.262,14.271,9.262,22.366C354.708,234.018,351.617,242.115,345.441,248.292z"/></svg></button>',
	dots: false,
	arrows: true,
	infinite: true,
	slidesToShow: 4,
	slidesToScroll: 1,
	speed: 500,
	lazyLoad: 'ondemand',
	responsive: [
		{
			breakpoint: 1199,
			settings: {
				dots: true,
				arrows: false,
				slidesToShow: 3
			}
		},
		{
			breakpoint: 991,
			settings: {
				dots: true,
				arrows: false,
				slidesToShow: 2
			}
		},
		{
			breakpoint: 768,
			settings: {
				dots: true,
				arrows: false,
				slidesToShow: 1
			}
		}
	]
});

$(window).scroll(function() {
	var height = $(window).scrollTop();
	
		 /*Если сделали скролл на 100px задаём новый класс для header*/
	if(height > 0){
	$('header').addClass('fixed');
	} else {
		 /*Если меньше 100px удаляем класс для header*/
	$('header').removeClass('fixed');
	}
	
	});
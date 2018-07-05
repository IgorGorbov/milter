$(function() {
    let $mwnu = $('#my-menu');
    $mwnu.mmenu({
    extensions: ['theme-black', 'effect-menu-slide', 'pagedim-black'],
    navbar: {
        title: '<img src="img/logo-1.svg" alt="Салон красоты">'
    },
    offCanvas: {
        position: 'right'
    }
});
    let api = $mwnu.data('mmenu');
    api.bind('opened', function () {
        $('.hamburger').addClass('is-active');
    }).bind('close', function () {
        $('.hamburger').removeClass('is-active');
    });

    $('.carousel-services').on('initialized.own.carousel', function () {
        setTimeout(function () {
            carouselService();
        }, 100)
    });
    $('.carousel-services').owlCarousel({
        loop: true,
        nav: true,
        smartSpeed: 700,
        dots: false,
        navText: ['<i class="fa fa-angle-double-left"></i>','<i class="fa fa-angle-double-right"></i>'],
        responsiveClass: true,
        responsive: {
            0: {
                items: 1
            },
            800: {
                items: 2
            },
            1100: {
                items: 3
            }
        }
    });

    function carouselService () {
        $('.carousel-services-item').each(function () {
            let thisVal = $(this),
                thisContentHeight = thisVal.find('.carousel-services-content').outerHeight();
            thisVal.find('.carousel-services-image').css('min-height', thisContentHeight);
        });
    }
    carouselService();

    $('.carousel-service-composition .h3').each(function () {
        let thisVal = $(this);
        thisVal.html(thisVal.html().replace(/(\S+)\s*$/, '<span>$1</span>'));
    });

    $('section .h2').each(function () {
        let thisVal = $(this);
        thisVal.html(thisVal.html().replace(/^(\S+)/, '<span>$1</span>'));
    });

    function onResize (selector) {
        let max_col_height = 0; // максимальная высота, первоначально 0
        $(selector).each(function(){ // цикл "для каждой из колонок"
            if ($(this).height() > max_col_height) { // если высота колонки больше значения максимальной высоты,
                max_col_height = $(this).height(); // то она сама становится новой максимальной высотой
            }
        });
        $(selector).height(max_col_height); // устанавливаем высоту каждой колонки равной значению максимальной высоты
    }
    onResize('.carousel-services-content');
    onResize('.carousel-services-image');

    window.onresize = function () {
        onResize('.carousel-services-content');
        onResize('.carousel-services-image');
    };

    $('select').selectize({
        create: true,
    });

    $('.reviews').owlCarousel({
        loop: true,
        items: 1,
        smartSpeed: 700,
        nav: false,
        dots: true,
        responsiveClass: true,
        autoHeight: true
    });

    $('form.callback').submit(function () {
        var th = $(this);
        $.ajax({
            type: "POST",
            url: "/mail.php",
            data: th.serialize()
        }).done(function () {
            $(th).find('.success').addClass('active').css('display', 'flex').hide().fadeIn();
            setTimeout(function () {
                $(th).find('.success').removeClass('active').fadeOut();
                th.trigger("reset");
            }, 3000);
            return false
        });
    });


    $('.partners').owlCarousel({
        loop: true,
        smartSpeed: 700,
        dots: false,
        nav: true,
        navText: ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
        responsiveClass: true,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            },
            1200: {
                items: 4
            }
        }
    });


    $(window).scroll(function () {
        if ($(this).scrollTop() > $(this).height()) {
            $('.top').addClass('active');
        } else {
            $('.top').removeClass('active');
        }
    })

    $('.top').click(function () {
        $('html, body').stop().animate({scrollTop: 0}, 'slow', 'swing');
    });

    $(window).on('load', function () {
        $('.preloader').delay(1000).fadeOut('slow');
    })
});

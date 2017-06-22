"use strict";


jQuery(document).ready(function ($) {
    $(window).load(function () {
        $(".loaded").fadeOut();
        $(".preloader").delay(1000).fadeOut("slow");
    });

    //    /*---------------------------------------------*
    //     * Mobile menu
    //     ---------------------------------------------*/
    $('#navbar-collapse').find('a[href*=#]:not([href=#])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: (target.offset().top - 40)
                }, 1000);
                if ($('.navbar-toggle').css('display') != 'none') {
                    $(this).parents('.container').find(".navbar-toggle").trigger("click");
                }
                return false;
            }
        }
    });



    //    /*---------------------------------------------*
    //     * STICKY scroll
    //     ---------------------------------------------*/

    $.localScroll();



    /*---------------------------------------------*
     * Counter 
     ---------------------------------------------*/

    //    $('.statistic-counter').counterUp({
    //        delay: 10,
    //        time: 2000
    //    });





    /*---------------------------------------------*
     * WOW
     ---------------------------------------------*/

    var wow = new WOW({
        mobile: false // trigger animations on mobile devices (default is true)
    });
    wow.init();


    //    /* ---------------------------------------------------------------------
    //     Carousel
    //     ---------------------------------------------------------------------= */

    //	$('.slider').owlCarousel({
    //        responsiveClass: true,
    //        autoplay: false,
    //        items: 1,
    //        loop: true,
    //        dots: true,
    //	    nav:false,
    //	    navText: [
    //                    "<i class='lnr lnr-chevron-left'></i>",
    //                   "<i class='lnr lnr-chevron-right'></i>"
    //               ],
    //      autoplayHoverPause: true
    //
    //    });




    //	$('.chart').easyPieChart({
    //		animate: 2000,
    //            scaleColor: false,
    //            lineWidth: 10,
    //            lineCap: 'square',
    //            size: 130,
    //            trackColor: false,
    //            barColor: '#498af3',
    //            onStep: function (from, to, percent) {
    //                $(this.el).find('.percent').text(Math.round(percent));
    //            }
    //	});


    // main-menu-scroll

    jQuery(window).scroll(function () {
        var top = jQuery(document).scrollTop();
        var height = 300;
        //alert(batas);

        if (top > height) {
            jQuery('.navbar-fixed-top').addClass('menu-scroll');
        } else {
            jQuery('.navbar-fixed-top').removeClass('menu-scroll');
        }
    });

    // scroll Up

    $(window).scroll(function () {
        if ($(this).scrollTop() > 600) {
            $('.scrollup').fadeIn('slow');
        } else {
            $('.scrollup').fadeOut('slow');
        }
    });

    $('.scrollup').click(function () {
        $("html, body").animate({ scrollTop: 0 }, 1000);
        return false;
    });

    $(document).on('click', '#sendInquiry', function () {
        var inquiryImageId = $(this).parent().parent().find('img').attr('id');
        var inquiryImageLocation = $(this).parent().parent().find('img').attr('src');

        console.log(inquiryImageId + inquiryImageLocation);

        $('#inquiryImage').attr('src', inquiryImageLocation);
        //$('#inquiryImage').attr
    });

    $('.process-row button').click(function(){
          $('.panel-collapse').collapse('hide');
    });


    //End

});




function initMap() {
    if ($('#map').length == 1) {
        var uluru = { lat: 19.406913, lng: 72.863431 };
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 18,
            center: uluru
        });
        var marker = new google.maps.Marker({
            position: uluru,
            map: map
        });
    }
}


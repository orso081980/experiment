"use strict"
$(function() {
    $('.slider').slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        centerMode: true,
        variableWidth: true,
        nextArrow: '<button class="slick-n"></button>',
        prevArrow: '<button class="slick-p"></button>',
        appendArrows: ('.slider')
    });
    const menuslide = $('.mobile-view');
    const menutoggle = $('#menuToggle');
    menutoggle.click(function() {
        $(this).toggleClass('change');
        $('.navigation').toggleClass('menueffect');
        menuslide.toggleClass('menueffect');
    });
});
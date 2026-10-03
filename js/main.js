$(document).ready(function () {
    $('.loader-screen').fadeOut(800, function () {
        $('body').css('overflow', 'auto');
    });

    $('.accordion-button').on('click', function () {
        const item = $(this).closest('.accordion-item');
        const isOpen = item.hasClass('active');

        $('.accordion-item').removeClass('active');
        $('.accordion-content').css('max-height', '0px');

        if (!isOpen) {
            item.addClass('active');
            const content = item.find('.accordion-content')[0];
            content.style.maxHeight = content.scrollHeight + 'px';
        }
    });
});

new WOW().init();

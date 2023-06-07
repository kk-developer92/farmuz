(function ($) {
    "use strict";

    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 40) {
            $('.navbar').addClass('sticky-top');
        } else {
            $('.navbar').removeClass('sticky-top');
        }
    });

    // 



    // Dropdown on mouse hover
    // $(document).ready(function () {
    //     function toggleNavbarMethod() {
    //         if ($(window).width() > 992) {
    //             $('.navbar .dropdown').on('mouseover', function () {
    //                 $('.dropdown-toggle', this).trigger('click');
    //             }).on('mouseout', function () {
    //                 $('.dropdown-toggle', this).trigger('click').blur();
    //             });
    //         } else {
    //             $('.navbar .dropdown').off('mouseover').off('mouseout');
    //         }
    //     }
    //     toggleNavbarMethod();
    //     $(window).resize(toggleNavbarMethod);
    // });

    const lngs = {
        en: { nativeName: 'English', iconClass: 'fi fi-gb' },
        uz: { nativeName: 'Uzbek', iconClass: 'fi fi-uz' },
        ru: { nativeName: 'Russian', iconClass: 'fi fi-ru' }
    };
    
    const rerender = () => {
        $('body').localize();
    }
    
    $(function () {
        i18next
            .use(i18nextHttpBackend)
            .use(i18nextBrowserLanguageDetector)
            .init({
                debug: true,
                fallbackLng: 'en',
                backend: {
                    loadPath: './locales/{{lng}}/{{ns}}.json'
                }
            }, (err, t) => {
                if (err) return console.error(err);
    
                jqueryI18next.init(i18next, $, { useOptionsAttr: true });
    
                const languageSwitcher = document.getElementById('languageSwitcher');
                const languageDropdown = document.getElementById('languageDropdown');
    
                function updateLanguage(language) {
                    languageDropdown.querySelectorAll('.dropdown-item').forEach((item) => {
                        item.classList.remove('selected');
                        if (item.getAttribute('data-lang') === language) {
                            item.classList.add('selected');
                        }
                    });
    
                    const icon = languageSwitcher.querySelector('.fi');
                    const langData = lngs[language];
                    if (icon && langData) {
                        icon.className = langData.iconClass;
                    }
    
                    $('html').attr('lang', language);
                    $('body').localize();
                }
    
                Object.keys(lngs).map((lng) => {
                    const langData = lngs[lng];
                    const link = document.createElement('a');
                    link.className = 'dropdown-item';
                    link.href = '#';
                    link.setAttribute('data-lang', lng);
                    link.innerHTML = `<i class="${langData.iconClass} me-2"></i>${langData.nativeName}`;
    
                    if (lng === i18next.resolvedLanguage) {
                        link.classList.add('selected');
                        const icon = languageSwitcher.querySelector('.fi');
                        if (icon) {
                            icon.className = langData.iconClass;
                        }
                    }
    
                    languageDropdown.appendChild(link);
                });
    
                $(languageDropdown).on('click', '.dropdown-item', function (e) {
                    e.preventDefault();
                    const chosenLng = $(this).attr('data-lang');
                    i18next.changeLanguage(chosenLng, () => {
                        rerender();
                        updateLanguage(chosenLng);
                    });
                });
    
                rerender();
            });
    });
    
    

    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Product carousel
    $(".product-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 45,
        dots: false,
        loop: true,
        nav: true,
        navText: [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
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


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        items: 1,
        dots: false,
        loop: true,
        nav: true,
        navText: [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
    });

})(jQuery);


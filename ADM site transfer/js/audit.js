//-----------------------------------------------------------------------
//             Виджет bitrix24
//-----------------------------------------------------------------------

$(document).ready(function () {
    function toggleWidjet() {
        if (!$('.bx-livechat-wrapper').hasClass('bx-livechat-show') && !$('.b24-widget-button-social').hasClass('b24_hover')) {
            $('.b24-widget-button-social').toggleClass('b24_adm');
        }
    }
    function toggleChat() {
        if ($('.bx-livechat-wrapper').hasClass('bx-livechat-show')) {
            $('.b24-widget-button-social-item.b24-widget-button-openline_livechat').addClass('b24-adm-unbind');
        }
        $('.bx-livechat-control-box').click(function () {
            $('.b24-widget-button-social-item.b24-widget-button-openline_livechat').removeClass('b24-adm-unbind');
        });
    }
    /*setInterval(function() {
		 toggleWidjet()
	}, 30000); */
    setTimeout(function () {
        toggleWidjet(); // первый запуск спустя 3 секунды
    }, 3000);
    $(".b24-widget-button-social").mouseover(function () {
        $(this).addClass('b24_hover');
    });
    $(".b24-widget-button-social").mouseout(function () {
        $(this).removeClass('b24_hover');
    });
    $(document).mouseup(function (e) {
        const div = $(".bx-livechat-wrapper");
        if (!div.is(e.target) && div.has(e.target).length === 0 && $('.bx-livechat-wrapper').hasClass('bx-livechat-show')) {
            $('.b24-widget-button-inner-mask').trigger('click');
            $('.b24-widget-button-social-item.b24-widget-button-openline_livechat').removeClass('b24-adm-unbind');
        }
    })
    $('.b24-widget-button-social-item.b24-widget-button-openline_livechat').click(function () {
        toggleChat();
    });
    /*let qs = '.b24-widget-button-inner-item';
	$( qs ).hover(function (){
		$( '.b24-widget-button-pulse-animate' ).removeClass( 'b24-widget-button-pulse-animate_1anim' );
		$( '.b24-widget-button-pulse-animate' ).addClass( 'b24-widget-button-pulse-animate_noAnim' );
		setTimeout( function (){$( '.b24-widget-button-pulse-animate' ).addClass( 'b24-widget-button-pulse-animate_1anim' );}, 200);
		setTimeout( function (){$( '.b24-widget-button-pulse-animate' ).removeClass( 'b24-widget-button-pulse-animate_noAnim' );}, 200);
	}); */
});

$(document).ready(function () {
    'use strict';

    // start main menu
    const hamburger = document.querySelector('.hamburger'),
        menu = document.querySelector('.menu'),
        scrollcontent = document.querySelector('.scrollcontent'),
        menuArrowBack = document.querySelector('.menu-top_arrow'),
        menuItem = document.querySelectorAll('.menu-item'),
        menuLink = document.querySelectorAll('.menu-link'),
        body = document.querySelector('body'),
        headerLogo = document.querySelector('.header-logo');

    // show main menu
    function showMenu() {

        menu.classList.add('menu-active');
        scrollcontent.classList.add('scrollcontent_active');

        $('.hamburger').css('opacity', '0');
    }

    // hide main menu
    function hideMenu() {
        menu.classList.remove('menu-active');
        scrollcontent.classList.remove('scrollcontent_active');

        $('.hamburger').css('opacity', '1');
    }

    // Event when you click on a hamburger and then the menu appears
    hamburger.addEventListener('click', function (e) {
        e.stopPropagation();

        const menu_is_active = $(menu).hasClass('menu-active');
        if (menu_is_active)
            hideMenu();
        else
            showMenu();
    });

    // Event when you click outside menu - menu hide
    document.addEventListener('click', function (e) {
        const target = e.target;
        const its_menu = target == menu || menu.contains(target);

        // e.stopPropagation();
        const its_hamburger = target == hamburger;
        const menu_is_active = menu.classList.contains('menu-active');


        if (!its_menu && !its_hamburger && menu_is_active) {
            hideMenu();
        }
    });


    // Event when you click on the arrow main menu and then the menu is hidden
    menuArrowBack.addEventListener('click', function (e) {
        e.stopPropagation();
        hideMenu();
    });

    //-----------------------------------------------------------------------
    //             Плавная прокрутка
    //-----------------------------------------------------------------------

    function offsetFromTo(fromElemSelector, toElemSelector) {
        let fromElem = document.querySelector(fromElemSelector);
        const toElem = document.querySelector(toElemSelector);
        if (!fromElem || !toElem) return false;
        let offset = 0;
        while (fromElem && !fromElem.isEqualNode(toElem)) {
            offset += fromElem.offsetTop;
            fromElem = fromElem.offsetParent;
        }
        return offset;
    }

    // плавный скролл до элемента с указанным селектором.
    // скролится внутри элемента с селектором _selectorWrap. Если не указан, по умолчанию страница
    // скролится до элемента с селектором _selectorTarget
    // время скрола в миллисекундах.
    function scrollToElem(_selectorTarget, _time, _selectorWrap) {
        if (!_selectorTarget) return;
        if (!_selectorWrap)
            var _selectorWrap = "html, body";
        const wrap = $(_selectorWrap);
        // console.log(offsetFromTo(_selectorTarget, _selectorWrap));
        wrap.on("mousedown wheel DOMMouseScroll mousewheel keyup touchmove", function () { // добавляем обработчик события на любое действии пользователя
            wrap.stop(); // остановить анимацию
        });
        wrap.animate({
            scrollTop: offsetFromTo(_selectorTarget, _selectorWrap) - 30// $(_selectorTarget).offset().top - 30
        }, // Список свойств и значений CSS, к которым будет двигаться анимация.
            _time, // Время анимации
            function () { // Функция, вызываемая после завершения анимации
                wrap.off("mousedown wheel DOMMouseScroll mousewheel keyup touchmove"); // удалить ранее добавленные обработчики событий
            });
    }

    // Плавная прокрутка
    // Элемент, после нажатия на который прокручивается должен иметь класс "btn-scroll", а в href должна быть ссылка на якорь
    // Пример:
    // 		<a class="button btn-scroll" href="#calculation">Оставить заявку</a>


    $('.btn-scroll').click(function () {
        const destinationSelector = $(this).attr("href");
        scrollToElem(destinationSelector, 1500);
        // Hide menu when mobile
        if (($(window).width() <= 845)) {
            hideMenu();
        }
    });


    // свайп по окну
    /*
	$( window ).on( "swipeleft", function( e ) {
		e.stopPropagation();
		hideMenu();
	} );

	$( window ).on( "swiperight", function( e ) {
		e.stopPropagation();
		showMenu();
	} );
	*/

    // end main menu
});


 //-----------------------------------------------------------------------
    //             Кастомные списки
    //-----------------------------------------------------------------------

    // https://gitlab.com/kruchkov.alexander-adm/select3

    // Редакция 1С-Битрикс
    $(".bitrix_edition").select3({
        'allowNullChoice': false,
        'multipleChoiсe': false,
        'hidePlaceholderWhenShow': true,
        'placeholderText': 'Редакция 1С-Битрикс *'
    });

    // форма сотрудничество
    $('#proj_types').select3({
        'allowNullChoice': false,
        'multipleChoiсe': false,
        'hidePlaceholderWhenShow': true,
        'placeholderText': 'Основной тип проектов *'
    });

    // форма сотрудничество
    $('#activity').select3({
        'allowNullChoice': false,
        'multipleChoiсe': false,
        'hidePlaceholderWhenShow': true,
        'placeholderText': 'Основной вид деятельности *'
    });

    $(".contact_way").select3({
        'allowNullChoice': true,
        'multipleChoiсe': true,
        'hidePlaceholderWhenShow': true,
        'addEachValueAsDiv': true,
        'focusWhenHover': false,
        'placeholderText': 'Как связаться?'
    });

    // всплывающая форма
    $("#project").select3({
        'allowNullChoice': false,
        'multipleChoiсe': false,
        'hidePlaceholderWhenShow': true,
        'placeholderText': 'Тип Вашего проекта *'
    });

    /* костыли для кастомного списка*/
    $("[type='tel']").each(function () {
        $(this).data("_1stFocus", true);
    });
    $("[type='tel']").on("focus", function () {
        if ($(this).data("_1stFocus") === true) {
            $(this).data("_1stFocus", false);
            const that = this;
            function show_contact_way() {
                $(that).parent().find(".contact_way").select3("show");
                $(that).focus();
            }
            setTimeout(show_contact_way, 500);
        }
    });

     //-----------------------------------------------------------------------
    //             Летающие подсказки-placeholder'ы
    //-----------------------------------------------------------------------

    // летающая подсказка-placeholder
    // Flying_Placeholder - класс обертки для label, в котором текст placeholder'а и input'а или textarea

    const wraps = document.querySelectorAll('.Flying_Placeholder');
    for (let i = 0; i < wraps.length; i++) {
        const flying_label = wraps[i].querySelector('label');
        const inp = wraps[i].querySelector("input, textarea, select");
        $(flying_label).click(function (event) {
            inp.focus();
        });

        $(inp).on("focus", function () {
            // input/textarea событие focus - фокус элемента
            $(flying_label).addClass("focus");
        });
        $(inp).on("blur", function () {
            // input/textarea событие blur - фокус снят
            if (!$(this).val() || $(this).val().trim().length == 0) {
                $(flying_label).removeClass("focus");
            }
        });

        $(inp).on("change", function () {
            if ($(inp).val() && $(inp).val().trim().length != 0) // если поле заполнено
                $(flying_label).addClass("focus");
            else
                $(flying_label).removeClass("focus");
        });

        // при загрузке
        if ($(inp).val() && $(inp).val().trim().length != 0) // если поле заполнено
            $(flying_label).addClass("focus");
        else
            $(flying_label).removeClass("focus");
    }

    //-----------------------------------------------------------------------
//           Срочная задача
//-----------------------------------------------------------------------
$(document).ready(function () {
    function urgentTaskChecked() {
        const checked = $('#urgent-task').is(':checked');
        if (checked) {
            $(".non-urgent[for='urgent-task']").css('display', 'none');
            $(".is-urgent[for='urgent-task']").css('display', 'block');
        }
        else {
            $(".non-urgent[for='urgent-task']").css('display', 'block');
            $(".is-urgent[for='urgent-task']").css('display', 'none');
        }
    }
    urgentTaskChecked();
    $('#urgent-task').on('change', urgentTaskChecked);
});
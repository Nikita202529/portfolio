/* eslint-disable quote-props */
//-----------------------------------------------------------------------
//             Точное сравнение объектов js
//-----------------------------------------------------------------------

// Используется при загрузке файлов, чтобы пользователь не смог загрузить один файл дважды.
// При попытке загрузки загруженный файл сравнивается с предыдущими. Если он уже есть, в
// его загрузке отказывается

function deepCompare() {
    let i;
    let l;
    let leftChain;
    let rightChain;

    function compare2Objects(x, y) {
        let p;

        // remember that NaN === NaN returns false
        // and isNaN(undefined) returns true
        if (isNaN(x) && isNaN(y) && typeof x === 'number' && typeof y === 'number') {
            return true;
        }

        // Compare primitives and functions.
        // Check if both arguments link to the same object.
        // Especially useful on the step where we compare prototypes
        if (x === y) {
            return true;
        }

        // Works in case when functions are created in constructor.
        // Comparing dates is a common scenario. Another built-ins?
        // We can even handle functions passed across iframes
        if ((typeof x === 'function' && typeof y === 'function') ||
            (x instanceof Date && y instanceof Date) ||
            (x instanceof RegExp && y instanceof RegExp) ||
            (x instanceof String && y instanceof String) ||
            (x instanceof Number && y instanceof Number)) {
            return x.toString() === y.toString();
        }

        // At last checking prototypes as good as we can
        if (!(x instanceof Object && y instanceof Object)) {
            return false;
        }

        if (x.isPrototypeOf(y) || y.isPrototypeOf(x)) {
            return false;
        }

        if (x.constructor !== y.constructor) {
            return false;
        }

        if (x.prototype !== y.prototype) {
            return false;
        }

        // Check for infinitive linking loops
        if (leftChain.indexOf(x) > -1 || rightChain.indexOf(y) > -1) {
            return false;
        }

        // Quick checking of one object being a subset of another.
        // todo: cache the structure of arguments[0] for performance
        for (p in y) {
            if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
                return false;
            } else if (typeof y[p] !== typeof x[p]) {
                return false;
            }
        }

        for (p in x) {
            if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
                return false;
            } else if (typeof y[p] !== typeof x[p]) {
                return false;
            }

            switch (typeof(x[p])) {
                case 'object':
                case 'function':

                    leftChain.push(x);
                    rightChain.push(y);

                    if (!compare2Objects(x[p], y[p])) {
                        return false;
                    }

                    leftChain.pop();
                    rightChain.pop();
                    break;

                default:
                    if (x[p] !== y[p]) {
                        return false;
                    }
                    break;
            }
        }

        return true;
    }

    if (arguments.length < 1) {
        return true; // Die silently? Don't know how to handle such case, please help...
        // throw "Need two or more arguments to compare";
    }

    for (i = 1, l = arguments.length; i < l; i++) {

        leftChain = []; // Todo: this can be cached
        rightChain = [];

        if (!compare2Objects(arguments[0], arguments[i])) {
            return false;
        }
    }

    return true;
}

Array.prototype.unique = function() {
    const a = this.concat();
    for (let i = 0; i < a.length; ++i) {
        for (let j = i + 1; j < a.length; ++j) {
            if (deepCompare(a[i], a[j])) // было if(a[i] === a[j])
                a.splice(j--, 1);
        }
    }

    return a;
};

let mainThis = this;

//-----------------------------------------------------------------------
//             Вывод всплывающих сообщений
//-----------------------------------------------------------------------

// Замена alert'у
// функция ShowMyMessage
const MyQueue = [];
// alert_message - сообщение, можно html
// bs_type - тип alert'а в bootstrap'е, влияет только на цвет, bstype = primary,
// secondary, success, danger, warning, info, light, dark
function ShowMyMessage(leadId) {
    const responseContainer = $('<div/>', { 'class': 'response-container' });

    if (leadId) {
        const succesContainer = $('<div/>', { 'class': 'response-container__block' });

        responseContainer.append(succesContainer);
        $('body').append(responseContainer);

        const message = `<p class='response-text'>Спасибо!</p><p class='response-text'>Ваша заявка ${leadId} принята</p><p>Наш менеджер свяжется с вами в ближайшее время</p><button>Вернуться на сайт</button>`;
        succesContainer.html(message);

        $('.response-container').on('click', function(e) {
            $(this).addClass('opacity-0').on('transitionend', function() {
                $(this).remove();
            });
        })

        return;
    }

    const errorContainer = $('<div/>', { 'class': 'response-container__block' });
    responseContainer.append(errorContainer);
    $('body').append(responseContainer);

    const message = `<p class='response-text'>Извините!</p><p class='response-text'>Возникла</p><button>Вернуться на сайт</button>`;
    errorContainer.html(message);

    $('.response-container').on('click', function(e) {
        $(this).addClass('opacity-0').on('transitionend', function() {
            $(this).remove();
        });
    })
}

//-----------------------------------------------------------------------
//             Маски на телефонные номера
//-----------------------------------------------------------------------

// Маски на телефонные номера
jQuery(function($) {

    // $("#user-phone").mask("+7 (999) 999-99-99", { autoclear: false });
    $('#user-phone').inputmask({ mask: "+7 (999) 999-99-99", showMaskOnHover: false, });
    $('#user-phone_modal').inputmask({ mask: "+7 (999) 999-99-99", showMaskOnHover: false, });
    $("#user-phone_modal-audit").inputmask({ mask: "+7 (999) 999-99-99", showMaskOnHover: false, });
    $("#user-phone_packForm").inputmask({ mask: "+7 (999) 999-99-99", showMaskOnHover: false, });
    $("#user-phone_collabForm").inputmask({ mask: "+7 (999) 999-99-99", showMaskOnHover: false, });
    $("#user-phone_modal-freeMonth").inputmask({ mask: "+7 (999) 999-99-99", showMaskOnHover: false, });
    $("#user-phone_modal-guarantee").inputmask({ mask: "+7 (999) 999-99-99", showMaskOnHover: false, });
    $("#user-phone_request-form").inputmask({ mask: "+7 (999) 999-99-99", showMaskOnHover: false, });
});


//-----------------------------------------------------------------------
//             Показать все сервисы/Скрыть все сервисы
//-----------------------------------------------------------------------
const serviceItem = document.querySelectorAll('.service-item');

// показать все блоки
function showAllServiceItems() {
    for (let i = 0; i < serviceItem.length; i++) {
        serviceItem[i].style.display = '';
    }
}

const PLANCHET_BLOCKS_COUNT = 6;
const DESKTOP_BLOCKS_COUNT = 8;

// показать первые x блоков
function showServiceItems(x) {
    for (let i = 0; i < serviceItem.length; i++) {
        if (i >= x) {
            serviceItem[i].style.display = 'none';
            continue;
        }

        serviceItem[i].style.display = '';
    }
}

// функция на показ количества блоков в зависимости от начальной ширины экрана
function showItem() {
    if (window.innerWidth <= 844) {
        showAllServiceItems();
        return;
    }

    if (window.innerWidth <= 1351) {
        showServiceItems(PLANCHET_BLOCKS_COUNT);
        return;
    }

    showServiceItems(DESKTOP_BLOCKS_COUNT);
}

$(window).on('load resize', showItem);

// по клику меняем текст и выполняются функции, которые описаны чуть выше
$(document).ready(function() {
    $('.service-link').click(function() {
        if (!$(this).data('status')) {
            $(this).html('Скрыть \&#187;');
            $(this).data('status', true);
            showAllServiceItems();
        } else {
            $(this).html('Показать все услуги \&#187;');
            $(this).data('status', false);
            showItem();
        }
    });
});

//-----------------------------------------------------------------------
//             Меню
//-----------------------------------------------------------------------


$(document).ready(function() {
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
    hamburger.addEventListener('click', function(e) {
        // e.stopPropagation();

        const menu_is_active = $(menu).hasClass('menu-active');
        if (menu_is_active)
            hideMenu();
        else
            showMenu();
    });

    // Event when you click outside menu - menu hide
    document.addEventListener('click', function(e) {
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
    menuArrowBack.addEventListener('click', function(e) {
        e.stopPropagation();
        hideMenu();
    });

    //-----------------------------------------------------------------------
    //             Плавная прокрутка
    //-----------------------------------------------------------------------

    function offsetFromTo(fromElemSelector, toElemSelector) {
        try {
            let fromElem = document.querySelector(fromElemSelector);
            const toElem = document.querySelector(toElemSelector);
            if (!fromElem || !toElem) return false;
            let offset = 0;
            while (fromElem && !fromElem.isEqualNode(toElem)) {
                offset += fromElem.offsetTop;
                fromElem = fromElem.offsetParent;
            }
            return offset;
        } catch (e) {
            return false;
        }
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
        wrap.on("mousedown wheel DOMMouseScroll mousewheel keyup touchmove", function() { // добавляем обработчик события на любое действии пользователя
            wrap.stop(); // остановить анимацию
        });
        let offset = offsetFromTo(_selectorTarget, _selectorWrap);
        if (offset === false) {
            wrap.off("mousedown wheel DOMMouseScroll mousewheel keyup touchmove"); // удалить ранее добавленные обработчики событий
            return;
        }
        wrap.animate({
                scrollTop: offset - 30 // $(_selectorTarget).offset().top - 30
            }, // Список свойств и значений CSS, к которым будет двигаться анимация.
            _time, // Время анимации
            function() { // Функция, вызываемая после завершения анимации
                wrap.off("mousedown wheel DOMMouseScroll mousewheel keyup touchmove"); // удалить ранее добавленные обработчики событий
            });
    }

    // Плавная прокрутка
    // Элемент, после нажатия на который прокручивается должен иметь класс "btn-scroll", а в href должна быть ссылка на якорь
    // Пример:
    // 		<a class="button btn-scroll" href="#calculation">Оставить заявку</a>


    $('.btn-scroll').click(function() {
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


    //-----------------------------------------------------------------------
    //             AJAX-отправка форм
    //-----------------------------------------------------------------------

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
    $('#type_of_coop').select3({
        'allowNullChoice': false,
        'multipleChoiсe': false,
        'hidePlaceholderWhenShow': true,
        'placeholderText': 'Желаемый вид сотрудничества'
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
    $("[type='tel']").each(function() {
        $(this).data("_1stFocus", true);
    });
    $("[type='tel']").on("focus", function() {
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

    // -------------AJAX-отправка форм
    //-----------------------------------------------------------------------
    //             Загрузка файлов
    //-----------------------------------------------------------------------

    // Загруженные файлы
    let files = [];

    $('input[type="file"]').change(function() {
        // files = this.files;//старая версия

        // новая версия - важно
        for (let i = 0; i < this.files.length; i++)
            files.push(this.files[i]);

        files = files.unique(); // не стандартная функция. Прописана в начале файла. Удаляет все совпадения в массиве

        $('#my_file_upload').val("123"); // важно

        refresh_all_preloads_html();
    });

    // -------------AJAX-отправка форм
    //-----------------------------------------------------------------------
    //             Обновление превьюшек загрузок
    //-----------------------------------------------------------------------


    /* //Чистый пример:
	$('input[type="file"]').change(function(e){
				var fileName = e.target.files[0].name;
				alert('The file "' + fileName +  '" has been selected.');
			});
	*/
    // https://stackoverflow.com/questions/4459379/preview-an-image-before-it-is-uploaded
    // http://qaru.site/questions/24784/javascript-image-resize

    function refresh_all_preloads_html() {
        if (files.length == 0)
            $('#my_file_upload').val(""); // важно

        if (files.length == 0)
            $('.upload-button').html("Загрузить файл");
        else
            $('.upload-button').html("Добавить файл");

        $('.preloads').empty();
        for (let i = 0; i < files.length; i++) {
            const p_text = $('<div/>', { "class": 'p_text' });
            const p_close = $('<div/>', { "class": 'p_close', "ind": i }); // ind передается для удаления - p_close.click
            const p_preview = $('<div/>', { "class": 'p_preview' });
            const p_item = $('<div/>', { "class": 'p_item' });

            p_text.append(files[i].name);

            const reader = new FileReader();
            reader.onload = function(e) {
                $(p_preview).css('background-image', "url(" + e.target.result + ")");
            }
            reader.readAsDataURL(files[i]);

            p_close.append('×');
            p_close.click(function(e) {
                files.splice(e.target.getAttribute("ind"), 1);
                refresh_all_preloads_html();
            });

            p_item.append(p_text);
            p_item.append(p_preview);
            p_item.append(p_close);
            $('.preloads').append(p_item);
        }
    }

    refresh_all_preloads_html();

    let ymClientID;
    ym(data.YM_ID, 'getClientID', function(clientID) {
        ymClientID = clientID;
    });

    function getYmClientID() {
        if (typeof ymClientID === 'undefined' || ymClientID == null) {
            console.log('Нет найден ClientID яндекс метрики. См. main.js');
            return 'не определен';
        }

        return ymClientID;
    }

    // проверяем заполнение массива data.YM_GOALS
    (function() {
        if (!data || !data.YM_GOALS || !data.YM_GOALS.main_page) {
            console.error('data.YM_GOALS.main_page not found');
            return;
        }
        const requiredKeys = [
            'CLICK',
            'MODAL_SHOW',
            'FORM_INPUT',
            'FORM_SUBMIT',
            'FORM_SUCCESS',
            'FORM_ERROR',
        ];
        requiredKeys.forEach(function(requiredKey) {
            if (!data.YM_GOALS.main_page[requiredKey]) {
                console.error('data.YM_GOALS.main_page. ' + requiredKey + ' not found');
            }
        });
    }());

    // вешаем цели яндекс метрики на клики
    function setClickGoals() {
        // eslint-disable-next-line no-restricted-syntax
        for (let selector in data.YM_GOALS.main_page.CLICK) {
            if (!Object.prototype.hasOwnProperty.call(data.YM_GOALS.main_page.CLICK, selector)) continue;
            if (typeof data.YM_GOALS.main_page.CLICK[selector] === 'undefined') continue;
            if ($(selector).length === 0) {
                console.log('Предупреждение: data.YM_GOALS.main_page.CLICK. При загрузке на странице нет элемента ' + selector);
            }
            let goalid = data.YM_GOALS.main_page.CLICK[selector];
            // ВАЖНО: .on() с делегированными событиями. Читай: http://qaru.site/questions/19639/click-event-doesnt-work-on-dynamically-generated-elements
            // eslint-disable-next-line no-loop-func
            $(document).on('click', selector, function() {
                ym(data.YM_ID, 'reachGoal', goalid);
            });
        }
    }
    setClickGoals();

    // вешаем цели яндекс метрики на модальные окна
    let shownGoalsInited = [];

    function setOpenModalGoals() {
        // eslint-disable-next-line no-restricted-syntax
        for (let selector in data.YM_GOALS.main_page.MODAL_SHOW) {
            if (!Object.prototype.hasOwnProperty.call(data.YM_GOALS.main_page.MODAL_SHOW, selector)) continue;
            if (typeof data.YM_GOALS.main_page.MODAL_SHOW[selector] === 'undefined') continue;

            if ($(selector).length === 0) {
                console.log('Предупреждение: data.YM_GOALS.main_page.MODAL_SHOW. При загрузке на странице нет элемента ' + selector);
            }
            let goalid = data.YM_GOALS.main_page.MODAL_SHOW[selector];
            // eslint-disable-next-line no-loop-func
            $(document).on('shown.bs.modal', selector, function() {
                if (typeof shownGoalsInited[selector] !== 'undefined' && shownGoalsInited[selector] != null && shownGoalsInited[selector] === 'Y') {
                    return;
                }
                ym(data.YM_ID, 'reachGoal', goalid);
                shownGoalsInited[selector] = 'Y';
            });
        }
    }
    setOpenModalGoals();

    // вешаем цели яндекс метрики на заполнение формы
    let inputGoalsInited = [];

    function setInputFormGoals() {
        // eslint-disable-next-line no-restricted-syntax
        for (let formid in data.YM_GOALS.main_page.FORM_INPUT) {
            if (!Object.prototype.hasOwnProperty.call(data.YM_GOALS.main_page.FORM_INPUT, formid)) continue;
            if (typeof data.YM_GOALS.main_page.FORM_INPUT[formid] === 'undefined') continue;

            let selector = '#' + formid;
            if ($(selector).length === 0) {
                console.log('Предупреждение: data.YM_GOALS.main_page.FORM_INPUT. При загрузке на странице нет элемента ' + selector);
            }
            let goalid = data.YM_GOALS.main_page.FORM_INPUT[formid];
            // доделать
            // eslint-disable-next-line no-loop-func
            $(document).on('input change select3ValueChanged', selector + ' input, ' + selector + ' textarea, ' + selector + ' [select3]', function() {
                if (typeof inputGoalsInited[selector] !== 'undefined' && inputGoalsInited[selector] != null && inputGoalsInited[selector] === 'Y') {
                    return;
                }
                if ($(this).data('is-programmatically-set') === true) {
                    $(this).data('is-programmatically-set', false);
                    return;
                }
                ym(data.YM_ID, 'reachGoal', goalid);
                inputGoalsInited[selector] = 'Y';
            });
        }
    }
    setInputFormGoals();

    // -------------AJAX-отправка форм
    //-----------------------------------------------------------------------
    //             Валидация форм
    //-----------------------------------------------------------------------

    // ---17.09.19---ОТСЮДА

    // Функция валидации поля на форме
    // Параметры:
    //  querySelector	- string. Селектор поля (input, textarea, select3)
    //  required		- boolean. Равен true, если поле является обязательным для заполнения
    //  regex			- объект RegExp. Необязательный. Регулярное выражение для проверки.
    //  errorMessage	- string. Необязательный. Сообщение, если значение поля не соответствует regex
    function checkField(querySelector, required, regex, errorMessage) {
        // получаем поле
        const field = document.querySelector(querySelector);
        if (!field) { console.log('Ошибка в функции checkField. Несуществующий querySelector'); return true; };
        // если на поле уже есть сообщение об ошибке, убираем его
        clearErrorMessage(querySelector);
        // получаем значение поля
        let value = $(field).val() || $(field).select3("value");
        // удаляем пробельные символы с начала и конца строки
        value = (value) ? value.trim() : null;
        // получаем, пустое ли поле
        const empty = (!value || value.length == 0);

        if (empty) {
            if (!required) // если пустое и необязательное
                return true; // то все ок
            else // if (required) если пустое, но обязательное
            {
                displayErrorMessage(querySelector, 'обязательное поле'); // то вывод сообщения, что поле является обязательным
                return false;
            }
        } else // if (!empty)
        {
            if (!regex) // если regex не задан
                return true; // то все ок
            if (regex.test(value)) // если значение прошло проверку по регулярному выражению
                return true; // то все ок
            else {
                displayErrorMessage(querySelector, errorMessage); // вывод сообщения об ошибке
                return false;
            }
        }
    }

    // вспомогательная. Используется в функции checkField
    function displayErrorMessage(querySelector, message) {
        const field = document.querySelector(querySelector);
        $(field).addClass('error');
        const tooltip = $('<div/>', { "class": 'myTooltip' });
        tooltip.append(message);
        $(field).parent().append(tooltip); // добавляем элемент к обертке. Сработает только если есть обертка
    }

    // вспомогательная. Используется в функции checkField
    function clearErrorMessage(querySelector) {
        const field = document.querySelector(querySelector);
        $(field).removeClass('error'); // очищаем оформление ошибок
        $(field).parent().find('.myTooltip').remove(); // очищаем сообщения ошибок
    }

    function calcFormSuccess(respond) {
        console.log(JSON.stringify(respond));
        const leadidtext = (respond.leadid) ? 'Номер Вашей заявки ' + respond.leadid + ". " : "";
        if (!respond.leadid)
            console.log('Не удалось получить id лида');
        ShowMyMessage(respond.leadid);
        if (respond.leadid) {
            $("#calculateTheCostModal .calculation-form__btn").html(leadidtext); // ИСПРАВИТЬ
            // $('[data-toggle="modal"]').html(leadidtext); //2 кнопки вызова всплывающей формы
        }
    }

    function popupFormSuccess(respond) {
        console.log(JSON.stringify(respond));
        const leadidtext = (respond.leadid) ? 'Номер Вашей заявки ' + respond.leadid + ". " : "";
        if (!respond.leadid)
            console.log('Не удалось получить id лида');
        ShowMyMessage(respond.leadid);
        if (respond.leadid) {
            $("#ModalLong .popup-form__btn").html(leadidtext); // ИСПРАВИТЬ
            // $('[data-toggle="modal"]').html(leadidtext); //2 кнопки вызова всплывающей формы
        }
    }

    function auditFormSuccess(respond) {
        console.log(JSON.stringify(respond));
        const leadidtext = (respond.leadid) ? 'Номер Вашей заявки ' + respond.leadid + ". " : "";
        if (!respond.leadid)
            console.log('Не удалось получить id лида');
        ShowMyMessage(respond.leadid);
        if (respond.leadid) {
            $("#auditModal .popup-form__btn_audit").html(leadidtext); // ИСПРАВИТЬ
            // $('[data-toggle="modal"]').html(leadidtext); //2 кнопки вызова всплывающей формы
        }
    }

    function packFormSuccess(respond) {
        console.log(JSON.stringify(respond));
        const leadidtext = (respond.leadid) ? 'Номер Вашей заявки ' + respond.leadid + ". " : "";
        if (!respond.leadid)
            console.log('Не удалось получить id лида');
        ShowMyMessage(respond.leadid);
        if (respond.leadid) {
            $("#ModalPackage .button.popup-form__btn").html(leadidtext); // ИСПРАВИТЬ
            // $('[data-toggle="modal"]').html(leadidtext); //2 кнопки вызова всплывающей формы
        }
    }

    function collabFormSuccess(respond) {
        console.log(JSON.stringify(respond));
        const leadidtext = (respond.leadid) ? 'Номер Вашей заявки ' + respond.leadid + ". " : "";
        if (!respond.leadid)
            console.log('Не удалось получить id лида');
        ShowMyMessage(respond.leadid);
        if (respond.leadid) {
            $("#ModalCollaboration .button.popup-form__btn").html(leadidtext); // ИСПРАВИТЬ
            // $('[data-toggle="modal"]').html(leadidtext); //2 кнопки вызова всплывающей формы
        }
    }

    function freeMonthFormSuccess(respond) {
        console.log(JSON.stringify(respond));
        const leadidtext = (respond.leadid) ? 'Номер Вашей заявки ' + respond.leadid + ". " : "";
        if (!respond.leadid)
            console.log('Не удалось получить id лида');
        ShowMyMessage(respond.leadid);
        if (respond.leadid) {
            $("#firstMonthModal .popup-form__btn_freeMonth").html(leadidtext); // ИСПРАВИТЬ
            // $('[data-toggle="modal"]').html(leadidtext); //2 кнопки вызова всплывающей формы
        }
    }

    function guaranteeFormSuccess(respond) {
        console.log(JSON.stringify(respond));
        const leadidtext = (respond.leadid) ? 'Номер Вашей заявки ' + respond.leadid + ". " : "";
        if (!respond.leadid)
            console.log('Не удалось получить id лида');
        ShowMyMessage(respond.leadid);
        if (respond.leadid) {
            $("#guaranteeModal .popup-form__btn_guarantee").html(leadidtext); // ИСПРАВИТЬ
            // $('[data-toggle="modal"]').html(leadidtext); //2 кнопки вызова всплывающей формы
        }
    }

    function requestFormSuccess(respond) {
        console.log(JSON.stringify(respond));
        const leadidtext = (respond.leadid) ? 'Номер Вашей заявки ' + respond.leadid + ". " : "";
        if (!respond.leadid)
            console.log('Не удалось получить id лида');
        ShowMyMessage(respond.leadid);
        if (respond.leadid) {
            $(".request-form__btn").html(leadidtext); // ИСПРАВИТЬ
            // $('[data-toggle="modal"]').html(leadidtext); //2 кнопки вызова всплывающей формы
        }
    }

    function addFilesField(formData) {
        $.each(files, function(key, value) {
            formData.append('files' + key, value);
        });
        return formData;
    }

    function getDeviceInfo() {
        let info = "";

        // Информация об устройстве пользователя
        const user = detect.parse(navigator.userAgent);
        let main_info = '<b>Браузер пользователя:</b> ' + user.browser.family + ' ' + user.browser.version + '; <b>ОС пользователя:</b> ' + user.os.name + '. <br>';
        main_info += '<b>Ширина окна:</b> ' + $(window).width() + '; <b>Высота окна:</b> ' + $(window).height() + '. <br>';

        info += main_info;

        const notInclude = ['vendorSub', 'productSub', 'vendor', 'appCodeName', 'appName', 'appVersion', 'platform', 'product', 'userAgent', 'plugins', 'mimeTypes']; // поля navigator, которые НЕ включать в отчет

        const _navigator = {};
        for (let i in navigator) _navigator[i] = navigator[i]; // JSON.stringify напрямую к navigator не работает
        const navData = JSON.parse(JSON.stringify(_navigator)); // чтобы преобразовать все в строку и отбросить функции и процую шелупонь

        for (let key in navData) {
            if (notInclude.indexOf(key) === -1) {
                const value = navData[key];
                if ((value !== '') && (value !== null) && (typeof value !== 'undefined') && (JSON.stringify(value) != JSON.stringify({})))
                    info += '<b>' + key + ':</b> ' + JSON.stringify(value) + '; ';
            }
        }

        info = '<div style="font-size: 0.8em;">' + info + '</div>';

        return info;
    }

    function getCalculatorData() {
        return (mainThis.calculator.calculatorData) ? mainThis.calculator.calculatorData : 'калькулятор не использовался';
    }

    const forms = {
        // Форма РАССЧИТАТЬ ЗАДАЧУ
        'calculation_form': { // id формы - должен быть = атрибуту id тэга form нужной формы
            // successCallback - функция, вызываемая в случае успешной регистрации формы в bitrix24. Принимает 1 аргумент - ответ сервера (rest.php)
            successCallback: calcFormSuccess,
            // селектор модального окна, чтоб закрыть его при отправке.
            modalSelector: "#calculateTheCostModal",
            // селектор кнопки submit в форме
            buttonSelector: ".calculation-form__btn",
            // fields - описание полей формы. Порядок тех полей, которые проходят валидацию (required == true или задан regex) здесь важен - он должен соответствовать их порядку в html
            // post_name * - имя поля, с которым оно будет отправлено на сервер. Обязат.
            // html_name - атрибут name тега input, textarea, select или select3. Необяз, вместо него можно указать callback
            // callback - функция, значение которой будет присвоено полю. необяз, вместо него можно указать html_name
            // callbackFormData - если надо не просто присвоить полю значение из callback, а в callback надо отправить formData и вернуть formData
            // dependence - не отправлять поле, если не заполнено другое поле (указать html_name этого поля)
            // required - поле формы обязательно для заполнения
            // regex - регулярное выражение для валидации поля. Необязательное
            // errorMessage - сообщение, если значение не поля не соответствует regex. Необязательное
            fields: [{
                    post_name: "files", // имя отправки на сервер
                    callback: addFilesField, // если поля в html нет, функция, значение которой присвоить
                    callbackFormData: true, // если надо не просто присвоить полю значение из callback, а в callback надо отправить formData и вернуть formData
                },
                { // мера защиты
                    post_name: "my_file_upload", // имя отправки на сервер
                    html_name: "my_file_upload", // имя поля в html
                },
                {
                    post_name: "site", // имя отправки на сервер
                    html_name: "site-name", // имя поля в html
                    required: true, // Валидация. Равно true, если поле обязательно для заполнения.
                    regex: /^(http(s)?:\/\/)?([a-zA-Z0-9\u0410-\u044f\u0401\u0451]{1}[-a-zA-Z0-9\u0410-\u044f\u0401\u0451]{0,254}[a-zA-Z0-9\u0410-\u044f\u0401\u0451]{1}[.]{0,1}){1,}[.]{1}([a-zA-Z0-9\u0420\u0424\u0440\u0444]{1}[-a-zA-Z0-9\u0420\u0424\u0440\u0444]{0,6}[a-zA-Z0-9\u0420\u0424\u0440\u0444]{1}){1}([:/?#]{1}([-a-zA-Z0-9\u0410-\u044f\u0401\u0451@:%_+.~#?&/=$!*'()\[\],]{0,})){0,}$/i, // писал сам, https://regexr.com/4kco1
                    errorMessage: "сайт заполнен неверно", // Валидация. Сообщение об ошибки, если не прошло валидацию regex
                },
                {
                    post_name: "bitrix", // имя отправки на сервер
                    html_name: "bitrix", // имя поля в html
                    required: true, // Валидация. Равно true, если это поле формы обязательно для заполнения.
                },
                {
                    post_name: "name",
                    html_name: "user-name",
                    required: true,
                },
                {
                    post_name: "mail",
                    html_name: "user-mail",
                    required: true,
                    regex: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
                    errorMessage: "некорректный e-mail",
                },
                {
                    post_name: "phone",
                    html_name: "user-phone",
                    required: false,
                    regex: /^(\+7|7|8)+(([0-9,\s,\-,\(,\)]){10,16})$/, // писал сам
                    errorMessage: "телефон заполнен неверно",
                },
                {
                    post_name: "way_to_contact",
                    html_name: "calculation-form-contact_way",
                    dependence: "user-phone",
                },
                {
                    post_name: "problem",
                    html_name: "site-problem",
                    required: true,
                },
                {
                    post_name: "links",
                    html_name: "site-problem-links",
                },
                {
                    post_name: "device",
                    html_name: "user-device",
                },
                {
                    post_name: "urgent",
                    html_name: "urgent-task",
                },
                {
                    post_name: "device_details",
                    callback: getDeviceInfo,
                    dependence: "user-device",
                },
            ],
        },

        // Форма заявки на постоянное обслуживание
        'popup_form': {
            successCallback: popupFormSuccess,
            modalSelector: "#ModalLong",
            buttonSelector: ".popup-form__btn",
            fields: [{
                    post_name: "name",
                    html_name: "user-name_modal",
                    required: true,
                },
                {
                    post_name: "site",
                    html_name: "user-linksite_modal",
                    required: true,
                    regex: /^(http(s)?:\/\/)?([a-zA-Z0-9\u0410-\u044f\u0401\u0451]{1}[-a-zA-Z0-9\u0410-\u044f\u0401\u0451]{0,254}[a-zA-Z0-9\u0410-\u044f\u0401\u0451]{1}[.]{0,1}){1,}[.]{1}([a-zA-Z0-9\u0420\u0424\u0440\u0444]{1}[-a-zA-Z0-9\u0420\u0424\u0440\u0444]{0,6}[a-zA-Z0-9\u0420\u0424\u0440\u0444]{1}){1}([:/?#]{1}([-a-zA-Z0-9\u0410-\u044f\u0401\u0451@:%_+.~#?&/=$!*'()\[\],]{0,})){0,}$/i, // писал сам, https://regexr.com/4kco1
                    errorMessage: "сайт заполнен неверно",
                },
                {
                    post_name: "mail",
                    html_name: "user-mail_modal",
                    required: true,
                    regex: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
                    errorMessage: "некорректный e-mail",
                },
                {
                    post_name: "phone",
                    html_name: "user-phone_modal",
                    required: false,
                    regex: /^(\+7|7|8)+(([0-9,\s,\-,\(,\)]){10,16})$/, // писал сам
                    errorMessage: "телефон заполнен неверно",
                },
                {
                    post_name: "way_to_contact",
                    html_name: "popup-form-contact_way",
                    dependence: "user-phone_modal",
                },
                {
                    post_name: "project",
                    html_name: "project",
                    required: true,
                },
                {
                    post_name: "tariff",
                    html_name: "tariff",
                    required: true,
                },
                {
                    post_name: 'calculator',
                    callback: getCalculatorData,
                },
            ],
        },

        // форма АУДИТ
        'popup_form-audit': {
            successCallback: auditFormSuccess,
            modalSelector: "#auditModal",
            buttonSelector: ".popup-form__btn_audit",
            fields: [{
                    post_name: "name",
                    html_name: "user-name_modal-audit",
                    required: true,
                },
                {
                    post_name: "site",
                    html_name: "user-linksite_modal-audit",
                    required: true,
                    regex: /^(http(s)?:\/\/)?([a-zA-Z0-9\u0410-\u044f\u0401\u0451]{1}[-a-zA-Z0-9\u0410-\u044f\u0401\u0451]{0,254}[a-zA-Z0-9\u0410-\u044f\u0401\u0451]{1}[.]{0,1}){1,}[.]{1}([a-zA-Z0-9\u0420\u0424\u0440\u0444]{1}[-a-zA-Z0-9\u0420\u0424\u0440\u0444]{0,6}[a-zA-Z0-9\u0420\u0424\u0440\u0444]{1}){1}([:/?#]{1}([-a-zA-Z0-9\u0410-\u044f\u0401\u0451@:%_+.~#?&/=$!*'()\[\],]{0,})){0,}$/i, // писал сам, https://regexr.com/4kco1
                    errorMessage: "сайт заполнен неверно",
                },
                {
                    post_name: "phone",
                    html_name: "user-phone_modal-audit",
                    required: true,
                    regex: /^(\+7|7|8)+(([0-9,\s,\-,\(,\)]){10,16})$/, // писал сам
                    errorMessage: "телефон заполнен неверно",
                },
                {
                    post_name: "way_to_contact",
                    html_name: "popup-form-contact_way-audit",
                    dependence: "user-phone_modal-audit",
                },
                {
                    post_name: "bitrix_audit",
                    html_name: "bitrix_audit",
                    required: true,
                },
            ],
        },

        // форма ПАКЕТЫ
        'package_form': {
            successCallback: packFormSuccess,
            modalSelector: "#ModalPackage",
            buttonSelector: ".button.popup-form__btn",
            fields: [{
                    post_name: "name",
                    html_name: "user-name_packForm",
                    required: true,
                },
                {
                    post_name: "site",
                    html_name: "user-linksite_packForm",
                    required: true,
                    regex: /^(http(s)?:\/\/)?([a-zA-Z0-9\u0410-\u044f\u0401\u0451]{1}[-a-zA-Z0-9\u0410-\u044f\u0401\u0451]{0,254}[a-zA-Z0-9\u0410-\u044f\u0401\u0451]{1}[.]{0,1}){1,}[.]{1}([a-zA-Z0-9\u0420\u0424\u0440\u0444]{1}[-a-zA-Z0-9\u0420\u0424\u0440\u0444]{0,6}[a-zA-Z0-9\u0420\u0424\u0440\u0444]{1}){1}([:/?#]{1}([-a-zA-Z0-9\u0410-\u044f\u0401\u0451@:%_+.~#?&/=$!*'()\[\],]{0,})){0,}$/i, // писал сам, https://regexr.com/4kco1
                    errorMessage: "сайт заполнен неверно",
                },
                {
                    post_name: "mail",
                    html_name: "user-mail_packForm",
                    required: true,
                    regex: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
                    errorMessage: "некорректный e-mail",
                },
                {
                    post_name: "phone",
                    html_name: "user-phone_packForm",
                    required: false,
                    regex: /^(\+7|7|8)+(([0-9,\s,\-,\(,\)]){10,16})$/, // писал сам
                    errorMessage: "телефон заполнен неверно",
                },
                {
                    post_name: "way_to_contact",
                    html_name: "contact-way_packForm",
                    dependence: "user-phone_packForm",
                },
                {
                    post_name: "package",
                    html_name: "package",
                    required: true,
                },
                // 'startPack' - добавляется/убирается дальше
            ],
        },

        // форма СОТРУДНИЧЕСТВО
        'collaboration_form': {
            successCallback: collabFormSuccess,
            modalSelector: "#ModalCollaboration",
            buttonSelector: ".button.popup-form__btn",
            fields: [{
                    post_name: "name",
                    html_name: "user-name_collabForm",
                    required: true,
                },
                {
                    post_name: "user_post",
                    html_name: "user-post_collabForm",
                    required: true,
                },
                {
                    post_name: "mail",
                    html_name: "user-mail_collabForm",
                    required: true,
                    regex: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
                    errorMessage: "некорректный e-mail",
                },
                {
                    post_name: "phone",
                    html_name: "user-phone_collabForm",
                    required: false,
                    regex: /^(\+7|7|8)+(([0-9,\s,\-,\(,\)]){10,16})$/, // писал сам
                    errorMessage: "телефон заполнен неверно",
                },
                {
                    post_name: "way_to_contact",
                    html_name: "contact-way_collabForm",
                    dependence: "user-phone_collabForm",
                },
                {
                    post_name: "company",
                    html_name: "company-name_collabForm",
                    required: true,
                },
                {
                    post_name: "site",
                    html_name: "user-linksite_collabForm",
                    required: true,
                    regex: /^(http(s)?:\/\/)?([a-zA-Z0-9\u0410-\u044f\u0401\u0451]{1}[-a-zA-Z0-9\u0410-\u044f\u0401\u0451]{0,254}[a-zA-Z0-9\u0410-\u044f\u0401\u0451]{1}[.]{0,1}){1,}[.]{1}([a-zA-Z0-9\u0420\u0424\u0440\u0444]{1}[-a-zA-Z0-9\u0420\u0424\u0440\u0444]{0,6}[a-zA-Z0-9\u0420\u0424\u0440\u0444]{1}){1}([:/?#]{1}([-a-zA-Z0-9\u0410-\u044f\u0401\u0451@:%_+.~#?&/=$!*'()\[\],]{0,})){0,}$/i, // писал сам, https://regexr.com/4kco1
                    errorMessage: "сайт заполнен неверно",
                },
                {
                    post_name: "years_on_market",
                    html_name: "years_on_market",
                    required: true,
                    regex: /^[0-9]*$/, // только цифры
                    errorMessage: "должно быть целым неотрицательным числом",
                },
                {
                    post_name: "staff",
                    html_name: "staff",
                    required: true,
                    regex: /^[0-9]*$/, // только цифры
                    errorMessage: "должно быть целым неотрицательным числом",
                },
                {
                    post_name: "activity",
                    html_name: "activity",
                    required: true,
                },
                {
                    post_name: "proj_types",
                    html_name: "proj_types",
                    required: true,
                },
                {
                    post_name: "id_client_collabForm",
                    html_name: "id_client_collabForm",
                    required: false,
                },
                {
                    post_name: "type_of_coop",
                    html_name: "type_of_coop",
                    required: false,
                },
                {
                    post_name: "proj_num",
                    html_name: "proj_num",
                    required: true,
                },
                {
                    post_name: "bitrix_only",
                    html_name: "bitrix-only",
                },
                {
                    post_name: "bitrix_partner",
                    html_name: "bitrix-partner",
                },
            ],
        },

        // форма ПЕРВЫЙ МЕСЯЦ БЕСПЛАТНО
        'popup_form-freeMonth': {
            successCallback: freeMonthFormSuccess,
            modalSelector: "#firstMonthModal",
            buttonSelector: ".popup-form__btn_freeMonth",
            fields: [{
                    post_name: "name",
                    html_name: "user-name_modal-freeMonth",
                    required: true,
                },
                {
                    post_name: "site",
                    html_name: "user-linksite_modal-freeMonth",
                    required: true,
                    regex: /^(http(s)?:\/\/)?([a-zA-Z0-9\u0410-\u044f\u0401\u0451]{1}[-a-zA-Z0-9\u0410-\u044f\u0401\u0451]{0,254}[a-zA-Z0-9\u0410-\u044f\u0401\u0451]{1}[.]{0,1}){1,}[.]{1}([a-zA-Z0-9\u0420\u0424\u0440\u0444]{1}[-a-zA-Z0-9\u0420\u0424\u0440\u0444]{0,6}[a-zA-Z0-9\u0420\u0424\u0440\u0444]{1}){1}([:/?#]{1}([-a-zA-Z0-9\u0410-\u044f\u0401\u0451@:%_+.~#?&/=$!*'()\[\],]{0,})){0,}$/i, // писал сам, https://regexr.com/4kco1
                    errorMessage: "сайт заполнен неверно",
                },
                {
                    post_name: "phone",
                    html_name: "user-phone_modal-freeMonth",
                    required: true,
                    regex: /^(\+7|7|8)+(([0-9,\s,\-,\(,\)]){10,16})$/, // писал сам
                    errorMessage: "телефон заполнен неверно",
                },
                {
                    post_name: "way_to_contact",
                    html_name: "popup-form-contact_way-freeMonth",
                    dependence: "user-phone_modal-freeMonth",
                },
                {
                    post_name: "bitrix_freeMonth",
                    html_name: "bitrix_freeMonth",
                    required: true,
                },
            ],
        },

        // форма Гарантия возврата оплаты
        'popup_form-guarantee': {
            successCallback: guaranteeFormSuccess,
            modalSelector: "#guaranteeModal",
            buttonSelector: ".popup-form__btn_guarantee",
            fields: [{
                    post_name: "name",
                    html_name: "user-name_modal-guarantee",
                    required: true,
                },
                {
                    post_name: "site",
                    html_name: "user-linksite_modal-guarantee",
                    required: true,
                    regex: /^(http(s)?:\/\/)?([a-zA-Z0-9\u0410-\u044f\u0401\u0451]{1}[-a-zA-Z0-9\u0410-\u044f\u0401\u0451]{0,254}[a-zA-Z0-9\u0410-\u044f\u0401\u0451]{1}[.]{0,1}){1,}[.]{1}([a-zA-Z0-9\u0420\u0424\u0440\u0444]{1}[-a-zA-Z0-9\u0420\u0424\u0440\u0444]{0,6}[a-zA-Z0-9\u0420\u0424\u0440\u0444]{1}){1}([:/?#]{1}([-a-zA-Z0-9\u0410-\u044f\u0401\u0451@:%_+.~#?&/=$!*'()\[\],]{0,})){0,}$/i, // писал сам, https://regexr.com/4kco1
                    errorMessage: "сайт заполнен неверно",
                },
                {
                    post_name: "phone",
                    html_name: "user-phone_modal-guarantee",
                    required: true,
                    regex: /^(\+7|7|8)+(([0-9,\s,\-,\(,\)]){10,16})$/, // писал сам
                    errorMessage: "телефон заполнен неверно",
                },
                {
                    post_name: "way_to_contact",
                    html_name: "popup-form-contact_way-guarantee",
                    dependence: "user-phone_modal-guarantee",
                },
                {
                    post_name: "bitrix_guarantee",
                    html_name: "bitrix_guarantee",
                    required: true,
                },
            ],
        },

        // форма "связаться со мной"
        'request_form-form': {
            successCallback: requestFormSuccess,
            modalSelector: "#ModalRequest",
            buttonSelector: ".request-form__btn",
            fields: [{
                    post_name: "name",
                    html_name: "user-name_request-form",
                    required: true,
                },

                {
                    post_name: "phone",
                    html_name: "user-phone_request-form",
                    required: true,
                    regex: /^(\+7|7|8)+(([0-9,\s,\-,\(,\)]){10,16})$/, // писал сам
                    errorMessage: "телефон заполнен неверно",
                },

                {
                    post_name: "way_to_contact",
                    html_name: "request-form-contact_way",
                    dependence: "user-phone_request-form",
                },
                {
                    post_name: "mail",
                    html_name: "user-mail_request-form",
                    required: true,
                    regex: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
                    errorMessage: "некорректный e-mail",
                },
            ],
        },
    };

    // ---17.09.19---ДОСЮДА

    // -------------AJAX-отправка форм
    for (var key in forms) {
        const formSelector = '#' + key;
        if ($(formSelector).length === 0) { console.log("Внутренняя ошибка. Не существует указанного в массиве forms id формы"); continue }

        // событие SUBMIT
        $(formSelector).submit(function(event) {
            event.stopPropagation(); // Прекращаем дальнейшую передачу текущего события.
            event.preventDefault(); // Запрещаем стандартное поведение для кнопки submit

            const formId = $(this).attr("id"); // получаем id формы
            const formInfo = forms[formId]; // получаем информацию из массива forms

            // Валидация - начало

            let formIsValid = true;
            let firstError = true;

            for (var k in formInfo['fields']) {
                const item = formInfo['fields'][k];
                if (item && item['html_name']) {
                    const fieldName = item['html_name'];
                    const fieldSelector = formSelector + " " + "[name='" + fieldName + "']";
                    if (item['required'] || item['regex'])
                        if (!checkField(fieldSelector, item['required'], item['regex'], item['errorMessage'])) {
                            formIsValid = false;
                            if (firstError) {
                                firstError = false;
                                const scrollWrapSelector = formInfo['modalSelector'] + " " + ".modal-dialog";
                                scrollToElem(fieldSelector, 500, scrollWrapSelector); // скроллим к нему
                            }
                        }
                }
            }

            if (!formIsValid)
                return;
            // Валидация - конец

            // закрываем модальное окно
            $(formInfo['modalSelector']).modal('hide');

            let formData = new FormData();

            for (var k in formInfo['fields']) {
                const item = formInfo['fields'][k];
                if (item && item['post_name']) {
                    if (item['dependence']) {
                        const fieldName = item['dependence'];
                        const fieldSelector = formSelector + " " + "[name='" + fieldName + "']";
                        // значение того, поля, от заполнения которого зависит, будет ли добавлено текущее поле
                        const value =
                            /* ($(fieldSelector).data("ionRangeSlider") && $(fieldSelector).data("from"))
                                                                   ||*/
                            ($(fieldSelector).is(':checkbox') && $(fieldSelector).is(':checked').toString()) ||
                            (!$(fieldSelector).is(':checkbox') && $(fieldSelector).val()) ||
                            $(fieldSelector).select3("value");
                        const empty = (!value || value.length == 0);
                        if (empty)
                            continue;
                    }

                    if (!item['html_name'] && !item['callback']) {
                        console.log("Ошибка. Нужно указать или html_name, или callback. Не указано ни то, ни другое");
                        return;
                    }

                    if (item['html_name'] && item['callback']) {
                        console.log("Ошибка. Нужно указать или html_name или callback. Но указаны оба");
                        return;
                    }

                    if (item['callback']) {
                        if (item['callbackFormData'])
                            formData = item['callback'](formData);
                        else {
                            const value = item['callback']();
                            if (value)
                                formData.append(item['post_name'], value);
                        }
                    } else if (item['html_name']) {
                        const fieldName = item['html_name'];
                        const fieldSelector = formSelector + " " + "[name='" + fieldName + "']";
                        let value =
                            /* ($(fieldSelector).data("ionRangeSlider") && $(fieldSelector).data("from"))
                                                                   || */
                            ($(fieldSelector).is(':checkbox') && $(fieldSelector).is(':checked').toString()) ||
                            (!$(fieldSelector).is(':checkbox') && $(fieldSelector).val()) ||
                            $(fieldSelector).select3("value");
                        if (value)
                            value = value.toString().trim();
                        if (value)
                            formData.append(item['post_name'], value);
                    }
                }
            }

            // добавляем поля, которые есть у всех форм

            // id формы
            formData.append('formId', formId);

            // добавляем яндекс-метрику
            const ymClientID = getYmClientID();
            if (ymClientID) {
                formData.append('ym_ClientID', ymClientID);
            }

            // добавляем c и k
            formData.append('c', forms_clicks[formId]);
            formData.append('k', forms_keystrokes[formId]);

            // конец ФОРМИРОВАНИЕ МАССИВА ДЛЯ ОТПРАВКИ

            const button = $(this).find(formInfo['buttonSelector']);
            $(button).html('Форма отправлена');
            $(button).prop('disabled', true);

            // яндекс метрика, см. массив data.YM_GOALS.main_page.FORM_SUBMIT
            if (typeof data.YM_GOALS.main_page.FORM_SUBMIT[formId] === 'undefined') {
                console.log('Ошибка: массив data.YM_GOALS.main_page.FORM_SUBMIT сформирован не верно. Не задана цель для формы ' + formId);
                return;
            }
            const goalid = data.YM_GOALS.main_page.FORM_SUBMIT[formId];
            ym(data.YM_ID, 'reachGoal', goalid);

            // AJAX
            $.ajax({
                type: "POST",
                url: "./ajax/rest.php",
                data: formData,
                cache: false,
                processData: false, // NEEDED, DON'T OMIT THIS
                contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
                dataType: 'json',
                success: function(respond) {
                    // Два случая: успех и ошибка валидации на сервере
                    // Успех
                    if (respond.success == 'true') // В respond.success ключ success называется так, потому что так его отправил php-обработчик. С respond.error_type и respond.error_message аналогично
                    {
                        formInfo['successCallback'](respond);

                        // яндекс метрика, см. массив data.YM_GOALS.main_page.FORM_SUCCESS
                        if (typeof data.YM_GOALS.main_page.FORM_SUCCESS[formId] === 'undefined') {
                            console.log('Ошибка: массив data.YM_GOALS.main_page.FORM_SUCCESS сформирован не верно. Не задана цель для формы ' + formId);
                            return;
                        }
                        const goalid = data.YM_GOALS.main_page.FORM_SUCCESS[formId];
                        ym(data.YM_ID, 'reachGoal', goalid);

                        return;
                    }

                    // Ошибка
                    if (respond.success == 'false') {
                        console.log(JSON.stringify(respond));
                        if (respond.error_type == 'external_error')
                            ShowMyMessage(false);
                        $(button).html('Отправить заявку');
                        $(button).prop('disabled', false);

                        // яндекс метрика, см. массив data.YM_GOALS.main_page.FORM_ERROR
                        if (typeof data.YM_GOALS.main_page.FORM_ERROR[formId] === 'undefined') {
                            console.log('Ошибка: массив data.YM_GOALS.main_page.FORM_ERROR сформирован не верно. Не задана цель для формы ' + formId);
                            return;
                        }
                        const goalid = data.YM_GOALS.main_page.FORM_ERROR[formId];
                        ym(data.YM_ID, 'reachGoal', goalid);

                        return;
                    }

                    console.log('Не удалось распознать ответ сервера: \n' + JSON.stringify(respond));
                }

                ,
                error: function(xhr, status, error) {
                    $(button).html('Отправить заявку');
                    $(button).prop('disabled', false);
                    ShowMyMessage(false);

                    console.log('ajaxError xhr:', xhr); // выводим значения переменных
                    console.log('ajaxError status:', status);
                    console.log('ajaxError error:', error);

                    // соберем самое интересное в переменную
                    const errorInfo = 'Ошибка выполнения запроса: ' +
                        '\n[' + xhr.status + ' ' + status + ']' +
                        ' ' + error + ' \n ' +
                        xhr.responseText +
                        '<br>' +
                        xhr.responseJSON;

                    console.log('ajaxError:', errorInfo); // в консоль

                    // яндекс метрика, см. массив data.YM_GOALS.main_page.FORM_ERROR
                    if (typeof data.YM_GOALS.main_page.FORM_ERROR[formId] === 'undefined') {
                        console.log('Ошибка: массив data.YM_GOALS.main_page.FORM_ERROR сформирован не верно. Не задана цель для формы ' + formId);
                        return;
                    }
                    const goalid = data.YM_GOALS.main_page.FORM_ERROR[formId];
                    ym(data.YM_ID, 'reachGoal', goalid);
                }
            });
        });
    }

    //-----------------------------------------------------------------------
    //             Защита от ботов
    //-----------------------------------------------------------------------

    var forms_clicks = [];
    var forms_keystrokes = [];
    for (var key in forms) {
        const formInfo = forms[key];
        const formId = key;
        const formSelector = '#' + formId;
        if ($(formSelector).length === 0) { console.log("Внутренняя ошибка. Не существует указанного в массиве forms id формы"); return; }
        forms_clicks[key] = 0;
        document.querySelector(formSelector).addEventListener(
            "click",
            function(event) {
                forms_clicks[$(this).attr('id')] += 1;
            },
            true // 3й аргумент - погружение события
        );
        forms_keystrokes[key] = 0;
        document.querySelector(formSelector).addEventListener(
            "keydown",
            function(event) {
                forms_keystrokes[$(this).attr('id')] += 1;
            },
            true // 3й аргумент - погружение события
        );
    }

    //-----------------------------------------------------------------------
    //             Летающие подсказки-placeholder'ы
    //-----------------------------------------------------------------------

    // летающая подсказка-placeholder
    // Flying_Placeholder - класс обертки для label, в котором текст placeholder'а и input'а или textarea

    const wraps = document.querySelectorAll('.Flying_Placeholder');
    for (let i = 0; i < wraps.length; i++) {
        const flying_label = wraps[i].querySelector('label');
        const inp = wraps[i].querySelector("input, textarea, select");
        $(flying_label).click(function(event) {
            inp.focus();
        });

        $(inp).on("focus", function() {
            // input/textarea событие focus - фокус элемента
            $(flying_label).addClass("focus");
        });
        $(inp).on("blur", function() {
            // input/textarea событие blur - фокус снят
            if (!$(this).val() || $(this).val().trim().length == 0) {
                $(flying_label).removeClass("focus");
            }
        });

        $(inp).on("change", function() {
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
    //             Форма заявки на постоянное обслуживание - выбор тарифа и вывод цены
    //-----------------------------------------------------------------------

    // КОСТЫЛЬ. доп.улучшения кликабельности. Применятся ко всем ionRangeSlider сразу, дублировать не нужно
    function clickFix() {

        $('.irs').on('click', function(e) {
            const offset = $(this).offset();
            const x = e.pageX - offset.left;
            const y = e.pageY - offset.top;

            if (!$(this).next().data("ionRangeSlider")) return;
            if (y > $(this).height() / 2 + 25) return;
            const count = $(this).next().data("ionRangeSlider").options.values.length;
            // console.log(count);
            if (!count) return;

            const width = $(this).width();
            // console.log(width);
            if (!width) return;

            const index = Math.ceil(x * (count - 1) / width - 0.5);
            // console.log(index);

            const input = $(this).next();
            if (!input.is(e.target) && input.has(e.target).length === 0) {
                $(input).data("ionRangeSlider").update({
                    from: index,
                });
                // console.log(index);
            }
        });
    }

    // http://ionden.com/a/plugins/ion.rangeslider/start.html
    $('#tariff').ionRangeSlider({
        skin: "big",
        grid: true,
        values: (function() {
            let tariffs = [];
            for (let i = 0; i < data.tariffs.length; i++)
                tariffs.push(data.tariffs[i].name);
            return tariffs;
        }()),
        onStart: clickFix,
        onUpdate: clickFix,
    });

    // скрыть цену
    function hidePrice() {
        $('#price').addClass("chooseProjectType");
        $('#price').html("выберите тип проекта и тариф");
    }

    // показать цену
    function showPrice() {
        const projectValue = $("#project").select3("value");
        if (projectValue == '') return;
        const tariffIndex = $("#tariff").data("from");
        const myPrice = data.tariffs[tariffIndex].price[projectValue]; // price[projectIndex][tariffIndex];
        if (!myPrice) return;
        if (typeof myPrice != 'number') return;

        $('#price').removeClass("chooseProjectType");
        $('#price').html(myPrice + " руб" + "<span class='tariff_descr'> | " + data.tariffs[tariffIndex].hours + "ч/мес" + "</span>");
    }

    // проверить, что цену нужно выводить/скрывать
    function checkWhetherThePriceShouldBeDisplayed() {
        const projectValue = $("#project").select3("value");
        if (projectValue == '') // если не выбран тип проекта
            hidePrice();
        else
            showPrice();
    }

    // меняем список тарифов
    function changeTariffList() {
        const projectValue = $("#project").select3("value");
        if (projectValue == '') return;

        let tariffList = [];
        for (let i = 0; i < data.tariffs.length; i++)
            if (typeof data.tariffs[i].price[projectValue] == 'number')
                tariffList.push(data.tariffs[i].name);

        $("#tariff").data("ionRangeSlider").update({
            values: tariffList,
        });
    }

    // при загрузке
    checkWhetherThePriceShouldBeDisplayed();

    $('#project').on('select3ValueChanged', function() {
        changeTariffList();

        checkWhetherThePriceShouldBeDisplayed();
    });

    $('#tariff').on('change', function() {
        checkWhetherThePriceShouldBeDisplayed();
    });

    //-----------------------------------------------------------------------
    //             Форма заявки на пакеты - выбор даты
    //-----------------------------------------------------------------------

    // https://github.com/stefangabos/Zebra_Datepicker/
    // https://stefangabos.github.io/Zebra_Datepicker/
    const dateCal = new Date();

    $('#startPack').Zebra_DatePicker({
        direction: 7, // можно выбрать только будущее, начиная с сегодня
        format: 'd-m-Yг.', // 'd M Yг.',
        select_other_months: true,
        show_select_today: 'Сегодня',
        months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        // months_abbr			: ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'],
        days: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
        days_abbr: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        lang_clear_date: 'Очистить',
        // fast_navigation		: false,
        open_on_focus: true,
        offset: [-255, 0],

    });

    //-----------------------------------------------------------------------
    //             Форма заявки на пакеты - выбор пакета и вывод цены
    //-----------------------------------------------------------------------

    // http://ionden.com/a/plugins/ion.rangeslider/start.html
    $('#package').ionRangeSlider({
        skin: "big",
        grid: true,
        values: (function() {
            let packs = [];
            for (let i = 0; i < data.packages.length; i++)
                packs.push(data.packages[i].name);
            return packs;
        }()),
        onStart: clickFix,
        onUpdate: clickFix,
    });

    // &#160; - неразрывный пробел. Это пробел, который не переносится на другую строку.
    function changePackInfo() {
        const index = $('#package').data('from');
        let myHtml = 'пакет "' + data.packages[index].name + '": ';
        myHtml += data.packages[index].hour_price + '&#160;₽/ч';
        myHtml += ', ' + data.packages[index].hours + '&#160;ч';
        if (typeof data.packages[index].validity_period == 'number')
            myHtml += ' в&#160;течение ' + data.packages[index].validity_period + '&#160;мес';
        if (typeof data.packages[index].hours == 'number')
            myHtml += ' = ' + data.packages[index].hours * data.packages[index].hour_price + '&#160;₽/ч';
        $('#price_packForm').html(myHtml);

        if (typeof data.packages[index].validity_period != 'number') {
            $('#startPackWrap').addClass('d-none');
            forms['package_form']['fields']['startPack'] = null;
        } else {
            $('#startPackWrap').removeClass('d-none');

            forms['package_form']['fields']['startPack'] = {
                post_name: 'start_pack',
                html_name: 'startPack',
                required: true,
            };
        }
    }

    changePackInfo();
    $('#package').on('change', function() {
        changePackInfo();
    });

    //-----------------------------------------------------------------------
    //             Форма сотрудничество - выбор кол-ва проектов
    //-----------------------------------------------------------------------

    const proj_nums = ["<10", "10-30", "30-50", "50-100", ">100"];

    // http://ionden.com/a/plugins/ion.rangeslider/start.html
    $('#proj_num').ionRangeSlider({
        skin: "big",
        grid: true,
        values: proj_nums,
        onStart: clickFix,
        onUpdate: clickFix,
    });



    // https://github.com/joshua-s/jquery.nice-number
    // https://www.jqueryscript.net/form/Number-Input-Spinner-jQuery-Nice-Number.html
    $('#years_on_market').niceNumber({
        autoSize: false,
        buttonPosition: 'right'
    });

    // костыль
    $('#years_on_market').parent().find('button').on('click', function() {
        $('#years_on_market').change();
    });

    $('#staff').niceNumber({
        autoSize: false,
        buttonPosition: 'right'
    });

    // костыль
    $('#staff').parent().find('button').on('click', function() {
        $('#staff').change();
    });
});

//-----------------------------------------------------------------------
//             Виджет bitrix24
//-----------------------------------------------------------------------


$(document).ready(function() {
    function toggleWidjet() {
        if (!$('.bx-livechat-wrapper').hasClass('bx-livechat-show') && !$('.b24-widget-button-social').hasClass('b24_hover')) {
            $('.b24-widget-button-social').toggleClass('b24_adm');
        }
    }

    function toggleChat() {
        if ($('.bx-livechat-wrapper').hasClass('bx-livechat-show')) {
            $('.b24-widget-button-social-item.b24-widget-button-openline_livechat').addClass('b24-adm-unbind');
        }
        $('.bx-livechat-control-box').click(function() {
            $('.b24-widget-button-social-item.b24-widget-button-openline_livechat').removeClass('b24-adm-unbind');
        });
    }
    /*setInterval(function() {
		 toggleWidjet()
	}, 30000); */
    setTimeout(function() {
        toggleWidjet(); // первый запуск спустя 3 секунды
    }, 3000);
    $(".b24-widget-button-social").mouseover(function() {
        $(this).addClass('b24_hover');
    });
    $(".b24-widget-button-social").mouseout(function() {
        $(this).removeClass('b24_hover');
    });
    $(document).mouseup(function(e) {
        const div = $(".bx-livechat-wrapper");
        if (!div.is(e.target) && div.has(e.target).length === 0 && $('.bx-livechat-wrapper').hasClass('bx-livechat-show')) {
            $('.b24-widget-button-inner-mask').trigger('click');
            $('.b24-widget-button-social-item.b24-widget-button-openline_livechat').removeClass('b24-adm-unbind');
        }
    })
    $('.b24-widget-button-social-item.b24-widget-button-openline_livechat').click(function() {
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

/* Anchor active when clicked*/
$(function() {
    $('.btn-scroll').click(function() {
        $('.btn-scroll').not(this).removeClass('active-anchor');
        $(this).toggleClass('active-anchor');
    });
});

/* Anchor active when scrolled*/
// $(window).scroll(function () {
// 	var scrollDistance = $(window).scrollTop();

// 	$('section').each(function (i) {
// 		if ($(this).position().top <= scrollDistance ) {
// 			$('.btn-scroll').not(this).removeClass('active-anchor');
// 			$('.btn-scroll').eq(i).addClass('active-anchor');
// 		}
// 	});

// }).scroll();


//-----------------------------------------------------------------------
//           БЛОК С FAQ (аккордеон) 16.09.2019
//-----------------------------------------------------------------------
$(document).ready(function() {
    $('.faqAccordion_item_head').click(function() {
        $(this).next().slideToggle(300);
        if ($(this).find('.faqAccordion_item_head_button .fa-chevron-down').css('display') == 'none') {
            $(this).find('.faqAccordion_item_head_button .fa-chevron-down').css('display', 'block');
            $(this).find('.faqAccordion_item_head_button .fa-chevron-up').css('display', 'none');
        } else {
            $(this).find('.faqAccordion_item_head_button .fa-chevron-down').css('display', 'none');
            $(this).find('.faqAccordion_item_head_button .fa-chevron-up').css('display', 'block');
        }
    })
});
//-----------------------------------------------------------------------
//           ЯКОРЬ НА FAQ плавная прокрутка 17.09.2019
//-----------------------------------------------------------------------
$(document).ready(function() {
    $('a[href="#faqAccordion"]').click(function() {
        const target = $(this).attr('href'); // записываем атрибут в переменную
        $('html, body').animate({
            scrollTop: $(target).offset().top
        }, 1500);
    });

    const menu = document.querySelector('.menu');
    const scrollcontent = document.querySelector('.scrollcontent');
    $('.linkForCalcModal').click(function() {
        menu.classList.remove('menu-active');
        scrollcontent.classList.remove('scrollcontent_active');
        $('.hamburger').css('opacity', '1');
    });

});
//-----------------------------------------------------------------------
//           Закрытие баннеров по клику на "крестик"
//-----------------------------------------------------------------------
$(document).ready(function() {

    $('.banner_container_btnclose').click(function() {

        $('.banner_wrapper_audit').fadeOut(100);
        $('.banner_wrapper_first_month').fadeOut(100);
        $('.banner_wrapper_guarantee').fadeOut(100);
        $(this).data("closebtn", true);
    });
});
//-----------------------------------------------------------------------
//           Срочная задача
//-----------------------------------------------------------------------
$(document).ready(function() {
    function urgentTaskChecked() {
        const checked = $('#urgent-task').is(':checked');
        if (checked) {
            $(".non-urgent[for='urgent-task']").css('display', 'none');
            $(".is-urgent[for='urgent-task']").css('display', 'block');
        } else {
            $(".non-urgent[for='urgent-task']").css('display', 'block');
            $(".is-urgent[for='urgent-task']").css('display', 'none');
        }
    }
    urgentTaskChecked();
    $('#urgent-task').on('change', urgentTaskChecked);
});
//-----------------------------------------------------------------------
//          Преимущество ежемесячной поддержки
//-----------------------------------------------------------------------
$(document).ready(function() {
    $('.advantTitleForMobMonth').click(function() {
        $(this).next('.advantDescrForMobMonth').slideToggle(500);
        if ($(this).find('.advantBtnForMobMonth .fa-chevron-down').css('display') == 'none') {
            $(this).find('.advantBtnForMobMonth .fa-chevron-down').css('display', 'block');
            $(this).find('.advantBtnForMobMonth .fa-chevron-up').css('display', 'none');
        } else {
            $(this).find('.advantBtnForMobMonth .fa-chevron-down').css('display', 'none');
            $(this).find('.advantBtnForMobMonth .fa-chevron-up').css('display', 'block');
        }
    });
    // //
    $('.advantTitleForMobTariff').click(function() {
        $(this).next('.advantDescrForMobTariff').slideToggle(500);
        if ($(this).find('.advantBtnForMobTariff .fa-chevron-down').css('display') == 'none') {
            $(this).find('.advantBtnForMobTariff .fa-chevron-down').css('display', 'block');
            $(this).find('.advantBtnForMobTariff .fa-chevron-up').css('display', 'none');
        } else {
            $(this).find('.advantBtnForMobTariff .fa-chevron-down').css('display', 'none');
            $(this).find('.advantBtnForMobTariff .fa-chevron-up').css('display', 'block');
        }
    })
});
//-----------------------------------------------------------------------
//          Рандомное появление предложения на баннере
//-----------------------------------------------------------------------
$(document).ready(function() {

    // с помощью MathRandom генерируем случайное число от 0 до 0.9.
    // умножаем на 3, чтобы получить диапазон от 0 до 2.9.
    // с помощью MathFloor округлям(откидываем дробную часть) в низшую сторону, получим диапазон от 0 до 2
    // прибавляем еденицу чтобы получить диапазон от 1 до 3.
    const randomNumber = Math.floor(Math.random() * 3) + 1;
    //console.log('Рандомное число для отображения баннера: ' + randomNumber);
    /* 	function show_modal(modalSelector) {
			setTimeout(function () {
				let myvar = $('.banner_container_btnclose').data("closebtn");
				let v = $('.modal.show').length; //если показано модальное окно 1 , если нет 0
				if (v == 1) {
					console.log('Уже запущено другое модальное окно')
					return;
				} else if (myvar == true) {
					console.log('Баннер закрыт')
					return
				}
				$(modalSelector).modal("show");
				console.log('Появление модального окна')
			}, 10000);
		} */

    if (randomNumber == 1) {
        $(function() {
            $('#myFlipper_audit').flipper('init');
        });
        $('.banner_wrapper_audit').css('display', 'block');
        // show_modal("#auditModal");

    } else if (randomNumber == 2) {
        $('.banner_wrapper_first_month').css('display', 'block');
        // show_modal("#firstMonthModal");

    } else if (randomNumber == 3) {
        $('.banner_wrapper_guarantee').css('display', 'block');
        // show_modal("#guaranteeModal");
    }

    // инициализация таймера по клику на ссылку из таблицы
    $('.auditInTable').click(function() {
        $(function() {
            $('#myFlipper_audit').flipper('init');
        });
    })
    $('.profitably-color').click(function() {
        $(function() {
            $('#myFlipper_audit').flipper('init');
        });
    })
});

// установка типа тарифа/проекты(из таблицы)в зависимости от нажатой кнопки
$(document).ready(function() {
    function buttonInTable(x, y) {
        $(document).ready(function() {
            $('.button-table').click(function() {
                let a = $(this).attr(x);
                $(y).data('is-programmatically-set', true);
                $(y).data("ionRangeSlider").update({
                    from: a,
                });
            })
        });
    };
    // для кнопки для таблицы Тарифы
    buttonInTable('tariffId', '#tariff');
    // кнопки для таблицы Пакеты
    buttonInTable('packageId', '#package');
});

$(document).ready(function() {

    $('.numbers-box__list .count_proj')
        .prop('number', 0)
        .animateNumber({
                number: 100,
                duration: 5000
            },
            700
        );
    //Клиенты 60
    $('.numbers-box__list .count_clients1').animateNumber({
        number: 80,
        duration: 5000
    }, {
        easing: 'swing',
        duration: 5000
    });
    //Клиенты 70%
    $('.numbers-box__list .count_clients2').animateNumber({
        number: 90,
        duration: 5000
    }, {
        easing: 'swing',
        duration: 5000
    });
    //Реклама
    $('.numbers-box__list .count_rekl')
        .prop('number', 0)
        .animateNumber({
                number: 43,
                duration: 5000
            },
            700
        );
    //Опыт
    $('.numbers-box__list .count_exp')
        .prop('number', 0)
        .animateNumber({
                number: 14,
                duration: 5000
            },
            700
        );
    //Битрикс 6
    $('.numbers-box__list .count_bitrix1')
        .prop('number', 0)
        .animateNumber({
                number: 6,
                duration: 5000
            },
            700
        );
    //Битрикс 9
    $('.numbers-box__list .count_bitrix2')
        .prop('number', 0)
        .animateNumber({
                number: 12,
                duration: 5000
            },
            700
        );
    //Команда
    $('.numbers-box__list .count_team')
        .prop('number', 0)
        .animateNumber({
                number: 20,
                duration: 5000
            },
            700
        );
});

$(document).ready(function() {
    $('.table_accordion_header').click(function() {
        $('.table_accordion_body').slideToggle(500);
        if ($(this).find('.table_accordion_btn .fa-chevron-down').css('display') == 'none') {
            $(this).find('.table_accordion_btn .fa-chevron-down').css('display', 'block');
            $(this).find('.table_accordion_btn .fa-chevron-up').css('display', 'none');
        } else {
            $(this).find('.table_accordion_btn .fa-chevron-down').css('display', 'none');
            $(this).find('.table_accordion_btn .fa-chevron-up').css('display', 'block');
        }
    });
});

$(document).ready(function() {
    if ($(window).width() < 767) {
        $('.table_accordion_body').css('display', 'none');

    } else {
        $('.table_accordion_body').css('display', 'block');
    }
});

const smoothLinks = document.querySelector('.highlights_list_wrapper_link');
if (smoothLinks) {
    smoothLinks.addEventListener('click', function(e) {
        e.preventDefault();
        const id = smoothLinks.getAttribute('href');
        document.querySelector(id).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
};
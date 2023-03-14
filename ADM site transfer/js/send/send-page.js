/* eslint-disable quote-props */
//-----------------------------------------------------------------------
//             Точное сравнение объектов js
//-----------------------------------------------------------------------

// Используется при загрузке файлов, чтобы пользователь не смог загрузить один файл дважды.
// При попытке загрузки загруженный файл сравнивается с предыдущими. Если он уже есть, в
// его загрузке отказывается

function deepCompare() {
    let i; let l; let leftChain; let rightChain;

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
        if ((typeof x === 'function' && typeof y === 'function')
            || (x instanceof Date && y instanceof Date)
            || (x instanceof RegExp && y instanceof RegExp)
            || (x instanceof String && y instanceof String)
            || (x instanceof Number && y instanceof Number)) {
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
            }
            else if (typeof y[p] !== typeof x[p]) {
                return false;
            }
        }

        for (p in x) {
            if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
                return false;
            }
            else if (typeof y[p] !== typeof x[p]) {
                return false;
            }

            switch (typeof (x[p])) {
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

Array.prototype.unique = function () {
    const a = this.concat();
    for (let i = 0; i < a.length; ++i) {
        for (let j = i + 1; j < a.length; ++j) {
            if (deepCompare(a[i], a[j])) // было if(a[i] === a[j])
                a.splice(j--, 1);
        }
    }

    return a;
};

//-----------------------------------------------------------------------
//             Вывод всплывающих сообщений
//-----------------------------------------------------------------------

// Замена alert'у
// функция ShowMyMessage
const MyQueue = [];
// alert_message - сообщение, можно html
// bs_type - тип alert'а в bootstrap'е, влияет только на цвет, bstype = primary,
// secondary, success, danger, warning, info, light, dark
function ShowMyMessage(alert_message, bs_type) {
    if (!bs_type) bs_type = 'light';
    function ShowMessageRightNow(message, bstype) {
        // генерация случайного id
        const id = String.fromCharCode.apply(null, Date.now().toString().split('').map(function (i) { return parseInt(i) + 65; }));
        const MyDiv1 = $('<div/>', { 'id': id, 'class': 'modal fade MyAlertsClass', 'role': 'dialog', 'aria-hidden': 'true' });
        const MyDiv2 = $('<div/>', { 'class': 'modal-dialog' });
        const MyDiv3 = $('<div/>', { 'class': 'alert alert-' + bstype });
        MyDiv3.append(message);
        MyDiv2.append(MyDiv3);
        MyDiv1.append(MyDiv2);

        $('body').append(MyDiv1);
        $('#' + id).modal('show');
        $('#' + id).on('hidden.bs.modal', function (e) {
            $('#' + id).remove();
            NextMassage();
        });
    }

    MyQueue.push([alert_message, bs_type]);
    if (MyQueue.length == 1)
        NextMassage();

    function NextMassage() {
        if ($('.MyAlertsClass').length == 0)
            setTimeout(function () {
                if (MyQueue.length != 0) {
                    ShowMessageRightNow(MyQueue[0][0], MyQueue[0][1]);
                    MyQueue.shift()
                }
            }, 500);
    }
}

//-----------------------------------------------------------------------
//             Маски на телефонные номера
//-----------------------------------------------------------------------

// Маски на телефонные номера
jQuery(function ($) {
    $('#user-phone').inputmask({ mask: "+7 (999) 999-99-99", showMaskOnHover: false, });
});


$(document).ready(function () {
    'use strict';

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
        wrap.on("mousedown wheel DOMMouseScroll mousewheel keyup touchmove", function () { // добавляем обработчик события на любое действии пользователя
            wrap.stop(); // остановить анимацию
        });
        let offset = offsetFromTo(_selectorTarget, _selectorWrap);
        if (offset === false) {
            wrap.off("mousedown wheel DOMMouseScroll mousewheel keyup touchmove"); // удалить ранее добавленные обработчики событий
            return;
        }
        wrap.animate({
            scrollTop: offset - 30// $(_selectorTarget).offset().top - 30
        }, // Список свойств и значений CSS, к которым будет двигаться анимация.
            _time, // Время анимации
            function () { // Функция, вызываемая после завершения анимации
                wrap.off("mousedown wheel DOMMouseScroll mousewheel keyup touchmove"); // удалить ранее добавленные обработчики событий
            });
    }


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
        'placeholderText': 'Редакция 1С-Битрикс'
    });

    $(".contact_way").select3({
        'allowNullChoice': true,
        'multipleChoiсe': true,
        'hidePlaceholderWhenShow': true,
        'addEachValueAsDiv': true,
        'focusWhenHover': false,
        'placeholderText': 'Как связаться?'
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

    // -------------AJAX-отправка форм
    //-----------------------------------------------------------------------
    //             Загрузка файлов
    //-----------------------------------------------------------------------

    // Загруженные файлы
    let files = [];

    $('input[type="file"]').change(function () {
        // files = this.files;//старая версия

        // новая версия - важно
        for (let i = 0; i < this.files.length; i++)
            files.push(this.files[i]);

        files = files.unique();// не стандартная функция. Прописана в начале файла. Удаляет все совпадения в массиве

        $('#my_file_upload').val("123");// важно

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
            $('#my_file_upload').val("");// важно

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
            reader.onload = function (e) {
                $(p_preview).css('background-image', "url(" + e.target.result + ")");
            }
            reader.readAsDataURL(files[i]);

            p_close.append('×');
            p_close.click(function (e) {
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
    ym(data.YM_ID, 'getClientID', function (clientID) {
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
    (function () {
        if (!data || !data.YM_GOALS || !data.YM_GOALS.send_page) {
            console.error('data.YM_GOALS.send_page not found');
            return;
        }
        const requiredKeys = [
            'CLICK',
            'FORM_INPUT',
            'FORM_SUBMIT',
            'FORM_SUCCESS',
            'FORM_ERROR',
        ];
        requiredKeys.forEach(function (requiredKey) {
            if (!data.YM_GOALS.send_page[requiredKey]) {
                console.error('data.YM_GOALS.send_page. ' + requiredKey + ' not found');
            }
        });
    }());

    // вешаем цели яндекс метрики на клики
    function setClickGoals() {
        // eslint-disable-next-line no-restricted-syntax
        for (let selector in data.YM_GOALS.send_page.CLICK) {
            if (!Object.prototype.hasOwnProperty.call(data.YM_GOALS.send_page.CLICK, selector)) continue;
            if (typeof data.YM_GOALS.send_page.CLICK[selector] === 'undefined') continue;
            if ($(selector).length === 0) {
                console.log('Предупреждение: data.YM_GOALS.send_page.CLICK. При загрузке на странице нет элемента ' + selector);
            }
            let goalid = data.YM_GOALS.send_page.CLICK[selector];
            // ВАЖНО: .on() с делегированными событиями. Читай: http://qaru.site/questions/19639/click-event-doesnt-work-on-dynamically-generated-elements
            // eslint-disable-next-line no-loop-func
            $(document).on('click', selector, function () {
                ym(data.YM_ID, 'reachGoal', goalid);
            });
        }
    }
    setClickGoals();

    // вешаем цели яндекс метрики на модальные окна
    let shownGoalsInited = [];
    function setOpenModalGoals() {
        // eslint-disable-next-line no-restricted-syntax
        for (let selector in data.YM_GOALS.send_page.MODAL_SHOW) {
            if (!Object.prototype.hasOwnProperty.call(data.YM_GOALS.send_page.MODAL_SHOW, selector)) continue;
            if (typeof data.YM_GOALS.send_page.MODAL_SHOW[selector] === 'undefined') continue;

            if ($(selector).length === 0) {
                console.log('Предупреждение: data.YM_GOALS.send_page.MODAL_SHOW. При загрузке на странице нет элемента ' + selector);
            }
            let goalid = data.YM_GOALS.send_page.MODAL_SHOW[selector];
            // eslint-disable-next-line no-loop-func
            $(document).on('shown.bs.modal', selector, function () {
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
        for (let formid in data.YM_GOALS.send_page.FORM_INPUT) {
            if (!Object.prototype.hasOwnProperty.call(data.YM_GOALS.send_page.FORM_INPUT, formid)) continue;
            if (typeof data.YM_GOALS.send_page.FORM_INPUT[formid] === 'undefined') continue;

            let selector = '#' + formid;
            if ($(selector).length === 0) {
                console.log('Предупреждение: data.YM_GOALS.send_page.FORM_INPUT. При загрузке на странице нет элемента ' + selector);
            }
            let goalid = data.YM_GOALS.send_page.FORM_INPUT[formid];
            // доделать
            // eslint-disable-next-line no-loop-func
            $(document).on('input change select3ValueChanged', selector + ' input, ' + selector + ' textarea, ' + selector + ' [select3]', function () {
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
        }
        else // if (!empty)
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
        $(field).removeClass('error');					// очищаем оформление ошибок
        $(field).parent().find('.myTooltip').remove();	// очищаем сообщения ошибок
    }

    function calcFormSuccess(respond) {
        console.log(JSON.stringify(respond));
        const leadidtext = (respond.leadid) ? 'Номер Вашей заявки ' + respond.leadid + ". " : "";
        if (!respond.leadid)
            console.log('Не удалось получить id лида');
        ShowMyMessage("Спасибо за заявку! " + leadidtext + "В ближайшее время наш менеджер свяжется с Вами для уточнения деталей.", '');
        if (respond.leadid) {
            $("#calculateTheCostModal .calculation-form__btn").html(leadidtext); // ИСПРАВИТЬ
            // $('[data-toggle="modal"]').html(leadidtext); //2 кнопки вызова всплывающей формы
        }
    }


    function addFilesField(formData) {
        $.each(files, function (key, value) {
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
        const navData = JSON.parse(JSON.stringify(_navigator));// чтобы преобразовать все в строку и отбросить функции и процую шелупонь

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

    const forms = {
        // Форма РАССЧИТАТЬ ЗАДАЧУ
        'send_page_calc_form': { // id формы - должен быть = атрибуту id тэга form нужной формы
            // successCallback - функция, вызываемая в случае успешной регистрации формы в bitrix24. Принимает 1 аргумент - ответ сервера (rest.php)
            successCallback: calcFormSuccess,
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
            fields: [
                {
                    post_name: "files",		// имя отправки на сервер
                    callback: addFilesField,// если поля в html нет, функция, значение которой присвоить
                    callbackFormData: true,			// если надо не просто присвоить полю значение из callback, а в callback надо отправить formData и вернуть formData
                },
                {// мера защиты
                    post_name: "my_file_upload",	// имя отправки на сервер
                    html_name: "my_file_upload",	// имя поля в html
                },
                {
                    post_name: "site",		// имя отправки на сервер
                    html_name: "site-name",	// имя поля в html
                    required: true,			// Валидация. Равно true, если поле обязательно для заполнения.
                    regex: /^(http(s)?:\/\/)?([a-zA-Z0-9\u0410-\u044f\u0401\u0451]{1}[-a-zA-Z0-9\u0410-\u044f\u0401\u0451]{0,254}[a-zA-Z0-9\u0410-\u044f\u0401\u0451]{1}[.]{0,1}){1,}[.]{1}([a-zA-Z0-9\u0420\u0424\u0440\u0444]{1}[-a-zA-Z0-9\u0420\u0424\u0440\u0444]{0,6}[a-zA-Z0-9\u0420\u0424\u0440\u0444]{1}){1}([:/?#]{1}([-a-zA-Z0-9\u0410-\u044f\u0401\u0451@:%_+.~#?&/=$!*'()\[\],]{0,})){0,}$/i, // писал сам, https://regexr.com/4kco1
                    errorMessage: "сайт заполнен неверно",	// Валидация. Сообщение об ошибки, если не прошло валидацию regex
                },
                {
                    post_name: "bitrix",
                    html_name: "bitrix",
                    required: false,
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
    };

    // ---17.09.19---ДОСЮДА

    // -------------AJAX-отправка форм
    for (var key in forms) {
        const formSelector = '#' + key;
        if ($(formSelector).length === 0) { console.log("Внутренняя ошибка. Не существует указанного в массиве forms id формы"); continue }

        // событие SUBMIT
        $(formSelector).submit(function (event) {
            event.stopPropagation(); // Прекращаем дальнейшую передачу текущего события.
            event.preventDefault(); // Запрещаем стандартное поведение для кнопки submit

            const formId = $(this).attr("id");// получаем id формы
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
                                scrollToElem(fieldSelector, 500, window); // скроллим к нему
                            }
                        }
                }
            }

            if (!formIsValid)
                return;
            // Валидация - конец


            let formData = new FormData();

            for (var k in formInfo['fields']) {
                const item = formInfo['fields'][k];
                if (item && item['post_name']) {
                    if (item['dependence']) {
                        const fieldName = item['dependence'];
                        const fieldSelector = formSelector + " " + "[name='" + fieldName + "']";
                        // значение того, поля, от заполнения которого зависит, будет ли добавлено текущее поле
                        const value = /* ($(fieldSelector).data("ionRangeSlider") && $(fieldSelector).data("from"))
                                        ||*/ ($(fieldSelector).is(':checkbox') && $(fieldSelector).is(':checked').toString())
                                        || (!$(fieldSelector).is(':checkbox') && $(fieldSelector).val())
                                        || $(fieldSelector).select3("value");
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
                    }
                    else if (item['html_name']) {
                        const fieldName = item['html_name'];
                        const fieldSelector = formSelector + " " + "[name='" + fieldName + "']";
                        let value = /* ($(fieldSelector).data("ionRangeSlider") && $(fieldSelector).data("from"))
                                        || */ ($(fieldSelector).is(':checkbox') && $(fieldSelector).is(':checked').toString())
                                        || (!$(fieldSelector).is(':checkbox') && $(fieldSelector).val())
                                        || $(fieldSelector).select3("value");
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

            // яндекс метрика, см. массив data.YM_GOALS.send_page.FORM_SUBMIT
            if (typeof data.YM_GOALS.send_page.FORM_SUBMIT[formId] === 'undefined') {
                console.log('Ошибка: массив data.YM_GOALS.send_page.FORM_SUBMIT сформирован не верно. Не задана цель для формы ' + formId);
                return;
            }
            const goalid = data.YM_GOALS.send_page.FORM_SUBMIT[formId];
            ym(data.YM_ID, 'reachGoal', goalid);

            // AJAX
            $.ajax({
                type: "POST",
                url: "../ajax/rest.php",
                data: formData,
                cache: false,
                processData: false, // NEEDED, DON'T OMIT THIS
                contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
                dataType: 'json',
                success: function (respond) {
                    // Два случая: успех и ошибка валидации на сервере
                    // Успех
                    if (respond.success == 'true') // В respond.success ключ success называется так, потому что так его отправил php-обработчик. С respond.error_type и respond.error_message аналогично
                    {
                        formInfo['successCallback'](respond);

                        // яндекс метрика, см. массив data.YM_GOALS.send_page.FORM_SUCCESS
                        if (typeof data.YM_GOALS.send_page.FORM_SUCCESS[formId] === 'undefined') {
                            console.log('Ошибка: массив data.YM_GOALS.send_page.FORM_SUCCESS сформирован не верно. Не задана цель для формы ' + formId);
                            return;
                        }
                        const goalid = data.YM_GOALS.send_page.FORM_SUCCESS[formId];
                        ym(data.YM_ID, 'reachGoal', goalid);

                        return;
                    }

                    // Ошибка
                    if (respond.success == 'false') {
                        console.log(JSON.stringify(respond));
                        if (respond.error_type == 'external_error')
                            ShowMyMessage(respond.error_message, 'danger');
                        $(button).html('Отправить заявку');
                        $(button).prop('disabled', false);

                        // яндекс метрика, см. массив data.YM_GOALS.send_page.FORM_ERROR
                        if (typeof data.YM_GOALS.send_page.FORM_ERROR[formId] === 'undefined') {
                            console.log('Ошибка: массив data.YM_GOALS.send_page.FORM_ERROR сформирован не верно. Не задана цель для формы ' + formId);
                            return;
                        }
                        const goalid = data.YM_GOALS.send_page.FORM_ERROR[formId];
                        ym(data.YM_ID, 'reachGoal', goalid);

                        return;
                    }

                    console.log('Не удалось распознать ответ сервера: \n' + JSON.stringify(respond));
                }

                , error: function (xhr, status, error) {
                    $(button).html('Отправить заявку');
                    $(button).prop('disabled', false);
                    ShowMyMessage('Не удалось отправить заявку. Попробуйте еще раз через некоторое время или свяжитесь с нами по контактному номеру', 'danger');

                    console.log('ajaxError xhr:', xhr); // выводим значения переменных
                    console.log('ajaxError status:', status);
                    console.log('ajaxError error:', error);

                    // соберем самое интересное в переменную
                    const errorInfo = 'Ошибка выполнения запроса: '
                        + '\n[' + xhr.status + ' ' + status + ']'
                        + ' ' + error + ' \n '
                        + xhr.responseText
                        + '<br>'
                        + xhr.responseJSON;

                    console.log('ajaxError:', errorInfo); // в консоль

                    // яндекс метрика, см. массив data.YM_GOALS.send_page.FORM_ERROR
                    if (typeof data.YM_GOALS.send_page.FORM_ERROR[formId] === 'undefined') {
                        console.log('Ошибка: массив data.YM_GOALS.send_page.FORM_ERROR сформирован не верно. Не задана цель для формы ' + formId);
                        return;
                    }
                    const goalid = data.YM_GOALS.send_page.FORM_ERROR[formId];
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
            function (event) {
                forms_clicks[$(this).attr('id')] += 1;
            },
            true // 3й аргумент - погружение события
        );
        forms_keystrokes[key] = 0;
        document.querySelector(formSelector).addEventListener(
            "keydown",
            function (event) {
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
});


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

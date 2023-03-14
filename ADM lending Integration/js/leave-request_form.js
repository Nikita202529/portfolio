/* eslint-disable quote-props */
//-----------------------------------------------------------------------
//             Плавная смена картинок
//-----------------------------------------------------------------------
$(function(){
    let transTime = 8000;
    let numBgColors = $('.bg-highlights-grad').length;
    // let numBgColorsActive = $('.bg-highlights-grad.active');
    let bgtrans = setInterval(function(){
    if($('.bg-highlights-grad.active').index() == (numBgColors -1)){
    $('.bg-highlights-grad.active').removeClass('active');
    $('.bg-highlights-grad').eq(0).addClass('active');
    }else{
    let curIndex = $('.bg-highlights-grad.active').index();
    $('.bg-highlights-grad.active').removeClass('active');
    $('.bg-highlights-grad').eq(curIndex+1).addClass('active');
    }
    },transTime);
    });



//-----------------------------------------------------------------------
//             Плавная смена картинок - конец
//-----------------------------------------------------------------------

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
        //             Форма заявки на постоянное обслуживание - выбор тарифа и вывод цены
        //-----------------------------------------------------------------------

        // КОСТЫЛЬ. доп.улучшения кликабельности. Применятся ко всем ionRangeSlider сразу, дублировать не нужно
        function clickFix() {

            $('.irs').on('click', function (e) {
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
        
//-----------------------------------------------------------------------
//             Показать все сервисы/Скрыть все сервисы
//-----------------------------------------------------------------------
const oneTimeWorkItem = document.querySelectorAll('.one-time-work_item');

// показать все блоки
function showAllOneTimeWorkItem() {
    for (let i = 0; i < oneTimeWorkItem.length; i++) {
        oneTimeWorkItem[i].style.display = '';
    }
}

const PHONE_BLOCKS_COUNT = 3;
const PLANCHET_BLOCKS_COUNT = 6;

// показать первые x блоков
function showOneTimeWorkItem(x) {
    for (let i = 0; i < oneTimeWorkItem.length; i++) {
        if (i >= x) {
            oneTimeWorkItem[i].style.display = 'none';
            continue;
        }

        oneTimeWorkItem[i].style.display = '';
    }
}

// функция на показ количества блоков в зависимости от начальной ширины экрана
function showItem() {
    if (window.innerWidth <= 500) {
        showOneTimeWorkItem(PHONE_BLOCKS_COUNT);
        return;
    }
    if (window.innerWidth >= 501 && window.innerWidth <= 846) {
        showOneTimeWorkItem(PLANCHET_BLOCKS_COUNT);
        return;
    }
    showAllOneTimeWorkItem();
}

$(window).on('load resize', showItem);

// по клику меняем текст и выполняются функции, которые описаны чуть выше
$(document).ready(function () {
    $('.service-link').click(function () {
        if (!$(this).data('status')) {
            $(this).html('Скрыть \&#187;');
            $(this).data('status', true);
            showAllOneTimeWorkItem();
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
        // e.stopPropagation();

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
    //            End - Меню
    //-----------------------------------------------------------------------



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

    //плавный скролл до элемента с указанным селектором.
    //скролится внутри элемента с селектором _selectorWrap. Если не указан, по умолчанию страница
    //скролится до элемента с селектором _selectorTarget
    //время скрола в миллисекундах.
    
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

    //Плавная прокрутка
    //Элемент, после нажатия на который прокручивается должен иметь класс "btn-scroll", а в href должна быть ссылка на якорь



    $('.btn-scroll').click(function () {
        const destinationSelector = $(this).attr("href");
        scrollToElem(destinationSelector, 1500);
        // Hide menu when mobile
        if (($(window).width() <= 845)) {
            hideMenu();
        }
    });

    /* Якорь активен при нажатии кнопки*/
    $(function () {
        $('.btn-scroll').click(function () {
            $('.btn-scroll').not(this).removeClass('active-anchor');
            $(this).toggleClass('active-anchor');
        });
    });

    /* Якорь активен при прокрутке*/
    $(window).scroll(function () {
        var scrollDistance = $(window).scrollTop();

        $('section').each(function (i) {
            if ($(this).position().top <= scrollDistance ) {
                $('.btn-scroll').not(this).removeClass('active-anchor');
                $('.btn-scroll').eq(i).addClass('active-anchor');
            }
        });
    });

    //-----------------------------------------------------------------------
    //             End - Плавная прокрутка
    //-----------------------------------------------------------------------


    //-----------------------------------------------------------------------
    //             Маски на телефонные номера
    //-----------------------------------------------------------------------

    jQuery(function ($) {
        $('#more-about_user-phone').inputmask({ mask: "+7 (999) 999-99-99", showMaskOnHover: false, });
        $('#user-phone').inputmask({ mask: "+7 (999) 999-99-99", showMaskOnHover: false, });
        $('#user-phone-modal').inputmask({ mask: "+7 (999) 999-99-99", showMaskOnHover: false, });
        $("#user-phone_packForm").inputmask({ mask: "+7 (999) 999-99-99", showMaskOnHover: false, });
    });

    //-----------------------------------------------------------------------
    //             End - Маски на телефонные номера
    //-----------------------------------------------------------------------

    //-----------------------------------------------------------------------
    //             Летающие подсказки-placeholder'ы
    //-----------------------------------------------------------------------

    // летающая подсказка-placeholder
    //Flying_Placeholder - класс обертки для label, в котором текст placeholder'а и input'а или textarea

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
    //             End - Летающие подсказки-placeholder'ы
    //-----------------------------------------------------------------------


    //-----------------------------------------------------------------------
    //             свайп по окну
    //-----------------------------------------------------------------------

	$( window ).on( "swipeleft", function( e ) {
		e.stopPropagation();
		hideMenu();
	} );

	$( window ).on( "swiperight", function( e ) {
		e.stopPropagation();
		showMenu();
	} );

    //-----------------------------------------------------------------------
    //             End - свайп по окну
    //-----------------------------------------------------------------------

    //--------------------------------------------------------------- 
    // ----Select3(Как связаться)------------------------------------
    // --------------------------------------------------------------


    (function( $ ) {
        //--------------------------
        //      ОТСЮДА
        //--------------------------
        function privateselect3(domObj, params)
        {
            var _this = this;
            //------------------------
            //Задаем входные параметры
            //------------------------
        
            //Значения по умолчанию
            let _optionsWrapClass = 'S3_OptionsWrap';
            let _optionClass = 'S3_Option';
            let _mainDisplayClass = 'S3_MainDisplay';
            let _arrowClass = 'S3_Arrow';
            let _mDisplay_n_ArrowWrapClass = 'S3_MainDisplay_n_ArrowWrap';
            let _placeholderClass = 'S3_Placeholder';
            let _eachValueWrapperClass = 'S3_EachValueWrapper';
            let _hiddenOptionsWrapClass = 'hide';
            let _multipleChoiсe = false;
            let _allowNullChoice = false;
            let _focusWhenHover = true;//всегда..
            let _hideOnDisplayClick = true;
            let _hidePlaceholderWhenShow = false; //поумолчаниюtrue
            let _addEachValueAsDiv = false;
            let _placeholderText = "";
        
            //Пользовательские значения
            if (params)
            {
                if (params.optionsWrapClass)
                    _optionsWrapClass = params.optionsWrapClass;
                if (params.mainDisplayClass)
                    _mainDisplayClass = params.mainDisplayClass;
                if (params.arrowClass)
                    _arrowClass = params.arrowClass;
                if (params.mDisplay_n_ArrowWrapClass)
                    _mDisplay_n_ArrowWrapClass = params.mDisplay_n_ArrowWrapClass;
                if (params.placeholderClass)
                    _placeholderClass = params.placeholderClass;
                if (params.eachValueWrapperClass)
                    _eachValueWrapperClass = params.eachValueWrapperClass;
                if (params.hiddenOptionsWrapClass)
                    _hiddenOptionsWrapClass = params.hiddenOptionsWrapClass;
        
                if (params.multipleChoiсe === true)
                    _multipleChoiсe = true;
                else
                    _multipleChoiсe = false;
        
                if (params.allowNullChoice === true)
                    _allowNullChoice = true;
                else
                    _allowNullChoice = false;
        
                if (params.focusWhenHover === false)
                    _focusWhenHover = false;
                else
                    _focusWhenHover = true;
        
                if (params.hideOnDisplayClick === false)
                    _hideOnDisplayClick = false;
                else
                    _hideOnDisplayClick = true;
        
                if (params.hidePlaceholderWhenShow === true)
                    _hidePlaceholderWhenShow = true;
                else
                    _hidePlaceholderWhenShow = false;
        
                if (params.addEachValueAsDiv === true)
                    _addEachValueAsDiv = true;
                else
                    _addEachValueAsDiv = false;
        
                if (params.placeholderText)
                    _placeholderText = params.placeholderText;
            }
        
            //------------------------
            //Вспомогательные функции
            //------------------------
        
            //создает элемент по заданному outerHTML
            function createElement(elementOuterHTML)
            {
                var e = document.createElement('div');
                e.innerHTML = elementOuterHTML;
                return e.childNodes;
            }
        
            //сменить тег элемента на указанный
            function switchTag(e, toTag) {
                var outerHTML = e.outerHTML.replace(/(\r\n|\n|\r)/gm, ""); // удалить все символы переноса строки
                outerHTML = outerHTML.replace(/^<([a-z]*)(.*?)>(.*)<\/\1>$/ig, '<' + toTag + '$2>$3</' + toTag + '>');
                return createElement(outerHTML);
            };
        
            //первый элемент, удовлетворяющий заданному селектору
            let select3 = domObj;
        
            let DS3 = switchTag(select3, 'div');
        
            $(DS3).attr("select3", "");
        
            let AllOption3s = $(DS3).find('option');
            $(DS3).empty();
        
            //окно, в которое выводится результат
            let MainDisplay = document.createElement('div');
            $(MainDisplay).attr("class", _mainDisplayClass);
            $(MainDisplay).attr("tabindex", 0);
            //обертка для списка
            let OptionsWrap = document.createElement('div');
            $(OptionsWrap).attr("class", _optionsWrapClass);
            //placeholder
            let placeholder = document.createElement('div');
            $(placeholder).attr("class", _placeholderClass);
            $(placeholder).append(_placeholderText);
        
            //событие изменения значения. Подготовка события. select3ValueChanged
            var _select3ValueChangedEvent = document.createEvent('Event'); // Создание события
            _select3ValueChangedEvent.initEvent('select3ValueChanged', true, true); // Назначить имя событию
        
            //событие список показан. Подготовка события. select3Shown
            var _select3ShownEvent = document.createEvent('Event'); // Создание события
            _select3ShownEvent.initEvent('select3Shown', true, true); // Назначить имя событию
        
            //событие список скрыт. Подготовка события. select3Shown
            var _select3HiddenEvent = document.createEvent('Event'); // Создание события
            _select3HiddenEvent.initEvent('select3Hidden', true, true); // Назначить имя событию
        
            //Массив выбранных индексов, array[int], формируется в порядке добавления индексов. НЕ предусматривается, что может быть равен null
            var _selectedIndices = [];//Для реализации управления клавиатурой (клавишами ↑ и ↓) и не только. Для атрибута select3-index (причем нумерация с разницей в единицу)

            function checkOnIndex(index) //вспомогательная. Для реализации управления клавиатурой (клавишами ↑ и ↓). 
            {
                if (index < 0 || index > AllOption3s.length - 1) return;
                let qs = "." + _optionsWrapClass + " ." + _optionClass + "[select3-index = '" + (index + 1) + "']";
                let opt = $(DS3).find(qs)[0];
                if (!opt) return;
                chooseOption(opt); //eventFire(opt, 'click');
                if (hideState === false)
                    focusOnIndex(index); //сфокусироваться на выбранном элементе
            }
            // нестатическая Функция CheckOnIndex(int index>=0) экземпляра select3
            _this.CheckOnIndex = function (index)
            {
                checkOnIndex(index);
            }
        
            function focusOnIndex(index) //вспомогательная. Для реализации управления клавиатурой (клавишами ↑ и ↓). 
            {
                if (index < 0 || index > AllOption3s.length - 1) return;
                let qs = "." + _optionsWrapClass + " ." + _optionClass + "[select3-index = '" + (index + 1) + "']";
                let opt = $(DS3).find(qs)[0];
                opt.focus();
                //opt.scrollIntoView(); //прокрутить полосу прокрутки обертки до этого элемента (срабатывает само по умолчанию, но не всегда)
            }
        
            var value = "";
            // нестатическая Функция Value() экземпляра select3
            _this.Value = function () {
                return value;
            };
        
            //обновляет innerHTML и value у MainDisplay
            function changeMainDisplay()
            {
                let innerHTMLtext = "";
                let valueText = ""; //строка со значениями через запятую
                let valuesArr = []; //массив значений (для _addEachValueAsDiv)
                let indArr = []; //массив соответствующих значениям индексов элементов списка
                let sortedSelectedIndices = _selectedIndices.slice(0); //клонируем массив
                sortedSelectedIndices.sort(function(a, b) { return a - b; }); //сортируем. Без функции сортировки отсортирует как символы
        
                //готовим значения innerHTML и value, записывая в переменные innerHTMLtext и valueText
                for (let so3i = 0; so3i < sortedSelectedIndices.length; so3i++)
                {
                    let index = sortedSelectedIndices[so3i];
                    let qs = "." + _optionsWrapClass + " ." + _optionClass + "[select3-index = '" + (index + 1) + "']";
                    let opt = $(DS3).find(qs)[0];
        
                    if (!$(opt).hasClass(_hiddenOptionsWrapClass)) //если элемент не скрыт
                    {
                        //добавляем innerHTML
                        innerHTMLtext += (innerHTMLtext == "") ? opt.innerHTML : ", " + opt.innerHTML;
        
                        //добавляем value
                        let valAttr = $(opt).attr('value');
                        let val = (typeof valAttr != typeof undefined && valAttr != false) ? valAttr : opt.innerHTML;
                        valueText += (valueText == "") ? val : ", " + val;
                        valuesArr.push(val); //массив значений (для _addEachValueAsDiv)
                        indArr.push(index); //массив исходных индексов
                    }
                }
        
                value = valueText;
        
                $(MainDisplay).empty(); //очищаем innerHTML
                $(MainDisplay).attr("value", ""); //очищаем value
        
                 //добавляем подготовленные значения
                if (_addEachValueAsDiv)
                {
                    for (let vd3i = 0; vd3i < valuesArr.length; vd3i++)
                    {
                        let valDiv = document.createElement('div');
                        $(valDiv).attr("class", _eachValueWrapperClass);
        
                        $(valDiv).attr("select3-option-index", (indArr[vd3i] + 1));
                        $(valDiv).append(valuesArr[vd3i]);
                        $(MainDisplay).append(valDiv);
                    }
                }
                else
                {
                    $(MainDisplay).append(innerHTMLtext);
                }
                $(MainDisplay).attr("value", valueText);
        
                DS3.data('select3-value', valueText); //для val()
        
                if (_hidePlaceholderWhenShow === false)
                {
                    $(placeholder).removeClass(_hiddenOptionsWrapClass);
                }
                if (valueText || innerHTMLtext)
                        $(placeholder).addClass(_hiddenOptionsWrapClass);
            }
        
            //последний сфокусированный элемент списка
            var lastFocusedOption = null;
        
            //var _this = this;
        
            //Выбирает нужный элемент списка.
            //Эффект как от щелчка по нему
            //opt - элемент списка
            function chooseOption(opt)
            {
                if ($(opt).hasClass(_hiddenOptionsWrapClass)) return; //если элемент скрыт, его нельзя выбрать
        
                let indAttr = $(opt).attr('select3-index');
                let clickedIndex = (typeof indAttr != typeof undefined && indAttr != false) ? indAttr - 1 : -1; //Разница в 1 !!!!
                if (clickedIndex == -1) return;
                let ValueChanged = (_selectedIndices.length == 0 || _selectedIndices.indexOf(clickedIndex) == -1);
        
                if (ValueChanged == false)
                {
                    if (_allowNullChoice === true || ((_multipleChoiсe === true) && (_selectedIndices.length > 1)))
                    {
                        //снять вывыбор, если выбран повторно
                        $(opt).removeAttr('checked');
        
                        //Убираем индекс элемента из _selectedIndices
                        _selectedIndices.splice(_selectedIndices.indexOf(clickedIndex), 1);
        
                        changeMainDisplay();
        
                        //открывает список (вызывая соб. focused)
                        hide();
        
                        //Вызов события select3ValueChanged, т.к. значение изменилось (стало null, если _multipleChoiсe == false, стало другим или null, если _multipleChoiсe == true)
                        DS3[0].dispatchEvent(_select3ValueChangedEvent);
                    }
                }
                else if (ValueChanged == true)
                {
                    //не зависит от _allowNullChoice
        
                        if (_multipleChoiсe === false)
                        {
                            $(opt).parent().children().removeAttr('checked'); //если _multipleChoiсe == false
                        }
                        opt.setAttribute('checked', '');
        
        
                        //Меняем _selectedIndices
                        if (_multipleChoiсe === false)
                        {
                            _selectedIndices = []; //если _multipleChoiсe == false
                        }
                        _selectedIndices.push(clickedIndex);
        
                        changeMainDisplay();
        
                        hide();
        
                        //Вызов события select3ValueChanged
                        DS3[0].dispatchEvent(_select3ValueChangedEvent);
                }
            }
        
            for (let option3i = 0; option3i < AllOption3s.length; option3i++)
            {
                let option3 = AllOption3s[option3i];
        
                let DO3 = switchTag(option3, 'div');
                $(DO3).addClass(_optionClass);
                $(DO3).attr("select3-option", 'true');
                $(DO3).attr("tabindex", 0);
                $(DO3).attr("select3-index", option3i + 1); // собственный аттрибут индекса. Вспомогательный. Для реализации управления клавиатурой (клавишами ↑ и ↓). Для _selectedIndices.
                //select3-index = selectedIndex + 1. !!!!!!!   selectedIndex = select3-index - 1 !!! - КОСТЫЛЬ--------------
        
                //Для lastFocusedOption (для того, чтобы зафиксировать последний сфокусированный элемент списка)
                $(DO3).on("focus", function () {
                    lastFocusedOption = this;
                });
        
                if (_focusWhenHover)
                {
                    $(DO3).on("mouseenter", function () {
                        this.focus();
                    });
                }
        
                //если у option атрибута 'value' нет, то ставим этот атрибут равным innerHTML
                let ValueAttr = $(DO3).attr('value');
                if (typeof ValueAttr == typeof undefined || ValueAttr == false)
                    $(DO3).attr("value", DO3[0].innerHTML);
        
                $(DO3).on("click", function () {
                    chooseOption(this);
                });
                $(OptionsWrap).append(DO3);
            }
        
            let MainDisplay_n_ArrowWrap = document.createElement('div');
            $(MainDisplay_n_ArrowWrap).attr("class", _mDisplay_n_ArrowWrapClass);
        
            //стрелка показать/скрыть
            let arrow = document.createElement('div');
            $(arrow).attr("class", _arrowClass);
        
            $(MainDisplay_n_ArrowWrap).append(arrow);
        
            //placeholder
            $(MainDisplay_n_ArrowWrap).append(placeholder);
        
            //=true, если список скрыт, = false иначе
            let hideState;// = true;
        
            function show() {
                let hideStateChanged = (hideState !== false);
                hideState = false;
                $(OptionsWrap).removeClass(_hiddenOptionsWrapClass);
                $(arrow).removeClass(_hiddenOptionsWrapClass);
                $(MainDisplay).removeClass(_hiddenOptionsWrapClass);
                //Сфокусироваться на последнем выбранном индексе, а если выбранных индексов нет, то сфокусироваться на первом
                let indToFocus = (_selectedIndices.length == 0) ? 0 : _selectedIndices[_selectedIndices.length - 1];
                focusOnIndex(indToFocus);
        
                if (_hidePlaceholderWhenShow === true)
                    $(placeholder).addClass(_hiddenOptionsWrapClass);
        
                if (hideStateChanged === true)
                    DS3[0].dispatchEvent(_select3ShownEvent); //Вызов события select3Shown
            };
            // нестатическая Функция Show() экземпляра select3
            _this.Show = function ()
            {
                show();
            }
        
            function hide() {
                let hideStateChanged = (hideState !== true);
                hideState = true;
                $(OptionsWrap).addClass(_hiddenOptionsWrapClass);
                $(arrow).addClass(_hiddenOptionsWrapClass);
                $(MainDisplay).addClass(_hiddenOptionsWrapClass);
        
                if (hideStateChanged === true)
                    DS3[0].dispatchEvent(_select3HiddenEvent); //Вызов события select3Hidden
        
                if (_hidePlaceholderWhenShow === true)
                    if (!value)
                        $(placeholder).removeClass(_hiddenOptionsWrapClass);
            };
            // нестатическая Функция Show() экземпляра select3
            _this.Hide = function ()
            {
                hide();
            }
        
            //скроет список, если он открыт, и откроет, если он скрыт
            function toggle() {
                if (hideState == true)
                    show();
                else
                    hide();
            };
            // нестатическая Функция Toggle() экземпляра select3
            _this.Toggle = function ()
            {
                toggle();
            }
        
        
            //возвращает общее количество элементов списка
            function optsCount() {
                return AllOption3s.length;
            }
            // нестатическая Функция OptsCount() экземпляра select3
            _this.OptsCount = function ()
            {
                return optsCount();
            }
        
            //при multipleChoiсe==false вернет только 1 целое число >= 0 - индекс выбранного элемента,
            // и -1, если ни один элемент не выбран.
            //При multipleChoiсe==true вернет просто массив выбранных индексов, если выбранных нет то пустой массив
            function selectedIndex()
            {
                if (_multipleChoiсe === false)
                {
                    let qs = "." + _optionsWrapClass + " ." + _optionClass + "[checked]";
                    let opt = $(DS3).find(qs)[0];
                    if (!opt)
                        return -1;
                    let indexAttr = $(opt).attr('select3-index'); //ищем у него аттрибут select3-index
                    if (typeof indexAttr != typeof undefined && indexAttr != false)
                        return indexAttr - 1;
                    else
                        return -1;
                }
                else
                if (_multipleChoiсe === true)
                {
                    let qs = "." + _optionsWrapClass + " ." + _optionClass + "[checked]";
                    let opts = $(DS3).find(qs);
                    if (opts.length == 0)
                        return [];
                    var selectedIndexes = [];
                    for (let o3i = 0; o3i < opts.length; o3i++)
                    {
                        let opt = opts[o3i];
                        let indexAttr = $(opt).attr('select3-index'); //ищем у него аттрибут select3-index
                        if (typeof indexAttr != typeof undefined && indexAttr != false)
                            selectedIndexes.push(indexAttr - 1);
                    }
                    return selectedIndexes;
                }
            }
            // нестатическая Функция SelectedIndex() экземпляра select3
            _this.SelectedIndex = function ()
            {
                return selectedIndex();
            }
        
            //скроет элемент списка (добавить ему класс hiddenOptionsWrapClass), index>=0
            function hideOnIndex(index)
            {
                if (index < 0 || index > AllOption3s.length - 1) return;
                let qs = "." + _optionsWrapClass + " ." + _optionClass + "[select3-index = '" + (index + 1) + "']";
                let opt = $(DS3).find(qs)[0];
                if (!opt) return;
        
                //если HideOnIndex применится к выбранному элементу, то выбор снимается.
                let indexAttr = $(opt).attr('checked'); //ищем у него аттрибут select3-index
                if (typeof indexAttr != typeof undefined && indexAttr != false)
                {
                    $(opt).addClass(_hiddenOptionsWrapClass);
        
                    $(opt).removeAttr('checked');
                    changeMainDisplay();
        
                    //Вызов события select3ValueChanged
                    DS3[0].dispatchEvent(_select3ValueChangedEvent);
                }
                else
                {
                    $(opt).addClass(_hiddenOptionsWrapClass);
                }
            }
            // нестатическая Функция HideOnIndex() экземпляра select3
            _this.HideOnIndex = function (index)
            {
                hideOnIndex(index);
            }
        
            //уберет класс hiddenOptionsWrapClass с элемента по заданному индексу, index>=0
            function showOnIndex(index)
            {
                if (index < 0 || index > AllOption3s.length - 1) return;
                let qs = "." + _optionsWrapClass + " ." + _optionClass + "[select3-index = '" + (index + 1) + "']";
                let opt = $(DS3).find(qs)[0];
                if (!opt) return;
        
                $(opt).removeClass(_hiddenOptionsWrapClass);
            }
            // нестатическая Функция ShowOnIndex() экземпляра select3
            _this.ShowOnIndex = function (index)
            {
                showOnIndex(index);
            }
        
            $(arrow).on("click", function (event) {
                event.stopPropagation();
                toggle();
            });
        
            $(MainDisplay_n_ArrowWrap).append(MainDisplay);
            $(DS3).append(MainDisplay_n_ArrowWrap);
            $(DS3).append(OptionsWrap);
        
            hide();
        
            $(MainDisplay_n_ArrowWrap).on("click", function () {
                        if (!_hideOnDisplayClick)
                            show();
                        else
                            toggle();
                        });
        
            $(select3).parent().append(DS3);
            DS3 = $(select3).parent().find("." + _mDisplay_n_ArrowWrapClass).parent();//КОСТЫЛЬ
            $(select3).remove();
        
            // Если click вне элемента - список скрывается
            document.addEventListener('click', function( e ) {
                let target = e.target;
        
                let its_select3 = target == DS3[0] || DS3[0].contains(target);
        
                if (!its_select3)
                    hide();
            });
        
        
        
            //Управление клавиатурой
            DS3.attr('tabindex', '0');
            DS3.on('keydown', function(event) {
        
                if (hideState == true) //если список скрыт
                {
                    if (event.keyCode == "9") /*tab*/
                    {
                        show();
                        event.stopPropagation();
                        event.preventDefault();
                    }
                    else if (event.keyCode == "13" /*enter*/
                                || event.keyCode == "38" /*up*/
                                || event.keyCode == "37" /*left*/
                                || event.keyCode == "40" /*down*/
                                || event.keyCode == "39" /*right*/)
                    {
                        show();
                    }
                }
                else if (hideState == false) //если список открыт
                {
                    if (event.keyCode == "13") //enter
                    {
                        let opt = lastFocusedOption; //ищем элемент с фокусом (при открытии обязательно сфокусируется на какой-то option)
                        let indexAttr = $(opt).attr('select3-index'); //ищем у него аттрибут select3-index
                        if (typeof indexAttr != typeof undefined && indexAttr != false)
                            checkOnIndex(indexAttr - 1);
                    }
        
                    if (event.keyCode == "38" /*up*/
                        || event.keyCode == "37" /*left*/)
                    {
                        let opt = lastFocusedOption; //ищем элемент с фокусом (при открытии обязательно сфокусируется на какой-то option)
                        let indexAttr = $(opt).attr('select3-index'); //ищем у него аттрибут select3-index
                        if (typeof indexAttr != typeof undefined && indexAttr != false)
                            focusOnIndex((indexAttr - 1) - 1);
                    }
        
                    if (event.keyCode == "40" /*down*/
                        || event.keyCode == "39" /*right*/)
                    {
                        let opt = lastFocusedOption; //ищем элемент с фокусом (при открытии обязательно сфокусируется на какой-то option)
                        let indexAttr = $(opt).attr('select3-index'); //ищем у него аттрибут select3-index
                        if (typeof indexAttr != typeof undefined && indexAttr != false)
                            focusOnIndex((indexAttr - 1) + 1);
                    }
                }
            });
        
            //Выбрать те элементы списка, которые уже отмечены checked
            let qs = "." + _optionClass + "[checked]";
            let newOptions = OptionsWrap.querySelectorAll(qs);
            for (let o3i = 0; o3i < newOptions.length; o3i++)
            {
                let opt = newOptions[o3i];
                let checkedAttr = $(opt).attr('checked'); //ищем у него аттрибут checked
                if (typeof checkedAttr != typeof undefined && checkedAttr != false)
                {
                    let indexAttr = $(opt).attr('select3-index'); //ищем у него аттрибут select3-index
                    if (typeof indexAttr != typeof undefined && indexAttr != false)
                        checkOnIndex((indexAttr - 1));
                }
            }
        
            $(DS3).data('select3', this);
        }
        //--------------------------
        //      ДОСЮДА
        //--------------------------
        
            var methods = {
                init : function( params ) { return this.each(function(){
                   new privateselect3(this, params);
        
                });},
                show : function( ) { return this.each(function(){
                    let data = $(this).data('select3');
                    if (!data) return;  //элемент не является select3
        
                    data.Show();
                });},
                hide : function( ) { return this.each(function(){
                    let data = $(this).data('select3');
                    if (!data) return;  //элемент не является select3
        
                    data.Hide();
                });},
                toggle : function( ) { return this.each(function(){
                    let data = $(this).data('select3');
                    if (!data) return;  //элемент не является select3
        
                    data.Toggle();
                });},
                value : function( ) {
                    //..применять к this[0]
                    let data = $(this[0]).data('select3');
                    if (!data) return;  //элемент не является select3
        
                    return data.Value();
                },
                //выбрать индекс/снять выбор с индекса
                //..было CheckOnIndex
                select : function( index ) { return this.each(function( index ){
                    let data = $(this).data('select3');
                    if (!data) return;  //элемент не является select3
        
                    data.CheckOnIndex( index );
                });},
                //массив выбранных индексов
                //..было SelectedIndex
                selected : function( ) {
                    //..применять к this[0]
                    let data = $(this[0]).data('select3');
                    if (!data) return;  //элемент не является select3
        
                    return data.SelectedIndex();
                },
                //..было HideOnIndex
                /**
                 * скрыть option по его индексу
                 * @param {number} index integer, index >= 0
                 */
                hideOpt : function( index ) {
                    //..применять к this[0]
                    let data = $(this[0]).data('select3');
                    if (!data) return;  //элемент не является select3
        
                    return data.HideOnIndex( index );
                },
                //..было ShowOnIndex
                /**
                 * показать скрытый option по его индексу
                 * @param {number} index integer, index >= 0
                 */
                showOpt : function( index ) {
                    //..применять к this[0]
                    let data = $(this[0]).data('select3');
                    if (!data) return;  //элемент не является select3
        
                    return data.ShowOnIndex( index );
                },
            };
        
            $.fn.select3 = function( method ) {
                // логика вызова метода
                if ( methods[method] ) {
                return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
                } else if ( typeof method === 'object' || ! method ) {
                return methods.init.apply( this, arguments );
                } else {
                $.error( 'Метод с именем ' +  method + ' не существует для jQuery.select3' );
                }
            };
        
          })( jQuery );


    //--------------------------------------------------------------- 
    // ----End-Select3(Как связаться)--------------------------------
    // --------------------------------------------------------------

    
    //-----------------------------------------------------------------------
    //             Кастомные списки
    //-----------------------------------------------------------------------


    $(".contact_way").select3({
        'allowNullChoice': true,
        'multipleChoiсe': true,
        'hidePlaceholderWhenShow': true,
        'addEachValueAsDiv': true,
        'focusWhenHover': false,
        'placeholderText': 'Как связаться?'
    });

    // /* костыли для кастомного списка*/
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
    //             Валидация форм
    //-----------------------------------------------------------------------
    // Функция валидации поля на форме
    // Параметры:
    //  querySelector	- string. Селектор поля (input, textarea, select3)
    //  required		- boolean. Равен true, если поле является обязательным для заполнения
    //  regex			- объект RegExp. Необязательный. Регулярное выражение для проверки.
    //  errorMessage	- string. Необязательный. Сообщение, если значение поля не соответствует regex
    function checkField(querySelector, required, regex, errorMessage) {
        // получаем поле
        const field = document.querySelector(querySelector);
    // if (!field) { console.log('Ошибка в функции checkField. Несуществующий querySelector'); return true; };
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
            else // если пустое, но обязательное
            {
                displayErrorMessage(querySelector, 'обязательное поле'); // то вывод сообщения, что поле является обязательным
                return false;
            }
        } 
        else {
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
            $("#budget-calculation .leave-request__btn").html(leadidtext); // ИСПРАВИТЬ
        }
    }

    function calcFormSuccess(respond) {
        console.log(JSON.stringify(respond));
        const leadidtext = (respond.leadid) ? 'Номер Вашей заявки ' + respond.leadid + ". " : "";
        if (!respond.leadid)
            console.log('Не удалось получить id лида');
        ShowMyMessage("Спасибо за заявку! " + leadidtext + "В ближайшее время наш менеджер свяжется с Вами для уточнения деталей.", '');
        if (respond.leadid) {
            $("#more-about_wrap .more-about__btn").html(leadidtext); // ИСПРАВИТЬ
        }
    }
  

    function packFormSuccess(respond) {
        console.log(JSON.stringify(respond));
        const leadidtext = (respond.leadid) ? 'Номер Вашей заявки ' + respond.leadid + ". " : "";
        if (!respond.leadid)
            console.log('Не удалось получить id лида');
        ShowMyMessage("Спасибо за заявку! " + leadidtext + "В ближайшее время наш менеджер свяжется с Вами для уточнения деталей.", '');
        if (respond.leadid) {
            $("#ModalPackage .button.popup-form__btn").html(leadidtext); // ИСПРАВИТЬ
            $('[data-toggle="modal"]').html(leadidtext); //2 кнопки вызова всплывающей формы
        }
    }

    function addFilesField(formData) {
        $.each(files, function (key, value) {
            formData.append('files' + key, value);
        });
        return formData;
    }

    const forms = {
        // Форма РАССЧИТАТЬ ЗАДАЧУ

            // id формы - должен быть = атрибуту id тэга form нужной формы
            // successCallback - функция, вызываемая в случае успешной регистрации формы в bitrix24. Принимает 1 аргумент - ответ сервера (rest.php)
            // fields - описание полей формы. Порядок тех полей, которые проходят валидацию (required == true или задан regex) здесь важен - он должен соответствовать их порядку в html
            // post_name * - имя поля, с которым оно будет отправлено на сервер. Обязат.
            // html_name - атрибут name тега input, textarea, select или select3. Необяз, вместо него можно указать callback
            // callback - функция, значение которой будет присвоено полю. необяз, вместо него можно указать html_name
            // callbackFormData - если надо не просто присвоить полю значение из callback, а в callback надо отправить formData и вернуть formData
            // dependence - не отправлять поле, если не заполнено другое поле (указать html_name этого поля)
            // required - поле формы обязательно для заполнения
            // regex - регулярное выражение для валидации поля. Необязательное
            // errorMessage - сообщение, если значение поля не соответствует regex. Необязательное
            'more-about': {  
                successCallback: calcFormSuccess,
                buttonSelector: ".more-about__btn",// селектор кнопки submit в форме
                fields: [
                    {
                        post_name: "name",
                        html_name: "more-about_user-name",
                        required: true,
                    },
                    {
                        post_name: "phone",
                        html_name: "more-about_user-phone",
                        required: true,
                        regex: /^(\+7|7|8)+(([0-9,\s,\-,\(,\)]){10,16})$/, 
                        errorMessage: "телефон заполнен неверно",
                    },
                    {
                        post_name: "way_to_contact",
                        html_name: "more-about-contact_way",
                        dependence: "user-phone",
                    },{
                        post_name: "mail",
                        html_name: "user-mail_more-about",
                        required: true,
                        regex: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
                        errorMessage: "некорректный e-mail",
                    }
                ],
            },
            'leave-request': {  
            successCallback: calcFormSuccess,
            buttonSelector: ".leave-request__btn",// селектор кнопки submit в форме
            fields: [
                {
                    post_name: "name",
                    html_name: "user-name",
                    required: true,
                },
                {
                    post_name: "phone",
                    html_name: "user-phone",
                    required: true,
                    regex: /^(\+7|7|8)+(([0-9,\s,\-,\(,\)]){10,16})$/, 
                    errorMessage: "телефон заполнен неверно",
                },
                {
                    post_name: "way_to_contact",
                    html_name: "leave-request-contact_way",
                    dependence: "user-phone",
                },
                {
                    post_name: "comment",
                    html_name: "site-problem",
                    required: false,
                },
                {
                    post_name: "select_service",
                    html_name: "select_service",
                    required: true,
                }
            ],
        },
        'package_form': {
            successCallback: packFormSuccess,
            modalSelector: "#ModalPackage",
            buttonSelector: ".button.popup-form__btn",
            fields: [
                {
                    post_name: "name",
                    html_name: "user-name_packForm",
                    required: true,
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
                    required: true,
                    regex: /^(\+7|7|8)+(([0-9,\s,\-,\(,\)]){10,16})$/, // писал сам
                    errorMessage: "телефон заполнен неверно",
                },
                {
                    post_name: "way_to_contact",
                    html_name: "contact-way_packForm",
                    dependence: "user-phone_packForm",
                },
                {
                    post_name: "tariffs",
                    html_name: "tariffs",
                    required: true,
                }
            ],
        },
    };

    // Редактирование
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
                                const scrollWrapSelector = formInfo['modalSelector'] + " " + ".modal-dialog";
                                scrollToElem(fieldSelector, 500, scrollWrapSelector); // скроллим к нему
                            }
                        }
                }
            }

            if (!formIsValid)
                return;
    //-----------------------------------------------------------------------
    //             End - Валидация форм
    //-----------------------------------------------------------------------
             // закрываем модальное окно
            // $(formInfo['modalSelector']).modal('hide');

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

            // // добавляем яндекс-метрику
            // const ymClientID = getYmClientID();
            // if (ymClientID) {
            //     formData.append('ym_ClientID', ymClientID);
            // }

            // добавляем c и k
            formData.append('c', forms_clicks[formId]);
            formData.append('k', forms_keystrokes[formId]);

            // конец ФОРМИРОВАНИЕ МАССИВА ДЛЯ ОТПРАВКИ

            const button = $(this).find(formInfo['buttonSelector']);
            $(button).html('Форма отправлена');
            $(button).prop('disabled', true);

            //// яндекс метрика, см. массив data.YM_GOALS_FORM_SUBMIT

            // if (typeof data.YM_GOALS_FORM_SUBMIT[formId] === 'undefined') {
            //     console.log('Ошибка: массив data.YM_GOALS_FORM_SUBMIT сформирован не верно. Не задана цель для формы ' + formId);
            //     return;
            // }
            // const goalid = data.YM_GOALS_FORM_SUBMIT[formId];
            // ym(data.YM_ID, 'reachGoal', goalid);

    //         AJAX
            $.ajax({
                type: "POST",
                url: "./ajax/rest.php",
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

                        // // яндекс метрика, см. массив data.YM_GOALS_FORM_SUCCESS
                        // if (typeof data.YM_GOALS_FORM_SUCCESS[formId] === 'undefined') {
                        //     console.log('Ошибка: массив data.YM_GOALS_FORM_SUCCESS сформирован не верно. Не задана цель для формы ' + formId);
                        //     return;
                        // }
                        // const goalid = data.YM_GOALS_FORM_SUCCESS[formId];
                        // ym(data.YM_ID, 'reachGoal', goalid);

                        return;
                    }

                    // Ошибка
                    if (respond.success == 'false') {
                        console.log(JSON.stringify(respond));
                        if (respond.error_type == 'external_error')
                            ShowMyMessage(respond.error_message, 'danger');
                        $(button).html('Отправить заявку');
                        $(button).prop('disabled', false);

                        // // яндекс метрика, см. массив data.YM_GOALS_FORM_ERROR
                        // if (typeof data.YM_GOALS_FORM_ERROR[formId] === 'undefined') {
                        //     console.log('Ошибка: массив data.YM_GOALS_FORM_ERROR сформирован не верно. Не задана цель для формы ' + formId);
                        //     return;
                        // }
                        // const goalid = data.YM_GOALS_FORM_ERROR[formId];
                        // ym(data.YM_ID, 'reachGoal', goalid);

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

                    // // яндекс метрика, см. массив data.YM_GOALS_FORM_ERROR
                    // if (typeof data.YM_GOALS_FORM_ERROR[formId] === 'undefined') {
                    //     console.log('Ошибка: массив data.YM_GOALS_FORM_ERROR сформирован не верно. Не задана цель для формы ' + formId);
                    //     return;
                    // }
                    // const goalid = data.YM_GOALS_FORM_ERROR[formId];
                    // ym(data.YM_ID, 'reachGoal', goalid);
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
        //             Форма заявки на пакеты - выбор пакета и вывод цены
        //-----------------------------------------------------------------------

    // http://ionden.com/a/plugins/ion.rangeslider/start.html
    $('#tariffs').ionRangeSlider({
        skin: "big",
        grid: true,
        values: (function () {
            let mytarifs = [];
            for (let i = 0; i < data.tariffs.length; i++)
            mytarifs.push(data.tariffs[i].name);
            return mytarifs;
        }()),
        onStart: clickFix,
        onUpdate: clickFix,
    });

    // function changePackInfo() {
    //     let myHtml = data.tariffs.tarifs_price;
    //     const index = $('#tariffs').data('from');
    //     myHtml = data.tariffs[index].tarifs_price + ' ';
    //     myHtml += '<span class="tariff_descr">' + 'руб/мес' + '</span>';
    //     $('#price').html(myHtml);
        
    // }

    // changePackInfo();
    // $('#tariffs').on('change', function () {
    //     changePackInfo();
    // });

    // установка типа тарифа/проекты(из таблицы)в зависимости от нажатой кнопки
    $(document).ready(function () { 
        function buttonInTable(x, y) {
            $(document).ready(function () {
                $('.button-table').click(function () {
                    let a = $(this).attr(x);
                    $(y).data('is-programmatically-set', true);
                    $(y).data("ionRangeSlider").update({
                        from: a,
                    });
                })
            });
        };
        // для кнопки для таблицы Тарифы
        buttonInTable('tariffId', '#tariffs');
    });

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
    });
}).scroll();
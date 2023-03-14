//https://habr.com/ru/post/158235/
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

	//генерирует click по элементу
	//Используется для checkOnIndex
	/*
	function eventFire(el, etype){ //взято с https://stackoverflow.com/questions/2705583/how-to-simulate-a-click-with-javascript
		if (el.fireEvent) {
			el.fireEvent('on' + etype);
			} else {
			var evObj = document.createEvent('Events');
			evObj.initEvent(etype, true, false);
			el.dispatchEvent(evObj);
		}
	}
	*/
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

	/*
	//при фокусе на весь элемент $(queryselector) сразу откроется и сфокусируется на первом
	$(queryselector).on('focus', function(event) {
		//Сфокусироваться на последнем выбранном индексе, а если выбранных индексов нет, то сфокусироваться на первом
		//let indToFocus = (_selectedIndices.length == 0) ? 0 : _selectedIndices[_selectedIndices.length - 1];
		show();
		//focusOnIndex(indToFocus);
	});
	*/

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
            // тут "this" - это элемент дерева DOM

            /*
            let data = [];

            // Создаём настройки по-умолчанию, расширяя их с помощью параметров, которые были переданы
            let settings = $.extend( {
            'multiple'              : false,
            'allowNullChoice'       : false, //..allowNullChoice
            'placeholder'           : "", //..placeholderText
            'separateVals'          : false, //..addEachValueAsDiv
            'focusOptionOnHover'    : true, //..focusWhenHover
            'hidePlaceholderOnShow' : true,
            'hideOnDisplayClick'    : false,//..НОВЫЙ
            'hideClass'             : 'hide',
            'optionClass'           : 'S3_Option',
            'optsWrapClass'         : 'S3_OptionsWrap',
            'arrowClass'            : 'S3_Arrow',
            'mainDisplayClass'      : 'S3_MainDisplay',
            'mDispl&ArrowWrapClass' : 'S3_MainDisplay_n_ArrowWrap',
            'placeholderClass'      : 'S3_Placeholder',
            'valueClass'            : 'S3_EachValueWrapper',
            }, params);

            data.settings = settings;

            $(this).data('select3', data);
            */

           //let mySelect3 = new privateselect3(this, params);
           //$(this).data('select3', mySelect3);
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
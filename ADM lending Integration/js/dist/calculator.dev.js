"use strict";

var globalThis = void 0;
/* eslint-disable prefer-const */
// eslint-disable-next-line func-names

(function ($) {
  /**
   * Является ли значение числом
   * @param {mixed} num
   * @return {boolen} boolen
   */
  function isNumeric(num) {
    return !isNaN(num);
  } // https://stackoverflow.com/questions/469357/html-text-input-allow-only-numeric-input
  // Restricts input for the given textbox to the given inputFilter.


  function setInputFilter(textbox, inputFilter) {
    ['input', 'keydown', 'keyup', 'mousedown', 'mouseup', 'select', 'contextmenu', 'drop'].forEach(function (event) {
      textbox.addEventListener(event, function () {
        if (inputFilter(this.value)) {
          this.oldValue = this.value;
          this.oldSelectionStart = this.selectionStart;
          this.oldSelectionEnd = this.selectionEnd;
        } else if (this.hasOwnProperty('oldValue')) {
          this.value = this.oldValue;
          this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
        }
      });
    });
  }
  /**
   * Создание нового элемента DOM из строки HTML
   * @param {string} htmlString - строка с html, из которого создать DOM-элемент
   * @return {DOM} Возвращает DOM-элемент
   */


  function createElementFromHTML(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    return div.firstChild;
  }
  /**
   * Переводит кол-во часов из дробного числа в строку вида
   * "23 часа 15 минут" или "1 час" или "30 минут"
   * @param {number} hours - вещественное количество часов
   * @return {string} Время в часах и минутах с правильным падежом часов
   */


  function hToHmStr(hours) {
    var h = Math.floor(hours);
    var m = (hours - h) * 60;
    var str = ''; // eslint-disable-next-line no-restricted-globals

    if (isNaN(h) || isNaN(m) || h === 0 && m === 0) {
      str = '0 часов';
    } else {
      if (h !== 0) {
        str += h + ' ';

        if (h % 100 > 10 && h % 100 < 20) {
          str += 'часов';
        } else {
          switch (h % 10) {
            case 1:
              str += 'час';
              break;

            case 2:
            case 3:
            case 4:
              str += 'часа';
              break;

            default:
              str += 'часов';
              break;
          }
        }

        str += ' ';
      }

      if (m !== 0) {
        str += m + ' минут';
      }
    }

    return str;
  }

  function Calculator() {
    var calculatorThis = this;
    calculatorThis.calculatorData = null;
    var calculator = document.getElementById('calculator');
    var rowTemplate = calculator.querySelector('#calculator_row');
    var table = calculator.querySelector('.CalcTable .CalcBody');
    var addBtn = calculator.querySelector('.CalcTable .CalcFooter .CalcRow');
    var resultWrap = calculator.querySelector('.result');
    var requestBtn = calculator.querySelector('.requestBtn');
    var idnum = 0;

    function DisableCloseButtonIfNeed() {
      var rows = $(table).find('[data-dynamic-row="true"]');
      var closeButton = $(rows[0]).find('.close');

      if (rows.length === 1) {
        closeButton.attr('close-disabled', 'true');
      } else {
        closeButton.attr('close-disabled', 'false');
      }
    }

    function UpdateAllSelects() {
      var rows = $(table).find('[data-dynamic-row="true"]');
      var selectedServices = [];

      for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        var select = $(row).find('.serviceList')[0];
        var val = $(select).select3('value'); // $(select).val();

        if (Object.prototype.hasOwnProperty.call(data.services, val)) {
          selectedServices.push(val);
        }
      }

      for (var _i = 0; _i < rows.length; _i++) {
        var _row = rows[_i];
        var _select = $(_row).find('.serviceList')[0];
        var options = $(_select).find('[select3-option="true"]'); // $(select).find('option');

        for (var j = 0; j < options.length; j++) {
          var option = options[j];

          var _val = $(option).attr('value'); // $(option).val();
          // if (val) {


          $(_select).select3('showOpt', j); // $(option).attr('disabled', false);

          if (!$(option).attr('checked')) {
            // !$(option).is(':selected')) {
            if (selectedServices.indexOf(_val) !== -1) {
              $(_select).select3('hideOpt', j); // $(option).attr('disabled', true);
            }
          } // }

        }
      }
    }
    /**
     * Проверка всех введенных полей.
     * Вывод сообщения об ошибке, если не валидны.
     * @param {boolean} allowEmpty - Разрешены ли пустые значения
     * @return {boolean} Возвращает boolean: true, если все поля валидны; иначе false.
     */


    function validateAll(allowEmpty) {
      var valid = true;
      var rows = $(table).find('[data-dynamic-row="true"]'); // Проверка на то, что все поля заполнены

      if (!allowEmpty) {
        for (var i = 0; i < rows.length; i++) {
          var row = rows[i];
          var select = $(row).find('.serviceList')[0];
          var selectVal = $(select).select3('value'); // $(select).val();

          $(resultWrap).removeClass('error');

          if (allowEmpty || selectVal.trim() === '') {
            $(resultWrap).addClass('error');
            $(resultWrap).html('Заполните все поля');
            $(resultWrap).append($('<div>', {
              "class": 'errorDescription',
              text: i === rows.length - 1 ? 'В нижней строке не выбрана услуга' : ''
            }));
            return false;
          }

          var amount = $(row).find('.amount')[0];
          var inputVal = $(amount).val();
          $(resultWrap).removeClass('error');

          if (allowEmpty || inputVal.trim() === '') {
            $(resultWrap).addClass('error');
            $(resultWrap).html('Заполните все поля');
            $(resultWrap).append($('<div>', {
              "class": 'errorDescription',
              text: 'В строке "' + selectVal + '" не выбрано количество'
            }));
            return false;
          }
        }
      } // Проверка содержимого input'ов


      for (var _i2 = 0; _i2 < rows.length; _i2++) {
        var _row2 = rows[_i2];
        var _select2 = $(_row2).find('.serviceList')[0];

        var _selectVal = $(_select2).select3('value'); // $(select).val();


        var _amount = $(_row2).find('.amount')[0];

        var _inputVal = $(_amount).val();

        $(resultWrap).removeClass('error');

        if (!/^\d*$/.test(_inputVal) || _inputVal.trim() !== '' && parseInt(_inputVal, 10) < 1) {
          $(resultWrap).addClass('error');
          $(resultWrap).html('Заполните поля правильно');
          $(resultWrap).append($('<div>', {
            "class": 'errorDescription',
            text: 'В строке ' + (_selectVal ? '"' + _selectVal + '"' : _i2) + ' количество заполнено неверно'
          }));
          return false;
        }
      } // /^\d*$/.test(value) && (value === '' || parseInt(value, 10) >= 1)


      return valid;
    }
    /**
     * @return {number} Возвращает вещественное кол-во часов
     */


    function calcHours() {
      var count = 0;
      var rows = $(table).find('[data-dynamic-row="true"]');

      for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        var select = $(row).find('.serviceList')[0];
        var selectVal = $(select).select3('value').trim(); // $(select).val().trim();

        if (selectVal !== '' && typeof data.services[selectVal] !== 'undefined') {
          var amount = $(row).find('.amount')[0];
          var inputVal = $(amount).val();
          var amountNum = Number(inputVal);
          var hoursNum = Number(data.services[selectVal]);
          count += amountNum * hoursNum;
        }
      }

      return count;
    }
    /**
     * Если калькулятор показал тариф, то показать и кнопку 'Оставить заявку'
     * @param {number} tariffIndex - индекс тарифа
     */


    function showRequestButton(tariffIndex) {
      $(requestBtn).attr('data-tariffIndex', tariffIndex);
      $(requestBtn).removeClass('d-none');
    }

    $(requestBtn).on('click', function () {
      var tariffIndex = $(this).attr('data-tariffIndex');
      var tariffIndexNum = Number(tariffIndex); // Скрыть текущую форму

      $('#ModalCalculator').modal('hide'); // Выбрать нужный тариф на форме заявки

      $('#tariff').data('ionRangeSlider').update({
        from: tariffIndexNum
      }); // Показать форму заявки

      $('#ModalLong').modal('show');
    }); // скрыть кнопку 'Оставить заявку'

    function hideRequestButton() {
      $(requestBtn).addClass('d-none');
    }
    /**
     * Возвращает данные для отправки на сервер
     * @return {string} Строка в формате JSON
     */


    function getFormData() {
      var result = {};
      var rows = $(table).find('[data-dynamic-row="true"]');

      for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        var select = $(row).find('.serviceList')[0];
        var selectVal = $(select).select3('value'); // $(select).val();

        var amount = $(row).find('.amount')[0];
        var inputVal = $(amount).val();

        if (selectVal !== '') {
          result[selectVal] = inputVal;
        }
      }

      if (!$.isEmptyObject(result)) {
        result['Оценка трудозатрат'] = calcHours();
        return JSON.stringify(result);
      }

      return null;
    }
    /**
     * Возвращает тариф, подходящий под указанное кол-во часов
     * @param {number} hours - Общее количество часов на выбранные пользователем услуги
     * @return {string} Название тарифа
     */


    function calcTariff(hours) {
      if (hours === 0 || typeof hours === 'undefined') {
        return '';
      }

      var str = ''; // список допустимых тарифов

      var validTariffs = []; // eslint-disable-next-line no-restricted-syntax

      for (var prop in data.tariffs) {
        if (Object.prototype.hasOwnProperty.call(data.tariffs, prop)) {
          if (data.tariffs[prop]) {
            validTariffs.push(data.tariffs[prop].name);
          }
        }
      } // удаление тарифов, которые не подходят


      for (var i = 0; i < validTariffs.length; i++) {
        var tariffHours = data.tariffs[i].hours;

        if (isNumeric(tariffHours)) {
          if (hours > tariffHours) {
            validTariffs[i] = null;
          }
        }
      } // выбрать самый дешевый из оставшихся


      var minHours = Number.MAX_VALUE;
      var resultTariff = '';
      var tariffIndex = -1;

      for (var _i3 = 0; _i3 < validTariffs.length; _i3++) {
        if (validTariffs[_i3] !== null) {
          var _tariffHours = data.tariffs[_i3].hours;

          if (_tariffHours < minHours) {
            minHours = _tariffHours;
            tariffIndex = _i3;
            resultTariff = data.tariffs[_i3].name;
          }
        }
      }

      if (resultTariff === '') {
        str += 'Среди тарифов нет подходящего. Ваши потребности превышают лимиты самого дорогого тарифа';
      } else {
        str += 'Вам походит тариф: ';
        str += resultTariff;
        showRequestButton(tariffIndex);
        /*
        str += ', ';
        str += minPrice;
        str += '&#160;₽/мес';
        */
      }

      return str;
    }
    /**
     * @return {string} Возвращает строку результата.
     */


    function calcResult() {
      var str = '';
      var hours = calcHours();
      str += 'Объем трудозатрат:';
      str += '&#160;&#160;&#160;'; // &#160; - неразрывный пробел.

      str += hToHmStr(hours);
      $(resultWrap).html(str);
      $(resultWrap).append($('<div>', {
        text: calcTariff(hours),
        "class": 'tariff'
      }));
    }
    /**
     * Вывод результата
     */


    function ShowResult(allowEmpty) {
      hideRequestButton();
      calculatorThis.calculatorData = null;
      if (!validateAll(allowEmpty)) return;
      var result = calcResult();
      calculatorThis.calculatorData = getFormData(); // вывод
    }
    /**
     * Добавит пустую строку выбора услуги
     */


    function addNewTemplate() {
      if (!validateAll(false)) {
        return;
      }

      idnum += 1;
      var row = createElementFromHTML(rowTemplate.innerHTML);
      var closeBtn = $(row).find('.close')[0];
      var service = $(row).find('.serviceList')[0];
      var amount = $(row).find('.amount')[0];
      var action = $(row).find('.action')[0];
      $(row).attr('data-dynamic-row', 'true');
      $(row).attr('data-row-id', idnum);
      $(action).attr('data-row-id', idnum);
      $(service).attr('data-row-id', idnum);
      $(amount).attr('data-row-id', idnum);
      $(closeBtn).attr('data-row-id', idnum);
      $(action).on('click', function () {
        var id = $(this).attr('data-row-id');
        var myRow = $(table).find('[data-dynamic-row="true"][data-row-id="' + id + '"]');
        var myService = $(myRow).find('.serviceList')[0];
        myService.focus();
      });
      /*
      {
          let opt = document.createElement('option');
          opt.value = '';
          opt.innerHTML = 'Выберите услугу...';
          $(opt).attr('selected', true);
          $(opt).attr('disabled', true);
          service.appendChild(opt);
      } */
      // eslint-disable-next-line no-restricted-syntax

      for (var prop in data.services) {
        if (Object.prototype.hasOwnProperty.call(data.services, prop)) {
          var opt = document.createElement('option');
          opt.value = prop;
          opt.innerHTML = prop;
          service.appendChild(opt);
        }
      }

      $(service).select3({
        placeholderText: 'Выберите услугу...'
      });
      service = $(row).find('.serviceList')[0]; // КОСТЫЛЬ после применения ОЧЕНЬ плохого плагина

      $(service).on('select3ValueChanged', function () {
        // $(service).on('change', function () {
        UpdateAllSelects();
        ShowResult(false);
      });
      /*
      $(service).find('option').on('click', function () {
          $(this).blur();
          $(this).parent().blur();
      });
      */

      $(closeBtn).on('click', function () {
        var rows = $(table).find('[data-dynamic-row="true"]');

        if (rows.length === 1) {
          return;
        }

        var id = $(this).attr('data-row-id');
        var myRow = $(table).find('[data-dynamic-row="true"][data-row-id="' + id + '"]');
        $(myRow).remove();
        DisableCloseButtonIfNeed();
        ShowResult(false);
      }); // https://github.com/joshua-s/jquery.nice-number
      // https://www.jqueryscript.net/form/Number-Input-Spinner-jQuery-Nice-Number.html

      $(amount).niceNumber({
        autoSize: false,
        buttonPosition: 'around',
        buttonDecrement: '−' // настоящий символ минуса, а не тире

      });
      setInputFilter(amount, function (value) {
        return /^\d*$/.test(value) && (value === '' || parseInt(value, 10) >= 1);
      });
      $(amount).on('focus', function () {
        $(this).parent().addClass('focused');
      });
      $(amount).on('blur', function () {
        $(this).parent().removeClass('focused');
      });
      $(amount).keydown(function (e) {
        var val = $(this).val();
        if (!isNumeric(val)) return;

        switch (e.keyCode) {
          case 37: // left

          case 38:
            // up
            $(this).val(Number(val) + 1);
            break;

          case 39: // right

          case 40:
            // down
            $(this).val(Number(val) - 1);
            break;

          default:
            break;
        }
      });
      var oldVal = $(amount).val();
      $(amount).on('input', function () {
        if (oldVal !== $(amount).val()) {
          ShowResult(false);
        }

        oldVal = $(amount).val();
      });
      table.appendChild(row);
      DisableCloseButtonIfNeed();
      UpdateAllSelects();
      ShowResult(true);
    }

    addNewTemplate();
    $(addBtn).click(addNewTemplate);
  }

  document.addEventListener('DOMContentLoaded', function () {
    globalThis.calculator = new Calculator();
  }); // eslint-disable-next-line no-undef
})(jQuery);
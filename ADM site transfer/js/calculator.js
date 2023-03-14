const globalThis = this;
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
    }

    // https://stackoverflow.com/questions/469357/html-text-input-allow-only-numeric-input
    // Restricts input for the given textbox to the given inputFilter.
    function setInputFilter(textbox, inputFilter) {
        ['input', 'keydown', 'keyup', 'mousedown', 'mouseup', 'select', 'contextmenu', 'drop'].forEach(function(event) {
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
        const div = document.createElement('div');
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
        const h = Math.floor(hours);
        const m = (hours - h) * 60;

        let str = '';
        // eslint-disable-next-line no-restricted-globals
        if (isNaN(h) || isNaN(m) || (h === 0 && m === 0)) {
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
        const calculatorThis = this;
        calculatorThis.calculatorData = null;
        const calculator = document.getElementById('calculator');
        const rowTemplate = calculator.querySelector('#calculator_row');
        const table = calculator.querySelector('.CalcTable .CalcBody');
        const addBtn = calculator.querySelector('.CalcTable .CalcFooter .CalcRow');
        const resultWrap = calculator.querySelector('.result');
        const requestBtn = calculator.querySelector('.requestBtn');
        let idnum = 0;

        function DisableCloseButtonIfNeed() {
            const rows = $(table).find('[data-dynamic-row="true"]');
            const closeButton = $(rows[0]).find('.close');
            if (rows.length === 1) {
                closeButton.attr('close-disabled', 'true');
            } else {
                closeButton.attr('close-disabled', 'false');
            }
        }

        function UpdateAllSelects() {
            const rows = $(table).find('[data-dynamic-row="true"]');

            let selectedServices = [];
            for (let i = 0; i < rows.length; i++) {
                let row = rows[i];
                let select = $(row).find('.serviceList')[0];
                let val = $(select).select3('value'); // $(select).val();
                if (Object.prototype.hasOwnProperty.call(data.services, val)) {
                    selectedServices.push(val);
                }
            }

            for (let i = 0; i < rows.length; i++) {
                let row = rows[i];
                let select = $(row).find('.serviceList')[0];
                let options = $(select).find('[select3-option="true"]'); // $(select).find('option');

                for (let j = 0; j < options.length; j++) {
                    let option = options[j];
                    let val = $(option).attr('value');// $(option).val();
                    // if (val) {
                    $(select).select3('showOpt', j); // $(option).attr('disabled', false);
                    if (!$(option).attr('checked')) { // !$(option).is(':selected')) {
                        if (selectedServices.indexOf(val) !== -1) {
                            $(select).select3('hideOpt', j); // $(option).attr('disabled', true);
                        }
                    }
                    // }
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
            let valid = true;

            const rows = $(table).find('[data-dynamic-row="true"]');

            // Проверка на то, что все поля заполнены
            if (!allowEmpty) {
                for (let i = 0; i < rows.length; i++) {
                    let row = rows[i];
                    let select = $(row).find('.serviceList')[0];
                    let selectVal = $(select).select3('value'); // $(select).val();
                    $(resultWrap).removeClass('error');
                    if (allowEmpty || selectVal.trim() === '') {
                        $(resultWrap).addClass('error');
                        $(resultWrap).html('Заполните все поля');
                        $(resultWrap).append($('<div>', {
                            class: 'errorDescription',
                            text: (i === rows.length - 1) ? 'В нижней строке не выбрана услуга' : '',
                        }));
                        return false;
                    }
                    let amount = $(row).find('.amount')[0];
                    let inputVal = $(amount).val();
                    $(resultWrap).removeClass('error');
                    if (allowEmpty || inputVal.trim() === '') {
                        $(resultWrap).addClass('error');
                        $(resultWrap).html('Заполните все поля');
                        $(resultWrap).append($('<div>', {
                            class: 'errorDescription',
                            text: 'В строке "' + selectVal + '" не выбрано количество',
                        }));
                        return false;
                    }
                }
            }

            // Проверка содержимого input'ов
            for (let i = 0; i < rows.length; i++) {
                let row = rows[i];
                let select = $(row).find('.serviceList')[0];
                let selectVal = $(select).select3('value'); // $(select).val();
                let amount = $(row).find('.amount')[0];
                let inputVal = $(amount).val();
                $(resultWrap).removeClass('error');
                if (!/^\d*$/.test(inputVal) || (inputVal.trim() !== '' && parseInt(inputVal, 10) < 1)) {
                    $(resultWrap).addClass('error');
                    $(resultWrap).html('Заполните поля правильно');
                    $(resultWrap).append($('<div>', {
                        class: 'errorDescription',
                        text: 'В строке ' + ((selectVal) ? '"' + selectVal + '"' : i) + ' количество заполнено неверно',
                    }));
                    return false;
                }
            }
            // /^\d*$/.test(value) && (value === '' || parseInt(value, 10) >= 1)
            return valid;
        }

        /**
         * @return {number} Возвращает вещественное кол-во часов
         */
        function calcHours() {
            let count = 0;
            const rows = $(table).find('[data-dynamic-row="true"]');
            for (let i = 0; i < rows.length; i++) {
                let row = rows[i];
                let select = $(row).find('.serviceList')[0];
                let selectVal = $(select).select3('value').trim(); // $(select).val().trim();
                if (selectVal !== '' && typeof data.services[selectVal] !== 'undefined') {
                    let amount = $(row).find('.amount')[0];
                    let inputVal = $(amount).val();
                    let amountNum = Number(inputVal);
                    let hoursNum = Number(data.services[selectVal]);
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
            let tariffIndex = $(this).attr('data-tariffIndex');
            let tariffIndexNum = Number(tariffIndex);

            // Скрыть текущую форму
            $('#ModalCalculator').modal('hide');

            // Выбрать нужный тариф на форме заявки
            $('#tariff').data('ionRangeSlider').update({
                from: tariffIndexNum,
            });

            // Показать форму заявки
            $('#ModalLong').modal('show');
        });

        // скрыть кнопку 'Оставить заявку'
        function hideRequestButton() {
            $(requestBtn).addClass('d-none');
        }

        /**
         * Возвращает данные для отправки на сервер
         * @return {string} Строка в формате JSON
         */
        function getFormData() {
            let result = {};

            const rows = $(table).find('[data-dynamic-row="true"]');
            for (let i = 0; i < rows.length; i++) {
                let row = rows[i];
                let select = $(row).find('.serviceList')[0];
                let selectVal = $(select).select3('value'); // $(select).val();
                let amount = $(row).find('.amount')[0];
                let inputVal = $(amount).val();
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
            if (hours === 0 || typeof hours === 'undefined') { return ''; }
            let str = '';

            // список допустимых тарифов
            let validTariffs = [];
            // eslint-disable-next-line no-restricted-syntax
            for (let prop in data.tariffs) {
                if (Object.prototype.hasOwnProperty.call(data.tariffs, prop)) {
                    if (data.tariffs[prop]) {
                        validTariffs.push(data.tariffs[prop].name);
                    }
                }
            }

            // удаление тарифов, которые не подходят
            for (let i = 0; i < validTariffs.length; i++) {
                let tariffHours = data.tariffs[i].hours;
                if (isNumeric(tariffHours)) {
                    if (hours > tariffHours) {
                        validTariffs[i] = null;
                    }
                }
            }

            // выбрать самый дешевый из оставшихся

            let minHours = Number.MAX_VALUE;
            let resultTariff = '';
            let tariffIndex = -1;
            for (let i = 0; i < validTariffs.length; i++) {
                if (validTariffs[i] !== null) {
                    let tariffHours = data.tariffs[i].hours;
                    if (tariffHours < minHours) {
                        minHours = tariffHours;
                        tariffIndex = i;
                        resultTariff = data.tariffs[i].name;
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
            let str = '';
            let hours = calcHours();
            str += 'Объем трудозаторат:';
            str += '&#160;&#160;&#160;'; // &#160; - неразрывный пробел.
            str += hToHmStr(hours);
            $(resultWrap).html(str);
            $(resultWrap).append($('<div>', {
                text: calcTariff(hours),
                class: 'tariff',
            }));
        }

        /**
         * Вывод результата
         */
        function ShowResult(allowEmpty) {
            hideRequestButton();
            calculatorThis.calculatorData = null;
            if (!validateAll(allowEmpty)) return;
            let result = calcResult();
            calculatorThis.calculatorData = getFormData();
            // вывод
        }

        /**
         * Добавит пустую строку выбора услуги
         */
        function addNewTemplate() {
            if (!validateAll(false)) { return; }
            idnum += 1;
            let row = createElementFromHTML(rowTemplate.innerHTML);
            let closeBtn = $(row).find('.close')[0];
            let service = $(row).find('.serviceList')[0];
            let amount = $(row).find('.amount')[0];
            let action = $(row).find('.action')[0];

            $(row).attr('data-dynamic-row', 'true');
            $(row).attr('data-row-id', idnum);
            $(action).attr('data-row-id', idnum);
            $(service).attr('data-row-id', idnum);
            $(amount).attr('data-row-id', idnum);
            $(closeBtn).attr('data-row-id', idnum);

            $(action).on('click', function () {
                const id = $(this).attr('data-row-id');
                const myRow = $(table).find('[data-dynamic-row="true"][data-row-id="' + id + '"]');
                const myService = $(myRow).find('.serviceList')[0];

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
            for (let prop in data.services) {
                if (Object.prototype.hasOwnProperty.call(data.services, prop)) {
                    let opt = document.createElement('option');
                    opt.value = prop;
                    opt.innerHTML = prop;
                    service.appendChild(opt);
                }
            }
            $(service).select3({ placeholderText: 'Выберите услугу...' });
            service = $(row).find('.serviceList')[0]; // КОСТЫЛЬ после применения ОЧЕНЬ плохого плагина
            $(service).on('select3ValueChanged', function () { // $(service).on('change', function () {
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
                const rows = $(table).find('[data-dynamic-row="true"]');
                if (rows.length === 1) { return; }
                const id = $(this).attr('data-row-id');
                const myRow = $(table).find('[data-dynamic-row="true"][data-row-id="' + id + '"]');
                $(myRow).remove();

                DisableCloseButtonIfNeed();
                ShowResult(false);
            });

            // https://github.com/joshua-s/jquery.nice-number
            // https://www.jqueryscript.net/form/Number-Input-Spinner-jQuery-Nice-Number.html
            $(amount).niceNumber({
                autoSize: false,
                buttonPosition: 'around',
                buttonDecrement: '−', // настоящий символ минуса, а не тире
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
                const val = $(this).val();
                if (!isNumeric(val)) return;
                switch (e.keyCode) {
                    case 37: // left
                    case 38: // up
                        $(this).val(Number(val) + 1);
                        break;
                    case 39: // right
                    case 40: // down
                        $(this).val(Number(val) - 1);
                        break;
                    default:
                        break;
                }
            });
            let oldVal = $(amount).val();
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
    });
// eslint-disable-next-line no-undef
}(jQuery));

//Даны две строки. Сравнить строки. 
//Вывести символы большей строки, на количество которых отличается.

    const differenceSymbols = (str1, str2) => {

        let newStr = '';
        let index = 0;

        if (str1 === str2) {
            newStr = 'Одинаковые строки';
        } else if(str1 > str2) { 

            if(str1.includes(str2)) { 

                index = str1.indexOf(str2);  

                if (index === 0) {
                    index = index + str2.length;
                    newStr = str1.slice(index, str1.length); 
                } else {
                    newStr = str1.slice(0, index);
                }
            }

        } else if(str1 < str2) {

            if(str2.includes(str1)) {

                index = str2.indexOf(str1);

                if (index === 0) {
                    index = index + str1.length;
                    newStr = str2.slice(index, str2.length);
                } else {
                    newStr = str2.slice(0, index);
                }
                
            }
        }

        return newStr.trim();

    }

  const text1 = 'text education part 2';
  const text2 = 'text education';

  const text11 = 'про какой-то текст';
  const text22 = 'какой-то текст';

  const result = differenceSymbols(text1, text2);
  const result1 = differenceSymbols(text11, text22);

  console.log('Ответ задача 1: ' + result);
  console.log('Ответ задача 1: ' +result1);


// В функцию подается 2 массива: 1 ключи, 2 значения. Сформировать объект.

    const formObj = (arr1, arr2) => {
        const obj = {};

        for(let i = 0; i < arr1.length; i++) {
            obj[arr1[i]] = arr2[i];
        }

        return obj;
    }


    const  key = ['name', 'age', 'country'];
    const  value = ['test', 25, 'RF'];
    const newFormObj = formObj(key, value);

    console.log('Ответ задача 2: ');
    console.log(newFormObj);

//Напишите функцию findCouple(array, number), которая ищет в массиве все пары целых чисел, 
// сумма которых равна заданному значению.

    const findCouple = (array, number) => {

        let newArr = [];
        const intermediateArr = [];
        let ind = 0;

        array.forEach((item) => {
            if (array.includes((number - item))) {
                ind = array.indexOf((number - item));

                intermediateArr.push(item);
                intermediateArr.push(array[ind]);

                array.splice(0, 1);
            }
        });

        for(let i = 0; i < intermediateArr.length; i++) {
            newArr[i] = [intermediateArr[i], intermediateArr[i + 1]]
            intermediateArr.splice(0, 1);
        }

        return newArr;
    }

    const arrayCouple = [4, 6, 2, 9, 1, 8, 3, 5, 2, 1, 7, 4, 6];
    const resFindCouple = findCouple(arrayCouple, 10);

    console.log('Ответ задача 3: ' + resFindCouple);

// Вернуть true, если хоть одно значение в массиве "положительное"

    const positiveArr = arr => {

        let bool = false;

        arr.forEach(item => {
            if(item > 0) {
                bool = true;
            }
        })

        return bool;
    }

    const positiveAndNegativeNum = [5, 3, -6, 7, 2, -7, 8, -2, 5];
    const negativeNum = [-5, -3, -6, -7, -2, -7, -8, -2, -5];

    const resPositiveArr1 = positiveArr(positiveAndNegativeNum);
    const resPositiveArr2 = positiveArr(negativeNum);

    console.log('Ответ задача 4: ' + resPositiveArr1);
    console.log('Ответ задача 4: ' + resPositiveArr2);
 

// Вернуть индекс последнего элемента массива, который удовлетворяет условию
// В функцию параметром передается массив и значение, больше которого нужно вывести значения из массива.

    const returnIndex = (arr, num) => {

        const newArr = [];
        let indexEl = 0;

        arr.forEach((item, index) => {
            if(item > num) {
                newArr.push(item);
                indexEl = index;
            }
        })

        return { array: newArr, index: indexEl }

    }

    const arrNum = [5, 2, 7, 2, 5, 4, 1, 7, 8, 9, 4, 6, 3];
    const resReturnIndex = returnIndex(arrNum, 4);

    console.log('Ответ задача 5: массив значений ', resReturnIndex, ' индекс последнего: ', );

    console.log(`Ответ задача 5: массив значений ${resReturnIndex.array}, индекс последнего: ${resReturnIndex.indes}` );

// Дан массив с числами. Узнайте сколько элементов с начала массива надо сложить, 
// чтобы в сумме получилось больше 10-ти.

    const sumTenArr = arr => {

        let counter = 0;
        let ten = 0;

        arr.forEach(item => {
            if(ten < 10) {
                ten += item;
                counter++;
            }
        });

        return counter;
    }

    const arrNumTen = [4, 1, 3, 4, 2, 4, 6, 7, 8, 3, 2];
    const resSumTenArr = sumTenArr(arrNumTen);

    console.log('Ответ задача 6: ' + resSumTenArr);

// В функцию передается несколько массивов.
// Вывести элементы из первого массива, переданного в функцию, которые имеются 
// во всех других переданных в функцию массивах

    const outputElFirstArr = (arr1, arr2, arr3) => {

        const newArr = [];

        arr1.forEach(item => {
            if(arr2.includes(item) && arr3.includes(item)) {
                newArr.push(item);
            }
        });

        return newArr;
    }

    const firstArrNum = [3, 6, 1, 8, 3, 6, 3, 6, 3, 6];
    const secondArrNum = [1, 4, 2, 4];
    const thirdArrNum = [6, 3, 2, 8, 1];
    const resOutputElFirstArr = outputElFirstArr(firstArrNum, secondArrNum, thirdArrNum);

    console.log('Ответ задача 7: ' + resOutputElFirstArr);


// Создать блок по макету

    console.log('Ответ задача 8: Верстка макета');

// Вывести сообщение равны или 2 объекта

    const equalCheckObj = (obj1, obj2) => {
        let bool = false;

        let counter = 0;

        for(key1 in obj1) {

            for(key2 in obj2) {

                if(key1 === key2) {

                    if(obj1[key1] === obj2[key2]){
                        counter++;
                    }
                }
            }
        }

        if(counter === 2) {
            bool = true;
        }

        return bool;
    }

    const objA = {
        test: 8, 
        text: 9
    }

    const objB = {
        test: 8, 
        text: 9
    }

    const resEqualCheckObj = equalCheckObj(objA, objB);
    console.log('Ответ задача 9: ' + resEqualCheckObj);

// Напишите функцию removeDuplicates(arr), которая возвращает массив, в 
// котором удалены повторяющиеся элементы из массива arr (игнорируйте чувствительность к регистру).

    const removeDuplicates = arr => {
        const newArr = [];

        arr.forEach(element => {

            if(typeof(element) === typeof('str')) {

                element = element.toLowerCase();

                if(!(newArr.includes(element))) {
                    newArr.push(element);
                }

            } else if(!(newArr.includes(element))) {
                newArr.push(element);
            }
            
            
        });

        return newArr;
    }

    const arrNumRemove = [4, 7, 1, 9, 6, 8, 4, 6, 3, 6];
    const arrTextRemove = ['text', 'education', 'part', 'Text'];

    const resRemoveDuplicates1 = removeDuplicates(arrNumRemove);
    const resRemoveDuplicates2 = removeDuplicates(arrTextRemove);

    console.log('Ответ задача 10: ' + resRemoveDuplicates1);
    console.log('Ответ задача 10: ' + resRemoveDuplicates2);

// Преобразовать коллекцию в другой вид

    const convertCollection = arr => {

        const newArr = [];
        
        arr.forEach(item => {
            let obj = {};

            if(item) {

                obj.fullName = item.firstName + ' ' + item.lastName;
                obj.age = item.age;
            }

            newArr.push(obj);
        })

        return newArr;
    }

    const collectionObj = [
        {firstName: 'Test', lastName: 'Test1', age: 34},
        {firstName: 'Text', lastName: 'Text1', age: 20},
        {firstName: 'User', lastName: 'User1', age: 87}
      ];

    const resConvertCollection = convertCollection(collectionObj);
    console.log('Ответ задача 11: ');
    console.log(resConvertCollection);

// В коллекции изменить значение свойства во всех элементах
// В функцию попадается коллекциях, свойство, которое нужно изменить и новое значение.

    const convertCollactionValye = (arr, key, value) => {

        const newArr = [];

        arr.forEach(item => {
            if(item[key]) {
                item[key] = value;
                newArr.push(item);
            }
        })

        return newArr;

    }

    const collectionObjCopy = [
        {firstName: 'Test', lastName: 'Test1', age: 34},
        {firstName: 'Text', lastName: 'Text1', age: 20},
        {firstName: 'User', lastName: 'User1', age: 87}
    ];

    const resConvertCollactionValye = convertCollactionValye(collectionObjCopy, 'age', 32);
    console.log('Ответ задача 12: ');
    console.log(resConvertCollactionValye);

// Напишите функцию range(), принимающую два аргумента: начало и конец диапазона, и возвращающую массив, который 
// содержит все числа из диапазона, включая начальное и конечное. Третий необязательный аргумент функции range() – шаг для 
// построения массива. Убедитесь, что функция range() работает с отрицательным шагом.

    const range = (start, end, step) => {
        const newArr = [];
        let counter = start;

        if (step) {
            if (step > 0) {
                if (start > end) {
                    while (counter >= end) {
                        newArr.push(counter);
                        counter = counter - step;
                    }
                } else if (end > start) {
                    while (counter <= end) {
                        newArr.push(counter);
                        counter = counter + step;
                    }
                } else {
                    newArr.push(counter);
                }
            } else {
                if (start > end) {
                    while (counter >= end) {
                        newArr.push(counter);
                        counter = counter - (step * -1);
                    }
                } else if (end > start) {
                    while (counter <= end) {
                        newArr.push(counter);
                        counter = counter + (step * -1);
                    }
                } else {
                    newArr.push(counter);
                }
            }
        } else {
            if (start > end) {
                while (counter >= end) {
                    newArr.push(counter);
                    counter--;
                }
            } else if (end > start) {
                while (counter <= end) {
                    newArr.push(counter);
                    counter++;
                }
            } else {
                newArr.push(counter);
            }
        }

        return newArr;
    }

    const resRange = range(1, 10, 1);
    console.log('Ответ задача 13: ' + resRange);

// Создать блок по макету

    console.log('Ответ задача 14: Верстка макета');
        
// Реализация табов
  
let tabs = document.querySelectorAll('.tab');
let contents = document.querySelectorAll('.content');

const classActive = (item, selector) => {
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove(selector);
    }

    item.classList.add(selector);
}

for (item of tabs) {    
    item.addEventListener('click', e => {

        let currTub = e.target.dataset.btn;
        classActive(e.target, 'tabActive');

        for (let i = 0; i < contents.length; i++) {

            contents[i].classList.remove('active');
        
            if(contents[i].dataset.content === currTub) {
                contents[i].classList.add('active');
            }
        }
    })
}
    
// Дана строка. Разделить строку на фрагменты по три подряд идущих символа. В каждом фрагменте средний символ заменить 
// на случайный символ, не совпадающий ни с одним из символов этого фрагмента. Показать фрагменты, упорядоченные по алфавиту.

const str = 'test education part 2';

const splitStr = str => {
    const strArr = [];
    const resStrArr = [];
    const newArr = [];
    let i = 0;

    while(i < str.length) {
        
        strArr.push(str.slice(i, i + 3));
        i += 3;
    }

    strArr.forEach(item => {

        let i = 1;
        while(i < item.length) {
        
            resStrArr.push(item.replace(item[i], '_'));
            
    
            i += 2;
        }
    })


    return resStrArr.sort();
}

const resSplitStr = splitStr(str);
console.log('Ответ задача 15: ');
console.log(resSplitStr);

// Напишите функцию, которая четное число возводит в квадрат, а нечетное в куб. После умножает это значение на 2-й параметр. 
// Прибавляет 3-й и находит корень от получившегося результата, округленный до сотых. Но за счет того, что функция вызывает функцию.

const findRoot = num => {

    let resNum;

    if (num < 0) {
        return 'Отрицательное число';
    } else if (num === 0) {
        return 0;
    } else {
        resNum = Math.sqrt(num).toFixed(2);
    }

    return resNum;
}

const mathematicalOperations = (a, b, c) => {

    let num;

    if (!(a % 2)) {
        num = a**2;
        num *= b;
        num += c;

    } else {
        num = a**3;
        num *= b;
        num += c;
    }

    return findRoot(num);
}

const resMathematicalOperations = mathematicalOperations(3, 5, 5);
console.log('Ответ задача 16: ' + resMathematicalOperations);

// Дана строка. Сделайте заглавным первый символ этой строки

const upperFirstSimbolStr = str => {

    let newStr;
    let upperSymbol;
    
    upperSymbol = str[0].toUpperCase();

    newStr = upperSymbol + str.slice(1, str.length);

    return newStr;
}

const strLowerFirstSimbol = 'text education part 2';
const resUpperFirstSimbolStr = upperFirstSimbolStr(strLowerFirstSimbol);

console.log('Ответ задача 17: ' + resUpperFirstSimbolStr);

// Проверьте, что строка заканчивается на .html

const checkEndStr = str => {
    if (str.includes('.html')) {
        if(str.substring(str.length - 5, str.length) === '.html') {
            return true;
        }
    } else {
        return false;
    }
}

const strHTML = 'http://localhost.html';
const strCOM = 'http://localhost.com';

const resCheckEndStrr1 = checkEndStr(strHTML);
const resCheckEndStrr2 = checkEndStr(strCOM);

console.log('Ответ задача 18: ' + strHTML + ' ' + resCheckEndStrr1);
console.log('Ответ задача 18: ' + strCOM + ' ' + resCheckEndStrr2);


// Дана строка; нужно написать функцию, которая позволяет вернуть значение true, если строка является палиндромом, и false если нет

const findPalindrome = str => {
    const newStrArr = [];
    let newStr = '';

    let i = str.length;

    while (i >= 0) {
        newStrArr.push(str[i]);
        i--;
    }

    newStr = newStrArr.join('');

    if (str === newStr) {
        console.log(str + ' ' + newStr);
        return true;
    } else {
        console.log(str + ' ' + newStr);
        return false;
    }
}

const palindromeStr = 'testset';
const noPalindromeStr = 'abbcsa';

const resFindPalindrome1 = findPalindrome(palindromeStr);
const resFindPalindrome2 = findPalindrome(noPalindromeStr);

console.log('Ответ задача 19: ' + palindromeStr + ' ' + resFindPalindrome1);
console.log('Ответ задача 19: ' + noPalindromeStr + ' ' + resFindPalindrome2);

// Напишите код, который преобразовывает и объединяет все элементы массива в одно строковое значение. Элементы массива будут разделены запятой.

const unionElArr = el => {
    let str = '';
    str = el + str;

    for (let i = 0; i < str.length; i++) {
        str = str.replace(',', '');
    }

    return str;
}


const elArr = [5, 8, 'test', 7, 'b', 789, 'fff'];
const resUnionElArr = unionElArr(elArr);

console.log('Ответ задача 20: ' + resUnionElArr);

// Создание линии пагинации

console.log('Ответ задача 21: Верстка линии пагинации');

const btnTab = document.querySelectorAll('.tabBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const lastBtn = document.getElementById('lastBtn');

const classActiveBtn = (item, selector) => {
    for (let i = 0; i < btnTab.length; i++) {
        btnTab[i].classList.remove(selector);
    }

    item.classList.add(selector);
}

for (item of btnTab) {    
    item.addEventListener('click', e => {
        e.preventDefault();
        classActiveBtn(e.target, 'activeBtn');
    })
}

// Дана строка. Показать номера символов, совпадающих с последним символом строки.

const strIndex = 'test education part';

const findIndexesLastSymbolStr = str => {

    const newArr = [];

    const lastSymbol = str[str.length - 1];

    for (let i = 0; i < str.length; i++) {
        if(str[i] === lastSymbol) {
            newArr.push(i);
        }
    }

    return newArr;
}

const resFindIndexesLastSymbolStr = findIndexesLastSymbolStr(strIndex);
console.log('Ответ задача 22: ' + resFindIndexesLastSymbolStr);

// Удалить из массива значения, индексы которых указаны во втором массиве

const includes = (arr, value) => {

    let bool = false;

    arr.forEach(item => {
        if (value === item) {
            bool = true;
        }
    })

    return bool;
}

const deleteElArr = (arr1, arr2) => {

    // const newArr = arr1.filter((item, index) => !arr2.includes(index));
    // console.log('newArr', newArr)
    
    const otherArr = [];

    const indexs = [];

    arr1.forEach((item, index) => {
        arr2.forEach((el) => {
            if (index === el) {
                indexs.push(index)
            }
        })
    })

    arr1.forEach((item, index) => {
        if (!includes(indexs, index)) {
            otherArr.push(item)
        }
    })
    
    return otherArr;
}

const arrNumDelete = [5, 2, 8, 6, 1, 9, 3, 6, 3, 7, 1];
const arrIndexDelete = [2, 5, 1];

const resDeleteElArr = deleteElArr(arrNumDelete, arrIndexDelete);
console.log('Ответ задача 23: ' + resDeleteElArr);
    

// Отфильтровать коллекцию по нескольким полям
// Функция параметрами принимает массив, 1 значение поле с которым равно, 2 значение больше, которого другое поле.
// Например, в коллекции мне нужно вывести значения, в которых возраст больше 18, а страна 'RF'.

const filterObj = (arr, value1, value2) => {
    const newArr = [];
    const resArr = [];

    arr.forEach(item => {
        for (let key in item) {
            if (item[key] > value2) {
                if (!newArr.includes(item)) {
                    newArr.push(item);
                }
            }
        }
    })

    newArr.forEach(item => {
        for (let key in item) {
            if (item[key] === value1) {
                resArr.push(item);
            }
        }
    })

    return resArr;
}

const arrObj =  [
    {name: 'test', age: 34, country: 'RF'},
    {name: 'test2', age: 12, country: 'RF'},
    {name: 'test1', age: 54, country: 'RF'}
  ];


const resFilterObj = filterObj(arrObj, 'RF', 18);

console.log('Ответ задача 24: ');
console.log(resFilterObj);

// Дан текст. Найти сумму имеющихся в нем цифр.

const sumNumStr = str => {

    let sum = 0;

    for (let item of str) {
        if (Number(item) === Number(item)) {
            sum += Number(item);
        }
    }

    return sum;
}

const strForSumNum = 'test455test786';
const resSumNumStr = sumNumStr(strForSumNum);

console.log('Ответ задача 25: ' + resSumNumStr);

// Даны две строки. Определите, содержится ли меньшая по длине строка в большей.

const lineInLineBool = (str1, str2) => {

    let bool = false;

    if (str1 > str2) {
        if(str1.includes(str2)) {
            bool = true;
        }
    } else {
        if(str2.includes(str1)) {
            bool = true;
        }
    }

    

    return bool;
}

const strLine1 = 'text education part 2';
const strLine2 = 'text';
const strLine3 = 'test';
const resLineInLineBool1 = lineInLineBool(strLine1, strLine2);
const resLineInLineBool2 = lineInLineBool(strLine1, strLine3);

console.log('Ответ задача 26: ' + resLineInLineBool1);
console.log('Ответ задача 26: ' + resLineInLineBool2);

// Дана строка. Вставить после каждого символа пробел.

const spaceInStr = str => {

    let newStr;
    let newArr = [];

    for (let i = 0; i < str.length; i++) {

        if (str.slice(i, i+1) !== " ") {
            newArr.push(str.slice(i, i+1) + " ");
        }
    }

    newStr = newArr + " ";

    for (let i = 0; i < newStr.length; i++) {
        if (newStr.slice(i, i+1) === ",") {
            newStr = newStr.replace(',', '');
        }
    }

    newStr = newStr.trimRight();

    return newStr;
}

const strSpace = 'text education part 2';
const resSpaceInStr = spaceInStr(strSpace);

console.log('Ответ задача 27: ' + resSpaceInStr);

// Перевернуть значения массива

const reverseArrEl = arr => {
    const newArr = [];

    for (let i = arr.length - 1; i >= 0; i--) {
        newArr.push(arr[i]);
    }

    return newArr;
}

const originalArr = [6, 2, 9, 1, 7, 4, 7];
const resReverseArrEl = reverseArrEl(originalArr);

console.log('Ответ задача 28: ');
console.log(resReverseArrEl);

// Создайте функцию, которая параметром принимает объект. Функция умножает все числовые свойства объекта на 2.

const sqrObj = obj => {

    for (let key in obj) {
        if (Number(obj[key])) {
            obj[key] = obj[key] * 2;
        }
    }

    return obj;
}

const objSqr = {
        name: 'test',
        age: 25,
        weight: 65,
        height: 165
    };

const resSqrObj = sqrObj(objSqr);

console.log('Ответ задача 29: ');
console.log(resSqrObj);

// Возвращает массив, где каждый элемент продублирован

const doubleElArr = arr => {

    const newArr = [];

    for (let i = 0; i < arr.length; i++) {
        newArr.push(arr[i]);
        newArr.push(arr[i]);
    }

    return newArr;
}

const doubleArr = [1, 2];
const resDoubleElArr = doubleElArr(doubleArr);

console.log('Ответ задача 30: ');
console.log(resDoubleElArr);

// Вернуть массив тех значений, которые есть в первом, но нет во втором

const returnArrFirstEl = (arr1, arr2) => {

    const newArr = [];

    arr1.forEach(item => {
        if (!arr2.includes(item)) {
            newArr.push(item);
        }
    })

    return newArr;
}

const valueArr1 = [4, 7, 2, 9, 3, 5, 6, 4, 5, 1, 4];
const valueArr2 = [4, 5, 6, 7, 8];
const resReturnArrFirstEl = returnArrFirstEl(valueArr1, valueArr2);

console.log('Ответ задача 31: ');
console.log(resReturnArrFirstEl);


// Вернуть отсортированный массив уникальных значений


const sortArrVal = arr => {

    const newArr = [];
    const indexes = [];
    const resArr = [];

    arr.forEach((item, index) => {
        if (arr.includes(item)) {
            indexes.push(arr.indexOf(item));
        }

        if ((index !== indexes[index]) && !(newArr.includes(item))) {
            newArr.push(item);
        }

        if (!(resArr.includes(item))) {
            resArr.push(item);
        }
    })

    const result = returnArrFirstEl(resArr, newArr); //Из задачи 31

    return result;
}

const valueArrSort = [5, 2, 8, 4, 8, 2, 5, 8, 2, 17, 8, 4, 2, 4, 7, 3];
const resSortArrVal = sortArrVal(valueArrSort);

console.log('Ответ задача 32: ');
console.log(resSortArrVal);

// Реализуйте функцию, которая принимает на вход объект и возвращает массив-пар.

const returnArrPair = obj => {
    
    const resArr = [];

    for (let key in obj) {
        const newArr = [];
        newArr.push(key);
        newArr.push(obj[key]);

        if (2 === newArr.length) {
            resArr.push(newArr);
        }
    }

    return resArr;
}

const objPair = { 'dog': 6, 'cat': 11 };
const resReturnArrPair = returnArrPair(objPair);

console.log('Ответ задача 33: ');
console.log(resReturnArrPair);

// Создать блок отображения способов оплаты для пользователя. При наведении на блок меняется цвет блока, 
// размер текста увеличивается, размер изображения увеличивается.

console.log('Ответ задача 34: Верстка блока отображения способов оплаты для пользователя');
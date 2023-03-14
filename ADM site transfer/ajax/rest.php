<?
include 'config.php';

// Clean comments of json content and decode it with json_decode().
// Work like the original php json_decode() function with the same params
function json_clean_decode($json, $assoc = false, $depth = 512, $options = 0)
{
	// search and remove comments like /* */ and //
	$json = preg_replace("#(/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+/)|([\s\t]//.*)|(^//.*)#", '', $json);

	if (version_compare(phpversion(), '5.4.0', '>=')) {
		$json = json_decode($json, $assoc, $depth, $options);
	} elseif (version_compare(phpversion(), '5.3.0', '>=')) {
		$json = json_decode($json, $assoc, $depth);
	} else {
		$json = json_decode($json, $assoc);
	}

	return $json;
}

function saveRequestToLogFile($leadId = 'null')
{
	$file = file('../logs/request_logs.txt');
	$requestData = date("Y-m-d H:i:s") . '/';

	foreach ($_POST as $requestKey => $requestValue) {
		$requestData .= $requestKey . ': ' . $requestValue . '/';
	}

	$requestData .= 'leadId: ' . $leadId . '/';
	$requestData .= "\n";
	array_unshift($file, $requestData);
	$file = implode('', $file);
	file_put_contents('../logs/request_logs.txt', $file);
}

$dataurl = '../data.json'; // path to your JSON file
$filedata = file_get_contents($dataurl); // put the contents of the file into a variable
$data = json_clean_decode($filedata); // decode the JSON feed
$data = json_decode(json_encode($data), true);




/********************************************************************************************/
//									ВОЗВРАЩАЕМЫЕ ДАННЫЕ
//С помощью Die() отсылается массив в формате json. Ключи массива
//'success'		=>	
//					'true'	- все прошло успешно
//					'false'	- есть ошибки
//'error_type' =>
//					''					
//					'internal_error'	- внутренняя ошибка - неправильно написан php-файл. Выводится в консоль js
//					'external_error'	- внешняя ошибка - пользователь ввел неправильные данные. Выводится не только в консоль js, но и в alert()
//'error_message' - текст ошибки
/********************************************************************************************/


//--------------------------------------------------------------------------------------------
//									ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
//--------------------------------------------------------------------------------------------

// Transliteration of Cyrillic characters
// Транслитерация кирилических символов
// Used for the names of downloaded files
// Используется для названий загруженных файлов
function cyrillic_translit($title)
{
	$iso9_table = array(
		'А' => 'A', 'Б' => 'B', 'В' => 'V', 'Г' => 'G', 'Ѓ' => 'G',
		'Ґ' => 'G', 'Д' => 'D', 'Е' => 'E', 'Ё' => 'YO', 'Є' => 'YE',
		'Ж' => 'ZH', 'З' => 'Z', 'Ѕ' => 'Z', 'И' => 'I', 'Й' => 'J',
		'Ј' => 'J', 'І' => 'I', 'Ї' => 'YI', 'К' => 'K', 'Ќ' => 'K',
		'Л' => 'L', 'Љ' => 'L', 'М' => 'M', 'Н' => 'N', 'Њ' => 'N',
		'О' => 'O', 'П' => 'P', 'Р' => 'R', 'С' => 'S', 'Т' => 'T',
		'У' => 'U', 'Ў' => 'U', 'Ф' => 'F', 'Х' => 'H', 'Ц' => 'TS',
		'Ч' => 'CH', 'Џ' => 'DH', 'Ш' => 'SH', 'Щ' => 'SHH', 'Ъ' => '',
		'Ы' => 'Y', 'Ь' => '', 'Э' => 'E', 'Ю' => 'YU', 'Я' => 'YA',
		'а' => 'a', 'б' => 'b', 'в' => 'v', 'г' => 'g', 'ѓ' => 'g',
		'ґ' => 'g', 'д' => 'd', 'е' => 'e', 'ё' => 'yo', 'є' => 'ye',
		'ж' => 'zh', 'з' => 'z', 'ѕ' => 'z', 'и' => 'i', 'й' => 'j',
		'ј' => 'j', 'і' => 'i', 'ї' => 'yi', 'к' => 'k', 'ќ' => 'k',
		'л' => 'l', 'љ' => 'l', 'м' => 'm', 'н' => 'n', 'њ' => 'n',
		'о' => 'o', 'п' => 'p', 'р' => 'r', 'с' => 's', 'т' => 't',
		'у' => 'u', 'ў' => 'u', 'ф' => 'f', 'х' => 'h', 'ц' => 'ts',
		'ч' => 'ch', 'џ' => 'dh', 'ш' => 'sh', 'щ' => 'shh', 'ъ' => '',
		'ы' => 'y', 'ь' => '', 'э' => 'e', 'ю' => 'yu', 'я' => 'ya'
	);

	$name = strtr($title, $iso9_table);
	$name = preg_replace('~[^A-Za-z0-9\'_\-\.]~', '-', $name);	//Находим любые символы, кроме A-Z, a-z, 0-9, ', _, - или . и заменяем на сивмол -
	$name = preg_replace('~\-+~', '-', $name);		// --- на -
	$name = preg_replace('~^-+|-+$~', '', $name);	// кил - на концах

	return $name;
}

//Turns the number of bytes into a string
//Преобразует количество байтов в строку
//Example: formatBytes (2500) will output "2.44 Kb"
//Пример: formatBytes(2500) выведет "2.44 Kb"
function formatBytes($bytes, $precision = 2)
{
	$units = array('b', 'Kb', 'Mb', 'Gb', 'Tb');

	$bytes = max($bytes, 0);
	$pow = floor(($bytes ? log($bytes) : 0) / log(1024));
	$pow = min($pow, count($units) - 1);
	$bytes /= pow(1024, $pow);

	return round($bytes, $precision) . ' ' . $units[$pow];
}

//----------------------------------ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
//----------------------------------Запись отчета в TSV

//Возвращает количество строк в файле $filename
function fileLinesCount($filename)
{
	$file = new \SplFileObject($filename, 'r');
	$file->seek(PHP_INT_MAX);

	return $file->key() + 1;
}

//Массив в строку формата TSV
function toTsvLine($array)
{
	//экранирование табуляции
	foreach ($array as $k => $v) {
		$array[$k] = str_ireplace("\t", "\\t", $array[$k]);
	}
	//Соединение массива в строку через табуляцию
	return implode("\t", $array); // . PHP_EOL;
}

//Добавляет 1 строку в файл
//$filename - имя файла, строка
//$str - строка, которую нужно добавить в файл
//$addLineNumber - добавлять номер строки вначале, boolean, необязательный, по умолчанию = true
//После добавления строки переходит на новую строку
//Создаст файл $filename, если его не существует
function appendTsvLine($filename, $str, $addLineNumber = true)
{
	try {
		if ($addLineNumber == true)
			$linesCount = (file_exists($filename)) ? fileLinesCount($filename) - 1 : 0;
		else
			$linesCount = "";

		file_put_contents($filename, $linesCount . "\t" . $str . PHP_EOL, FILE_APPEND);
	} catch (Exception $e) {
		file_put_contents($filename, 'Выброшено исключение: ' . $e->getMessage() . PHP_EOL, FILE_APPEND);
	}
}

//Добавляет 1 строку в файл
//$filename - имя файла, строка
//$array - массив строк, который будет добавлен в файл как 1 строка, разделенная знаком табуляции
//$addLineNumber - добавлять номер строки вначале, boolean, необязательный, по умолчанию = true
//После добавления строки переходит на новую строку
//Создаст файл $filename, если его не существует
function appendTsvArray($filename, $array, $addLineNumber = true)
{
	appendTsvLine($filename, toTsvLine($array), $addLineNumber);
}

//Добавляет каждую строку массива строк в файл с новой строки
//$filename - имя файла, строка
//$array - массив строк
//$addLineNumber - добавлять номер строки вначале, boolean, необязательный, по умолчанию = true
//Создаст файл $filename, если его не существует
function appendTsvLines($filename, $array, $addLineNumber = true)
{
	foreach ($array as $v) appendTsvLine($filename, $v, $addLineNumber);
}


//----------------------------------ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
//----------------------------------ЛОГИ

//Тип сообщения (код), Сообщение, Файл, Строка, Прочие поля...
function appendLog($error_type, $error_message, $fileName, $lineNumber, $others)
{
	$path = "../logs/"; //путь к папке с логами

	if (!is_dir($path)) //если этой папки не существует
		mkdir($path); //то создать её

	$filename = $path . "errlogs.txt"; //имя файла с логами

	//Если файла еще нет, создаем и заполняем его заголовки
	if (!file_exists($filename)) {
		$header = array("Дата", "Время", "Тип сообщения (код)", "Тип сообщения (расшифровка)", "Сообщение", "Файл", "Строка", "Прочие поля...");
		$header_description = array(
			"__________________________________________________________________________________________________________",
			"Дата - дата создания записи",
			"Время - время создания записи",
			"Тип сообщения (код) - типа external_error,internal_error,bot_detected и пр.",
			"Тип сообщения (расшифровка) - описание для кода сообщения",
			"Сообщение - сам текст сообщения",
			"Файл - файл, записавший это сообщение",
			"Строка - строка этого файла, вызвавшая запись сообщения",
			"Прочие поля... - далее указываются любые другие значения, которые потребовалось записать. Например, в json",
			"__________________________________________________________________________________________________________",
		);

		appendTsvLines($filename, $header_description, false);
		appendTsvLine($filename, "", false);
		appendTsvArray($filename, $header, false);
		appendTsvLine($filename, "", false);
	}

	$MESS = array(
		'external_error' =>	'Ошибка, выводимая пользователю',
		'internal_error' =>	'Ошибка разработки',
		'bot_detected' => 	'СПАМ'
	);

	$lineData = array(date('Y-m-d'), date('H:i:s'), $error_type, ($MESS[$error_type]) ? $MESS[$error_type] : '', $error_message, $fileName, $lineNumber, json_encode($others));
	appendTsvArray($filename, $lineData);
}

//--------------------------------------------------------------------------------------------
//									ЗАЩИТА ОТ БОТОВ
//--------------------------------------------------------------------------------------------
/*
Защита от ботов состоит из 2 проверок:
1) Проверка того, что обязательные поля заполнены
2) Проверка того, что было совершено минимальное количество кликов мыши/нажатий клавишами клавиатуры по форме

Минимальное кол-во щелчков мышью и нажатий клавиш:
ДЛЯ НИЖНЕЙ ФОРМЫ:
1) Заполнить поле "Редакция 1С-Битрикс *" - (1 щелчок И 1 клавиша) ИЛИ (2 щелчка) ИЛИ (3 клавиши)	//Самодельное поле "Редакция 1С-Битрикс *", не являющееся стандартным input'ом/textarea'ей/select'ом и управляемое только с помощью js не заполнится ни ботом, ни автозаполнением
2) Чтобы отправить форму - 1 щелчок ИЛИ 1 клавиша													//щелчок по кнопке отправить, клавиша Enter
3) Автозаполнение на прочие обязательные поля - 2 клавиши ИЛИ 2 щелчка ИЛИ (1 щелчок И 1 клавиша)	//Автозаполнение на прочие обязательные поля - 2 клавиши ИЛИ 2 щелчка ИЛИ (1 щелчок И 1 клавиша). Автозаполнение по факту невозможно выключить в некоторых браузерах, например, в Chrome.
ИТОГО:
Суммарное количество щелчков мыши и нажатий клавишей должно быть >= 5.
ДЛЯ ВСПЛЫВАЮЩЕЙ ФОРМЫ:
то же, но без поля "Редакция 1С-Битрикс *"
ИТОГО:
Суммарное количество щелчков мыши и нажатий клавишей должно быть >= 3.
*/

$antispam = array(
	'calculation_form'	=> array(											//id формы. Отправляется в post с ключом formId
		'required'	=> array('site', 'bitrix', 'name', 'mail', 'problem'),	//перечень обязательных полей (ключи в post)
		'ck'		=> 5,													//минимальная сумма кликов и нажатий клавиш по форме
	),
	'popup_form' => array(
		'required'	=> array('name', 'site', 'mail', 'tariff', 'project'),
		'ck'		=> 3,
	),
	'popup_form_Typical' => array(
		'required'	=> array('name'),
		'ck'		=> 3,
	),
	'package_form' 		=> array(
		'required'	=> array('name', 'site', 'mail', 'package',/* 'start_pack'*/),
		'ck'		=> 3,
	),
	'collaboration_form' => array(
		'required'	=> array('name', 'user_post', 'mail', 'company', 'site', 'years_on_market', 'staff', 'activity', 'proj_num'),
		'ck'		=> 3,
	),
	'popup_form-audit' 		=> array(
		'required'	=> array('name', 'site', 'phone', 'bitrix_audit'),
		'ck'		=> 3,
	),
	'popup_form-freeMonth' 		=> array(
		'required'	=> array('name', 'site', 'phone', 'bitrix_freeMonth'),
		'ck'		=> 3,
	),
	'popup_form-guarantee' 		=> array(
		'required'	=> array('name', 'site', 'phone', 'bitrix_guarantee'),
		'ck'		=> 3,
	),
	//(в html есть импуты, которые сюда не внесены)
	'request_form-form' 		=> array(
		'required'	=> array('name', 'phone'),
		'ck'		=> 1,
	),
	'send_page_calc_form'	=> [
		'required'	=> ['site', 'name', 'mail', 'problem'],
		'ck'		=> 2,
	],
);

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
	$postData = $_POST;

	//1) Проверка того, что обязательные поля заполнены
	if (!isset($postData['formId'])) //1.1)
	{
		$error_message = "Зафиксированы признаки спама. Проверка 1.1. Обратитесь в службу поддержки по номеру, указанному на сайте.";
		appendLog('bot_detected', $error_message, __FILE__, __LINE__, json_encode($_POST));
		die(json_encode(array('success' => 'false', 'error_type' => 'bot_detected', 'error_message' => $error_message)));
	}

	$formId = $postData['formId'];

	if (!isset($antispam[$formId])) //1.2)
	{
		$error_message = "Зафиксированы признаки спама. Проверка 1.2. Обратитесь в службу поддержки по номеру, указанному на сайте.";
		appendLog('bot_detected', $error_message, __FILE__, __LINE__, json_encode($_POST));
		die(json_encode(array('success' => 'false', 'error_type' => 'bot_detected', 'error_message' => $error_message)));
	}

	$required = $antispam[$formId]['required'];

	foreach ($required as $value) //1.3)
		if (!isset($postData[$value])) {
			$error_message = "Зафиксированы признаки спама. Проверка 1.3. Обратитесь в службу поддержки по номеру, указанному на сайте.";
			appendLog('bot_detected', $error_message, __FILE__, __LINE__, json_encode($_POST));
			die(json_encode(array('success' => 'false', 'error_type' => 'bot_detected', 'error_message' => $error_message)));
		}

	if (!isset($postData['c']) || !isset($postData['k'])) //1.4)
	{
		$error_message = "Зафиксированы признаки спама. Проверка 1.4. Обратитесь в службу поддержки по номеру, указанному на сайте.";
		appendLog('bot_detected', $error_message, __FILE__, __LINE__, json_encode($_POST));
		die(json_encode(array('success' => 'false', 'error_type' => 'bot_detected', 'error_message' => $error_message)));
	}

	//2) Проверка минимального кол-ва нажатий клавиши/кликов мыши

	if (!is_numeric($postData['c']) || !is_numeric($postData['k'])) //2.1)
	{
		$error_message = "Зафиксированы признаки спама. Проверка 2.1. Обратитесь в службу поддержки по номеру, указанному на сайте.";
		appendLog('bot_detected', $error_message, __FILE__, __LINE__, json_encode($_POST));
		die(json_encode(array('success' => 'false', 'error_type' => 'bot_detected', 'error_message' => $error_message)));
	}

	$sum = $postData['c'] + $postData['k'];
	$minSum = $antispam[$formId]['ck'];

	if ($sum < $minSum) //2.2)
	{
		$error_message = "Зафиксированы признаки спама. Проверка 2.2. Обратитесь в службу поддержки по номеру, указанному на сайте.";
		appendLog('bot_detected', $error_message, __FILE__, __LINE__, json_encode($_POST));
		die(json_encode(array('success' => 'false', 'error_type' => 'bot_detected', 'error_message' => $error_message)));
	}
}

//--------------------------------------------------------------------------------------------
//									ОБРАБОТКА ФАЙЛОВ
//--------------------------------------------------------------------------------------------

if ($_POST['my_file_upload'] == "123" && $_FILES) {
	// ВАЖНО! тут должны быть все проверки безопасности передавемых файлов и вывести ошибки, если нужно
	// Допустимые типы файлов
	$allowed_filetypes = [
		'jpg', 'jpeg', 'jfif', 'pjpeg', 'pjp', 'png', 'bm', 'bmp', 'dib', 'webp', // картинки
		'3g2', '3gp', '3gpp', '3gpp2', 'asf', 'asx', 'avi', 'flv', 'f4v', 'f4p', 'f4a', 'f4b', 'mov', 'qt', 'mp4', 'mpg', 'mpeg', 'mp1', 'mp2', 'mp3', 'm1v', 'mpv', 'm1a', 'm2a', 'mpa', 'ogv', 'ogg', 'oga', 'ogx', 'spx', 'opus', 'ogm', 'rm', 'swf', 'vob', 'wmv', 'webm', 'mkv', // видео
	];
	$max_filesize = 15728640; // Максимальный размер файла в байтах (в данном случае он равен 15 Мб = 15728640 байт).

	$uploaddir = './uploads'; // . - текущая папка где находится submit.php

	// cоздадим папку если её нет
	if (!is_dir($uploaddir)) mkdir($uploaddir, 0777);

	$files = $_FILES; // полученные файлы
	$done_files = array();

	// переместим файлы из временной директории в указанную
	foreach ($files as $file) {
		$filename = $file['name']; // В переменную $filename заносим имя файла (включая расширение).
		$ext = strtoupper(pathinfo($filename, PATHINFO_EXTENSION)); // В переменную $ext заносим расширение загруженного файла.

		if (in_array($ext, array_map('strtoupper', $allowed_filetypes))) // array_map(strtoupper, $array) - переведет весь массив $array в верхний регистр
		{
			if (filesize($file['tmp_name']) < $max_filesize) // Проверим размер загруженного файла.
			{
				$file_name = cyrillic_translit($file['name']);
				if (move_uploaded_file($file['tmp_name'], "$uploaddir/$file_name")) {
					$done_files[] = realpath("$uploaddir/$file_name");
				}
			} else {
				//ОШИБКА:
				$error_message = "Ошибка загрузки файлов: \n";
				$error_message .= $file['name'] . " - Файл слишком большой. Максимальный размер файла - " . formatBytes($max_filesize) . "\n";
				appendLog('external_error', $error_message, __FILE__, __LINE__, json_encode($_POST));
				die(json_encode(array('success' => 'false', 'error_type' => 'external_error', 'error_message' => $error_message)));
			}
		} else {
			//ОШИБКА:
			$error_message = "Ошибка загрузки файлов: \n";
			$error_message .= "\"" . $ext . "\"" . " - Этот тип файлов не разрешен. \n";
			appendLog('external_error', $error_message, __FILE__, __LINE__, json_encode($_POST));
			die(json_encode(array('success' => 'false', 'error_type' => 'external_error', 'error_message' => $error_message)));
		}
	}

	$datafile = array('files' => $done_files);
} else if ($_POST['my_file_upload'] != "123" && $_FILES) {
	$error_message = "Неверная отправка файлов";
	appendLog('external_error', $error_message, __FILE__, __LINE__, json_encode($_POST));
	die(json_encode(array('success' => 'false', 'error_type' => 'bot_detected', 'error_message' => $error_message)));
}

//--------------------------------------------------------------------------------------------
//										ВАЛИДАЦИЯ
//--------------------------------------------------------------------------------------------

//Возвращает массив в 3мя ключами:
//							error			=> true/false,
//							error_message	=> 'сообщение об ошибке'/'',
//							value			=> отформатированное значение
function validate($val_type, $value_in, $description, $form_id = null)
{
	$value_in = trim($value_in);

	$error = 'false';
	$error_message = '';
	$value_out = $value_in;

	switch ($val_type) {
		case 'email':
			if (filter_var($value_in, FILTER_VALIDATE_EMAIL) == false) {
				$error = 'true';
				$error_message = "Ошибка: \n";
				$error_message .= "Поле \"" . $description . "\" не прошло валидацию на сервере. Заполните поле правильно.";
			}
			break;

		case 'yn':
			$value_out = ($value_in == "on" || $value_in == "true") ? "Да" : "Нет";
			break;

		case 'urgent':
			$value_out = ($value_in == "on" || $value_in == "true") ? "Срочная" : "Не срочная";
			break;

		case 'way_to_contact':
			$value_out = ($value_in == "manager") ? "Звонок менеджера" : $value_in;
			break;

		case 'site':
			$pattern = "/^(http(s)?:\/\/)?([a-zA-Z0-9а-яА-ЯеЁ]{1}[-a-zA-Z0-9а-яА-ЯеЁ]{0,254}[a-zA-Z0-9а-яА-ЯеЁ]{1}[.]{0,1}){1,}[.]{1}([a-zA-Z0-9рРфФ]{1}[-a-zA-Z0-9рРфФ]{0,6}[a-zA-Z0-9рРфФ]{1}){1}([:\/?#]{1}([-a-zA-Z0-9а-яА-ЯеЁ@:%_+.~#?&\/=$!*'()\[\],]{0,})){0,}$/iu";
			$result = preg_match($pattern, $value_in);
			if ($result === 0) {
				$error = 'true';
				$error_message = "Ошибка: \n";
				$error_message .= "Поле \"" . $description . "\" не прошло валидацию на сервере. Заполните поле правильно.";
			} else if ($result === false) {
				//ВНУТРЕННЯЯ ОШИБКА: 3
				$error_message = "Ошибка 3: \n";
				$error_message .= "Ошибка в preg_match. \$value_in: " . $value_in . "\n";
				appendLog('internal_error', $error_message, __FILE__, __LINE__, json_encode($_POST));
				die(json_encode(array('success' => 'false', 'error_type' => 'internal_error', 'error_message' => $error_message)));
			}
			break;

		case 'json':
			$str = '';
			$arr = json_decode($value_in, true);
			if (is_array($arr)) {
				foreach ($arr as $k => $v) {
					$str .= ($str != '') ? ', ' : '';
					$str .= (!is_numeric($k)) ? /* '<b>' . */ $k . ': ' /* . '</b>' */ . $v : /* '<b>' . */ $v /* . '</b>' */;
				}
			} else {
				$str = $value_in;
			}
			$value_out = $str;
			break;

		default:
			$error = 'false';
			$error_message = '';
			$value_out = $value_in;
	}

	return array('error' => $error, 'error_message' => $error_message, 'value' => $value_out);
}

//валидация поля bitrix24 перед его отправкой в bitrix24
function postvalidate($b24key_vals, $b24key, $form_id = null)
{
	//получение цены тарифа из формы
	global $data;

	$value_out = "";

	switch ($b24key) {
		case 'COMMENTS':

			$str = "";

			//заполняем поле как html
			foreach ($b24key_vals as $v) {
				$val = $v['value'];
				if ($v['val_type'] == 'site') {
					$val = '<a href="' . $val . '">' . $val . '</a>';
				}
				if ($v['val_type'] == 'project') {
					$val = $data['site_types'][$val];
				}
				$str .= ($str != "") ? "<br/><br/>" : "";
				$str .= ($v['description']) ? '<b>' . $v['description'] . ': </b>' . $val : '<b>' . $val . '</b>';
			}

			//....
			//отправка цены в лиды с таблицы Тарифы
			foreach ($b24key_vals as $v) {
				if ($v['val_type'] != 'tariff') {
					continue;
				}
				$tariff_name = $v['value'];

				foreach ($b24key_vals as $h) {
					if ($h['val_type'] != 'project') {
						continue;
					}
					$proj_name = $h['value'];

					$data_tariffs = $data['tariffs'];
					foreach ($data_tariffs as $k) {
						if ($k['name'] != $tariff_name) {
							continue;
						}
						$res = $k['price'];

						foreach ($res as $key => $t) {
							if ($key != $proj_name) {
								continue;
							}
							$tariff_price = $t;
						}
					}
				}
				$str .= '<br><br><b>Цена: </b>'  . $tariff_price . 'р';
				break;
			}

			//отправка нормо-часов, стоимости часа специалиста, стоимости пакета в лиды с таблицы Пакеты
			foreach ($b24key_vals as $v) {
				if ($v['val_type'] != 'package') {
					continue;
				}
				$package_name = $v['value'];

				$data_package = $data['packages'];
				foreach ($data_package as $v) {
					if ($v['name'] != $package_name) {
						continue;
					}

					$package_hour = $v['hours'];
					$hour_price = $v['hour_price'];
					if (is_string($package_hour) == true) {
						$full_price = '-';
					} else {
						$full_price = $package_hour * $hour_price;
						$full_price = number_format($full_price, 0, '.', ' ');
					}
				}
				$str .= '<br><br><b>Количество нормо-часов: </b>'  . $package_hour;
				$str .= '<br><br><b>Стоимость часа специалиста: </b>'  . $hour_price . 'р';
				$str .= '<br><br><b>Стоимость пакета: </b>'  . $full_price . ' р';
				break;
			}
			//....

			$str = "<div>" . $str . "</div>";
			$str = '<div style="font-size: 18px; line-height: 22px;"><b>Комментарии, ответы пользователя</b></div><br>' . $str;

			$value_out = $str;
			break;

		case 'UF_CRM_1570120168': //Текст письма клиенту

			$str = "";

			//заполняем поле как html
			foreach ($b24key_vals as $v) {
				$val = $v['value'];
				if ($v['val_type'] == 'site') {
					$val = '<a href="' . $val . '">' . $val . '</a>';
				}
				$str .= ($str != "") ? "<br/>" : "";
				$str .= ($v['description']) ? '<b>' . $v['description'] . ': </b>' . $val : '<b>' . $val . '</b>';
			}

			$str = "<div>" . $str . "</div>";
			//$str = '<div style="font-size: 18px; line-height: 22px;"><b>Комментарии, ответы пользователя</b></div><br>' . $str;

			$value_out = $str;
			break;


		default:
			if (count($b24key_vals) == 1) {
				//заполняем поле как значение
				$value_out = $b24key_vals[0]['value'];
			} else {
				$valsonly = array();
				foreach ($b24key_vals as $v)
					if ($v['description'])
						$valsonly[$v['description']] = $v['value'];
					else
						$valsonly[] = $v['value'];
				$value_out = json_encode($valsonly);
			}
	}

	return $value_out;
}

//--------------------------------------------------------------------------------------------
//										КЛЮЧИ
//--------------------------------------------------------------------------------------------

//description - используется для заполнения поля комментариев COMMENTS в bitrix24.
//		Поскольку все поля дублируются в комментариях, должно быть заполнено. Также
//		используется для вывода сообщений об ошибках для пользователей
//b24_keys - массив ключей для API bitrix24. В эти ключи будет записываться указанное поле. Взять можно здесь:
//		https://dev.1c-bitrix.ru/community/blogs/chaos/crm-sozdanie-lidov-iz-drugikh-servisov.php
//form_id - id формы, см. в её html
//input_name - имя параметра в массиве $_POST. Равно аттрибуту name в html формы, но
//		могло быть изменено в js. См. html и js.
//internal_vals - значения полей, которые не приходят с формы. Кроме параметров
//		соединения с сервером и авторизации в CRM. Они задавались выше
//post_vals - описание параметров, которые передаются через $_POST.
//val_type - тип валидации поля. Задается самостоятельно
//		и используется в функции validate.
//		К примеру, значение с val_type = 'phone' будет проверяться как телефон,
//		с val_type = 'email' - как e-mail и т.п.
//		Подробнее - см. в функции validate.
$_MyKEYS = array(

	//форма, которая снизу. Расчет стоимости задачи.
	"calculation_form" => array(
		'internal_vals' => array(
			array(
				'b24_keys'			=> array('TITLE', 'COMMENTS', 'UF_CRM_1570120168',), //UF_CRM_1570120168 - ключ, в который записывается то, что отправляется заказчику в ответе
				'value'				=> 'bitrixsupport.adm-center.ru. Расчет стоимости задачи.'
			),
			array(
				'b24_keys'			=> array('SOURCE_DESCRIPTION',),
				'value'				=> 'Лендинг техподдержки' //Дополнительно об источнике
			),
			array(
				'b24_keys'			=> array('UF_CRM_1566303908',),
				'value'				=> 'bitrixsupport.adm-center.ru' // URL источника лида
			),
			array(
				'b24_keys'			=> array('UF_CRM_1565969928',),
				'value'				=> 'bitrixsupport.adm-center.ru' // Источник лида
			),
			array(
				'b24_keys'			=> array('ASSIGNED_BY_ID',),
				'value'				=> 126	//id ответственного за Лид
			),
			array(
				'b24_keys'			=> array('UF_CRM_1566303971',),			//поле для id формы в b24
				'value'				=> "sup_calc_form",	//id формы в b24
			),
		),
		'post_vals' => array(
			array(
				'val_type'				=> 'name',
				'input_name'			=> 'name',
				'b24_keys'				=> array('NAME', 'COMMENTS', 'UF_CRM_1570120168',),
				'description'			=> 'Имя'
			),
			array(
				'val_type'				=> 'ym_ClientID',
				'input_name'			=> 'ym_ClientID',
				'b24_keys'				=> array('COMMENTS',),
				'description'			=> 'Яндекс.Метрика, ClientID'
			),
			array(
				'val_type'				=> 'phone',
				'input_name'			=> 'phone',
				'b24_keys'				=> array('PHONE_MOBILE', 'COMMENTS', 'UF_CRM_1570120168',),
				'description'			=> 'Телефон'
			),
			array(
				'val_type'				=> 'way_to_contact',
				'input_name'			=> 'way_to_contact',
				'b24_keys'				=> array('COMMENTS', 'UF_CRM_1570120168',),
				'description'			=> 'Способ связаться'
			),
			array(
				'val_type'				=> 'site',
				'input_name'			=> 'site',
				'b24_keys'				=> array('WEB_WORK', 'COMMENTS', 'UF_CRM_1570120168',),
				'description'			=> 'Сайт'
			),
			array(
				'val_type'				=> 'email',
				'input_name'			=> 'mail',
				'b24_keys'				=> array('EMAIL_WORK', 'COMMENTS', 'UF_CRM_1570120168',),
				'description'			=> 'E-mail'
			),
			array(
				'val_type'				=> 'bitrix_edition',
				'input_name'			=> 'bitrix',
				'b24_keys'				=> array('COMMENTS', 'UF_CRM_1570120168',),
				'description'			=> 'Редакция 1С-Битрикс'
			),
			array(
				'val_type'				=> 'problem_description',
				'input_name'			=> 'problem',
				'b24_keys'				=> array('COMMENTS', 'UF_CRM_1570120168', 'UF_CRM_1570541412'), //UF_CRM_1570541412 - отдельное поле для описания проблемы
				'description'			=> 'Описание проблемы'
			),
			array(
				'val_type'				=> 'urgent',
				'input_name'			=> 'urgent',
				'b24_keys'				=> array('COMMENTS', 'UF_CRM_1570120168', 'UF_CRM_1572017290',),  //UF_CRM_1572017290 - код тарифа/пакета
				'description'			=> 'Срочная задача'
			),
			array(
				'val_type'				=> 'problem_links',
				'input_name'			=> 'links',
				'b24_keys'				=> array('COMMENTS', 'UF_CRM_1570120168',),
				'description'			=> 'Ссылки на страницы, где обнаружена проблема'
			),
			array(
				'val_type'				=> 'yn',
				'input_name'			=> 'device',
				'b24_keys'				=> array('COMMENTS', 'UF_CRM_1570120168',),
				'description'			=> 'Я пишу с устройства, на котором обнаружилась проблема'
			),
			array(
				'val_type'				=> 'problem_device_details',
				'input_name'			=> 'device_details',
				'b24_keys'				=> array('COMMENTS',),
				'description'			=> 'Устройство' 
			),
		)
	),

	//всплывающая форма. Заявка на постоянное обслуживание.
	"popup_form" => array(
		'internal_vals' => array(
			array(
				'b24_keys'			=> array('TITLE', 'COMMENTS', 'UF_CRM_1570120168',),
				'value'				=> 'bitrixsupport.adm-center.ru. Заявка на постоянное обслуживание.' //Заголовок
			),
			array(
				'b24_keys'			=> array('SOURCE_DESCRIPTION',),
				'value'				=> 'Лендинг техподдержки'  //Дополнительно об источнике
			),
			array(
				'b24_keys'			=> array('UF_CRM_1566303908',),
				'value'				=> 'bitrixsupport.adm-center.ru' // URL источника лида
			),
			array(
				'b24_keys'			=> array('UF_CRM_1565969928',),
				'value'				=> 'bitrixsupport.adm-center.ru' // Источник лида
			),
			array(
				'b24_keys'			=> array('ASSIGNED_BY_ID',),
				'value'				=> 126 //id ответственного за Лид
			),
			array(
				'b24_keys'			=> array('UF_CRM_1566303971',),			//поле для id формы в b24
				'value'				=> "sup_service_request_form",	//id формы в b24
			),
		),
		'post_vals' => array(
			array(
				'val_type'				=> 'name',
				'input_name'			=> 'name',
				'b24_keys'				=> array('NAME', 'COMMENTS', 'UF_CRM_1570120168',),
				'description'			=> 'Имя'
			),
			array(
				'val_type'				=> 'ym_ClientID',
				'input_name'			=> 'ym_ClientID',
				'b24_keys'				=> array('COMMENTS',),
				'description'			=> 'Яндекс.Метрика, ClientID'
			),
			array(
				'val_type'				=> 'project',
				'input_name'			=> 'project',
				'b24_keys'				=> array('COMMENTS', 'UF_CRM_1570120168',),
				'description'			=> 'Тип проекта'
			),
			array(
				'val_type'				=> 'tariff',
				'input_name'			=> 'tariff',
				'b24_keys'				=> array('COMMENTS', 'UF_CRM_1570120168', 'UF_CRM_1572017290',), //UF_CRM_1572017290 - код тарифа/пакета
				'description'			=> 'Тариф'
			),
			array(
				'val_type'				=> 'phone',
				'input_name'			=> 'phone',
				'b24_keys'				=> array('PHONE_MOBILE', 'COMMENTS', 'UF_CRM_1570120168',),
				'description'			=> 'Телефон'
			),
			array(
				'val_type'				=> 'way_to_contact',
				'input_name'			=> 'way_to_contact',
				'b24_keys'				=> array('COMMENTS', 'UF_CRM_1570120168',),
				'description'			=> 'Способ связаться'
			),
			array(
				'val_type'				=> 'site',
				'input_name'			=> 'site',
				'b24_keys'				=> array('WEB_WORK', 'COMMENTS', 'UF_CRM_1570120168',),
				'description'			=> 'Сайт'
			),
			array(
				'val_type'				=> 'email',
				'input_name'			=> 'mail',
				'b24_keys'				=> array('EMAIL_WORK', 'COMMENTS', 'UF_CRM_1570120168',),
				'description'			=> 'E-mail'
			),
			array(
				'val_type'				=> 'json',
				'input_name'			=> 'calculator',
				'b24_keys'				=> array('COMMENTS',),
				'description'			=> 'Данные с калькулятора тарифа'
			),
		)
	),

	"popup_form_Typical" => array(
		'internal_vals' => array(
			array(
				'b24_keys'			=> array('TITLE', 'COMMENTS', 'UF_CRM_1570120168',),
				'value'				=> 'bitrixsupport.adm-center.ru. Заявка на консультацию по переносу.' //Заголовок
			),
			array(
				'b24_keys'			=> array('SOURCE_DESCRIPTION',),
				'value'				=> 'Лендинг перенос'  //Дополнительно об источнике
			),
			array(
				'b24_keys'			=> array('UF_CRM_1566303908',),
				'value'				=> '1c-bitrix-perenos.adm-center.ru' // URL источника лида
			),
			array(
				'b24_keys'			=> array('UF_CRM_1565969928',),
				'value'				=> '1c-bitrix-perenos.adm-center.ru' // Источник лида
			),
			array(
				'b24_keys'			=> array('ASSIGNED_BY_ID',),
				'value'				=> 126 //id ответственного за Лид
			),
			array(
				'b24_keys'			=> array('UF_CRM_1566303971',),			//поле для id формы в b24
				'value'				=> "sup_service_request_form",	//id формы в b24
			),
		),
		'post_vals' => array(
			array(
				'val_type'				=> 'name',
				'input_name'			=> 'name',
				'b24_keys'				=> array('NAME', 'COMMENTS', 'UF_CRM_1570120168',),
				'description'			=> 'Имя'
			),
			array(
				'val_type'				=> 'phone',
				'input_name'			=> 'phone',
				'b24_keys'				=> array('PHONE_MOBILE', 'COMMENTS', 'UF_CRM_1570120168',),
				'description'			=> 'Телефон'
			),
			array(
				'val_type'				=> 'way_to_contact',
				'input_name'			=> 'way_to_contact',
				'b24_keys'				=> array('COMMENTS', 'UF_CRM_1570120168',),
				'description'			=> 'Способ связаться'
			),
			array(
				'val_type'				=> 'comments',
				'input_name'			=> 'comments',
				'b24_keys'				=> array('COMMENTS',),
				'description'			=> 'Данные с поля комментария'
			),
		)
	),

	//форма аудит 23.09.2019
	"popup_form-audit" => array(
		'internal_vals' => array(
			array(
				'b24_keys'			=> array('TITLE', 'COMMENTS', 'UF_CRM_1570120168',),
				'value'				=> 'bitrixsupport.adm-center.ru. Заявка на аудит сайта.' //Заголовок
			),
			array(
				'b24_keys'			=> array('SOURCE_DESCRIPTION',),
				'value'				=> 'Лендинг техподдержки'  //Дополнительно об источнике
			),
			array(
				'b24_keys'			=> array('UF_CRM_1566303908',),
				'value'				=> 'bitrixsupport.adm-center.ru' // URL источника лида
			),
			array(
				'b24_keys'			=> array('UF_CRM_1565969928',),
				'value'				=> 'bitrixsupport.adm-center.ru' // Источник лида
			),
			array(
				'b24_keys'			=> array('ASSIGNED_BY_ID',),
				'value'				=> 126 //id ответственного за Лид
			),
			array(
				'b24_keys'			=> array('UF_CRM_1566303971',),			//поле для id формы в b24
				'value'				=> "sup_audit_form",	//id формы в b24
			),
		),
		'post_vals' => array(
			array(
				'val_type'				=> 'name',
				'input_name'			=> 'name',
				'b24_keys'				=> array('NAME', 'COMMENTS', 'UF_CRM_1570120168',),
				'description'			=> 'Имя'
			),
			array(
				'val_type'				=> 'ym_ClientID',
				'input_name'			=> 'ym_ClientID',
				'b24_keys'				=> array('COMMENTS',),
				'description'			=> 'Яндекс.Метрика, ClientID'
			),
			array(
				'val_type'				=> 'bitrix_audit',
				'input_name'			=> 'bitrix_audit',
				'b24_keys'				=> array('COMMENTS', 'UF_CRM_1570120168',),
				'description'			=> 'Редакция 1-С Bitrix'
			),
			array(
				'val_type'				=> 'phone',
				'input_name'			=> 'phone',
				'b24_keys'				=> array('PHONE_MOBILE', 'COMMENTS', 'UF_CRM_1570120168',),
				'description'			=> 'Телефон'
			),
			array(
				'val_type'				=> 'way_to_contact',
				'input_name'			=> 'way_to_contact',
				'b24_keys'				=> array('COMMENTS', 'UF_CRM_1570120168',),
				'description'			=> 'Способ связаться'
			),
			array(
				'val_type'				=> 'site',
				'input_name'			=> 'site',
				'b24_keys'				=> array('WEB_WORK', 'COMMENTS', 'UF_CRM_1570120168',),
				'description'			=> 'Сайт'
			),
		)
	),


	///////////////
	//форма ПАКЕТЫ
	"package_form" => array(
		'internal_vals' => array(
			array(
				'b24_keys'			=> array('TITLE', 'COMMENTS', 'UF_CRM_1570120168',),
				'value'				=> 'bitrixsupport.adm-center.ru. Заявка на пакет.' //Заголовок
			),
			array(
				'b24_keys'			=> array('SOURCE_DESCRIPTION',),
				'value'				=> 'Лендинг техподдержки'  //Дополнительно об источнике
			),
			array(
				'b24_keys'			=> array('UF_CRM_1566303908',),
				'value'				=> 'bitrixsupport.adm-center.ru' // URL источника лида
			),
			array(
				'b24_keys'			=> array('UF_CRM_1565969928',),
				'value'				=> 'bitrixsupport.adm-center.ru' // Источник лида
			),
			array(
				'b24_keys'			=> array('ASSIGNED_BY_ID',),
				'value'				=> 126 //id ответственного за Лид
			),
			array(
				'b24_keys'			=> array('UF_CRM_1566303971',),			//поле для id формы в b24
				'value'				=> "sup_package_request_form",	//id формы в b24
			),
		),
		'post_vals' => array(
			array(
				'val_type'				=> 'name',
				'input_name'			=> 'name',
				'b24_keys'				=> array('NAME', 'COMMENTS', 'UF_CRM_1570120168',),
				'description'			=> 'Имя'
			),
			array(
				'val_type'				=> 'ym_ClientID',
				'input_name'			=> 'ym_ClientID',
				'b24_keys'				=> array('COMMENTS',),
				'description'			=> 'Яндекс.Метрика, ClientID'
			),
			array(
				'val_type'				=> 'package',
				'input_name'			=> 'package',
				'b24_keys'				=> array('COMMENTS', 'UF_CRM_1570120168', 'UF_CRM_1572017290',), //UF_CRM_1572017290 - код тарифа/пакета
				'description'			=> 'Пакет услуг'
			),
			array(
				'val_type'				=> 'start_pack',
				'input_name'			=> 'start_pack',
				'b24_keys'				=> array('COMMENTS', 'UF_CRM_1570120168',),
				'description'			=> 'Дата начала пакета'
			),
			array(
				'val_type'				=> 'phone',
				'input_name'			=> 'phone',
				'b24_keys'				=> array('PHONE_MOBILE', 'COMMENTS', 'UF_CRM_1570120168',),
				'description'			=> 'Телефон'
			),
			array(
				'val_type'				=> 'way_to_contact',
				'input_name'			=> 'way_to_contact',
				'b24_keys'				=> array('COMMENTS', 'UF_CRM_1570120168',),
				'description'			=> 'Способ связаться'
			),
			array(
				'val_type'				=> 'site',
				'input_name'			=> 'site',
				'b24_keys'				=> array('WEB_WORK', 'COMMENTS', 'UF_CRM_1570120168',),
				'description'			=> 'Сайт'
			),
			array(
				'val_type'				=> 'email',
				'input_name'			=> 'mail',
				'b24_keys'				=> array('EMAIL_WORK', 'COMMENTS', 'UF_CRM_1570120168',),
				'description'			=> 'E-mail'
			),
		)
	),

	//форма СОТРУДНИЧЕСТВО
	"collaboration_form" => array(
		'internal_vals' => array(
			array(
				'b24_keys'			=> array('TITLE', 'COMMENTS', 'UF_CRM_1570120168',),
				'value'				=> 'bitrixsupport.adm-center.ru. Заявка на сотрудничество.' //Заголовок
			),
			array(
				'b24_keys'			=> array('SOURCE_DESCRIPTION',),
				'value'				=> 'Лендинг техподдержки'  //Дополнительно об источнике
			),
			array(
				'b24_keys'			=> array('UF_CRM_1566303908',),
				'value'				=> 'bitrixsupport.adm-center.ru' // URL источника лида
			),
			array(
				'b24_keys'			=> array('UF_CRM_1565969928',),
				'value'				=> 'bitrixsupport.adm-center.ru' // Источник лида
			),
			array(
				'b24_keys'			=> array('ASSIGNED_BY_ID',),
				'value'				=> 126 //id ответственного за Лид
			),
			array(
				'b24_keys'			=> array('UF_CRM_1566303971',),			//поле для id формы в b24
				'value'				=> "sup_collaboration_request_form",	//id формы в b24
			),
		),
		'post_vals' => array(
			array(
				'val_type'				=> 'name',
				'input_name'			=> 'name',
				'b24_keys'				=> array('NAME', 'COMMENTS', 'UF_CRM_1570120168',),
				'description'			=> 'Имя'
			),
			array(
				'val_type'				=> 'ym_ClientID',
				'input_name'			=> 'ym_ClientID',
				'b24_keys'				=> array('COMMENTS',),
				'description'			=> 'Яндекс.Метрика, ClientID'
			),
			array(
				'val_type'				=> 'user_post',
				'input_name'			=> 'user_post',
				'b24_keys'				=> array('COMMENTS', 'UF_CRM_1570120168',),
				'description'			=> 'Должность'
			),
			array(
				'val_type'				=> 'email',
				'input_name'			=> 'mail',
				'b24_keys'				=> array('EMAIL_WORK', 'COMMENTS', 'UF_CRM_1570120168',),
				'description'			=> 'E-mail'
			),
			array(
				'val_type'				=> 'phone',
				'input_name'			=> 'phone',
				'b24_keys'				=> array('PHONE_MOBILE', 'COMMENTS', 'UF_CRM_1570120168',),
				'description'			=> 'Телефон'
			),
			array(
				'val_type'				=> 'company',
				'input_name'			=> 'company',
				'b24_keys'				=> array('COMMENTS', 'UF_CRM_1570120168',),
				'description'			=> 'Название компании'
			),
			array(
				'val_type'				=> 'site',
				'input_name'			=> 'site',
				'b24_keys'				=> array('WEB_WORK', 'COMMENTS', 'UF_CRM_1570120168',),
				'description'			=> 'Сайт'
			),
			array(
				'val_type'				=> 'non_negative_number',
				'input_name'			=> 'years_on_market',
				'b24_keys'				=> array('COMMENTS', 'UF_CRM_1570120168',),
				'description'			=> 'Количество лет на рынке'
			),
			array(
				'val_type'				=> 'non_negative_number',
				'input_name'			=> 'staff',
				'b24_keys'				=> array('COMMENTS', 'UF_CRM_1570120168',),
				'description'			=> 'Количество сотрудников'
			),
			array(
				'val_type'				=> 'activity',
				'input_name'			=> 'activity',
				'b24_keys'				=> array('COMMENTS', 'UF_CRM_1570120168',),
				'description'			=> 'Основной вид деятельности'
			),
			array(
				'val_type'				=> 'proj_types',
				'input_name'			=> 'proj_types',
				'b24_keys'				=> array('COMMENTS', 'UF_CRM_1570120168',),
				'description'			=> 'Основной тип проектов'
			),
			array(
				'val_type'				=> 'id_client_collabForm',
				'input_name'			=> 'id_client_collabForm',
				'b24_keys'				=> array('COMMENTS', 'UF_CRM_1570120168',),
				'description'			=> 'ID клиента Битрикс'
			),
			array(
				'val_type'				=> 'type_of_coop',
				'input_name'			=> 'type_of_coop',
				'b24_keys'				=> array('COMMENTS', 'UF_CRM_1570120168',),
				'description'			=> 'Желаемый вид сотрудничества'
			),
			array(
				'val_type'				=> 'proj_num',
				'input_name'			=> 'proj_num',
				'b24_keys'				=> array('COMMENTS', 'UF_CRM_1570120168',),
				'description'			=> 'Количество проектов'
			),
			array(
				'val_type'				=> 'yn',
				'input_name'			=> 'bitrix_only',
				'b24_keys'				=> array('COMMENTS', 'UF_CRM_1570120168',),
				'description'			=> 'Работаем только с битриксом'
			),
			array(
				'val_type'				=> 'yn',
				'input_name'			=> 'bitrix_partner',
				'b24_keys'				=> array('COMMENTS', 'UF_CRM_1570120168',),
				'description'			=> 'Партнеры битрикса'
			),
		)
	),

	//форма первый месяц бесплатно
	"popup_form-freeMonth" => array(
		'internal_vals' => array(
			array(
				'b24_keys'			=> array('TITLE', 'COMMENTS', 'UF_CRM_1570120168',),
				'value'				=> 'bitrixsupport.adm-center.ru. Заявка на первый месяц обслуживания бесплатно.' //Заголовок
			),
			array(
				'b24_keys'			=> array('SOURCE_DESCRIPTION',),
				'value'				=> 'Лендинг техподдержки'  //Дополнительно об источнике
			),
			array(
				'b24_keys'			=> array('UF_CRM_1566303908',),
				'value'				=> 'bitrixsupport.adm-center.ru' // URL источника лида
			),
			array(
				'b24_keys'			=> array('UF_CRM_1565969928',),
				'value'				=> 'bitrixsupport.adm-center.ru' // Источник лида
			),
			array(
				'b24_keys'			=> array('ASSIGNED_BY_ID',),
				'value'				=> 126 //id ответственного за Лид
			),
			array(
				'b24_keys'			=> array('UF_CRM_1566303971',),			//поле для id формы в b24
				'value'				=> "sup_firstMonth_form",	//id формы в b24
			),
		),
		'post_vals' => array(
			array(
				'val_type'				=> 'name',
				'input_name'			=> 'name',
				'b24_keys'				=> array('NAME', 'COMMENTS', 'UF_CRM_1570120168',),
				'description'			=> 'Имя'
			),
			array(
				'val_type'				=> 'ym_ClientID',
				'input_name'			=> 'ym_ClientID',
				'b24_keys'				=> array('COMMENTS',),
				'description'			=> 'Яндекс.Метрика, ClientID'
			),
			array(
				'val_type'				=> 'bitrix_freeMonth',
				'input_name'			=> 'bitrix_freeMonth',
				'b24_keys'				=> array('COMMENTS', 'UF_CRM_1570120168',),
				'description'			=> 'Редакция 1-С Bitrix'
			),
			array(
				'val_type'				=> 'phone',
				'input_name'			=> 'phone',
				'b24_keys'				=> array('PHONE_MOBILE', 'COMMENTS', 'UF_CRM_1570120168',),
				'description'			=> 'Телефон'
			),
			array(
				'val_type'				=> 'way_to_contact',
				'input_name'			=> 'way_to_contact',
				'b24_keys'				=> array('COMMENTS', 'UF_CRM_1570120168',),
				'description'			=> 'Способ связаться'
			),
			array(
				'val_type'				=> 'site',
				'input_name'			=> 'site',
				'b24_keys'				=> array('WEB_WORK', 'COMMENTS', 'UF_CRM_1570120168',),
				'description'			=> 'Сайт'
			),
		)
	),

	//форма гарантия возврата оплаты
	"popup_form-guarantee" => array(
		'internal_vals' => array(
			array(
				'b24_keys'			=> array('TITLE', 'COMMENTS', 'UF_CRM_1570120168',),
				'value'				=> 'bitrixsupport.adm-center.ru. Заявка на гарантийный возврат оплаты' //Заголовок
			),
			array(
				'b24_keys'			=> array('SOURCE_DESCRIPTION',),
				'value'				=> 'Лендинг техподдержки'  //Дополнительно об источнике
			),
			array(
				'b24_keys'			=> array('UF_CRM_1566303908',),
				'value'				=> 'bitrixsupport.adm-center.ru' // URL источника лида
			),
			array(
				'b24_keys'			=> array('UF_CRM_1565969928',),
				'value'				=> 'bitrixsupport.adm-center.ru' // Источник лида
			),
			array(
				'b24_keys'			=> array('ASSIGNED_BY_ID',),
				'value'				=> 126 //id ответственного за Лид
			),
			array(
				'b24_keys'			=> array('UF_CRM_1566303971',),			//поле для id формы в b24
				'value'				=> "sup_guarantee_form",	//id формы в b24
			),
		),
		'post_vals' => array(
			array(
				'val_type'				=> 'name',
				'input_name'			=> 'name',
				'b24_keys'				=> array('NAME', 'COMMENTS', 'UF_CRM_1570120168',),
				'description'			=> 'Имя'
			),
			array(
				'val_type'				=> 'ym_ClientID',
				'input_name'			=> 'ym_ClientID',
				'b24_keys'				=> array('COMMENTS',),
				'description'			=> 'Яндекс.Метрика, ClientID'
			),
			array(
				'val_type'				=> 'bitrix_guarantee',
				'input_name'			=> 'bitrix_guarantee',
				'b24_keys'				=> array('COMMENTS', 'UF_CRM_1570120168',),
				'description'			=> 'Редакция 1-С Bitrix'
			),
			array(
				'val_type'				=> 'phone',
				'input_name'			=> 'phone',
				'b24_keys'				=> array('PHONE_MOBILE', 'COMMENTS', 'UF_CRM_1570120168',),
				'description'			=> 'Телефон'
			),
			array(
				'val_type'				=> 'way_to_contact',
				'input_name'			=> 'way_to_contact',
				'b24_keys'				=> array('COMMENTS', 'UF_CRM_1570120168',),
				'description'			=> 'Способ связаться'
			),
			array(
				'val_type'				=> 'site',
				'input_name'			=> 'site',
				'b24_keys'				=> array('WEB_WORK', 'COMMENTS', 'UF_CRM_1570120168',),
				'description'			=> 'Сайт'
			),
		)
	),

	//форма СВЯЗАТЬСЯ СО МНОЙ
	"request_form-form" => array(
		'internal_vals' => array(
			array(
				'b24_keys'			=> array('TITLE', 'COMMENTS', 'UF_CRM_1570120168',),
				'value'				=> 'bitrixsupport.adm-center.ru. Заявка на поддержку сайта', //Заголовок
			),
			array(
				'b24_keys'			=> array('SOURCE_DESCRIPTION',),
				'value'				=> 'Лендинг техподдержки',  //Дополнительно об источнике
			),
			array(
				'b24_keys'			=> array('UF_CRM_1566303908',),
				'value'				=> 'bitrixsupport.adm-center.ru' // URL источника лида
			),
			array(
				'b24_keys'			=> array('UF_CRM_1565969928',),
				'value'				=> 'bitrixsupport.adm-center.ru' // Источник лида
			),
			array(
				'b24_keys'			=> array('ASSIGNED_BY_ID',),
				'value'				=> 126, //id ответственного за Лид
			),
			array(
				'b24_keys'			=> array('UF_CRM_1566303971',),			//поле для id формы в b24
				'value'				=> "request_form",	//id формы в b24
			),
		),
		'post_vals' => array(
			array(
				'val_type'				=> 'name',
				'input_name'			=> 'name',
				'b24_keys'				=> array('NAME', 'COMMENTS', 'UF_CRM_1570120168',),
				'description'			=> 'Имя'
			),
			array(
				'val_type'				=> 'ym_ClientID',
				'input_name'			=> 'ym_ClientID',
				'b24_keys'				=> array('COMMENTS',),
				'description'			=> 'Яндекс.Метрика, ClientID'
			),
			array(
				'val_type'				=> 'phone',
				'input_name'			=> 'phone',
				'b24_keys'				=> array('PHONE_MOBILE', 'COMMENTS', 'UF_CRM_1570120168',),
				'description'			=> 'Телефон'
			),

			array(
				'val_type'				=> 'way_to_contact',
				'input_name'			=> 'way_to_contact',
				'b24_keys'				=> array('COMMENTS', 'UF_CRM_1570120168',),
				'description'			=> 'Способ связаться'
			),

			array(
				'val_type'				=> 'email',
				'input_name'			=> 'mail',
				'b24_keys'				=> array('EMAIL_WORK', 'COMMENTS', 'UF_CRM_1570120168',),
				'description'			=> 'E-mail'
			),
		)
	),

	// форма со страницы send/
	"send_page_calc_form" => array(
		'internal_vals' => array(
			array(
				'b24_keys'			=> array('TITLE', 'COMMENTS', 'UF_CRM_1570120168',), //UF_CRM_1570120168 - ключ, в который записывается то, что отправляется заказчику в ответе
				'value'				=> 'bitrixsupport.adm-center.ru/send/. Расчет стоимости задачи.'
			),
			array(
				'b24_keys'			=> array('SOURCE_DESCRIPTION',),
				'value'				=> 'Лендинг техподдержки, страница /send/' //Дополнительно об источнике
			),
			array(
				'b24_keys'			=> array('UF_CRM_1566303908',),
				'value'				=> 'bitrixsupport.adm-center.ru/send/' // URL источника лида
			),
			array(
				'b24_keys'			=> array('UF_CRM_1565969928',),
				'value'				=> 'bitrixsupport.adm-center.ru/send/' // Источник лида
			),
			array(
				'b24_keys'			=> array('ASSIGNED_BY_ID',),
				'value'				=> 126	//id ответственного за Лид
			),
			array(
				'b24_keys'			=> array('UF_CRM_1566303971',),			//поле для id формы в b24
				'value'				=> "send_page_calc_form",	//id формы в b24
			),
		),
		'post_vals' => array(
			array(
				'val_type'				=> 'name',
				'input_name'			=> 'name',
				'b24_keys'				=> array('NAME', 'COMMENTS', 'UF_CRM_1570120168',),
				'description'			=> 'Имя'
			),
			array(
				'val_type'				=> 'ym_ClientID',
				'input_name'			=> 'ym_ClientID',
				'b24_keys'				=> array('COMMENTS',),
				'description'			=> 'Яндекс.Метрика, ClientID'
			),
			array(
				'val_type'				=> 'phone',
				'input_name'			=> 'phone',
				'b24_keys'				=> array('PHONE_MOBILE', 'COMMENTS', 'UF_CRM_1570120168',),
				'description'			=> 'Телефон'
			),
			array(
				'val_type'				=> 'way_to_contact',
				'input_name'			=> 'way_to_contact',
				'b24_keys'				=> array('COMMENTS', 'UF_CRM_1570120168',),
				'description'			=> 'Способ связаться'
			),
			array(
				'val_type'				=> 'site',
				'input_name'			=> 'site',
				'b24_keys'				=> array('WEB_WORK', 'COMMENTS', 'UF_CRM_1570120168',),
				'description'			=> 'Сайт'
			),
			array(
				'val_type'				=> 'email',
				'input_name'			=> 'mail',
				'b24_keys'				=> array('EMAIL_WORK', 'COMMENTS', 'UF_CRM_1570120168',),
				'description'			=> 'E-mail'
			),
			array(
				'val_type'				=> 'bitrix_edition',
				'input_name'			=> 'bitrix',
				'b24_keys'				=> array('COMMENTS', 'UF_CRM_1570120168',),
				'description'			=> 'Редакция 1С-Битрикс'
			),
			array(
				'val_type'				=> 'problem_description',
				'input_name'			=> 'problem',
				'b24_keys'				=> array('COMMENTS', 'UF_CRM_1570120168', 'UF_CRM_1570541412'), //UF_CRM_1570541412 - отдельное поле для описания проблемы
				'description'			=> 'Описание проблемы'
			),
			array(
				'val_type'				=> 'urgent',
				'input_name'			=> 'urgent',
				'b24_keys'				=> array('COMMENTS', 'UF_CRM_1570120168', 'UF_CRM_1572017290',),  //UF_CRM_1572017290 - код тарифа/пакета
				'description'			=> 'Срочная задача'
			),
			array(
				'val_type'				=> 'problem_links',
				'input_name'			=> 'links',
				'b24_keys'				=> array('COMMENTS', 'UF_CRM_1570120168',),
				'description'			=> 'Ссылки на страницы, где обнаружена проблема'
			),
			array(
				'val_type'				=> 'yn',
				'input_name'			=> 'device',
				'b24_keys'				=> array('COMMENTS', 'UF_CRM_1570120168',),
				'description'			=> 'Я пишу с устройства, на котором обнаружилась проблема'
			),
			array(
				'val_type'				=> 'problem_device_details',
				'input_name'			=> 'device_details',
				'b24_keys'				=> array('COMMENTS',),
				'description'			=> 'Устройство'
			),
		)
	),
);


//--------------------------------------------------------------------------------------------
//								ОБРАБОТКА $_POST КРОМЕ ФАЙЛОВ
//--------------------------------------------------------------------------------------------

// POST processing
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
	// get lead data from the form
	$leadData = $_POST;

	$postData = array();

	//Проверяем существование id формы в $_MyKEYS
	if (!isset($_MyKEYS[$leadData['formId']])) {
		//ВНУТРЕННЯЯ ОШИБКА: 1
		$error_message = "Ошибка 1: \n";
		$error_message .= "Неизвестный id формы: " . "\"" . $leadData['formId'] . "\"" . "\n";
		appendLog('internal_error', $error_message, __FILE__, __LINE__, json_encode($_POST));
		die(json_encode(array('success' => 'false', 'error_type' => 'internal_error', 'error_message' => $error_message)));
	}

	$formId = $leadData['formId'];

	$form_info = $_MyKEYS[$formId]; {
		$b24vals = array();
		//Заполняем internal_vals (поля, значения которых задавались здесь кроме параметров соединения с сервером и авторизации в CRM)
		//Заполняем b24vals
		foreach ($form_info['internal_vals'] as $v)
			foreach ($v['b24_keys'] as $b24key) {
				if (!isset($b24vals[$b24key]))
					$b24vals[$b24key] = array();
				$b24vals[$b24key][] = array('value' => $v['value'], 'description' => $v['description']);
			}

		//Заполняем post_vals
		//Заполняем b24vals
		foreach ($form_info['post_vals'] as $v)
			if ($leadData[$v['input_name']]) {
				$validate_result = validate($v['val_type'], $leadData[$v['input_name']], $v['description'], $formId);

				if ($validate_result['error'] !== 'false') {
					appendLog('external_error', $validate_result['error_message'], __FILE__, __LINE__, json_encode($_POST));
					die(json_encode(array('success' => 'false', 'error_type' => 'external_error', 'error_message' => $validate_result['error_message'])));
				}

				$validated_value = $validate_result['value'];

				foreach ($v['b24_keys'] as $b24key) {
					if (!isset($b24vals[$b24key]))
						$b24vals[$b24key] = array();
					$b24vals[$b24key][] = array('value' => $validated_value, 'description' => $v['description'], 'val_type' => $v['val_type']);
				}
			}

		//формируем postData из b24vals
		foreach ($b24vals as $b24key => $b24key_vals) {
			$postData[$b24key] = postvalidate($b24key_vals, $b24key);
		}

		//прикрепляем ссылки на загруженные файлы
		$comm = "";
		if ($datafile['files']) {
			$comm .= '<b>Загруженные файлы: </b><br>';
			foreach ($datafile['files'] as $file) {
				//ПРИ ПЕРЕНОСЕ ИЗМЕНИТЬ:
				$_url = str_replace('/home/users/a/admservice/domains/', 'http://', $file); //-------!!!!!!!ПРИ ПЕРЕНОСЕ ИЗМЕНИТЬ
				$comm .= "<a href=\"" . $_url . "\">" . $_url . "</a>";
				$comm .= '<br>';
			}
			$comm .= '<br>';
		}
		$postData['COMMENTS'] .= $comm;
	}

	// append authorization data
	if (defined('CRM_AUTH')) {
		$postData['AUTH'] = CRM_AUTH;
	} else {
		$postData['LOGIN'] = CRM_LOGIN;
		$postData['PASSWORD'] = CRM_PASSWORD;
	}

	//!!!!!!!!!!---------------------ОТЛАДКА
	//DIE(json_encode(array('success'=>'true')));//!!!!!!!!!!---------------------ОТЛАДКА
	//!!!!!!!!!!---------------------ОТЛАДКА


	// open socket to CRM
	$fp = fsockopen("ssl://" . CRM_HOST, CRM_PORT, $errno, $errstr, 30);
	if ($fp) {
		// prepare POST data
		$strPostData = '';
		foreach ($postData as $key => $value) {
			$strPostData .= ($strPostData == '' ? '' : '&') . $key . '=' . urlencode($value);
		}
			

		// prepare POST headers
		$str = "POST " . CRM_PATH . " HTTP/1.0\r\n";
		$str .= "Host: " . CRM_HOST . "\r\n";
		$str .= "Content-Type: application/x-www-form-urlencoded\r\n";
		$str .= "Content-Length: " . strlen($strPostData) . "\r\n";
		$str .= "Connection: close\r\n\r\n";

		$str .= $strPostData;

		// send POST to CRM
		fwrite($fp, $str);

		// get CRM headers
		$result = '';
		while (!feof($fp)) {
			$result .= fgets($fp, 128);
		}
		fclose($fp);

		// cut response headers
		$response = explode("\r\n\r\n", $result);

		//$output = '<pre>'.print_r($response[1], 1).'</pre>';

		//Получение ID
		$response[1] = str_replace('\'', '"', $response[1]); //взяли вторую строку массива(перезаписали) и заменили в ней ' на "  
		$arr_resp = json_decode($response[1], true); //в новую переменную записали декодированный массив json
		$leadid = $arr_resp['ID'];

		if ((!$leadid) || (!is_numeric($leadid))) {
			//ВНУТРЕННЯЯ ОШИБКА 4: ОШИБКА Bitrix24
			$error_message = "Ошибка 4. Ошибка bitrix24. \n";
			$error_message .= json_encode($arr_resp);
			appendLog('internal_error', $error_message, __FILE__, __LINE__, json_encode($_POST));
			saveRequestToLogFile();
			die(json_encode(array('success' => 'false', 'error_type' => 'internal_error', 'error_message' => $error_message)));
		}

		saveRequestToLogFile($leadid);
		die(json_encode(array('success' => 'true', 'leadid' => $leadid)));
	} else {
		//ОШИБКА:
		$error_message = "Соединение было прервано! \n";
		$error_message .= $errstr . " (" . $errno . ")";
		appendLog('external_error', $error_message, __FILE__, __LINE__, json_encode($_POST));
		saveRequestToLogFile();
		die(json_encode(array('success' => 'false', 'error_type' => 'external_error', 'error_message' => $error_message)));
	}
} else {
	$output = '';
}

<?php
// CRM (система управления взаимоотношениями с клиентами) - это битрикс24
// CRM is Bitrix24

// CRM server conection data
// Данные соединения с сервером CRM
define('CRM_HOST', 'admcenter.bitrix24.ru');		// your CRM domain name			//Ваше доменное имя CRM
define('CRM_PORT', '443');							// CRM server port				//Порт сервера CRM
define('CRM_PATH', '/crm/configs/import/lead.php'); // CRM server REST service path	// Путь службы REST сервера CRM

// CRM server authorization data
// Данные авторизации CRM-сервера
define('CRM_LOGIN', 'lid@adm-center.ru');			// login of a CRM user able to manage leads	// логин пользователя CRM, которому доступно управление лидами
define('CRM_PASSWORD', 'Lidadmcenter.001');			// password of a CRM user					// пароль этого пользователя
// OR you can send special authorization hash which is sent by server after first successful connection with login and password
// ИЛИ вы можете отправить специальный хеш авторизации, который отправляется сервером после первого успешного подключения с логином и паролем
define('CRM_AUTH', 'bf3dec9d8996af9fa4225e6f90019476111');	// authorization hash				// хеш авторизации

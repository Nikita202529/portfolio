<?php

/*
Страница с только формой
*/

require_once $_SERVER['DOCUMENT_ROOT'] . '/includes/data.php';

?>
<!DOCTYPE html>
<html lang="ru">

<head>

    <meta charset="UTF-8">
    <?php
    $meta_title = 'Заявка в техподдержку сайтов на 1С-Битрикс.';
    $meta_descr = 'Заполните, пожалуйста, форму. Приложите скрины, видеозапись экрана. Чем больше будет информации о задаче, тем точнее мы сможем определить проблему. Возможно, мы свяжемся с Вами для уточнения деталей.Результат оценки мы пришлём вам на указанную почту. 
    В зависимости от сложности задачи оценка занимает от 15 минут до 2-х дней. Срочные задачи обслуживаются вне очереди';
    ?>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

	<meta name="description" content="<?=$meta_descr ?>">
	<meta name="keywords" content="поддержка сайта 1С-Битрикс, доработка сайта 1С-Битрикс, постоянная техподдержка сайта, сопровождение сайта Битрикс, разработка битрикс, программист битрикс, Битрикс, bitrix">

	<meta property="og:title" content="<?=$meta_title ?>" />
	<meta property="og:type" content="article" />
	<meta property="og:description" content="<?=$meta_descr ?>" />

	<meta property="og:image" content="https://bitrixsupport.adm-center.ru/img/imagemsngr.png" />
	<meta property="og:image:type" content="image/png" />
	<meta property="og:image:width" content="400" />
	<meta property="og:image:height" content="400" />

	<meta property="og:url" content="https://bitrixsupport.adm-center.ru/send/" />

	<meta property="og:locale" content="ru_RU" />
	<meta property="og:site_name" content="Поддержка сайтов на 1С-Битрикс" />

	<title><?=$meta_title ?></title>
	<link rel="icon" href="favicon.ico" type="image/x-icon">

	<!-- Bootstrap -->
	<link href="/css/bootstrap_modified_16.07.19.min.css" rel="stylesheet">
	<!-- Custom -->
	<link href="https://fonts.googleapis.com/css?family=Roboto:300|Roboto+Condensed:400,500|Open+Sans:300,400,600,700,800&amp;subset=cyrillic" rel="stylesheet">
	<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.0/css/all.css" integrity="sha384-Mmxa0mLqhmOeaE8vgOSbKacftZcsNYDjQzuCOm6D02luYSzBG8vpaOykv9lFQ51Y" crossorigin="anonymous">

	<link rel="stylesheet" href="/css/style.min.css">
    <link rel="stylesheet" href="/css/send/send-page.css">

</head>

<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/includes/data_js.php';
?>

<body>
    <?php
	require_once $_SERVER['DOCUMENT_ROOT'] . '/includes/yandex_metrika.php';
	?>
    <div class="wrap">
        <div class="scrollcontent">
        <header class="header">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-6 col-sm-4 col-md-6 col-lg-4">
                        <div class="row align-items-end">
                            <div class="col-5 col-sm-5 d-md-none d-lg-none">
                                <!-- тут был гамбургер -->
                            </div>

                            <div class="col-7 col-sm-6 col-md-8 col-lg-6">
                                <div class="header-logo">
                                    <a href="/" target="_blank">
                                        <img src="/img/header/logo.svg" alt="ADM">
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-6 col-sm-8 col-md-6 col-lg-8 d-flex justify-content-end align-items-center">
                        <a class="header-phone header-phone__mhidden" href="tel:+7(863)226-90-95">+7 (863) 226-90-95</a>
                        <!-- <a class="header-btn button forCalcModal" href="" data-toggle="modal" data-target="#calculateTheCostModal">Поставить задачу</a> -->
                        <!-- <button type="button" class="header-btn button" title>
                            Оставить заявку
                        </button> -->
                    </div>
                </div>
                <!-- /.row -->
            </div>
            <!-- /.container -->
        </header>
        <!-- /.header -->

        <section class="calc-form-container">
            <!-- НАЧАЛО ФОРМЫ Рассчитать стоимость-->
            <h1 class="form-header__title">
                Оставить заявку на устранение проблемы
            </h1>
            <div class="form-header__descr">
                <?=$meta_descr ?>
            </div>
            <div class="calculation-form">
                <form action="" id="send_page_calc_form" class="calculation-form__form" method="post" enctype="multipart/form-data">
                    <input type="hidden" name="my_file_upload" id="my_file_upload">
                    <div class="row">
                        <!-- левая колонка формы -->
                        <div class="col-12 col-sm-12 col-md-6 col-lg-6">
                            <div class="Flying_Placeholder">
                                <label>Адрес Вашего сайта *</label>
                                <input class="calculation-form__input" type="text" name="site-name" id="site-name">
                            </div>
                            <div class="Flying_Placeholder">
                                <select name="bitrix" id="bitrix" class="S3_type_1 bitrix_edition">
                                    <option value="Старт">Старт</option>
                                    <option value="Стандарт">Стандарт</option>
                                    <option value="Малый бизнес">Малый бизнес</option>
                                    <option value="Бизнес">Бизнес</option>
                                    <option value="Энтерпрайз">Энтерпрайз</option>
                                </select>
                            </div>
                            <div class="Flying_Placeholder">
                                <label>Ваше имя*</label>
                                <input class="calculation-form__input" type="text" name="user-name" id="user-name">
                            </div>
                            <div class="Flying_Placeholder">
                                <label>Почта *</label>
                                <input class="calculation-form__input" type="mail" name="user-mail" id="user-mail">
                            </div>
                            <div class="Flying_Placeholder">
                                <label>Телефон</label>
                                <input class="calculation-form__input" type="tel" name="user-phone" id="user-phone">
                                <select id="calculation-form-contact_way" name="calculation-form-contact_way" class="contact_way">
                                    <option class="Manager" value="manager">Звонок менеджера</option>
                                    <option class="WhatsApp" value="WhatsApp">WhatsApp</option>
                                    <option class="Viber" value="Viber">Viber</option>
                                    <option class="Telegram" value="Telegram">Telegram</option>
                                </select>
                            </div>
                            <div class="calculation-form__checkbox d-inline-flex align-items-start">
                                <div>
                                    <input type="checkbox" name="urgent-task" class="options" id="urgent-task">
                                </div>
                                <label for="urgent-task">У меня срочная задача</label>
                                <div class="urgent-task-description non-urgent" for="urgent-task">Несрочная задача - 2000 руб/час. Реагируем на запрос в течение 2ч. Выполняем в плановом порядке.</div>
                                <div class="urgent-task-description is-urgent" for="urgent-task">Срочная задача - 3000 руб/час. Реагируем за 15 мин. Выполняем немедленно</div>
                            </div>
                        </div>
                        <!-- конец левая колонка формы -->

                        <!-- правая колонка формы -->
                        <div class="col-12 col-sm-12 col-md-6 col-lg-6">
                            <div class="Flying_Placeholder">
                                <label>Опишите Ваш вопрос/задачу/проблему *</label>
                                <textarea class="calculation-form__input calculation-form__ta" name="site-problem"></textarea>
                            </div>
                            <div class="Flying_Placeholder">
                                <label>Ссылки на проблемные страницы</label>
                                <textarea class="calculation-form__input calculation-form__ta" name="site-problem-links"></textarea>
                            </div>
                            <div class="calculation-form__checkbox d-inline-flex align-items-center">
                                <div>
                                    <input type="checkbox" name="user-device" class="options" id="user-device">
                                </div>
                                <label for="user-device">Я пишу с устройства, на котором обнаружилась проблема</label>
                            </div>
                            <label class="upload-descr">Добавьте файлы, в которых указана проблема</label>
                            <div class="preloads">
                                <!-- добавляется js при загрузке файлов -->
                                <!--div class="p_item">
                                    <div class="p_text">
                                    </div>
                                    <div class="p_preview">
                                    <div class="p_close">×</div>
                                    </div>
                                </div-->
                            </div>
                            <label class="upload-label d-inline-flex align-items-center" for="file-upload">
                                <img src="img/calculation/paperclip.png" alt="">
                                <span class="upload-button">Загрузить файл</span>
                                <small class="upload-small">в формате: png/jpg/bmp/mp4/mov/wmv/flv/avi/webm/mkv; размер: до 15Мб.</small>
                                <input class="calculation-form__input d-none" type="file" name="file-upload" id="file-upload" multiple accept="image/jpeg,image/pjpeg,image/png,image/bmp,image/webp,video/quicktime,video/mpeg,video/mp4,video/ogg,video/webm,video/vnd.avi,video/x-ms-wmv,video/x-flv,video/3gpp,video/3gpp2,video/x-matroska">
                            </label>
                            <div class="d-flex align-items-center justify-content-start">
                                <button type="submit" class="button calculation-form__btn">
                                    Отправить на оценку
                                </button>
                            </div>
                            <div class="calculation-form__consent d-flex align-items-center justify-content-start">
                                Нажимая на кнопку, я даю согласие на обработку персональных данных в соответствии с ФЗ №152 «О персональных данных»
                            </div>
                        </div>
                        <!-- конец правая колонка формы -->
                        <!-- низ формы -->
                        <div class="col-12">
                        </div>
                        <!-- конец низ формы -->
                    </div>
                </form>
            </div>
            <!-- КОНЕЦ ФОРМЫ Рассчитать стоимость-->
        </section>

        <?php
        require_once $_SERVER['DOCUMENT_ROOT'] . '/includes/footer.php';
        ?>
        </div>
    </div>
    <script src="/js/jquery.min.js"></script>
    <script src="/js/bootstrap.min.js"></script>
    <script src="/js/jquery.custominputmask.min.js"></script>
    <script src="/js/select3.js"></script>
    <script src="/js/savy.min.js"></script>
    <script src="/js/detect.min.js"></script>
    <script src="/js/send/send-page.js"></script>
</body>

</html>
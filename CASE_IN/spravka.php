<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" href="style2.css">
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossorigin="anonymous">
	<link rel="shortcut icon" type="image/x-icon" href="Logo.ico">
	<title>Справка</title>
</head>
<body>
		<!-- Подключаем адаптивную панель навигации -->
	<? include('header.php') ?>
	<!-- Подключаем адаптивную панель навигации -->
	<main>
	<div class="container-fluid my-2">
			<div class="row">
			
				<div class="container graph col-md-7 col-lm-10">
					<div class="container">
					<h3 class="my-3 text-center">Описание работы сайта</h3>
					<p>Данный сайт предназначен для ознакомления сотрудника с организационно-штатной структурой корпорации и возможностями карьерного роста.</p>
					<p>После авторизации на сайте сотрудник переходит в личный кабинет, где может увидеть информацию о себе, в том числе занимаемую должность и показатель KPI. На главной странице представлен график, на котором сотрудник может увидеть какой будет его следующая должность и когда он сможет ее занять при благополучных обстоятельствах. Также пользователь будет видеть ссылку на тестирование, перейдя по которой, сотрудник попадет на страницу "Тестирование".</p>
					<p>На странице "Тестирование" пользователю предлагается пройти ряд тестов на определение соответствия будующей должности. Пройдя тест, сотрудник попадает на страницу "Результаты тестирования".</p>
					<p>На странице "Результаты тестирования" сотрудник может увидеть рекомендацию, предложенную системой, сам результат теста, ссылки на специальные ресурсы (книги, курсы) для повышения квалификации и профессиональных навыков, а также график, который рассчитает, есть ли у пользователя возможность получить новую должность раньше и на сколько.</p>
					<p>На странице справка пользователь сможет увидеть описание функционала сайта.</p>
					<P>При нажатии на кнопку выход, в панели навигации, пользователь выйдет из системы.</P>
					<p>Сайт польностью адаптивен под мобильные устройства и планшеты.</p>
					</div>
				</div>
				<div class="container col-md-4 col-lm-10 advice">
					<div class="container">
					<h2 class="my-3 text-center">Совет</h2>
					<p class="text-left">Вы можете изучить свои слабые и сильные стороны, что поможет Вам улучшить показатель KPI.</p>
					<p class="text-left pt-5">В разделе <b><a href="TEST.htm">Тестирование</a></b> Вы можете проверить свои навыки на соответствие более высокой должности.
					</p>
					</div>
					<div class="container text-center pt-5">
					<h6>Пройдите тест и посмотрите как близко Вы к новой должности!</h6>
					<button class="btn btn-outline-success"><a href="TEST.htm" class="test_a">Тест</a></button>
					</div>
				</div>
			</div>
	</div>
	</main>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.bundle.min.js" integrity="sha384-JEW9xMcG8R+pH31jmWH6WWP0WintQrMb4s7ZOdauHnUtxwoG2vI5DkLtS3qm9Ekf" crossorigin="anonymous"></script>
</body>
</html>
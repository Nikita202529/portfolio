<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" href="style2.css">
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossorigin="anonymous">
	<link rel="shortcut icon" type="image/x-icon" href="Logo.ico">
	<script type="text/javascript" src="js\jquery-3.5.1.min.js"></script>
	<script type="text/javascript" src="js\functions.js"></script>
	<title>Структура</title>
</head>
<body>
	<!-- Подключаем адаптивную панель навигации -->
	<? include('header.php') ?>
	<!-- Подключаем адаптивную панель навигации -->
	<main>
	<div class="container-fluid my-2">
			<div class="row">
				<div class="col-md-4 col-lm-6 information1 container text-dark">
					<!-- Поиск по структуре -->
				<div class="profil"> 
					<input type="text" id="myInput" onkeyup="myFunction()" placeholder="Введите название должности...">

					<ul id="myUL">
  						<li><a href="#Stager">Стажер</a></li>
  						<li><a href="#Ingener">Инженер</a></li>
  						<li><a href="#oldIngener">Старший инженер</a></li>
  						<li><a href="#smallBoss">Руководитель направления</a></li>

  						<li><a href="#mediumBoss">Заместитель главы компании</a></li>
  						<li><a href="#Boss" class="radius">Глава компании</a></li>
					</ul>
				</div> 
					<!-- Поиск по структуре -->
				</div>
				<div class="container graph col-md-7 col-lm-10">
					<h2 class="my-3 text-center">Штатная структура предприятия</h2>
					<hr>
					<div class="container row dolgnost">
						<div class="col-md-4 col-lm-6">
						<img src="https://media.foxford.ru/wp-content/uploads/2020/11/zg_SWJeyOwM-1236x1200.jpg" alt="Стажер" class="w-100 rounded-circle" id="Stager">
						</div>
						<div class="col-md-8 col-lm-6">
						<h3>
							Стажер
						</h3>
						<p>Стажёр — лицо, поступившее на новую работу и проходящее испытательный срок, в течение которого оцениваются его способности, и приобретается опыт работы в своей специальности.</p>
						</div>
					</div>
					<hr>
					<div class="container row dolgnost">
						<div class="col-md-8 col-lm-6">
						<h3 id="Ingener">
							Инженер
						</h3>
						<p>Инженер – это специалист-изобретатель, который создает или совершенствует технические механизмы. Профессия насчитывает уже несколько сотен и даже тысяч лет. К величайшим известным инженерам относятся Архимед, Леонардо да Винчи, Никола Тесла, Генри Форд, Сергей Королев, Илон Маск, и череда гениальных технарей никогда не иссякнет.</p>
						</div>
						<div class="col-md-4 col-lm-6">
						<img src="https://autogear.ru/misc/i/gallery/3352/239559.jpg" alt="Стажер" class="w-100 rounded-circle">
						</div>
					</div>
					<hr>
					<div class="container row dolgnost">
						<div class="col-md-4 col-lm-6">
						<img src="https://13.img.avito.st/640x480/8787579413.jpg" alt="Стажер" class="w-100 rounded-circle" id="oldIngener">
						</div>
						<div class="col-md-8 col-lm-6">
						<h3>
							Старший Инженер
						</h3>
						<p>Старший инженер относится к категории специалистов, имеет в подчинении группу инженеров. Лицо, имеющее высшее профессиональное образование и стаж работы в должности инженера I-й (высшей) категории не менее 5 лет.</p>
						</div>
					</div>
					<hr>
					<div class="container row dolgnost">
						<div class="col-md-8 col-lm-6">
						<h3 id="smallBoss">
							Руководитель направления
						</h3>
						<p>Должность «руководитель направления» относится к сфере продаж. Организации, выпускающие широкий перечень товаров, могут в целях оптимальной организации сбыта и маркетинга объединять сходные по назначению или пользовательским характеристикам продукты в одну группу. Ответственный специалист призван наладить ее реализацию, найти выгодные каналы сбыта.</p>
						</div>
						<div class="col-md-4 col-lm-6">
						<img src="https://im0-tub-ru.yandex.net/i?id=0eca6f7d39fe9028666254508da593c1&n=13&exp=1" alt="Стажер" class="w-100 rounded-circle">
						</div>
					</div>
					<hr>
					<div class="container row dolgnost">
						<div class="col-md-4 col-lm-6">
						<img src="https://yt3.ggpht.com/a/AATXAJxh03KXEZOZHCUgyerSGf3QYIK1qPliPSoAQQ=s900-c-k-c0xffffffff-no-rj-mo" alt="Стажер" class="w-100 rounded-circle" id="mediumBoss">
						</div>
						<div class="col-md-8 col-lm-6">
						<h3>
							Заместитель главы компании
						</h3>
						<p>Заместитель главы компании - это именно тот человек, что стоит рядом с лидером и помогает в осуществлении планов развития компании. Человек, занимающий должность, обязан понимать уровень своей ответственности и обладать соответствующими профессиональными навыками.</p>
						</div>
					</div>
					<hr>
					<div class="container row dolgnost">
						<div class="col-md-8 col-lm-6">
						<h3 id="Boss">
							Глава компании
						</h3>
						<p>Генеральный директор - это именно тот человек, от которого во многом зависит успешное развитие компании, постоянный рост ее основных показателей - деятельности и дохода.</p>
						</div>
						<div class="col-md-4 col-lm-6">
						<img src="https://static.tildacdn.com/tild3536-6336-4632-b232-656532333438/logo-design-trends.jpg" alt="Стажер" class="w-100 rounded-circle">
						</div>
					</div>
					<hr>
				</div>
			</div>
	</div>
	</main>
<!-- Скрипт поиска по структуре -->
	<script>
function myFunction() {
    var input, filter, ul, li, a, i;
    input = document.getElementById('myInput');
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName('li');

    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}
</script>
<!-- Скрипт поиска по структуре -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.bundle.min.js" integrity="sha384-JEW9xMcG8R+pH31jmWH6WWP0WintQrMb4s7ZOdauHnUtxwoG2vI5DkLtS3qm9Ekf" crossorigin="anonymous"></script>
</body>
</html>
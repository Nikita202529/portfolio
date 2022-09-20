<?php session_start(); ?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" href="style2.css">
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossorigin="anonymous">
	<link rel="shortcut icon" type="image/x-icon" href="Logo.ico">
	<script src="chart/lib/liteChart.js"></script>
	<title>Учетная запись</title>
</head>
<body>
	<?php
		header( 'Content-Type: text/html; charset=utf-8' );
		include 'db_api/user.php';
		$user = new User($_SESSION['id_user']);
	?>
	<!-- Подключаем адаптивную панель навигации -->
	<? include('header.php') ?>
	<!-- Подключаем адаптивную панель навигации -->
	<main>
	<div class="container-fluid my-2">
			<div class="row">
				<div class="col-md-3 col-lm-6 container information text-dark">
					<div class="profil">
					<img src="https://www.ok-magazine.ru/images/cache/2020/10/28/fit_795_547_false_crop_5520_3105_0_102_q90_616421_d77adb6e21145779dd518e27e.jpeg" alt="Аватарка" class="avatar mb-2">
					<div class="container">
					<h5 class="text-center mb-3"><? echo $user->surname." ".$user->name." ".$user->patronymic; ?></h5>
				    <hr>
					<p><b>Дата рождения:</b> <? echo $user->date_of_birth; ?></p>
					<p><b>Начало трудовой деятельности:</b> <? echo $user->start_of_work; ?></p>
					<p><b>Образование:</b> <? echo $user->education; ?></p>
					<p><b>Отрасль:</b> <? echo $user->industry; ?></p>
					<p><b>Должность:</b> <? echo $user->post; ?></p>
					<p><b>Владение иностранными языками:</b> <? echo $user->languages; ?></p>
					<p><b>KPI:</b> <? echo $user->kpi; ?></p>
					</div>
				    </div>
				</div>
				<div class="container graph col-md-6 col-lm-10">
					<div class="container">
					<h2 class="my-3 text-center">Результаты вашего тестирования</h2>
					<p>Данный график выстраивается на основе показателя KPI. Чем выше KPI, тем выше вероятность получить следующую должность раньше.</p>
					</div>
					<!-- График -->
                    <div class="container row w-100">
					<div class="col-md-12 col-sm-12 text-center" style="width: 100%; height: 500px;" id="your-id">	
					</div>
                    </div>
					<!-- График -->
				</div>
				<div class="container col-md-2 col-lm-10 advice">
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
<script>
    document.addEventListener("DOMContentLoaded", function(){
        // Create liteChart.js Object
        let d = new liteChart("chart", {
            animate: {
                show: false,
                duration: 0.7,
            },
            axisX: {
                show: true,
                color: "#212529",
                width: 2,
                value: "",
                minValue: 0,
                maxValue: 0,
            },
            axisY: {
                show: true,
                color: "#212529",
                width: 2,
                value: "",
                minValue: 0,
                maxValue: 0,
            },
            eventCoord: {
                x: 0,
                y: 0,
            },
            fill: "gradient",
            gridX: {
                show: true,
                interval: 0,
                fill: 1,
                label: {
                    show: true
                },
                stroke:"#0dcaf0",
                width:2,
                dasharray:"0 10.04",
                linecap:"round",
            },
            gridY: {
                show: true,
                interval: 0,
                fill: 1,
                label: {
                    show: true
                },
                stroke:"#0dcaf0",
                width:2,
                dasharray:"0 10.04",
                linecap:"round",
            },
            labels: {
                show: true,
                fontColor: "#212529",
                fontSize: 14,
                fontFamily: "sans-serif",
                fontWeight: "normal",
            },
            legends: {
                table: {
                    show: false,
                    position: {
                        x: 0,
                        y: 0,
                    },
                    direction: "horizontal",
                },
                fill: "#0dcaf0",
            },
            line: {
                width: 3,
                style: "straight",
                shadow: true,
                dasharray: null,
            },
            point: {
                show: true,
                radius: 5,
                strokeWidth: 5,
                stroke: "#0d6efd",
            },
            tooltip: {
                show: false,
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                fontColor: "#000000",
            },
            valueOnliteChart: {
                show: false,
            },
        } );

        // Set labels
        d.setLabels([ , "Сейчас" ,"3 мес", "1 год", "2 года", "5 лет", "7 лет", "10 лет", "12 лет", "15 лет", "18 лет", "20 лет", "25 лет"]);
        let Kpi=100, t1=10,t2=5,t3=6,t4=10,t5=4,t6=8;
        //где-то тут нужно передать результаты тестов
        let kpi1=((t1+t2*0.1+t3*1.3+t4*0.4+t5*0.9+t6*0.7)/12)/Kpi;
        let kpi2=((t1*0.7+t2*0.6+t3*1.2+t4+t5*1.2+t6*0.9)/12)/Kpi;
        let kpi3=((t1*1.2+t2*1.1+t3*1.4+t4*0.9+t5*1.2+t6)/12)/Kpi;
        let kpi4=((t1*1.3+t2*1.5+t3*1.7+t4*1.3+t5*1.5+t6*1.2)/12)/Kpi;
        let kpi5=((t1*1.5+t2*1.7+t3*2+t4*1.6+t5*1.8+t6*1.5)/12)/Kpi;
        let kpi6=((t1*1.9+t2*2+t3*2.4+t4*1.8+t5*2+t6*1.9)/12)/Kpi;
        let kpi7=((t1*2.1+t2*3+t3*3+t4*2.5+t5*2.2+t6*2.2)/12)/Kpi;
        let kpi8=((t1*2.2+t2*4+t3*3.4+t4*2.8+t5*2.4+t6*2.6)/12)/Kpi;
        let kpi9=((t1*2.3+t2*5+t3*3.6+t4*3+t5*2.6+t6*2.8)/12)/Kpi;
        let kpi10=((t1*2.4+t2*6+t3*3.8+t4*3.4+t5*2.8+t6*3)/12)/Kpi;
        let kpi11=((t1*2.5+t2*7+t3*4+t4*3.8+t5*3+t6*4.4)/12)/Kpi;
        let kpi12=((t1*2.5+t2*8+t3*4.2+t4*4+t5*3.2+t6*5)/12)/Kpi;
        //перезаписывать новый результат KPI для дальнейшенй корректировки отноительно нового значения
        // Set legends and values
        d.addLegend({"stroke": "#FFC107", "fill": "#fff", "values": [kpi1,kpi2,kpi3,kpi4,kpi5,kpi6,kpi7, kpi8, kpi9, kpi10, kpi11, kpi12]});
        //d.addLegend({"name": "Зам.главый компании", "stroke": "#ba09fc", "fill": "#fff", "values": [a, b, 240, 310, 400,470 ]});
        //d.addLegend({"name": "Руководитель направления", "stroke": "#bb0000", "fill": "#fff", "values": [a, b, 240, 310, 400 ]});
        //d.addLegend({"name": "Ст.Инженер", "stroke": "#00B2A0", "fill": "#fff", "values": [a, b, 240, 310] });
        //d.addLegend({"name": "Инженер", "stroke": "#200020", "fill": "#fff", "values": [a, b, 240 ]});
        //d.addLegend({"name": "Стажер", "stroke": "#ff00ff", "fill": "#fff", "values": [a,b ]});
        // Inject chart into DOM object
        let div = document.getElementById("your-id");
        d.inject(div);

        // Draw
        d.draw();
    });
</script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.bundle.min.js" integrity="sha384-JEW9xMcG8R+pH31jmWH6WWP0WintQrMb4s7ZOdauHnUtxwoG2vI5DkLtS3qm9Ekf" crossorigin="anonymous"></script>
</body>
</html>
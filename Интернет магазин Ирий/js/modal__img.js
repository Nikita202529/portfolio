// Get the modal
var modal = document.getElementById('myModal');

/*Переменные раздела документы*/
var img1 = document.getElementById('myImg');
var img2 = document.getElementById('myImg1');
var img3 = document.getElementById('myImg2');
var img4 = document.getElementById('myImg3');

/*Переменные раздела со вкладки Информация*/
var img5 = document.getElementById('myImg4');
var img6 = document.getElementById('myImg5');
var img7 = document.getElementById('myImg6');
var img8 = document.getElementById('myImg7');

/*Переменные раздела со вкладки О ферме*/
var img9 = document.getElementById('myImg8');
var img10 = document.getElementById('myImg9');
var img11 = document.getElementById('myImg10');
var img12 = document.getElementById('myImg11');

/*Переменные раздела со вкладки Достижения*/
var img13 = document.getElementById('myImg12');
var img14 = document.getElementById('myImg13');
var img15 = document.getElementById('myImg14');
var img16 = document.getElementById('myImg15');

var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");

// Get the image and insert it inside the modal - use its "alt" text as a caption
const img = [img1, img2, img3, img4, img5, img6, img7, img8, img9, 
img10, img11, img12, img13, img14, img15, img16];


img.forEach((e) => {
    e.onclick = function(){
    modal.style.display = "block";
    modalImg.src = this.src;
    captionText.innerHTML = this.alt;
    }
})



// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close__modal")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}
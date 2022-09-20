
var modal__Doc = document.getElementById('modal__Doc');
var btn = document.getElementById('modal__btn');

    btn.onclick = function(){
    modal__Doc.style.display = "block";
    }


var close = document.getElementsByClassName("close__modal__doc")[0];

close.onclick = function() {
    modal__Doc.style.display = "none";
}

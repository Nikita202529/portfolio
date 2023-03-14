$(window).scroll(function() {
  if ($(this).scrollTop() > 1){  
      $('header').addClass("sticky");
  }  else {
      $('header').removeClass("sticky");
  }
});
jQuery(function($){
  $("#user-phone").mask("+7 (999) 999-99-99", {placeholder: "+7 (___) ___-__-__" });
  $("#user-phone_modal").mask("+7 (999) 999-99-99", {placeholder: "+7 (___) ___-__-__" });
});

$(document).ready(function (){
  const textScroll = $('.highlights-text-scroll'),
        detailBtn= $('.support-detail__btn'),
        button = $('.btn-scroll');

  function scrollPage(selector) {
   selector.click(function(){
     $('html, body').animate({
       scrollTop: $($(this).attr('href')).offset().top - 30
     }, 1500);
     return false;
   });
  }      

  scrollPage(textScroll);
  scrollPage(detailBtn);
  scrollPage(button);

});
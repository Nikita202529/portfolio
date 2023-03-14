jQuery(function($){
  $("#user-phone").mask("+7 (999) 999-99-99", {placeholder: "+7 (___) ___-__-__" });
  $("#user-phone_modal").mask("+7 (999) 999-99-99", {placeholder: "+7 (___) ___-__-__" });
});

$(document).ready(function (){
  const detailBtn= $('.support-detail__btn'),
        headerBtn= $('.header-btn'),
        button = $('.btn-scroll');

  function scrollPage(selector) {
   selector.click(function(){
     $('html, body').animate({
       scrollTop: $($(this).attr('href')).offset().top - 30
     }, 1500);
     return false;
   });
  }      
  scrollPage(detailBtn);
  scrollPage(detailBtn);
  scrollPage(button);
});

window.addEventListener('DOMContentLoaded', function () {
  'use strict';
  
  // start main menu

  let hamburger = document.querySelector('.header-menu-link'),
      menu = document.querySelector('.menu'),
      scrollcontent = document.querySelector('.scrollcontent'),
      menuArrowBack = document.querySelector('.menu-arrow__link'),
      subMenuArrowBack = document.querySelectorAll('.sub-menu .menu-arrow__link'),
      menuItem = document.querySelectorAll('.menu-item'),
      menuLink = document.querySelectorAll('.menu-link'),
      subMenu = document.querySelectorAll('.menu-item .sub-menu'),
      body = document.querySelector('body'),
      headerLogo = document.querySelector('.header-logo');

  // show main menu
  function showMenu() {
    body.classList.add('menu-open');
    menu.classList.add('menu-active');
    menu.classList.add('animShow');
    scrollcontent.classList.add('scrollcontent_active');
    menu.classList.remove('animHide');
  }

  // hide main menu
  function hideMenu() {
    body.classList.remove('menu-open');
    menu.classList.remove('menu-active');
    menu.classList.remove('animShow');
    menu.classList.add('animHide');
    scrollcontent.classList.remove('scrollcontent_active');
    headerLogo.style.opacity = '1';
    hamburger.style.opacity = '1';
  }

  // hide elements menu when show submenu
  function hideElemMenu() {
    menuArrowBack.style.opacity = '0';
    menuLink.forEach(function(item) {
      item.style.opacity = '0';
    });
    //menu.style.backgroundImage = 'transparent';
  }

  // show elements menu when hide submenu
  function showElemMenu() {
    menuArrowBack.style.opacity = '1';
    menuLink.forEach(function(item) {
      item.style.opacity = '1';
    });
    //menu.style.backgroundImage = 'url(../img/header/mppusher-bg.jpg)';
  }

  // show submenu menu
  function showSubMenu(n) {
    
    subMenu[n].classList.add('sub-menu-active');
    subMenu[n].classList.add('animShow');
    subMenu[n].classList.remove('animHide');  
    setTimeout(hideElemMenu, 1000);
  }

  // hide submenu menu
  function hideSubMenu(n) {
    subMenu[n].classList.remove('sub-menu-active');
    subMenu[n].classList.remove('animShow');
    subMenu[n].classList.add('animHide');
    showElemMenu();
  }


  //Event when you click on a hamburger and then the menu appears
  function init() {
    hamburger.addEventListener('click', function(e) {
      e.stopPropagation();

      let scrollContent = document.querySelector('.scrollcontent');


      if (window.innerWidth < 768) {
        showMenu();
        document.querySelector('.scrollcontent_active').style.left = '0';
      } else if (window.innerWidth >= 768 &&  window.innerWidth <= 992) {
        showMenu();
      } else if (window.innerWidth > 992 &&  window.innerWidth <= 1200) {
        showMenu();
      } else  {
        showMenu();
        // do something for huge screens
      }      
    });
  }
  init();

  // Event when you click outside menu or submenu - menu or submenu hide
  document.addEventListener('click', function(e) {
    let target = e.target;
    let its_menu = target == menu || menu.contains(target);
    let its_hamburger = target == hamburger;
    let menu_is_active = menu.classList.contains('menu-active'),
        subMenu_is_active = menu.classList.contains('sub-menu-active');

    
    if (!its_menu && !its_hamburger && menu_is_active) {
      hideMenu();
      if (!its_menu && !its_hamburger && menu_is_active && !subMenu_is_active) {
        for (let i = 0; i < subMenu.length; i++) {  
          hideSubMenu(i);
        }
      }  
    }  
  });


  // cycle when clicking on a specific link menu - show / hide the corresponding submenu
  for (let i = 0; i < menuItem.length; i++) {
    menuItem[i].addEventListener('click', function (event) {
      let target = event.target;
      
      if (target && target.classList.contains('menu-link')) {
        if (!menuItem[i].children[1].children[1].children[1].children[0].textContent == '') {
          showSubMenu(i);
          subMenuArrowBack[i].addEventListener('click', function() {
            hideSubMenu(i);
          });  
        } 
      } else if(menuItem[i].children[1].children[1].children[1].children[0].textContent == '') {
          hideMenu();
      }
    });
  }

  // Event when you click on the arrow main menu and then the menu is hidden
  menuArrowBack.addEventListener('click', function() {
    hideMenu();
  });

  // end main menu

//show some blocks when you click on a link
  let serviceItem = document.querySelectorAll('.service-item'),
      serviceLinks = document.querySelector('.service-links'),
      serviceLink = document.querySelectorAll('.service-link');

  function showserviceItem() {
    for (let i = 0; i < serviceItem.length; i++) {
      serviceItem[i].style.display = '';
    }
  }

  function hideserviceItem() {
    for (let i = 0; i < serviceItem.length; i++) {
      if (i > 5) {
        serviceItem[i].style.display = 'none';
      } else {
        serviceItem[i].style.display = '';
      }
    }
  }
  function serviceBlock() {
    //if ($(window).width() < 992) {
    if (window.innerWidth < 992) {
      hideserviceItem();
      //serviceLink[0].style.display = 'inline-block';
    } else {
      showserviceItem();
      // serviceLink[1].style.display = 'none';
    }
  }

  serviceLinks.addEventListener('click', function(e) {
    let target = e.target;
    if (target && target.classList.contains('service-link__show')) {
      showserviceItem();
      serviceLink[0].style.display = 'none';
      serviceLink[1].style.display = 'inline-block';
    } 
  });  
  serviceLinks.addEventListener('click', function(e) {
    let target = e.target;
    if (target && target.classList.contains('service-link__hide')) {
      hideserviceItem();
      serviceLink[0].style.display = 'inline-block';
      serviceLink[1].style.display = 'none';
    }
  });

  serviceBlock();

  //popup top when height < 440px

  if (window.innerWidth > 575 && window.innerHeight < 440) {
    document.querySelector('.popup').style.top = '20%';
    document.querySelector('.popup').style.transform = 'translate(-50%, 0)';
  }

  (function() {

    window.addEventListener("resize", resizeThrottler, false);

    var resizeTimeout;
    function resizeThrottler() {
      // ignore resize events as long as an actualResizeHandler execution is in the queue
      if ( !resizeTimeout ) {
        resizeTimeout = setTimeout(function() {
          resizeTimeout = null;
          actualResizeHandler();
       
         // The actualResizeHandler will execute at a rate of 15fps
         }, 66);
      }
    }

    function actualResizeHandler() {
      init();
      //serviceBlock();
      if (window.innerWidth > 575 && window.innerHeight < 440) {
        document.querySelector('.popup').style.top = '20%';
        document.querySelector('.popup').style.transform = 'translate(-50%, 0)';
      }
    }

  }());
});     
const icon1 = document.getElementById('icon_1');
const icon2 = document.getElementById('icon_2');
const icon3 = document.getElementById('icon_3')
const icon4 = document.getElementById('icon_4')
const icon5 = document.getElementById('icon_5')
const icon6 = document.getElementById('icon_6') 
const icon7 = document.getElementById('icon_7')
const icon8 = document.getElementById('icon_8')
const icon9 = document.getElementById('icon_9')
const icon10 = document.getElementById('icon_10')
const icon11 = document.getElementById('icon_11')
const icon12 = document.getElementById('icon_12')
const icon13 = document.getElementById('icon_13')
const icon14 = document.getElementById('icon_14')
const icon15 = document.getElementById('icon_14')
const closeMenu = document.getElementById('close')
const iconClose = document.getElementById('iconClose')
const textMenu = document.getElementById('menu')


const arrIcons = [icon1, icon2, icon3, icon4, icon5, icon6, 
    icon7, icon8, icon9, icon10, icon11, icon12, icon13, icon14, icon15]


arrIcons.forEach((e) => {
    e.addEventListener('click', () => {
        textMenu.classList.remove('text__Menu_none')
        textMenu.classList.add('text__Menu')
        iconClose.classList.remove('text__Menu_none')
                  
    })
})


if (textMenu.classList.contains('text__Menu_none') === true) {
    iconClose.classList.add('text__Menu_none')
}

iconClose.addEventListener('click', () => {
    textMenu.classList.add('text__Menu_none')
    iconClose.classList.add('text__Menu_none')
})

closeMenu.addEventListener(() => {
    textMenu.classList.add('text__Menu_none')
})  
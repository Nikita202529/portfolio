const btn = document.getElementById('btn');
const modal = document.getElementById('modal');
const btnCancelMessage = document.getElementById('btnCancelMessage');
const btnSendMessage = document.getElementById('btnSendMessage');
const btnGamburger = document.getElementById('menuGamburger');
const menu = document.getElementById('menu');
const links = document.getElementsByClassName('link');

const openCloseModal = (modal) => {
    modal.classList.toggle('activeModal');
}

const stopAction = (btn) => {
    btn.preventDefault();
}

btn.addEventListener('click', () => {
    openCloseModal(modal);
});

btnCancelMessage.addEventListener('click', (e) => {
    stopAction(e);
    openCloseModal(modal);
});

btnSendMessage.addEventListener('click', (e) => {
    stopAction(e);
});

btnGamburger.addEventListener('click', () => {
    openCloseModal(menu);
});

for (item of links) {
    item.addEventListener('click', () => {
        openCloseModal(menu);
    });
}
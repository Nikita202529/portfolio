// Scrtipt for replace text in button

let btnVisible = document.getElementById('btnVisible');

const replacementText = () => {
    if (btnVisible.textContent === 'Смотреть еще') {
        btnVisible.innerText = 'Скрыть';
    } else {
        btnVisible.innerText = 'Смотреть еще';
    }
}

btnVisible.addEventListener('click', replacementText);

// Script for tabs portfolio

let tabs = document.querySelectorAll('.tab');
let contents = document.querySelectorAll('.gallery');

const classActive = (el) => {
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove('activeTab');
    }

    el.classList.add('activeTab');
}

for (let item of tabs) {
    item.addEventListener('click', (e) => {
        let currTub = e.target.dataset.btn;
        classActive(e.target);
        
        for (let i = 0; i < contents.length; i++) {
            contents[i].classList.remove('activeGallery');
            if (contents[i].dataset.content === currTub) {
                contents[i].classList.add('activeGallery');
            }
        }
    })
}
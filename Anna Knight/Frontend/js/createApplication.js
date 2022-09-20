let btn = document.getElementById('ctaBtnContact');
let inputName = document.getElementById('inputName');
let inputTel = document.getElementById('inputTel');

let textInputName = '';
let textInputTel = '';

const baseUrl = 'http://localhost:5000';

inputName.addEventListener('change', e => {
    if (e.target.value) {
        textInputName = e.target.value;
    }
});

inputTel.addEventListener('change', e => {
    if (e.target.value) {
        textInputTel = e.target.value;
    }
});

btn.addEventListener('click', async () => {

    if (textInputName && textInputTel) {
        const resp = await fetch((`${baseUrl}/createUser` ), {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json;charset=utf-8',
                'Access-Control-Allow-Origin' : '*'
            },
            body : JSON.stringify({
                name : textInputName,
                tel : textInputTel
            })
        });
        let resultPOST = await resp.json()
        .then((resp => {
            alert('Заявка отправлена!');
        }))
        .catch((error => resp.send('ошибка',error)));

        inputName.value = '';
        inputTel.value = '';

        textInputName = '';
        textInputTel = '';
    }
})
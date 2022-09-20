const btnInf = document.getElementById('btn_inf')
const btnAbout = document.getElementById('btn_about')
const personal_FIO = document.getElementById('FIO')
const FIO_header = document.getElementById('FIO_header')
const FIO_description = document.getElementById('FIO_description')
const personal_inn = document.getElementById('INN')
const personal_address_LPH = document.getElementById('address_LPH')
const personal_address_org = document.getElementById('address_org')
const personal_inf = document.getElementById('inf_personal')


let item = [edit = 0, nav_menu = 0]


btn_edit.addEventListener('click', () => {
    item[0] += 1
    if (item[0] % 2 === 1) {
        btn_edit.innerHTML = 'Сохранить'
        personal_FIO.innerHTML = 
        `<p class="w-100">ФИО:
            <input type="text" id="inputFIO" class="w-100 form-control" placeholder=ФИО value='Александр Федерович Петров'> 
        </p>`
        personal_inn.innerHTML = 
        `<p class="w-100">
            <span>
                ИНН:
            </span>
            <input type="text" id="inputInn" class="personalInput w-100 form-control" placeholder=ИНН value='500100732259'> 
        </p>`
        personal_address_LPH.innerHTML = 
        `<p>
            <span>
                Адрес ЛПХ:
            </span>
            <input type="text" id="inputLPH" class="personalInput w-100 form-control" placeholder="ЛПХ" value = '500100732259'> 
        </p>`
        personal_address_org.innerHTML = 
        `<p>
            <span>
                Адрес организации:
            </span>
            <input type="email" id="inputOrg" class="personalInput w-100 form-control" placeholder="E-mail" value = 'alex@mail.ru'>
        </p>`
    }

    if (item[0] % 2 === 0) {
        btn_edit.innerHTML = '<div>Редактировать</div>'

        const personal_FIO_input = document.getElementById('inputFIO').value
        const personal_inn_input = document.getElementById('inputInn').value
        const personal_address_LPH_input = document.getElementById('inputLPH').value
        const personal_address_org_input = document.getElementById('inputOrg').value

        personal_FIO.innerHTML = `<span><p id = 'FIO' class="FIO">${personal_FIO_input}</p></span>`
        FIO_header.innerHTML = `<p>${personal_FIO_input}</p>`
        FIO_description.innerHTML = `<p>${personal_FIO_input}</p>`
        personal_inn.innerHTML = `<p id = 'INN'><span>ИНН:</span> ${personal_inn_input}</p>`
        personal_address_LPH.innerHTML = `<p id = "address_LPH"><span>Адрес ЛПХ:</span> ${personal_address_LPH_input}</p>`
        personal_address_org.innerHTML = `<p id = "address_org"><span>Адрес организации:</span> ${personal_address_org_input}</p>`
        
    }
    
})


btnInf.click()





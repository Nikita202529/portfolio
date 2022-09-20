const btnDecrement_1 = document.getElementById('btnDecrement_1')
const btnDecrement_2 = document.getElementById('btnDecrement_2')
const btnDecrement_3 = document.getElementById('btnDecrement_3')
const btnIncrement_1 = document.getElementById('btnIncrement_1')
const btnIncrement_2 = document.getElementById('btnIncrement_2')
const btnIncrement_3 = document.getElementById('btnIncrement_3')

/* let quantity_1 = parseInt(document.getElementById('Quantity_1').value)
let quantity_2 = parseInt(document.getElementById('Quantity_2').value)
let quantity_3 = parseInt(document.getElementById('Quantity_3').value)

let price_1 = parseInt(document.getElementById('price_1').textContent)
let price_2 = parseInt(document.getElementById('price_2').textContent)
let price_3 = parseInt(document.getElementById('price_3').textContent) */

let why_3 = 0
let quantity_1 = document.getElementById('Quantity_1')
let quantity_2 = document.getElementById('Quantity_2')
let quantity_3 = document.getElementById('Quantity_3')

let price_1 = document.getElementById('price_1')
let price_2 = document.getElementById('price_2')
let price_3 = document.getElementById('price_3')

const btnDecrement = [btnIncrement_1, btnIncrement_2, btnIncrement_3]
const btnIncrement = [btnIncrement_1, btnIncrement_2, btnIncrement_3]

const quantity = [quantity_1, quantity_2, quantity_3]

btnDecrement.forEach((e) => {
    
    e.addEventListener('click', () => {
        why_3 += 1
        quantity[0].innerHTML = `<div><p>${parseInt(quantity_1.value) + 1} <span>${parseInt(quantity_1.value) * parseInt(price_1.textContent)}</span></p></div>`
    })
})



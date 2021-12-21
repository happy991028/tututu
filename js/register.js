/****注册****/
let input1 = document.querySelector('input[ type="text"]')
let pObj1 =document.querySelector('p[class="one"]')

let psw1 =document.querySelector('input[ type="password"]')
let pObj2 =document.querySelector('p[class="two"]')

let psw2 =document.querySelector('input[ class="input-cpsd"]')
let pObj3 =document.querySelector('p[class="three"]')

let email =document.querySelector('input[type="email"]')
let pObj4 =document.querySelector('p[class="four"]')


let btn =document.querySelector('button[type="button"]')
// console.log(btn,111)
input1.addEventListener('blur', (e) => {
    if (input1.value == '') {
        pObj1.innerHTML = '请输入要注册的账号'
    } else {
        pObj1.innerHTML = ''
    }
})
psw1.addEventListener('blur', (e) => {
    if (psw1.value == '') {
        pObj2.innerHTML = '请输入要注册的账号'
    } else {
        pObj2.innerHTML = ''
    }
})
psw2.addEventListener('blur', (e) => {
    if (psw2.value == '') {
        pObj3.innerHTML = '请输入要注册的账号'
    } else {
        pObj3.innerHTML = ''
    }
})

email.addEventListener('blur', (e) => {
    if (email.value == '') {
        pObj4.innerHTML = '请输入要注册的账号'
    } else {
        pObj4.innerHTML = ''
    }
})



btn.addEventListener('click', e => {
    if (input1.value == '' || psw1.value == '' || psw2.value == '' || email.value=='') {
        alert('请完整输入账号密码哦')
    } else {
        alert('哇哦，注册成功，快去登录吧！')
        psw1.value = ''
        input1.value = ''
        location.href = './login.html'
    }
})



function fn(params) {
    let body = document.querySelector('body')
// console.log(body)
    body.style.background = '#f2f2f2'
}
fn()
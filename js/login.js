/*****登录****/
let input1 = document.querySelector('input[type="text"]')
// console.log(input1)
let one = document.querySelector('p[class="one"]')
// console.log(one)

let input2 = document.querySelector('input[name="password"]')
// console.log(input2)
let two = document.querySelector('p[class="two"]')
// console.log(two)

let btn1 = document.querySelector('button[class="login"]')
// console.log(btn1)
let btn2 = document.querySelector('button[class="enroll"]')
// console.log(btn2)

input1.addEventListener('blur', (e) => {
    if (input1.value == '') {
        one.innerHTML = '*不要忘记输入账号哦'
    } else {
        one.innerHTML = ''
    }
})

input2.addEventListener('blur', (e) => {
    if (input2.value == '') {
        two.innerHTML = '*不要忘记输入密码哦'
    } else {
        two.innerHTML = ''
    }
})


btn1.addEventListener('click', e => {
    if (input1.value == '' || input2.value == '') {
        alert('请完整输入账号密码哦')
    } else {
        alert('哇哦，登录成功！')
        input2.value = ''
        input1.value = ''
        location.href = './index.html'
    }
})


btn2.addEventListener('click', e => {
        location.href = './register.html'
    
})
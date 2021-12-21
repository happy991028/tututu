let list = []

//取出商品
function getList(newList) {
    $.ajax({
        url: 'http://www.xiongmaoyouxuan.com/api/tab/1',
        type: 'get',
        Headers: {
            'x-platform': 'pc'
        },
        success: function (result) {
            if (result.code == 200) {
                let productsList = result.data.items.list
                // let list = [...productsList, ...newList]
                showProducts(productsList)
            }
        }
    })
}
//调用
getList()


/*商品追加到页面*/
function showProducts(productsList) {
    // list=[...list,...productsList]
    let data = {
        productsList
    }

    let htmlStr = template('moban', data)
    // console.log(htmlStr,10101)
    // let show = document.querySelector('div [class="show"]')
    // show.append(htmlStr)

    // 商品获取
    // let show_ = document.querySelector('div[class="show"]')
    // console.log(show_,11111)
    $('.show').append(htmlStr)
}


/****查看更多****/
let num = 0
function addBtn() {

    let box_ = document.querySelector('div[class="box"]')
    // console.log(box_,1111)
    // 给查看更多绑定点击事件
    box_.onclick =function () {
        //点击查看更多商品数量增加
        num++
        //调
        getMore(num)
    }

}
addBtn()

function getMore(num) {

    $.ajax({
        url: `http://www.xiongmaoyouxuan.com/api/tab/1/feeds?start=${num*20}&sort=0`,
        type: 'get',
        success: function (result) {
            if (result.code == 200) {
                let newList = result.data.list
                // getList(newList)
                showProducts(newList)
            }
        }

    })
}

function showScrollTop(distance) {
    document.documentElement.scrollTop = distance
}




/*********返回顶部*********/
function getScrollTop() {

    //绑定滚动事件
    document.onscroll = function () {

        //判断顶部位置大于等于1000时
        if (document.documentElement.scrollTop >= 1000) {

            //获取回到顶部
            let asideBtn = document.querySelector('aside')
            // console.log(asideBtn,111111)
            asideBtn.style.display = 'block'
        }

        //判断 顶部位置小于1000时
        if (document.documentElement.scrollTop < 1000) {
            let asideBtn = document.querySelector('aside')

            // 小于1000时隐藏
            asideBtn.style.display = 'none'
        }
    }
}
getScrollTop()

function toTop() {
    // 获取回到顶部
    let aside = document.querySelector('aside')
    // console.log(aside,111111111)
   
    //给回到顶部绑定点击事件
    aside.onclick = function(){

        let timeA = setInterval(function () {
            let distance = document.documentElement.scrollTop - 200
            showScrollTop(distance)
            //判断顶部小于等于0时
            if (document.documentElement.scrollTop <= 0) {
                clearInterval(timeA)
            }
        }, 30)
    }
}
toTop()
function toDetail(id) {
    location.href='./productDetail.html?id='+id
    // alert(id)
}

/******* 吸顶效果********/
//获取节点
let nav = document.querySelector('div[class="container"]')


nav.style.background='white'
// console.log(nav)

//使用滚动事件
window.onscroll=function (){
    // console.log(window.onscroll)
    // console.log(onscroll)

    //滚动兼容写法
    let scrollTop=document.documentElement.scrollTop||document.body.scrollTop
  
  //判断顶部位置大于等于200时
    if(scrollTop >= 200){
    //   console.log(scrollTop >= 200)

    //设置固定定位
      nav.style.position='fixed';
      nav.style.width='100%'
      nav.style.top=0
      
  }else{
      nav.style.position=''
  }

}

/*****logo 放大缩小*****/

// 鼠标移入会放大1.8倍
function mOver(obj){
	obj.style.transform="scale(1.8)";

}

//鼠标离开图片会恢复原来的大小
function normalImg(obj){
	obj.style.transform="scale(1)";
}

let images = document.querySelector('div[class="left"]>img');
// // console.log(images)
// 点击logo 页面刷新 
images.onclick = function () {
    location.reload()
}


// // 下拉框
// let heads = document.querySelectorAll('.nav>li>ul');
// let headed = document.querySelectorAll('.nav>li');

// for (let i = 0; i < headed.length; i++) {
//     // console.log(heads[i])
//     // 鼠标划入
//     headed[i].onmouseover = function() {
//         heads[i].style.display = "block";
//         // heads.style.background = 'pink'
//     }
//     // 鼠标划出
//     headed[i].onmouseout = function() {
//         heads[i].style.display = "none";

//     }
// }
// console.log(heads)
// for (let i = 0; i < heads.length; i++) {
//     console.log(heads[i])
//     // 鼠标划入
//     heads[i].onmouseover = function() {
//         heads[i].style.display = "block";
//     }
//     // 鼠标划出
//     heads[i].onmouseout = function() {
//         heads[i].style.display = "none";

//     }
// }




/******倒计时******/
//获取元素
let date = document.getElementById('t')
//设置将来的时间
let endDate = new Date('2022/2/1 00:00:00')
//先调用一次
djs()
//使用定时器动态获取时间
setInterval(djs, 1000)
function djs() {
    let nowDate = new Date()
    let seconds = parseInt((endDate.getTime() - nowDate.getTime()) / 1000)
    //天
    let d = complement(parseInt(seconds / 3600 / 24))
    //小时
    let h = complement(parseInt(seconds / 3600 % 24))
    //分钟
    let m = complement(parseInt(seconds / 60 % 60))
    //秒
    let s = complement(parseInt(seconds % 60))
    date.innerHTML = '距离抢购时间还有  '+ + d + '天' + h + '小时' + m + '分钟' + s + '秒'
}
function complement(num){
   return num < 10 ? num = '0' + num : num
}



let banner = document.querySelector('div[id="banner"]')
// console.log(banner,111)
// let container = document.querySelector('div[class="container"]')


let container=banner.children[0];
console.log(container,11111)
// let middles = document.querySelector('div[class="middles"]')
// console.log(middles,1111)
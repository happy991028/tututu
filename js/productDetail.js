//获取id
function getId() {
  let urlress = location.href
  let index = urlress.indexOf('?')
  let suburl = urlress.substring(index + 1)
  let arr = suburl.split('=')
  let id = arr[1]
  return id
}
// console.log(location.search);
function getmessge() {
  let id = getId()
  $.ajax({
      url: 'http://www.xiongmaoyouxuan.com/api/detail',
      type: 'get',
      data: {
          id
      },
      success: function (result) {
          if (result.code == 200) {
              let detail = result.data.detail //这里可以取到detail值
              let imgUrl = result.data.detail.descContentList
              show(detail)
              show1(imgUrl)
              banners()
          }
      }
  })
}

function banners() {
  new Swiper('.swiper-container', {
      // direction: 'vertical', // 垂直切换选项
      loop: true, // 循环模式选项
      autoplay: true,
      // 如果需要分页器
      pagination: {
          el: '.swiper-pagination',
          clickable: true,
      },
      navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
      },
  })
}
getmessge()
let listArr = {}

function show(detail) {
  let data = {
      detail
  }
  let stress = template('showlist', data)
  $('section').html(stress)
  topage(detail)

}

function topage(detail) {
  $('.toCart').click(
      function () {
          
        let id = detail.id
        let image=detail.photo[0].url
        let price=detail.price
        let singleprice=price
        let obj={id,image,price,num:1,singleprice}
        let strproduct=localStorage.getItem('products')
        let objproduct=JSON.parse(strproduct)||[]
        let newproduct=objproduct.find((item)=>item.id==obj.id)
      if (newproduct) {
          newproduct.num++
      }else{
          objproduct.push(obj)
      }
      localStorage.setItem('products',JSON.stringify(objproduct))

              console.log(id, image, price)
              alert('加入购物车成功')
          location.href = './shoppingCart.html'
      }
  )
}

function show1(imgUrl) {
  let data = {
      imgUrl
  }
  let stress = template('picture', data)
  $('#img').html(stress)
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

/******* 吸顶效果********/
//获取节点
let nav = document.querySelector('div[id="container"]')
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

let logo_index = document.querySelector('div[class="left"]>img');
logo_index.onclick=function () {
    location.href = './index.html'
}




// // 下拉框
// let heads = document.querySelectorAll('.nav>li>ul');
// let headed = document.querySelectorAll('.nav>li');

// for (let i = 0; i < headed.length; i++) {
//     // console.log(heads[i])
//     // 鼠标划入
//     headed[i].onmouseover = function() {
//         heads[i].style.display = "block";
//     }
//     // 鼠标划出
//     headed[i].onmouseout = function() {
//         heads[i].style.display = "none";

//     }
// }


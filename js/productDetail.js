function getId() {
    let urlress = location.href

    let index = urlress.indexOf('?')
    let suburl = urlress.substring(index + 1)
    let arr = suburl.split('=')
    let id = arr[1]
    return id
}
console.log(location.search);
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




function showScrollTop(distance) {
    document.documentElement.scrollTop = distance
}

function getScrollTop() {
    document.onscroll = function () {
        if (document.documentElement.scrollTop >= 1000) {
            let asideBtn = document.querySelector('aside')
            asideBtn.style.display = 'block'
        }
        if (document.documentElement.scrollTop < 1000) {
            let asideBtn = document.querySelector('aside')
            asideBtn.style.display = 'none'
        }
    }
}
getScrollTop()

function toTop() {
    $('aside').click(function () {
        let timeA = setInterval(function () {
            let distance = document.documentElement.scrollTop - 100
            showScrollTop(distance)
            if (document.documentElement.scrollTop <= 0) {
                clearInterval(timeA)
            }
        }, 30)
    })
}
toTop()
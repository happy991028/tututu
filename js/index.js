let list = []

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
getList()

function showProducts(productsList) {
    // list=[...list,...productsList]
    let data = {
        productsList
    }
    let htmlStr = template('moban', data)
    $('.show').append(htmlStr)
}
let num = 0

function addBtn() {
    $('.box').click(function () {
        num++
        getMore(num)
    })
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
            let distance = document.documentElement.scrollTop - 200
            showScrollTop(distance)
            if (document.documentElement.scrollTop <= 0) {
                clearInterval(timeA)
            }
        }, 30)
    })
}
toTop()
function toDetail(id) {
    location.href='./productDetail.html?id='+id
    // alert(id)
}

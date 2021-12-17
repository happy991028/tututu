// // 1.加减和单项总价
// function table(objproduct) {
//   let tableEle = document.querySelector('table')
//   tableEle.addEventListener('click', function (e) {
//     e = e || window.event
//     var target = e.target || e.srcElement
//     if (target.getAttribute('name') == 'minus') {
//       target.nextElementSibling.value--
//       let ID = target.parentElement.previousElementSibling.previousElementSibling.innerHTML

//       let product = objproduct.find(item => item.id == ID)
//       if (product.num <= 0) {
//         product.num = 0
//       } else {
//         product.num--
//       }
//       objproduct.forEach(item => {
//         item.singleprice = item.num * item.price

//       })
//       console.log(objproduct)
//       allPrice(objproduct)
//       if (target.nextElementSibling.value <= 0) {
//         target.nextElementSibling.value = 0
//       }
//       target.parentElement.nextElementSibling.innerHTML = (target.nextElementSibling.value * target.parentElement.previousElementSibling.innerHTML.substring(1)).toFixed(2)
//     }
//     if (target.getAttribute('name') == 'plus') {
//       let ID = target.parentElement.previousElementSibling.previousElementSibling.innerHTML

//       let product = objproduct.find(item => item.id == ID)
//       product.num++
//       objproduct.forEach(item => {
//         item.singleprice = item.num * item.price

//       })
//       allPrice(objproduct)
//       target.previousElementSibling.value++
//       target.parentElement.nextElementSibling.innerHTML = (target.previousElementSibling.value * target.parentElement.previousElementSibling.innerHTML.substring(1)).toFixed(2)
//       target.previousElementSibling.previousElementSibling.di
//     }
//     if (target.getAttribute('class') == 'delete-btn') {
//       let deleteId = target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML
//       let index = objproduct.findIndex(item => item.id == deleteId)
//       console.log(index)
//       let sure=confirm('确定删除吗')
//       if (sure) {
//         objproduct.splice(index, 1)
//       $('table').html('')
//       showList(objproduct)
//       }
//     }
//   })
// }


// function getList() {
//   let strproduct = localStorage.getItem('products')
//   let objproduct = JSON.parse(strproduct)
//   showList(objproduct)
//   allPrice(objproduct)
//   table(objproduct)
// }
// getList()

// function showList(objproduct) {
//   objproduct.forEach(item => {
//     item.singleprice = item.num * item.price
//   })
//   let data = {
//     objproduct
//   }
//   let htmlStr = template('textlist', data)
//   $('table').append(htmlStr)
// }

// function allPrice(objproduct) {
//   let numb = 0

//   objproduct.forEach(item => {
//     numb += item.singleprice
//   });
//   $('#totalPrice').html('￥' + (numb).toFixed(2))
// }
// 1.加减和单项总价
function table(objproduct) {

  //获取节点
  let tableEle = document.querySelector('table')
  // console.log(tableEle)
  
  //设置监听 给table 绑定点击事件
  tableEle.addEventListener('click', function (e) {
  // console.log(tableEle.addEventListener,111111)

    //兼容
    e = e || window.event
    let target = e.target || e.srcElement

    //******减去商品数量******//
    //判断是否获取到商品的属性值
    if (target.getAttribute('name') == 'minus') {

      //数量的value
      target.nextElementSibling.value--
      // console.log(target.nextElementSibling.value--)

      //获取input框的上上个兄弟 就是商品的ID
      let ID = target.parentElement.previousElementSibling.previousElementSibling.innerHTML
      // console.log(ID,111)
      // product.num--
      
      // 数量为零时 返回false
      let product = objproduct.find(item => item.id == ID)
      // console.log(product,1111111)
      // console.log(find(item => item.id == ID) ,1111)   


      //判断商品数量小于等于1时
      if (product.num <= 1) {
        product.num = 1
        alert('就再减没有了哦')
        
      } else {
        product.num--
      }

      //遍历单价和数量
      objproduct.forEach(item => {
        // console.log(item.num * item.price)
        item.singleprice = item.num * item.price
        

      })
      // console.log(objproduct)

      //这里调用商品价格
      allPrice(objproduct)


     
       let sopping = target.nextElementSibling;
      // console.log(target.nextElementSibling.value ,11111111)
       //判断商品数量小于等于零
      if (sopping.value <= 0) {
        // console.log(target.nextElementSibling.value,1111111)
      
        sopping.value = 0
        // target.nextElementSibling.value = 0

      }
      //商品的总价
      let sopping_1 = target.parentElement.nextElementSibling.innerHTML;
      // console.log(sopping_1,11111111)

      //商品的单价
      let sopping_2 =  target.parentElement.previousElementSibling.innerHTML;
      // console.log(sopping_2,111111111111)

      // sopping_1.innerHTML = (sopping.value*sopping_2.innerHTML.substring(1).toFixed(2))
      //总价格 保留两位小数
      sopping_1 = (sopping.value * sopping_2.substring(1)).toFixed(2)
      // console.log(sopping.value * sopping_2.substring(1))
      // console.log((sopping.value * sopping_2.substring(1)).toFixed(2))

      // target.parentElement.nextElementSibling.innerHTML = (target.nextElementSibling.value * target.parentElement.previousElementSibling.innerHTML.substring(1)).toFixed(2)
    }

    /*****增加商品数量*****/  
    //判断是否获取到商品的属性值
    if (target.getAttribute('name') == 'plus') {
      let ID = target.parentElement.previousElementSibling.previousElementSibling.innerHTML
      // console.log(ID,1111111111)

      let product = objproduct.find(item => item.id == ID)
      // console.log(product,111111111)
      // console.log(objproduct.find(item => item.id == ID),111111)

      // 数量增加
      // console.log( product.num++,11)
      product.num++

      //遍历所有商品价格
      objproduct.forEach(item => {

        // console.log(item.num * item.price,111111)
        item.singleprice = item.num * item.price

      })
      //这里也需要调用商品价格
      allPrice(objproduct)
      
      //获取input框de数量
      let sub = target.previousElementSibling;
      // console.log(sub,1111111111)

      //input的value 增加数量
      sub.value++
      // console.log(sub.value++)

      //商品总价
      let sub_1 = target.parentElement.nextElementSibling.innerHTML;
      // console.log(sub_1,111111111);

      //商品的单价
      let sub_2 = target.parentElement.previousElementSibling.innerHTML;
      // console.log(sub_2,1111111111111)

      // sub_1 = (sub.value*sub_2.substring(1)).toFixed(2);
      // console.log( (sub.value*sub_2.substring(1)).toFixed(2) )

      // let sub_3 =  target.previousElementSibling.previousElementSibling;
      // // // console.log(sub_3,111111111)
      // sub_3.id
      // console.log( sub_3.id)
      target.parentElement.nextElementSibling.innerHTML = (target.previousElementSibling.value * target.parentElement.previousElementSibling.innerHTML.substring(1)).toFixed(2)
      // target.previousElementSibling.previousElementSibling.di

    }

    //******商品删除******//

    //delete-btn 删除 

      let shanchu = document.querySelector('a[class="delete-btn"]')
      // console.log(shanchu,11111)



    if (target.getAttribute('class') == 'delete-btn') {

      //获取商品
      let deleteId = target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML
      // console.log(deleteId,11111111111)
     
      //商品的下标位置
      let index = objproduct.findIndex(item => item.id == deleteId)
      // console.log(index)
      // alert('确定删除吗')
      let sure= confirm('确定删除吗')
      // console.log(sure,111)

      if (sure) {
        //删除商品下标
        objproduct.splice(index, 1)

        // console.log(objproduct.splice(index, 1),111111)
        let table = document.querySelector('table')
        // console.log(table,111111)
        // let table =''
        table.innerHTML='';
        // console.log(table.innerHTML)

        //删除之后剩下的数据放在页面
        //调用
        showList(objproduct)
        // allPrice(objproduct)
      }
    }
  })
}

function getList() {

  //获取列表所有的数据
  let strproduct = localStorage.getItem('products')

  // console.log(strproduct,1111111)

  //将数据转换成json字符串
  let objproduct = JSON.parse(strproduct)
  // console.log(objproduct,1111111111)


  // 调用列表价格
  showList(objproduct)

  //这里调用商品价格
  allPrice(objproduct)
  
  //删除之后剩下的数据放在页面
  table(objproduct)
}

//调用
getList()



function showList(objproduct) {

  //遍历列表所有的价格
  objproduct.forEach(item => {

    // console.log(item.num * item.price,252525)
    item.singleprice = item.num * item.price
  })
  let data = {
    objproduct
  }

  let htmlStr = template('textlist', data)
  // let table = document.querySelector('table')
  // console.log(table,1010101)
  // table.append(htmlStr)
  $('table').append(htmlStr)
}

function allPrice(objproduct) {
  let numb = 0
  objproduct.forEach(item => {
    numb += item.singleprice
  });

  //商品总价 
  let subtotal = document.querySelector('span[id="totalPrice"]')
  // console.log(subtotal,1111)

  //总价格保留两位小数
  subtotal.innerHTML='￥' + (numb).toFixed(2)
}



// 全选
//获取全选
let j_cbAll = document.getElementById("j_cbAll");
// console.log(j_cbAll,111111)

let j_tb = document.getElementById("j_tb");
// console.log(j_tb,1111)

// 找到全选框里的所有单选框
let inputs=  j_tb.getElementsByTagName("input");
// console.log(inputs,111)
j_cbAll.onclick=function () {

  //遍历所有复选框选框
  for(let i = 0 ;i < inputs.length; i++){
    // console.log(inputs[i],1111)
    
    //如果是全选 就和全选框一致
      if(inputs[i].type==="checkbox"){
          inputs[i].checked=this.checked;

          //结束本次循环
          continue;
      }
      inputs[i].onclick = function () {
        checkAllCheckBox();
    }

  }
}

function checkAllCheckBox() {
  //假设所有的子的checkbox都被选中
  let isAllChecked=true;

  //循环找到所有的复选框进行判断
  for(var j=0;j<inputs.length;j++){
      var input=inputs[j];

       //判断是不是所有的复选框都被选中
      if(input.type!="checkbox"){
          continue;
      }
      //判断当前的复选框是否都被选中
      if(input.checked==false){
          isAllChecked=false;
      }
  }
  //设置全选的状态
  j_cbAll.checked=isAllChecked;
}


    /*********反选********/
    //给反选按钮注册点击事件
var btn=document.getElementById("btn");
btn.onclick=function () {
//找到所有的子的checkbox，让其反选
for (var i = 0; i < inputs.length; i++) {
var input = inputs[i];
  if (input.type != 'checkbox') {
      continue;
    }
  //反选
    input.checked = !input.checked;
    //反选完之后要判断：父的checkbox
            checkAllCheckBox();
    }
}
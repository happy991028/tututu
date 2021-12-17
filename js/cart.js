class Cart {
  constructor() {

    this.getCartGoods();
    this.checkAll();

    // 给tbody绑定点击事件
    this._$('#cartTable tbody').addEventListener('click', this.clickBubbleFn.bind(this))
  }
  //判断操作的节点
  clickBubbleFn (event) {
    let tar = event.target;
    // console.log(event.target.classList.contains('check-one'));
    // 1 判断是否为check-one 
    tar.classList.contains('check-one') && this.oneCheckFn(tar)

        // 2 判断点击的是否为类 add(加号按钮)
    tar.classList.contains('add') && this.addClickFn(tar);

            // 3判断点击的是否为删除
    tar.classList.contains('delete') && this.delClickFn(tar);


  }

  //获取购物车数据
  async getCartGoods () {
    // 1 取出local数据
    let cartGoods = localStorage.getItem('cart');
    // 没有数据则停止
    if (!cartGoods) return;
    cartGoods = JSON.parse(cartGoods)
    // console.log(cartGoods);

    // 2 发送ajax获取商品数据
    let goodsData = await axios.get({ url: './js/goods.json' });
    // console.log(goodsData);

    //3 循环商品信息,根据id取购物车中的值,有值说明商品在购物车
    let existsCartGoods = goodsData.filter(item => {
      // console.log(item.id);
      // console.log(cartGoods[item.id]);
      // 结果为数字 转化为 true  undefined 转化为false
      return cartGoods[item.id];
    });

    // console.log(existsCartGoods);
    this.render(existsCartGoods, cartGoods)
  }
  /****渲染购物车列表******/
  render (goodsData, cg) {
    let template = '';
    // console.log(goodsData, 1111);
    // 1 循环购物车商品
    goodsData.forEach(ele => {
      // console.log(ele);
      template += `<tr>
      <td class="checkbox">
        <input class="check-one check" type="checkbox" />
      </td>
      <td class="goods">
        <img src="${ele.src}" alt="" />
        <span>${ele.name}</span>
      </td>
      <td class="price">${ele.price}</td>
      <td class="count">
        <span class="reduce"></span>
        <input class="count-input" type="text" value="${cg[ele.id]}" />
        <span class="add">+</span>
      </td>
      <td class="subtotal">${ele.price * cg[ele.id]}</td>
      <td class="operation">
        <span class="delete">删除</span>
      </td>
    </tr>`
    });

    this._$('#cartTable tbody').innerHTML = template;

  }
  //全选实现
  checkAll () {
    //1 给全选按钮绑定事件
    let allObj = this.$$('.check-all');
    // console.log(allObj);

    // 2 给全选按钮绑定事件,事件回调函数的this指向节点对象,使用bind
    allObj[0].addEventListener('click', this.allClickFn.bind(this, 1))
    allObj[1].addEventListener('click', this.allClickFn.bind(this, 0))
  }
  // 使用bind和event时,bind传递的参数在前
  allClickFn (checkAllIndex, event) {

    //获取点击的全选按钮状态
    let status = event.target.checked;
    // 设置另一个全选的状态
    this.$$('.check-all')[checkAllIndex].checked = status;
    
    this.oneChecked(status);
    // 统计数量和价格穿递全选的状态
    this.subTotal(status)
  }

  //单个商品选中
  oneChecked (status) {
    // console.log(this.$$('.check-one'));
    this.$$('.check-one').forEach(one => {
      one.checked = status;
    })

  }
  // 商品单选框回调函数
  oneCheckFn (target) {
    this.subTotal();
    if (!target.checked) {  // 取消
      this.$$('.check-all')[0].checked = false;
      this.$$('.check-all')[1].checked = false;
      return;
    }

    //判断选中的商品数量
    let count = 0;

    this.$$('.check-one').forEach(v => {
      v.checked && count++;
    })
    // console.log(count);

    // 选中的数量,等于购物车商品数量,则全选选中
    if (count == this.$$('.check-one').length) {
      this.$$('.check-all')[0].checked = true;
      this.$$('.check-all')[1].checked = true;
    }
    // this.subTotal()

  }

  //统计价格和数量
  // 全选和单个商品的input框,都要调用
  subTotal (sta = true) {
    //总价和数量的变量
    let totalNum = 0,totalPrice = 0; 

    //获取所有节点 遍历出所有选中的
    sta && this.$$('.check-one').forEach(ele => {
      // console.log(ele)

      if(ele.checked){
        // console.log(ele)

        //找出tr
        let trObj = ele.parentNode.parentNode
        // console.log(trObj)

        //获取小计和数量
        // totalNum  商品的数量
        totalNum += (trObj.querySelector('.count input').value - 0);
        // console.log(totalNum)

        // totalPrice 商品总价格
        //  console.log(trObj.querySelector('.subtotal').innerHTML);
        totalPrice += (trObj.querySelector('.subtotal').innerHTML - 0);
        // console.log(totalNum, totalPrice);

      }
    })
    
    //   把选中的放在页面当中（小计和数量）
    this._$('#priceTotal').innerHTML = totalPrice;   //商品总价格
    this._$('#selectedTotal').innerHTML = totalNum;  //商品数量
  }

  // 数量增加
  addClickFn(target){    
    // console.log(target)  +

    //获取数量上一个兄弟   就是数量的vaule
    let num = target.previousElementSibling;  
    // console.log(num)

    //数量加一 
    // console.log(num.value - 0 + 1)
    //数量如果不-0 那么直接+1 就是直接在数量后面多增一个数字  比如4+1=41  45+1=451
    num.value = num.value - 0 + 1;  

    //获取价格（小计） nextElementSibling 下一个兄弟
    let sub = target.parentNode.nextElementSibling;
    // console.log(sub)   // 数量加起来的地方（小计）

    //获取数量的价格
    let price = target.parentNode.previousElementSibling.innerHTML;
    // console.log(price)  //数量的价格

    //数量个数 增加 显示在页面里  每加一个商品个数 小计就会增加一次 
    // console.log( parseInt((num.value * price) * 100) / 100)
    sub.innerHTML= parseInt((num.value * price) * 100) / 100

    // 当input空选中时，下面就会统计价格和数量的总和
    let tr = target.parentNode.parentNode
    tr.querySelector('.check-one').checked && this.subTotal();
    // console.log(tr)
    // target.parentNode.parentNode.querySelector('.check-one').checked && this.subTotal();
    this.modifyLocal(tr.getAttribute('goods-id'), num.value)

  }


  //删除商品 先弹出一个模态框
  delClickFn (target){
    let that = this;
    // console.log(this)
    let tr = target.parentNode.parentNode;
    // console.log(tr)

    //弹出删除模态框
    layer.open({
      title: '确认删除框',
      content: '确认删除吗?',
      btn: ['取消', '确认'],
     btn2: function (index, layero) {
        // console.log(target)

        // 删除当前商品  remove()删除
        // target.parentNode.parentNode.remove();
        tr.remove()

      //选中input时 重新获取总价格和数量
        tr.querySelector('.check-one').checked && that.subTotal();
      }
      
    });
    this.modifyLocal(tr.getAttribute('goods-id'))

  }

  //修改数量
  modifyLocal (id, num = 0) {
    // console.log(id, num);

    // 1 取出local数据
    let cartGoods = localStorage.getItem('cart');
    // console.log(cartGoods);
    if (!cartGoods) return;
    // 使用json解析
    cartGoods = JSON.parse(cartGoods);
    // console.log(cartGoods, id);
    // 删除对象属性
    num == 0 && delete cartGoods[id];
    // console.log(cartGoods);
    // 修改商品的数量
    num != 0 && (cartGoods[id] = num);
    localStorage.setItem('cart', JSON.stringify(cartGoods));
  }


  //获取节点方法
  _$ (ele) {
    return document.querySelector(ele)
  }
  $$ (ele) {
    return document.querySelectorAll(ele)
  }
}

new Cart;
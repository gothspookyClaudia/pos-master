
var allItems = loadAllItems();//获取全部商品列表
var promotionItems = loadPromotions();//获取打折商品
//创建无重复的商品数组
function getCartItems(items){
  var cartItems = [];
  for(var i=0; i < items.length; i++) {//三重循环，通过比较barcode创建无重复的商品数组
    var nums = 0;
    var del = 0;//标记某项的重复次数
    for (var j = i ; j < items.length; j++){//去掉重复的barcode
      if (items[i].slice(0,11) === items[j].slice(0,11)) {
        if(items[i].length>=11){
           nums = nums + parseInt(items[i].substr(items[i].length-1,1));
           del++;
        }
        else{
           nums++;
           del++;
        }
      }
    }
    var flag = 0;
    for(var k = 0; k < allItems.length; k++){//与allItems比较，创建数组
      if(items[i+del-1].substr(0,10) === allItems[k].barcode){
        flag=k;
        break;
      }
    }
    var temporary = {
      item: allItems[flag],
      count: nums
    };
    cartItems.push(temporary);
    i+=del-1;
  }
  return cartItems;
}
//创建带小计的对象数组
function getReceiptItem(carItems){
  var receiptItem=[];
  carItems.forEach(function(element) {
    var sub =0;
    for (var j = 0; j < promotionItems[0].barcodes.length; j++) {//计算小计，通过与promotionItems的barcode比较,计算优惠项的价格
      if(element.item.barcode.substr(0,10) === promotionItems[0].barcodes[j] && element.count>=2) {
         sub = (element.count-1)*element.item.price;
          break;
      }
      else {
         sub = element.count*element.item.price;
      }
    }
    var temporary = {
      carItem: element,
      subTotal: sub.toFixed(2)
    };
    receiptItem.push(temporary);
  });
  return receiptItem;
}
//创建带总计的节省值的对象并返回
function getReceipt(receiptItem){
  var total =0 ;//打折后花费
  var actualTotal = 0;//实际总共花费
  var saves = 0;//节省的钱数
  receiptItem.forEach(function(ele){
    total+=parseFloat(ele.subTotal);
  });
  receiptItem.forEach(function(element){
    actualTotal += element.carItem.count*element.carItem.item.price;
  });
    saves = actualTotal - total;
  var receipt={
    receiptItems:receiptItem,
    totals:total.toFixed(2),
    saving:saves.toFixed(2),
  }
  return receipt;
}
//序列化字符串
function serializeString(receipt){
  var str='***<没钱赚商店>收据***\n';
  receipt.receiptItems.forEach(function(element){
    str+='名称：'+element.carItem.item.name+'，数量：'+element.carItem.count+''+element.carItem.item.unit+'，单价：'+element.carItem.item.price.toFixed(2)+'(元)，小计：'+element.subTotal+'(元)\n';
  });
  str+='----------------------\n'+'总计：'+receipt.totals+'(元)\n'+'节省：'+receipt.saving+'(元)\n'+'**********************';
  return str;
}

function printReceipt(items) {
  var carItems = getCartItems(items);
  var receiptItem = getReceiptItem(carItems);
  var receipt = getReceipt(receiptItem);
  var str = serializeString(receipt);
  console.log(str);
}

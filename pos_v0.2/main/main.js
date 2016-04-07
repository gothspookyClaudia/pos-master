
var allItems = loadAllItems();
/*function matchItems(barcodes){
 var items =[];
 for(var i=0; i< barcodes.length; i++){
 for(var j=0; j< allItems.length; j++){
 if(barcodes[i] === allItems[j].barcode){
 items.push(allItems[j]);
 }
 }
 }
 return items;
 }*/

function getCartItems(items) {
  /*var cartItems = [];
   for(var i=0; i < items.length; i++) {
   var nums = 0;
   for (var j = i ; j < items.length; j++) {
   if (items[i].name === items[j].name) {
   nums++;
   }
   }
   var temporary = {
   item: items[i+nums-1],
   count: nums
   };
   cartItems.push(temporary);
   i+=nums-1;
   }*/
  var cartItems = [];
  for (var i = 0; i < items.length; i++) {
    var nums = 0;
    for (var j = i; j < items.length; j++) {
      if (items[i] === items[j]) {
        nums++;
      }
    }
    var flag = 0;
    for (var k = 0; k < allItems.length; k++) {
      if (items[i + nums - 1] === allItems[k].barcode) {
        flag = k;
        break;
      }
    }
    var temporary = {
      item: allItems[flag],
      count: nums,
    };
    cartItems.push(temporary);
    i += nums - 1;
  }
  return cartItems;
}

function getReceiptItem(carItems) {
  var receiptItem = [];
  carItems.forEach(function (element) {
    var sub = element.count * element.item.price;
    var temporary = {
      carItem: element,
      subTotal: sub.toFixed(2)
    };
    receiptItem.push(temporary);
  });
  return receiptItem;
}

function getReceipt(receiptItem) {
  var total = 0;
  receiptItem.forEach(function (ele) {
    total += parseInt(ele.subTotal);
  });
  var receipt = {
    receiptItems: receiptItem,
    totals: total.toFixed(2),
  }
  return receipt;
}

function serializeString(receipt) {
  var str = '***<没钱赚商店>收据***\n';
  receipt.receiptItems.forEach(function (element) {
    str += '名称：' + element.carItem.item.name + '，数量：' + element.carItem.count + '' + element.carItem.item.unit + '，单价：' + element.carItem.item.price.toFixed(2) + '(元)，小计：' + element.subTotal + '(元)\n';
  });
  str += '----------------------\n' + '总计：' + receipt.totals + '(元)\n' + '**********************';
  return str;
}

function printReceipt(items) {
  // var items = matchItems(inputs);
  var carItems = getCartItems(items);
  var receiptItem = getReceiptItem(carItems);
  var receipt = getReceipt(receiptItem);
  var str = serializeString(receipt);
  console.log(str);
}

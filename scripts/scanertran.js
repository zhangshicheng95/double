const flatScanner = require("./addons/flat_scanner.node");

//建立数据库
const Datastore = require('nedb');
const db = {};
 db.commdity=new Datastore({filename:'./data/Datastore.db'});
 db.shopcar = new Datastore({filename:'./data/shopcar.db'});
db.shopcar.loadDatabase(function (err) {    
  if (err) {
  console.log('error')
};
});

db.commdity.loadDatabase(function (err) {    
  if (err) {
  console.log('error')
};
});

// 定义查询并上传列表
function findout(bar_code){
	db.commdity.find({scaner_number:bar_code},function (err, docs){
  if (docs[0]) {
  var theTrade=docs[0];
  addList(theTrade);
  }else{
  var theTrade={'trade':null,'price':null};
  addList(theTrade);
  }
	})
}
//打开串口
function openm(){
  flatScanner.open("com4", (data) => {
    data = JSON.parse(data);
    if (data.result != 0) {
      console.log("open flat scanner fail: " + data.desp);
      pageManage.showPage('page','error');
      return;
    };
  });
}
//打开扫描灯
function openli(){
  flatScanner.enable((data) => {
        data = JSON.parse(data);
        if (data.result != 0) {
          console.log("Enable scanner fail:" + data.resp);
          pageManage.showPage('page','error');
        };
      });
}
// 关闭扫描灯
function closeli(){
  flatScanner.disable((data) => {
    data = JSON.parse(data);
    if (data.result != 0) {
      console.log("disable scanner fail:" + data.resp);
      pageManage.showPage('page','error');
  };
});
}
// 初始化
function login() {
  num_12+=1;
  num_13="member"+num_12.toString()
    pageManage.showPage('page','entrance');
  openm();//开串口
  tradepr="";
  order_is_create=true;//标记是否需要保存清单。
};
// 获取扫描台条形码
function scanntrade(){
flatScanner.on('code',(code) => {
    findout(code);
    if(code.length==13){
    order_is_create =false;
    closeli();
    setTimeout('openli()',500);    
}
})
};
var printer = require('./addons/printer.node');
printer.open();
  function print(tradepr,payinfo){
    let str = "          24h不休店-秋溢科技店\n";
    str += "------------------------------------------\n";
    str +="门店号 1        收银机号 901K17H00065\n";
    str += "小票号 ";
    str +=num_13;
    str += "\n";
    str += "收银员 1002\n";
    str += "日  期" 
    str += $("#showtime_entrance").text()
    str += "\n";
    str += "==========================================\n";
    str +="商品              数量     单价     成交价\n";
    str +=tradepr;
    str +="===========================================\n";
    str +=payinfo;
    str +="------------------------------------------\n"
    str +="          24h不休店感谢您的光临！\n";
    str +="              欢迎下次惠顾!\n";
    str +="地址：浙江省杭州市滨江区金润科技园\n";
    str +="电话：0571-28282070\n\n\n\n\n";
    printer.print(str, function(data){
      console.log(data);
    });
  }


function print_it(payway){
  db.shopcar.find({_id:num_13},function (err, docs){
  if (docs[0]) {
  var thecar=docs[0];
  var tradepr=thecar.prepr;
  payinfo=repayinfo(payway);

  print(tradepr,payinfo)
  }else{
      $('#no_order').css({'display':'block'});

      setTimeout("$('#no_order').css({'display':'none'})",3000);
   console.log(err)
  }
  })
}
var num_12=0;
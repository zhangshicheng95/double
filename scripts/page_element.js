var showElement = {
  show: (startid,id)=> {
    var div = document.getElementById(startid);
    div.style.display = "none";
    while(div.nextSibling!=null){
      div = div.nextSibling;
      if(div.nodeName=="DIV"){
        div.style.display = "none";
      }
    }
    if(id != ""){
      document.getElementById(id).style.display = "block";
    }
  },
  entrance:()=>{
    pageManage.replaceWav("welcome.wav",null);
    pageManage.toggleCtn("vip_vipnoandpoint",0,"");
    pageManage.showText("showvipno_cardid","");
    pageManage.showText("showvipno_point","");
    pageManage.toggleCtn("membership",0.5,"");

    pageManage.toggleCtn("total_box",0,"");
    pageManage.toggleCtn("total",0,"");
    pageManage.showText("showtotal","");
    pageManage.showText("showdiscount","");
    pageManage.showText("showpocket","");
    pageManage.showText("showpaid","");
    pageManage.toggleCtn("balanceamount",0,"");
    pageManage.showText("showbalance","");
    pageManage.showText("list_num span","0");
    
    pageManage.toggleCtn("opition",2,"");
    pageManage.toggleCtn("back_container",2,"");
    pageManage.toggleCtn("back_container",1,"screensaverOut()");
    pageManage.toggleCtn("help_container_pay",0,"");
    pageManage.toggleCtn("back_container_pay",0,"");
    pageManage.toggleCtn("back_screen_pay",0,"");

    pageManage.toggleCtn("barcode_container",2,"");
    pageManage.toggleCtn("barcode_container",1,"");
  },
  container:()=>{
    pageManage.showPage("method","paynow_method")
  },
  barcode:()=>{
    pageManage.toggleCtn("barcode",1,"");
    pageManage.toggleCtn("container",2,"");
    pageManage.toggleCtn("container",0.2,"");
    pageManage.showText("code_word","请手动输入条形码");
    pageManage.showValue("showcode","");
    $("#showcode").css("font-size","30px");
  },
  paysuccess:()=>{
    console.log("paysuccess")
  },
  paynowMethod:()=>{
    pageManage.toggleCtn("opition",2,"");          
    pageManage.toggleCtn("supervise_container",2,"");
    pageManage.toggleCtn("back_container_pay",0,"");
    pageManage.toggleCtn("help_container_pay",0,"");
    pageManage.toggleCtn("back_screen_pay",0,"");
    pageManage.toggleCtn("total_box",0,"");
    pageManage.toggleCtn("total",0,"");
  },
  transMethod:()=>{
    toggleCtn("back_container_pay",0.5,"");
  }
}

var pageManage = {
  current_page:null,
  current_method:null,
  account_token:null,
  payMsg:null,
  showPage:(page,pageid)=>{
    if(page=="page"){
      pageManage.current_page = pageid;
      if(pageid=="entrance"){
        showElement.entrance();
      }
      if(pageid=="container"){
        showElement.container();
      }
      if(pageid=="barcode"){
        showElement.barcode();
      }
      if(pageid=="paysuccess"){
        showElement.paysuccess();
      }
      showElement.show("init",pageid);
    }
    if(page=="method"){
      pageManage.current_method = pageid;
      if(pageid=="paynow_method"){
        showElement.paynowMethod();
      }else{
        pageManage.toggleCtn("total",0,"");
        pageManage.toggleCtn("total_box",2,"");
        pageManage.toggleCtn("help_container_pay",2,"");
        pageManage.toggleCtn("back_container_pay",2,"");
        pageManage.toggleCtn("back_screen_pay",2,"");
        pageManage.toggleCtn("back_container_pay",1,"showPage(this.id)");
        pageManage.toggleCtn("opition",0,"");
        pageManage.toggleCtn("supervise_container",0,"");
        pageManage.toggleCtn("countdown_container",0,"");
      }
      if(pageid=="transition_now"){
        showElement.transMethod();
      }
      if(pageManage.payMsg){
        payManage();
      }
      showElement.show("paynow_method",pageid);
    }
    if(page==""){
      showElement.show("init",pageid);
    }
  },
//按钮的隐藏和显示
  toggleCtn: (id,opacity,mouseon)=> {
    if(opacity == 0){
      $("#"+id).css("display","none");
    }else if(opacity == 2){
      $("#"+id).css("display","block");
    }else{
      $("#"+id).css("opacity",opacity);
      $("#"+id).attr("onclick",mouseon);
    }
    
  },
  clearList: (id)=> {
    var tb = document.getElementById(id);		//清除清单
    var rowlen = tb.rows.length;
    for(var i=2;i<=rowlen;i++){
      tb.deleteRow(1);
  $("#list_sum span").text('0.00');
    }
  },
  payerror:(err)=>{
    $("#payerror strong").text(err);
    $("#payerror").css({
      "margin-left":"-"+$("#payerror").css("width").substring(0,$("#payerror").css("width").length-2)/2+"px"
    });
    $("#payerror").fadeIn(500);
    var t = setTimeout("$('#payerror').fadeOut(1000)",2000);
  },
  startTime: ()=> {
    var now = new Date();
    var month = now.getMonth();month++;
    var date = now.getDate();
    var min = now.getMinutes();
    var second = now.getSeconds();
    if (min<10) {min="0" + min;}
    if (second<10) {second="0" + second;}
    var str = now.getFullYear()+"-"+month+"-"+now.getDate()+" "+now.getHours()+":"+min +":"+second
    $("#showtime_entrance").text(str);
    t=setTimeout('pageManage.startTime()',1000);
    sssss=now.getTime();
  },
  showText: (id,text)=> {
    $("#"+id).text(text);
  },
  showValue: (id,value)=> {
    $("#"+id).attr("value",value);
  },
  replaceWav:(wav,loop)=>{
    $("#audio").attr("src","wav/"+wav);
    $("#audio").attr("loop",loop);
  }
}

function showPage(id) {
  if(id=="help_entrance"){
    pageManage.showPage("page","needhelp");
    $("#entrance").css({"display":"block","opacity":"0.001"});
  }
  if(id=="help_container"){
    pageManage.showPage("page","needhelp");
    $("#container").css({"display":"block","opacity":"0.001"});
  }
  if(id=="help_barcode"){
    pageManage.showPage("page","needhelp");
    $("#barcode").css({"display":"block","opacity":"0.001"});
  }
  if(id=="cancelhelp_needhelp"){
    if($("#entrance").css("display")=="block"){
      pageManage.showPage("page","entrance");
      pageManage.toggleCtn("entrance","1","");
    }
    if($("#container").css("display")=="block"){
      pageManage.showPage("page","container");
      pageManage.toggleCtn("container","1","");
    }
    if($("#barcode").css("display")=="block"){
      pageManage.showPage("page","container");
      $('#barcode').css({'display':'block','z-index':'3',"opacity":"1"})
      pageManage.toggleCtn("barcode","1","");
    }
  }
  if(id=="back_vip"){
    pageManage.showPage("page","entrance");
  }
  if(id=="back_barcode"){
    pageManage.showPage("page","container");

  }
  if(id=="back_container_pay"){
    pageManage.showPage("page","container");
    if(pageManage.current_method=="pay_method"){
      pageManage.showPage("method","paynow_method");
    }
    if(pageManage.current_method=="wechat_method"||pageManage.current_method=="alipay_method"){
      pageManage.showPage("method","pay_method");
    }
  }
  if(id=="alipay"){
    pageManage.payMsg = "alipay";
    pageManage.showPage("method","alipay_method");
    payManege();
  }
  if(id=="wechat"){
    pageManage.payMsg = "wxpay";
    pageManage.showPage("method","wechat_method");
    payManege();
  }
}

function changeTrunToAdminA(){
  $("#turntoadminA").attr("onclick","changeTrunToAdminB()");
}
function changeTrunToAdminB(){
  $("#turntoadminB").attr("onclick","changeTrunToAdmin()");
}
function changeTrunToAdmin(){
  $("#turntoadmin").attr("onclick","turnToAdmin(this.id)");
  $("#turntoadminA").attr("onclick","");
}
function turnToAdmin(id){
  $("#turntoadminB").attr("onclick","");
  $("#turntoadmin").attr("onclick","changeTrunToAdminA()");
  // var display = $("#way_normal").css("display");
  // if(display=="none"){
  //   $("#way_normal").css("display","block");
  //   $("#way_member").css("top","35%");
  // }else{
  //   $("#way_normal").css("display","none");
  //   $("#way_member").css("top","43%");
  // }
}

function addInput(id){
  $("#showcode").attr("type","text");
  var code = $("#showcode").attr("value");
  var length = code.length;
  //alert(code);
  if(length>=15){
    $("#showcode").css("font-size","20px");
  }else{
    $("#showcode").css("font-size","30px");
  }
  switch(id){
    case "code_0":$("#showcode").attr("value",code+"0");break;
    case "code_1":$("#showcode").attr("value",code+"1");break;
    case "code_2":$("#showcode").attr("value",code+"2");break;
    case "code_3":$("#showcode").attr("value",code+"3");break;
    case "code_4":$("#showcode").attr("value",code+"4");break;
    case "code_5":$("#showcode").attr("value",code+"5");break;
    case "code_6":$("#showcode").attr("value",code+"6");break;
    case "code_7":$("#showcode").attr("value",code+"7");break;
    case "code_8":$("#showcode").attr("value",code+"8");break;
    case "code_9":$("#showcode").attr("value",code+"9");break;
    case "code_back":$("#showcode").attr("value",code.substring(0,length-1));break;
    case "code_clean":$("#showcode").attr("value","");break;
    case "code_submit":selfinput(code);break;
  }
}
function selfinput(code){
  findout(code);
  $("#showcode").attr("value","");
$('#barcode').css({'display':'none','z-index':'1'})

}


function addList(data){
  var now_time=new Date().getTime();
  var tb = document.getElementById("listtable");
  var rowlen = tb.rows.length;
  var str = $("#listtable tbody").html();
  var name = data.trade;
  var value = (data.price/100).toFixed(2);
  var price = (data.price/100).toFixed(2);
  var code =data.scaner_number;
  var num=1
	//上传购物车数据库	

	tradepr+=code+"      "+num+"     "+value+"       "+price+"\n"+name+"\n";
	$('#paynow_method_pay').click(function(){
	db.shopcar.insert([{_id:num_13,prepr:tradepr,time_01:now_time}], function (err) {
if(err){
	console.log(err)
}
});
})
	//上传页面
  if(rowlen<10){
    rowlen = "0" + rowlen;
  }
  if(name==null){
    $("#nogoodswarning_container").fadeIn(1000);
    var t = setTimeout("$('#nogoodswarning_container').fadeOut(1000)",2000);
    return;
  }else{
    if(name.length>23){
      name = name.substring(0,20)+"..."
    }
    str += "<tr valign='top'><td><div>"+rowlen+"</div></td><td><div>"+name+
              "</div></td><td><div>"+value+"</div></td><td><div>"+num+
              "</div></td><td><div>"+price+"</div></td></tr>";
  }
  $("#listtable tbody").html(str);
  $("#list_num span").text($("#list_num span").text()*1+1);
  var list_sum = $("#list_sum span").text()*1+(price*1)
  $("#list_sum span").text(list_sum.toFixed(2));
  var list = document.getElementById("list");
  list.scrollTop = list.scrollHeight;	
 $('#showtotal').text(list_sum.toFixed(2));
  $('#showdiscount').text('1%');
  $('#showpocket').text(list_sum.toFixed(2));
  $('showpaid').text("0");
  }


function alipayManege() {
  flatScanner.on('code',(code) => {
    if (code.length==18 && code[0]==2) {
order_is_create=true;
$('#transition_now').css({'display':'block','z-index':5});
      setTimeout("pageManage.showPage('page','paysuccess')",3000)
closeli()
      setTimeout('login()',6000);
print_it("支付宝");
    }else{
      $('#rescan_method').css({'display':'block'});
      setTimeout("$('#rescan_method').css({'display':'none'})",3000);
    }
  });
}
function wepayManege() {
  flatScanner.on('code',(code) => {
    if (code.length==18 && code[0]==1) {
order_is_create=true;
$('#transition_now').css({'display':'block','z-index':5});
      setTimeout("pageManage.showPage('page','paysuccess')",3000)
closeli()
      setTimeout('login()',6000);
print_it("微信支付")
    }else{
      $('#rescan_method').css({'display':'block'});
      setTimeout("$('#rescan_method').css({'display':'none'})",3000);
    }
  });
}

 function repayinfo(payway){
 	var list_sum= $('#showtotal').text();
 	var num=  $("#list_num span").text();
 	var dscount =$('#showdiscount').text();
payinfo="总额 "+list_sum+"     数量 "+num+"       总折扣 "+dscount+"\n"+"应收 "+list_sum+"            实收 "+list_sum+"\n"+"其中:"+payway+" "+list_sum+"\n"; 	
 return payinfo;
 }
 pageManage.startTime();
$('#way_member').click(function(){
	pageManage.showPage('page','container');
    openli();
    scanntrade();
    if(order_is_create){
  pageManage.clearList("listtable");
}
  });
$('#back_container #back_container_pay').click(function(){
	$('#beginclosetrans').css({'display':'block'});
  order_is_create = false;
})
$('#beginclosetrans_true').click(function(){
	$('#beginclosetrans').css({'display':'none'});

})
$('#beginclosetrans_false').click(function(){
	$('#beginclosetrans').css({'display':'none'});
pageManage.showPage('page', 'entrance');
})
$('#barcode_container').click(function(){
	$('#barcode').css({'display':'block','z-index':'3'});
})
$('#back_barcode').click(function(){
	$('#barcode').css({'display':'none','z-index':'1'});
	$("#showcode").attr("value","");
})

$('#paynow_method_pay').click(function(){
pageManage.showPage("method","pay_method");
  }
);

 $('#alipay').click(function(){
$('#alipay_method').css({'display':'block'});
alipayManege();
})     
     $('#wechat').click( function(){
 $('#wechat_method').css({'display':'block'});
 wepayManege();
})





















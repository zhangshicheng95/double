var totalprice = 0; 			//保存总价
var tablerow;  					//标记退货时点击的单元行
var bankpwd = ""; 				//保存银行卡密码
var countdownTime; 				//保存倒计时剩余时间的参数
var countdownT; 				//用于启动或中止倒计时
var pageID = "";				//用于标记界面ID
var count_down_num = 60;
var countDown = setInterval("Time2()", 1000);
var ReturnGoodsDown = setInterval("TimeOutReturnGoods()",1000);

function Time2(){
  count_down_num--;
  //console.log(count_down_num);
  if(count_down_num==0){
  	clearInterval(countDown);
  clearInterval(ReturnGoodsDown);
  $("#beginclosetrans_true span").text("10");
  ReturnGoodsDown = setInterval("TimeOutReturnGoods()",1000);
  return;
  }
}

function TimeOutReturnGoods() {
  var bankTime = $("#beginclosetrans_true span").text();
  bankTime--;
  $("#beginclosetrans_true span").text(bankTime);
  if ($("#beginclosetrans_true span").text()==0) {
    clearInterval(ReturnGoodsDown);
$('#beginclosetrans').css({'display':'none'});
    return;
  }
}
function screensaverOut(){
  clearInterval(countDown);
  clearInterval(ReturnGoodsDown);
  $("#beginclosetrans").css({"display":"block"});
  $("#beginclosetrans_true span").text("10");
  ReturnGoodsDown = setInterval("TimeOutReturnGoods()",1000);
  order_is_create=true;
  tradepr = "";
  return;

}

function unpackData(obj) {
    if(obj.isloading) {
	toggleCtn("moon_manage","0","");
	if($("#checkaccount").css("display")=="block") {
	    showPage("back_checkaccount");	
	}
    }
    
    if(obj.display_scan_type=="true") {
	toggleCtn("scan_type",2,"");
    }
    if(obj.display_scan_type=="false") {
	toggleCtn("scan_type",0,"");
    }
    
    if(obj.page!="init") {
	//alert(JSON.stringify(obj));
    }
    
    //显示版本号
    if(obj.version){
	$("#showversion_manage").text("版本号:"+obj.version);
    }
    //商品不存在时显示提示
    if(obj.name==""){
	$("#nogoodswarning_container").fadeIn(1000);
	var t = setTimeout("$('#nogoodswarning_container').fadeOut(1000)",2000);
	return;	 
    }
    //更新商品清单
    if (obj.name&&obj.unit_price&&obj.qty&&obj.price) {
	addList(obj.name,obj.unit_price,obj.qty,obj.price);
	toggleCtn("back_container",0.5,"");
    }
    //移除商品优惠
    if(obj.discount_num){
	removeList(obj.discount_num);
    }
    //称重稳定时，才能点击功能按钮
    if(obj.weightissteady == "true"){
	toggleCtn("barcode_container",1,"jump(this.id)");
	toggleCtn("paynow_method_pay",1,"jump(this.id)");
	toggleCtn("back_screen_pay",1,"screensaverOut()");
	if( $("#list_num span").text() == 0 ){
	    toggleCtn("paynow_method_pay",0.5,"");
	    toggleCtn("back_screen_pay",0.5,"");
	    toggleCtn("back_container",1,"screensaverOut()");
	}
    }
    if(obj.page){
	if(obj.page!="init"){
	    //alert("page+"+obj.page);
	}
	if(obj.page=="container"){
	    myVideo.pause();
	    toggleCtn("container",1,"");						//由输入条码界面或会员卡登陆界面回到列表时恢复界面透明度
	    toggleCtn("paynow_method_vip",0,"");				//绿地隐藏商品扫码我是会员按钮
	    //toggleCtn("countdown_container",0,"");				//终止倒计时
	    //clearTimeout(countdownT);
	}
	if(obj.page=="paysuccess"){
	    toggleCtn("takebankcard_paysuccess",0,"");
	}
	//清空表格与还原显示界面
	if(obj.page=="entrance"){
	    myVideo.play();
	    toggleCtn("password_rechargeway",0,"");
	    toggleCtn("showcardno_rechargeway",0,"");
	    toggleCtn("showpaid_rechargeway",0,"");
	    
	    toggleCtn("returngoods_container",2,"");			//恢复退货按钮	
	    toggleCtn("returngoods_container",0.5,"");
	    
	    toggleCtn("vipno",0,"");							//清除会员卡信息,恢复默认无卡购物
	    toggleCtn("vipno_point",0,"");
	    showText("showvipno_cardid","");
	    showText("showvipno_point","");
	    toggleCtn("vip_vipnoandpoint",0,"");
	    
	    toggleCtn("entrance",1,"");							//恢复界面透明度
	    
	    toggleCtn("membership",0.5,"");						//返回入口界面时恢复支付方式不可用
	    
	    var tb = document.getElementById("listtable");		//清除清单
	    var rowlen = tb.rows.length;
	    for(var i=2;i<=rowlen;i++){
		tb.deleteRow(1);
	    }
	    
	    toggleCtn("total_box",0,"");
	    toggleCtn("total",0,"");
	    showText("showtotal","");							//清除价格统计,还原统计界面
	    showText("showdiscount","");
	    showText("showpocket","");
	    showText("showpaid","");
	    toggleCtn("balanceamount",0,"");
	    showText("showbalance","");
	    showText("list_num span","0");
	    
	    //document.getElementById("password").setAttribute("value",bankpwd);
	    
	    toggleCtn("container",1,"");						//恢复商品列表界面透明度
	    toggleCtn("opition",2,"");
	    toggleCtn("back_container",2,"");					//还原按钮
	    toggleCtn("back_container",1,"screensaverOut()");
	    toggleCtn("help_container_pay",0,"");
	    toggleCtn("back_container_pay",0,"");
	    toggleCtn("back_screen_pay",0,"");
	    
	    toggleCtn("paynow_method_vip",0,"");
	    toggleCtn("paynow_method_vip",0,"");
	    toggleCtn("paynow_method_pay",0.5,"");
	    
	    toggleCtn("countdown_container",0,"");			//终止倒计时
	    //clearTimeout(countdownT);
	    
	    toggleCtn("barcode_container",2,"");				//显示手动输入按钮
	    toggleCtn("barcode_container",1,"jump(this.id)");
	    
	    showElement("shopingway","shopingway");				//恢复选择购物方式入口界面
	    showElement("paynow_method","paynow_method");		//恢复默认我是会员/立即支付界面
	    
	    toggleCtn("supervise_container",2,"");				//显示小管理菜单
	    
	    $("#alipay_method_scanning img").attr("src","images/container/alipay_method_scanning.gif");
	    $("#wechat_method_scanning img").attr("src","images/container/alipay_method_scanning.gif");
	    
	}
	
	showElement("init",obj.page);
	
	//当称重台上有异物时，弹出提示
	if(obj.page=="errorprompt"){
	    toggleCtn("entrance",2,"");
	    toggleCtn("entrance",0.2,"");
	}
	//当需要手动输入条码时淡化商品列表，显示软键盘，并还原条码输入框
	if(obj.page=="barcode"){
	    toggleCtn("barcode",1,"");
	    toggleCtn("container",2,"");
	    toggleCtn("container",0.2,"");
	    showText("code_word","请手动输入条形码");
	    showValue("showcode","");
	    $("#showcode").css("font-size","30px");
	}
	//会员卡登录时会员卡支付可用
	if(obj.page=="vip"){							
	    //showValue("vipcard_password","");					//清空会员号
	    toggleCtn("back_vip",2,"");							//默认会员卡界面返回按钮可用
	    toggleCtn("back_vip",1,"jump(this.id)");
	    
	    if($("#rechargeway").css("display")=="block"){
		toggleCtn("back_vip",0,"");
	    }
	}
    }
    if(obj.method){
	$("#alipay_method_scanning img").attr("src","images/container/alipay_method_scanning.gif");
	$("#wechat_method_scanning img").attr("src","images/container/alipay_method_scanning.gif");
	if(obj.method=="rescan_method"){
	    $("#rescan_method").css("margin-left","-"+$("#rescan_method").css("width").substring(0,$("#rescan_method").css("width").length-2)/2+"px");
	    
	    $("#rescan_method").fadeIn(1000);
	    var t = setTimeout("$('#rescan_method').fadeOut(1000)",2000);
	    return;
	}
	
	showElement("paynow_method",obj.method);
	
	if(obj.method!="paynow_method"){
	    toggleCtn("total",0,"");
	    toggleCtn("total_box",2,"");
	    toggleCtn("help_container_pay",2,"");
	    toggleCtn("back_container_pay",2,"");
	    toggleCtn("back_screen_pay",2,"");
	    toggleCtn("back_container_pay",1,"showPage(this.id)");
	    toggleCtn("opition",0,"");							//隐藏清单页操作按钮
	    toggleCtn("supervise_container",0,"");				//隐藏小管理菜单
	    toggleCtn("countdown_container",0,"");				//隐藏支付倒计时
	    
	    if(obj.method=="copylist_method"){
		toggleCtn("returngoods_forced",0,"");
		toggleCtn("help_container_pay",0,"");
		if( $("#listtable tr").size() == 1 ){
		    showPage("back_container_pay");
		    return;
		}
		$("#copylist_method_return").empty();
		$("#copylist_method_return").append($("#fulllist").clone());
	    }
	}
	else {
	    toggleCtn("opition",2,"");							//恢复清单页操作按钮					 
	    toggleCtn("supervise_container",2,"");				//显示小管理菜单
	    toggleCtn("back_container_pay",0,"");
	    toggleCtn("help_container_pay",0,"");
	    toggleCtn("back_screen_pay",0,"");
	    toggleCtn("total_box",0,"");
	    toggleCtn("total",0,"");
	}
	//会员卡付款显示会员卡余额图像
	if(obj.method=="membership_method"){
	    toggleCtn("balanceamount",2,"");
	}
	if(obj.method=="transition_now"){
	    $("#countdown_container").text("32")
	    T = setInterval("Time()",1000);
	    toggleCtn("countdown_container",2,"");
	    toggleCtn("back_container_pay",0.5,"");					//禁止返回按钮						
	}
	if(obj.method=="wait_method"){
	    toggleCtn("back_container_pay",0.5,"");					//禁止返回按钮								   
	}
    }
    if(obj.maintain){
	showElement("manage",obj.maintain);
	if(obj.maintain=="manage"){
	    toggleCtn("keyboard_setup",0,"");
	}
    }
    
    //显示总价
    if(obj.amount){
	//alert(obj.amount);
	showText("showtotal","￥"+obj.amount);
	$("#total_pay").text(obj.amount);												  
	$("#list_sum span").text("￥"+obj.amount);
    }
    if(obj.pocket){//实付
	$("#showpocket").text("￥"+obj.pocket);
    }
    if(obj.discount){//折扣
	showText("showdiscount","￥"+obj.discount);
    }
    //显示已付金额
    if(obj.paidamount){
	showText("showpaid","￥"+obj.paidamount);
    }
    
    //判断会员卡号是否正确
    if(obj.isvipno){
	if(obj.isvipno == "true"){
	    toggleCtn("vip_vipnoandpoint",2,"");
	    toggleCtn("paynow_method_vip",0,"");
	    unpackData({"page":"container"});
	}
	else{
	    showPage("back_vip");
	}
    }
    //显示会员卡号
    if(obj.vipcardid){
	toggleCtn("vipno",2,"");
	toggleCtn("vip_vipnoandpoint",2,"");									 
	showText("showvipno_cardid",obj.vipcardid);
	toggleCtn("paynow_method_vip",0,"");
    }
    //显示会员卡积分
    if(obj.memberpoint){
	toggleCtn("vipno_point",2,"");
	showText("showvipno_point",obj.memberpoint);
    }
    //显示会员卡余额
    if(obj.vipcardamount){
	
	showValue("showbalance_rechargeway",obj.vipcardamount);
	
	showText("showbalance",obj.vipcardamount);
	toggleCtn("balanceamount",1,"");
    }
    //显示支付宝、微信扫描码
    if(obj.WxQRcode){
	//alert(obj.WxQRcode);
	$("#wechat_method_scanning img").attr("src",obj.WxQRcode);
    }
    if(obj.AliQRcode){
	//alert(obj.AliQRcode);
	$("#alipay_method_scanning img").attr("src",obj.AliQRcode);
    }
    //错误提示
    if(obj.payerror){
	$("#payerror strong").text(obj.payerror);
	$("#payerror").css("margin-left","-"+$("#payerror").css("width").substring(0,$("#payerror").css("width").length-2)/2+"px");
	$("#payerror").fadeIn(500);
	var t = setTimeout("$('#payerror').fadeOut(1000)",2000);
    }
    //退货准备完毕，处理退货信息
    if(obj.returnisready == "true"){
	getReturnGoodsTR();
	toggleCtn("returngoods_forced",2,"");
	toggleCtn("returngoods_forced",1,"jump(this.id)");
    }
    screensaver();								//判断响应，是否取消订单
}

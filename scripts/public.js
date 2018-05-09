//入口登陆，手动输入会员卡号
function addVipBoard(id){
    var code = document.getElementById("vipcard_password").getAttribute("value");
    var length = code.length;
    switch(id){
    case "vip_code_0":
	document.getElementById("vipcard_password").setAttribute("value",code+"0");
	break;
    case "vip_code_1":
	document.getElementById("vipcard_password").setAttribute("value",code+"1");
	break;
    case "vip_code_2":
	document.getElementById("vipcard_password").setAttribute("value",code+"2");
	break;
    case "vip_code_3":
	document.getElementById("vipcard_password").setAttribute("value",code+"3");
	break;
    case "vip_code_4":
	document.getElementById("vipcard_password").setAttribute("value",code+"4");
	break;
    case "vip_code_5":
	document.getElementById("vipcard_password").setAttribute("value",code+"5");
	break;
    case "vip_code_6":
	document.getElementById("vipcard_password").setAttribute("value",code+"6");
	break;
    case "vip_code_7":
	document.getElementById("vipcard_password").setAttribute("value",code+"7");
	break;
    case "vip_code_8":
	document.getElementById("vipcard_password").setAttribute("value",code+"8");
	break;
    case "vip_code_9":
	document.getElementById("vipcard_password").setAttribute("value",code+"9");
	break;
    case "vip_code_back":
	document.getElementById("vipcard_password").setAttribute("value",code.substring(0,length-1));
	break;
    case "vip_code_clean":
	document.getElementById("vipcard_password").setAttribute("value","");
	break;
    case "vip_code_submit":
	toggleCtn("moon_manage","2","");
	jump("vip_no|"+code);
	break;
    }
}

//显示日期,时间
function startTime(){
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth();
    month++;
    var date = now.getDate();
    var hour = now.getHours();
    var min = now.getMinutes();
    var second = now.getSeconds();
    if (min<10) {min="0" + min;}
    if (second<10) {second="0" + second;}
    $("#showtime_entrance").text(year+"-"+month+"-"+date+"  "+hour+":"+min);
    t=setTimeout('startTime()',60000);
    //$("#showtime").text(year+"-"+month+"-"+date+"  "+hour+":"+min+":"+second);//显示年月日时分秒
    //t=setTimeout('startTime()',1000);
}

function Time() {
    var bankTime = $("#countdown_container").text();
    bankTime--;
    if (bankTime<=0) {
	clearInterval(T);
	$("#countdown_container").text("0");
	return;
    }
    $("#countdown_container").text(bankTime);
}

function Time2(){
    count_down_num--;
    //console.log(count_down_num);
    if(count_down_num==0){
	screensaverOut();
    }
}

function TimeOutReturnGoods() {
    var bankTime = $("#beginclosetrans_true span").text();
    bankTime--;
    //console.log("Return"+bankTime);
    $("#beginclosetrans_true span").text(bankTime);
    if ($("#beginclosetrans_true span").text()==0) {
	clearInterval(ReturnGoodsDown);
	jump('process_reset');
	$("#beginclosetrans_true span").text("0");
	return;
    }
}

function screensaverOut(){
    clearInterval(countDown);
    clearInterval(ReturnGoodsDown);
    $("#beginclosetrans").css({"display":"block"});
    $("#beginclosetrans_true span").text("10");
    ReturnGoodsDown = setInterval("TimeOutReturnGoods()",1000);
    return;
}

function screensaver(){
    var ent_display = $("#entrance").css("display");
    var vip_display = $("#vip").css("display");
    var init_display = $("#init").css("display");
    $("#beginclosetrans").css({"display":"none"});
    if (ent_display!="none"||init_display!="none"||vip_display!="none"){
	clearInterval(countDown);
	clearInterval(ReturnGoodsDown);
    } else {
	clearInterval(countDown);
	clearInterval(ReturnGoodsDown);
	count_down_num = 60;
	countDown = setInterval("Time2()", 1000);
    }
}

//二维码函数
function urlCode(id,str) {
    var pay_play_code = toQrCode(str);
    $("#"+id).empty();
    $("#"+id).qrcode({
	render: "table",
	width: 229,
	height:229,
	text: pay_play_code,
    });
}
function toQrCode(str) {   
    var out, i, len, c;   
    out = "";   
    len = str.length;   
    for(i = 0; i < len; i++) {   
    	c = str.charCodeAt(i);   
    	if ((c >= 0x0001) && (c <= 0x007F)) {   
            out += str.charAt(i);   
    	} else if (c > 0x07FF) {   
            out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));   
            out += String.fromCharCode(0x80 | ((c >>  6) & 0x3F));   
            out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));   
    	} else {
            out += String.fromCharCode(0xC0 | ((c >>  6) & 0x1F));   
            out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));   
    	}   
    }   
    return out;   
}

//登陆管理界面的入口触发事件
function changeTrunToAdminA(){
    document.getElementById("turntoadminA").setAttribute("onclick","changeTrunToAdminB()");
}
function changeTrunToAdminB(){
    document.getElementById("turntoadminB").setAttribute("onclick","changeTrunToAdmin()");
}
function changeTrunToAdmin(){
    document.getElementById("turntoadmin").setAttribute("onclick","turnToAdmin(this.id)");
    document.getElementById("turntoadminA").setAttribute("onclick","");
}
function turnToAdmin(id){
    document.getElementById("turntoadminB").setAttribute("onclick","");
    document.getElementById("turntoadmin").setAttribute("onclick","changeTrunToAdminA()");
    var display = $("#way_normal").css("display");
    if(display=="none"){
	$("#way_normal").css("display","block");
	$("#way_member").css("top","35%");
    }else{
	$("#way_normal").css("display","none");
	$("#way_member").css("top","43%");
    }
}

//不与C端交互的界面切换
function showPage(id){
    if(id=="turntoadmin"){
	var obj = {"page":"administration"};
	unpackData(obj);
    }
    if(id=="way_member"){
	var obj = {"page":"vip"};
	unpackData(obj);
	document.getElementById("entrance").style.display = "block";
	document.getElementById("entrance").style.opacity = 0.001;
    }
    if(id=="paynow_method_vip"){
	var obj = {"page":"vip"};
	unpackData(obj);
	document.getElementById("container").style.display = "block";
	document.getElementById("container").style.opacity = 0.001;
    }
    if(id=="help_entrance"){
	var obj = {"page":"needhelp"};
	unpackData(obj);
	document.getElementById("entrance").style.display = "block";
	document.getElementById("entrance").style.opacity = 0.001;
    }
    if(id=="help_container"){
	var obj = {"page":"needhelp"};
	unpackData(obj);
	T = setInterval("Time()",1000);
	document.getElementById("container").style.display = "block";
	document.getElementById("container").style.opacity = 0.001;
    }
    if(id=="help_barcode"){
	var obj = {"page":"needhelp"};
	unpackData(obj);
	document.getElementById("barcode").style.display = "block";
	document.getElementById("barcode").style.opacity = 0.001;
    }
    if(id=="cancelhelp_needhelp"){
	if($("#entrance").css("display")=="block"){
	    var obj = {"page":"entrance"};
	    unpackData(obj);
	}
	if($("#container").css("display")=="block"){
	    var obj = {"page":"container"};
	    unpackData(obj);
	    if($("#transition_now").css("display")=="block"){
		T = setInterval("Time()",1000);
		toggleCtn("countdown_container",2,"");
	    }
	}
	if($("#barcode").css("display")=="block"){
	    var obj = {"page":"barcode"};
	    unpackData(obj);
	}
    }
    if(id=="back_vip"){
	if($("#entrance").css("display")=="block"){
	    var obj = {"page":"entrance"};
	    unpackData(obj);
	}
	if($("#container").css("display")=="block"){
	    var obj = {"page":"container"};
	    unpackData(obj);
	}
    }
    if(id=="back_container_pay"){
	jump("back_container_pay");
    }
    if(id=="back_barcode"){
	var obj = {"page":"container"};
	unpackData(obj);
    }
    if(id=="back_manage"){
	var pageObj = {"page":"entrance"};
	unpackData(pageObj);
	var servicetypeObj = {"servicetype":"shopingway"};
	unpackData(servicetypeObj);
    }
    if(id=="back_clean"){
	var obj = {"maintain":"manage"};
	unpackData(obj);
    }
    if(id=="setup_manage"){
	var obj = {"maintain":"setup"};
	unpackData(obj);
    }
    if(id=="system_manage"){
	var obj = {"maintain":"system"};
	unpackData(obj);
    }
    if(id=="back_setup"){
	var obj = {"maintain":"manage"};
	unpackData(obj);
    }
    if(id=="back_system"){
	var obj = {"maintain":"manage"};
	unpackData(obj);
    }
    if(id=="checkaccount_manage"){
	var obj = {"maintain":"checkaccount"};
	unpackData(obj);
    }
    if(id=="back_checkaccount"){
	var obj = {"maintain":"manage"};
	unpackData(obj);
    }
    if(id=="operator"||id=="operator_error"){
	document.getElementById('operator_way').style.display="block";
	var dis = document.getElementById('goto_operator_change').style.display
	if(dis == "none"){
	    $("#goto_administration").css('margin','50px auto');
	}else{
	    $("#goto_administration").css('margin-top','5px');
	}
	var obj = {"page":"message"};
	unpackData(obj);
    }
    if(id=="goto_operator_change"||id=="goto_administration"){
	document.getElementById('operator_way').style.display="none";
	var obj = {"page":"operator_change"};
	unpackData(obj);
    }
}

//显示指定界面，并隐藏所有的同级元素
function showElement(startid,id){
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
}



//按钮样式切换（隐藏/置灰且不可点/高亮可点）
function toggleCtn(id,opacity,mouseon){
    if(opacity == 0){
	$("#"+id).css("display","none");
	return;
    }
    //显示
    else if(opacity == 2){
	$("#"+id).css("display","block");
    }
    //置灰不可点
    else if(opacity == 0.5){
	$("#"+id).css("opacity",opacity);
	$("#"+id).attr("onclick",mouseon);
	return;
    }
    //高亮可点
    else if(opacity == 1){
	$("#"+id).css("opacity",opacity);
	$("#"+id).attr("onclick",mouseon);
    }
    //置换透明度
    else{
	$("#"+id).css("opacity",opacity);
	$("#"+id).attr("onclick",mouseon);
    }
    
    
}

//手动输入条码
function addInput(id){
    document.getElementById("showcode").setAttribute("type","text");
    var code = document.getElementById("showcode").getAttribute("value");
    var length = code.length;
    //alert(code);
    if(length>=15){
	$("#showcode").css("font-size","20px");
    }else{
	$("#showcode").css("font-size","30px");
    }
    switch(id){
    case "code_0":
	document.getElementById("showcode").setAttribute("value",code+"0");
	break;
    case "code_1":
	document.getElementById("showcode").setAttribute("value",code+"1");
	break;
    case "code_2":
	document.getElementById("showcode").setAttribute("value",code+"2");
	break;
    case "code_3":
	document.getElementById("showcode").setAttribute("value",code+"3");
	break;
    case "code_4":
	document.getElementById("showcode").setAttribute("value",code+"4");
	break;
    case "code_5":
	document.getElementById("showcode").setAttribute("value",code+"5");
	break;
    case "code_6":
	document.getElementById("showcode").setAttribute("value",code+"6");
	break;
    case "code_7":
	document.getElementById("showcode").setAttribute("value",code+"7");
	break;
    case "code_8":
	document.getElementById("showcode").setAttribute("value",code+"8");
	break;
    case "code_9":
	document.getElementById("showcode").setAttribute("value",code+"9");
	break;
    case "code_back":
	document.getElementById("showcode").setAttribute("value",code.substring(0,length-1));
	break;
    case "code_clean":
	document.getElementById("showcode").setAttribute("value","");
	break;
    case "code_submit":
	selfinput(code);
	break;
    }
}


//增加商品列表条目
function addList(name,value,num,price){ 
    if(name==""){
	$("#nogoodswarning_container").fadeIn(1000);
	var t = setTimeout("$('#nogoodswarning_container').fadeOut(1000)",2000);
	return;
    }	
    var tb = document.getElementById("listtable");
    var rowlen = tb.rows.length;
    
    //用于显示中划线（退货）的div
    var div_line = document.createElement("div"); 
    var div1 = document.createElement("div"); 
    var div2 = document.createElement("div"); 
    var div3 = document.createElement("div");
    var div4 = document.createElement("div");
    var div5 = document.createElement("div");
    
    // div_line.setAttribute("class","line");
    div_line.style.position = "absolute";
    
    div1.innerText=rowlen;
    if(rowlen<10){
	div1.innerText = "0"+div1.innerText;
    }
    div2.innerText=name;
    div3.innerText=value;
    div4.innerText=num;
    div5.innerText=price;
    
    //增加一行空字符串掩盖伸缩效果
    var strS=''; 
    tb.innerHTML+=strS;
    //使用insertRow()增加表格行
    var tr=document.getElementById('listtable').insertRow(tb.rows.length);
    tr.setAttribute("valign","top");
    tr.setAttribute("onclick","changeReturnBtn(this)");
    
    $("#list_num span").text($("#list_num span").text()*1+1);
    rowlen++;
    
    //使用inserCell()增加单元格
    var td1=tr.insertCell(0);
    var td2=tr.insertCell(1);
    var td3=tr.insertCell(2);
    var td4=tr.insertCell(3);
    var td5=tr.insertCell(4);
    
    //在单元格中加入一个div块，用于显示伸缩效果
    
    td1.appendChild(div_line);
    td1.appendChild(div1);
    td2.appendChild(div2);
    td3.appendChild(div3);
    td4.appendChild(div4);
    td5.appendChild(div5);
    if(div2.innerText.length>23){
	//字符串过长时鼠标悬停于文字可以查看全文
	div2.setAttribute("title",div2.innerText);
	//字符串过长部分用省略号代替
	div2.innerText = div2.innerText.substring(0,20)+"...";
    }
    
    //使滚动条自动滚动到底部
    var list = document.getElementById("list");
    list.scrollTop = list.scrollHeight;	
}


//选择支付界面中返回清除优惠信息
function removeList(index){
    var tb = document.getElementById("listable");
    for(var i=0;i<index;i++){
	$("#listtable tr:last").remove();
    }
}

//替换退货按钮的功能,并改变最后一行的背景色,修改选取单元行的样式
function changeReturnBtn(tr){
    //document.getElementById("returngoods_container").style.opacity = 1;
    if(document.getElementById("copylist_method").style.display=="none"){
	return;
    }
    if(tr.style.backgroundColor!=""){
	tr.style.backgroundColor = "";
	return;
    }
    tr.style.backgroundColor = "#4599cb";
}

//获取准备退货的单元行，并拼装报文
function getReturnGoodsTR(){
    var oldlist = document.getElementById("listtable");
    var length = $("#copylist_method_return div div div table tr").size();
    var json = 'returngoods|[';
    for(var i=1;i<length;i++){
	if($("#copylist_method_return div div div table tr:eq("+i+")").css("background-color") =="rgb(69, 153, 203)"){
	    returnGoods(oldlist.rows[i]);
	    // returnGoods($("#copylist_method_return div div div table tr:eq("+i+")"));
	    json = json +'{"index":"'+i+'"},';
	}
    }
    $("#copylist_method_return").empty();
    $("#copylist_method_return").append($("#fulllist").clone());
    json = json.substring(0,json.length-1)+']';
    if(json.length>13){
	jump(json);
    }else{
	unpackData({"payerror":"请选择想要退货的商品"});
    }
}

//被退货的商品单元行不可扩展，并添加划线
function returnGoods(tr){
    var lineimg = document.createElement("img");
    var div = tr.firstChild.firstChild;
    tr.style.height = "30px";
    tr.style.backgroundColor = "#FFFFFE";
    if(div.firstChild==null){
	div.setAttribute("class","line");
	$("#list_num span").text($("#list_num span").text()*1-1);//减少清单累计数量
    }
    tr.setAttribute("onclick","");
}

//指定容器显示指定文本
function showText(id,content){
    $("#"+id).text(content);
}

//指定输入框显示指定文本
function showValue(id,content){
    document.getElementById(id).setAttribute("value",content);
}

//向C端发送报文
function jump(str) {
    //alert("jump+"+str);
    external.returnAction(str);
    //console.log(str);
}

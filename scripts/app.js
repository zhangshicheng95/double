var stompClient = null;
var sock = null;
var host = '106.14.37.6:9004/wsendpoint';

function setConnected(connected) {
  if (connected) {
    pageManage.payerror("APP扫码连接已建立");
  } else {
    pageManage.payerror("APP扫码连接已断开");
  }
}

function client3() {
    if (stompClient != null) {
        stompClient.disconnect();
	setConnected(false);
    }
    if ('WebSocket' in window) {
        stompClient = Stomp.client('ws://'+host+'');
    } else {
        sock = new SockJS('https://'+host+'2');
        stompClient = Stomp.over(sock);
    }
    if (stompClient != null) {
	var client = stompClient.connect({}, function connectCallback (frame) {
            setConnected(true);
            listenInfo();
	},function errorCallBack (error) {
	    setTimeout(function () {
		client3()
	    },8000);
	});
    } else {
        setConnected(false);
    }
}

function listenInfo(){
    var listenUrl = '/pusher/store=1' ;
    stompClient.subscribe(listenUrl, function (data) {
	showGreeting(data.body);
	var d = new Date();
    });
}

function disconnect() {
    if (sock != null) {
	sock.close();
	sock = null;
    }
    setConnected(false);
}

function showGreeting(message) {
    var jsonMessage = JSON.parse(message);//处理获取到的信息

    var pageJson = {};
    pageJson.msgid = jsonMessage.msgid;
    pageJson.timestamp = jsonMessage.timestamp;
    pageJson.type = jsonMessage.type;
    pageJson.data = jsonMessage.data;

    var pageMessage = JSON.stringify(pageJson);
    jump("shopcreate|"+pageJson.type);
}

function sockHandle() {
    sock.onopen = function () {};
    sock.onmessage = function (event) {};
    sock.onclose = function (event) {};
    sock.onerror = function () {
	disconnect();
    };
}

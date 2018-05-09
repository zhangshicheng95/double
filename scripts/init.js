var flatScanner;

function init() {
  try {
    flatScanner  = require("../addons/flat_scanner.node");
    flatScanner.open("com4", (data) => {
      if (data.result != 0) {
        console.log("open flat scanner fail: " + data.desp);
        return false;
	    }
	    return true;
    });
  } catch (e) {
    return false;
  }
}

const http = require('http');

const order_option = {
  host: '106.14.37.6',
  port: '9100',
  path: "/api/orderservice?access_token=" + 'b5afa572-fe71-47e5-98ba-07ab2d87a4d0' + "&serial=" + "901K17H00065" + "&storeid=" + 1,
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    //'Content-Length': 0
  }
};
const req = http.request(order_option, (resp) => {
  let data = '';
  resp.on('data', (chunk) => {
    data += chunk;
  });
  resp.on('end', () => {
    console.log('data: ' + data);
    var data_json = JSON.parse(data);
    if (data_json.result != 0) {
      console.log("create order fail: " + data_json.desp);
    } else {
      order = data_json.data;
      pageManage.showPage('page', 'container');
    }
  });
});
req.on('error', (e) => {
  console.error(`problem with request: ${e.message}`);
});
//req.write('');
req.end();

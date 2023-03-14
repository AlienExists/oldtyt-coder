const port = 3000;
const serverUrl = "0.0.0.0";

let http = require("http");
let url = require('url')
let static = require('node-static')

let fileServer = new static.Server('.')

let subscribers = Object.create(null)

console.log("Starting web server at " + serverUrl + ":" + port);


if (!module.parent) {
	http.createServer( function(req, res) {


		let urlParsed = url.parse(req.url, true);
		// console.log(urlParsed)

		// новый клиент хочет получать сообщения
		if (urlParsed.pathname == '/chat/subscribe' || urlParsed.pathname == '/ball/subscribe') {
			onSubscribe(req, res);
			return;
		}

		// отправка сообщения
		if ((urlParsed.pathname == '/chat/publish' && req.method == 'POST') 
			|| (urlParsed.pathname == '/ball/locate' && req.method == 'POST')) {
			// принять POST
			req.setEncoding('utf8');
			let message = '';
			req.on('data', function(chunk) {
				message += chunk;
			}).on('end', function() {
				publish(message); // опубликовать для всех
				res.end("ok");
			});

			return;
		}
		
		// остальное - статика
		// fileServer.serve(req, res)
			
		console.log(getClientAddress(req))

	}).listen(port, serverUrl);
} else {
	exports.accept = accept;

  if (process.send) {
     process.on('message', (msg) => {
       if (msg === 'shutdown') {
         close();
       }
     });
  }

  process.on('SIGINT', close);
}

// Чат
function onSubscribe(req, res) {
	let id = Math.random();

	res.setHeader('Content-Type', 'text/plain;charset=utf-8');
	res.setHeader("Cache-Control", "no-cache, must-revalidate");

	subscribers[id] = res;

	req.on('close', function() {
		delete subscribers[id];
	});

}

function publish(message) {

	for (let id in subscribers) {
		let res = subscribers[id];
		res.end(message);
	}
  
	subscribers = Object.create(null);
}

function close() {
	for (let id in subscribers) {
	  let res = subscribers[id];
	  res.end();
	}
}


// получить ip клиента
function getClientAddress(req) {
	return (req.headers['x-forwarded-for'] || '').split(',')[0] 
	|| req.connection.remoteAddress;
};
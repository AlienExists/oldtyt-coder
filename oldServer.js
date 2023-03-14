var now = new Date();

let filename = req.url || "index.html";
if (filename === '/') filename = '/index.html'
// выгрузка файлов
if (!filename.includes('chat')) {
    
    let localPath = __dirname;
    let ext = path.extname(filename);
    let validExtensions = {
        ".html" : "text/html",
        ".js": "application/javascript",
        ".css": "text/css",
        ".txt": "text/plain",
        ".jpg": "image/jpeg",
        ".gif": "image/gif",
        ".png": "image/png",
        ".woff": "application/font-woff",
        ".woff2": "application/font-woff2",
        ".svg": "image/svg+xml",
        ".ico": "image/x-icon",
        
    };

    let validMimeType = true;
    let mimeType = validExtensions[ext];
    if (checkMimeType) {
        validMimeType = validExtensions[ext] != undefined;
    }

    if (validMimeType) {
        localPath += filename;
        fs.exists(localPath, function(exists) {
            if(exists) {
                console.log("Serving file: " + localPath);
                getFile(localPath, res, mimeType);
            } else {
                console.log("File not found: " + localPath);
                res.writeHead(404);
                res.end();
            }
        });

    } else {
        console.log("Invalid file extension detected: " + ext + " (" + filename + ")")
    }
}

// Выгруз файлов
function getFile(localPath, res, mimeType) {
	fs.readFile(localPath, function(err, contents) {
		if(!err) {
			res.setHeader("Content-Length", contents.length);
			if (mimeType != undefined) {
				res.setHeader("Content-Type", mimeType);
        	res.setHeader('Cache-Control', 'no-store')
			}
			res.statusCode = 200;
			res.end(contents);
		} else {
			res.writeHead(500);
			res.end();
		}
	});
}
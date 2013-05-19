/*jshint node: true */
var http = require('http'),
    fs = require('fs'),
   path = require('path'),
    io = require('socket.io');

var server = http.createServer(function(req, res) {
   'use strict';
   var filePath = '.' + req.url,
       contentType = 'text/html',
        extName;

    console.log('request starting...' + filePath);
    if(filePath === './') {
        filePath = './index.html';
    }
    extName = path.extname(filePath);
    switch(extName) {
    case '.js':
        contentType = 'text/javascript';
        break;
    case '.css':
        contentType = 'text/css';
        break;
    case '.jpg':
        contentType = 'image/jpeg';
        break;
    }

    path.exists(filePath, function(exists) {
       if(exists) {
            fs.readFile(filePath, function(error, content) {
                if(error) {
                    res.writeHead(500);
                    res.end();
                } else {
                    res.writeHead(200, {
                        'Content-Type': contentType
                    });
                    res.end(content, 'utf-8');
                }
            });
        } else {
            res.writeHead(404);
            res.end();
        }
    });
});

var socket = io.listen(server);

socket.on('connection', function(client) {
    'use strict';
    var image;
    var dirImg = __dirname + '/image/';
    var adminL = 'admin';
    var adminP = 'admin';

         client.on('adminLogin', function(admin) {
        if(admin.login === adminL && admin.password === adminP) {
            client.emit('loginToAdmin', 'yes');
        } else {
            client.emit('loginToAdmin', 'no');
        }
    });

    client.on('klientLogin', function() {
        fs.readdir(dirImg, function(err, files) {
            for(var i = 0; i < files.length; i++) {
          (function() {
                    var j = i;
                    process.nextTick(function() {
                        if(path.extname(files[j]) === '.jpg') {
                            image = fs.readFile(dirImg + files[j], 'base64', function(err, img) {
                                client.emit('image', {
                                    'name': files[j],
                                    'image': img
                                });
                                console.log('W folderze znajduje sie: ' + files[j]);
                            });
                        }
                     });
                }
                })();
             }
         });
     });

server.listen(3000);
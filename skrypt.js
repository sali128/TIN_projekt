/*jshint node: true, browser: true, jquery: true */
/*global io: false */
$(document).ready(function () {
    'use strict';
    var socket = io.connect('http://localhost:3000');

    console.log('connecting…');


    socket.on('message', function (data) {
        console.log(data);
        $('#gallery').append('<img id="'+data.name+'" src="data:image/jpeg;base64,'+data.image+'"><br/>');
    });
});
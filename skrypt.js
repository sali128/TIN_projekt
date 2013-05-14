/*jshint node: true, browser: true, jquery: true */
/*global io: false */
$(document).ready(function () {
    'use strict';
     $('#galleryMain').hide();
     $('#adminMain').hide();
    var socket = io.connect('http://localhost:3000');

    console.log('connecting…

    $('#klient').click(function() {
    $('#loginMain').hide();
    $('#galleryMain').show();
    socket.emit('klientLogin');
    });

    $('#zaloguj').click(function() {
    socket.emit('adminLogin', {
      'login': $('#adminLogin').val(),
      'password': $('#adminPassword').val()
    });
  });

  socket.on('loginToAdmin', function(login) {
    if(login === 'yes') {
      $('#loginMain').hide();
      $('#adminMain').show();
    } else {
      alert("Zle haslo");
    }
  });

  socket.on('image', function(data) {
    $('#gallery').append('<img id="' + data.name + '" src="data:image/jpeg;base64,' + data.image + '" width="50"><br/>');
    //$('#gallery').append('<input id="'+data.name+'" type="button" calss="button" value="Zamow"><br/>');
    $('#gallery').append('<button>Zamow</button><br/>');
    $('button').click(function() {
      if($(this).prev().prev().attr('id') === data.name) console.log($(this).prev().prev().attr('id'));
      else console.log('dupa');
    });

  });
});
/*jshint node: true, browser: true, jquery: true, devel: true */
/*global io: false */
$(document).ready(function () {
    'use strict';
     $('#galleryMain'). hide();
     $('#adminMain').hide();
     $('#loginPanel').hide(); 

    var socket = io.connect('http://localhost:3000');

    console.log('connecting…');

    $('#klient').click(function() {
    $('#loginMain').hide();
    $('#galleryMain').show();
    socket.emit('klientLogin'); 
    });

    $('#admin').click(function() {
    $('#loginMain').hide();
    $('#loginPanel').show();
    });


    $('#zaloguj').click(function() { /*wysylanie formularza do serwera*/
    socket.emit('adminLogin', {
      'login': $('#adminLogin').val(),
      'password': $('#adminPassword').val()
    });
  });

  socket.on('loginToAdmin', function(login) {
    if(login === 'yes') {
      $('#loginPanel').hide();
      $('#adminMain').show();
    } else {
      alert("Zle haslo");
    }
  });

  socket.on('image', function(data) { /*po zalogowaniu wyswietlenie galerii zdjec po stringach-base64*/
    
    $('#gallery').append('<img id="' + data.name + '" src="data:image/jpeg;base64,' + data.image + '" width="320"><br/>'); /*wyswietlanie po konwersji*/
    $('#gallery').append('<input id="' + data.name + '" type="button" value="Zamow" class="guzik"><br/>');
    $(".guzik").live("click", function() {
      socket.emit('zamowienie', $(this).attr('id')); /*wysylanie zdjecia do admina po id*/
      return false; 
    });
});

    socket.on('zamowienieAdmin', function(data) {
    $('#zamowienie').append('<img src="data:image/jpeg;base64,' + data.image + '" width="320"><br/>'); /*wyswietlanie zamowionych zdjec*/
  
  });
 });




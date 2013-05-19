/*jshint node: true, browser: true, jquery: true, devel: true */
/*global io: false */
$(document).ready(function () {
    'use strict';
     $('#galleryMain').hide();
     $('#adminMain').hide();
     $('#loginPanel').hide();

    var socket = io.connect('http://localhost:3000');

    console.log('connecting…

    $('#klient').click(function() {
    $('#loginMain').hide();
    $('#galleryMain').show();
    socket.emit('klientLogin');
    });

    $('#admin').click(function() {
    $('#loginMain').hide();
    $('#loginPanel').show();
    });


    $('#zaloguj').click(function() {
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

  socket.on('image', function(data) {
    $('#gallery').append('<img id="' + data.name + '" src="data:image/jpeg;base64,' + data.image + '" width="50"><br/>');
    //$('#gallery').append('<input id="'+data.name+'" type="button" calss="button" value="Zamow"><br/>');
    
    $('#gallery').append('<input id="' + data.name + '" type="button" value="Zamów" class="guzik"><br/>');
    
    /*
    $("button").live("click", function(event){
      alert("alalal");
      event.preventDefault();
    });

    */

    $(".guzik").live("click", function() {
      alert($(this).attr('id'));
      return false;
    
  });
});
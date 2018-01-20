const playVideo = require('./playVideo');
const Peer = require('simple-peer');
const $ = require('jquery');
const openStream = require('./openStream');

//openStream();

openStream(function (stream){
  playVideo(stream, 'localStream')
  const p = new Peer({ initiator: location.hash === '#1', trickle: false ,stream});

  p.on('signal', token => {
    $('#txtMySignal').val(JSON.stringify(token))
  });

  $('#btnConnect').click( () => {
    const friendSignal = JSON.parse($('#txtFriendSignal').val());
    p.signal(friendSignal);
  });

  p.on('stream', friendStream => playVideo(friendStream,'friendStream'));
});
//p.on('connect', () => {
//      setInterval( () => p.send(Math.random()),2000);
//});

//p.on('data',data => console.log('NHAN DU LIEU: ' + data));
//console.log('Xin chao cac ban');

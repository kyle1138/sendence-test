var WSS = require("ws").Server;
var upTimeServer = new WSS({port:5000});
var startTime = new Date;

var upTime = 0;
var connections = [];



upTimeServer.on('connection',function(user){
  console.log("connection")
  connections.push(user);




  user.on('close', function() {
    var closer = connections.indexOf(user);
    connections.splice(closer,1);
    console.log('client closed');
 })


})



setInterval( function(){
  if (connections.length > 0){
    var currentTime = new Date;
    upTime = Math.floor((currentTime.valueOf() - startTime.valueOf()  ) / 1000);
    console.log(upTime);
    // user.send(upTime + '');
    connections.forEach(function(dash){

      dash.send(upTime + '');

    });
  }
}, 200);

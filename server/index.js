var server = require('ws').Server;
var s= new server({port: 5001});

s.on('connection',function(ws){
	
    ws.on('message', function(dataMsg){
      console.log('recieved: '+ dataMsg);
       // ws.send('From server -'+dataMsg);
       dataMsg = JSON.parse(dataMsg);
	   //console.log('recieved: '+ dataMsg);
	  
       if(dataMsg.type == 'name'){
            ws.personName= dataMsg.data;
            return;
       }
	  /* 
	   if(dataMsg.type == 'typing'){
            ws.typemsg= dataMsg.data;
            return;
       }
	   */
        s.clients.forEach(function e(client){
            if(client!=ws && dataMsg.type != 'typing')
                client.send(JSON.stringify({
                   name: ws.personName,
                   data:dataMsg.data
                }));
				if(client!=ws && dataMsg.type == 'typing' )
                client.send(JSON.stringify({
                   type: dataMsg.type,
                   data:dataMsg.data
                }));
        });
    });
    ws.on('close',function(){
        console.log('lost a client');

    });
	console.log(' joined a client');

});
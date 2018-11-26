

// main file of api


//declare all library
var http=require('http');
var url =require('url');
var StringDecoder = require('string_decoder').StringDecoder;

//start the server 
var server =http.createServer(function(req,res){

    //get the url and parse it
    var parseurl = url.parse(req.url,true);

    //get the path
    var path=parseurl.pathname;
    //trime the path
    var trimpath=path.replace(/^\/+|\/+$/g, '');

    //get the request method
    var method=req.method.toLowerCase();

    //get the querystring as object
    var querystringob=parseurl.query;

    //get the header
    var hearder=req.headers;

    //get the payloader if any
    var decoder = new StringDecoder('utf-8');
    //data get in buffer 
    var buffer={};

    //call a on emit event when data come
    req.on('data',function(data){

        buffer+=decoder.write(data);
    });

    //call a on emit when data end
    req.on('end',function(){

        buffer+=decoder.end();

            // Check the router for a matching path for a handler If one is not found, use the notFound handler 
      var chosenHandler = typeof(router[ trimpath]) !== 'undefined' ? router[trimpath] : handlers.notFound;

      // Construct the data object to send to the handler
      var data = {
        'trimmedPath' :  trimpath,
        'queryStringObject' : querystringob,
        'method' : method,
        'headers' : hearder,
        'payload' : buffer
      };

        // Route the request to the handler 
        chosenHandler(data,(statusCode,payload)=>{

        // Use the status code returned from the handler or set the default status code to 200
        statusCode = typeof(statusCode) == 'number' ? statusCode : 200;

        // Use the payload returned from the handler, or set the default payload to an empty object
        payload = typeof(payload) == 'object'? payload : {};

        // Convert the payload to a string
        var payloadString = JSON.stringify(payload);

        // Return the response
        res.setHeader('Content-Type','application/jason');
        res.writeHead(statusCode);
        res.end(payloadString);
        console.log("Returning  response: ",statusCode,payloadString);

        });
              

           

            


        
    
    });

});

//sever listion port
server.listen(90,()=>{

    console.log("server isn up and listion on port 90");});

    
// Define all the handlers module
var handlers = {};

// welcom handler
handlers.welcome = (data,callback)=>{
    callback(406,{'welcom':'from server'});
};

// Not found handler
handlers.notFound = (data,callback)=>{
  callback(404);
};

// Define the  router request
var router = {
  'hello' : handlers.welcome
};

  
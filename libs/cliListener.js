var events = require('events');
var net = require('net');

var listener = module.exports = function listener(server, port){

    var _this = this;

    var emitLog = function(text){
        _this.emit('log', text);
    };


    this.start = function(){
        net.createServer(function(c) {

            var data = '';
//            try {
                c.on('data', function (d) {
                    data += d;
                    if (data.slice(-1) === '\n') {
						try {
							var message = JSON.parse(data);
							_this.emit('command', message.command, message.params, message.options, function(message){
								c.end(message);
							});							
						}
						catch(e){
							emitLog('CLI listener failed to parse message :' + data);
						}
                    }
                });
                c.on('end', function () {

                });
                c.on('error', function () {
                    
                });
//            }
//            catch(e){
//                emitLog('CLI listener failed to parse message ' + data);
//            }

        }).listen(port, server, function() {
            emitLog('CLI listening on  ' + server + ":" + port)
        });
    }

};

listener.prototype.__proto__ = events.EventEmitter.prototype;

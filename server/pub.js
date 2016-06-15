let amqp = require('amqp');

let connection = amqp.createConnection({

    vhost: '/',
    login: 'guest',
    password: 'guest'

});



connection.on('ready', function() {


    console.log('ready');

    connection.exchange('chatExchange', {
        passive: 'true'
    }, function(exchange) {

        setInterval(function() {
            exchange.publish('*', {
                hello: 'world'
            });

        }, 1000);
    });

});


connection.on('error', function() {
    console.log('error');
});

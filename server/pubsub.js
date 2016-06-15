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

        exchange.publish('*', {
            hello: 'world'
        });


        //// Use the default 'amq.topic' exchange
        connection.queue('', {
            durable: false,
            autoDelete: true,
            exclusive: true
        }, function(q) {

            q.bind(exchange, '*', function() {

                q.subscribe(function(msg) {
                    console.log(msg);
                });

            });
        });

    });



});


connection.on('error', function() {

    console.log('error');

});




https: //github.com/rajaraodv/rabbitpubsub

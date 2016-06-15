let amqp = require('amqp');

let connection = amqp.createConnection({

    vhost: '/',
    login: 'guest',
    password: 'guest'

});



connection.on('ready', function() {


    console.log('ready');


    //// Use the default 'amq.topic' exchange
    connection.queue('', {
        durable: false,
        autoDelete: true,
        exclusive: true
    }, function(q) {

        q.bind('chatExchange', '*', function() {

            q.subscribe(function(msg) {
                console.log(msg);
            });

        });
    });

});


connection.on('error', function() {

    console.log('error');

});

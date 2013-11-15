importScripts('three.min.js');
var positions = new Object();
positions.ballPosition = new THREE.Vector3(0, 0, 0);
positions.paddle1Position = new THREE.Vector3(0, 0, 0);
positions.paddle2Position = new THREE.Vector3(0, 0, 0);

var xDiff, yDiff, zDiff;

var oldVal;

var interval;

self.onmessage = function(e) {
    //var data = e.data;


    //connection = new WebSocket('ws://' + location.hostname + ':8080/socket?gameId=' + gameId);
    connection = new WebSocket(e.data);
    connection.onopen = function() {
        connection.send('Ping'); // Send the message 'Ping' to the server
    };

    // Log errors
    connection.onerror = function(error) {
        console.log('WebSocket Error ' + error);
    };

    // Log messages from the server
    connection.onmessage = function(e) {

        //clearInterval(interval);
        update = JSON.parse(e.data);
        positions.ballPosition = update.ballLocation;
        positions.paddle1Position = update.paddle1Location;
        positions.paddle2Position = update.paddle2Location;

        var int = parseInt(positions.ballPosition.z);
        //console.log(shapes);
        var newVal = null;
        if (int % 10 == 0 && int < 49 && int > -49) {

            newVal = (int + 50) / 10;
        } else if (int >= 49) {
            newVal = 10;
        } else if (int <= -49) {
            newVal = 0;
        }

        positions.newVal = newVal;
        positions.fromNetwork = true;





        self.postMessage(positions);
        if (!interval) {
            interval = setInterval(function() {
                positions.fromNetwork = false;
                positions.ballPosition.x += update.ballVelocity.x;
                positions.ballPosition.y += update.ballVelocity.y;
                positions.ballPosition.z += update.ballVelocity.z;

                var int = parseInt(positions.ballPosition.z);
                //console.log(shapes);
                var newVal = null;
                if (int % 10 == 0 && int < 49 && int > -49) {

                    newVal = (int + 50) / 10;
                } else if (int >= 49) {
                    newVal = 10;
                } else if (int <= -49) {
                    newVal = 0;
                }

                positions.newVal = newVal;

                self.postMessage(positions);
            }, 25);
        }

    };


}
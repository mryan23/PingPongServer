importScripts('three.min.js');
var positions = new Object();
positions.ballPosition = new THREE.Vector3(0, 0, 0);
positions.paddle1Position = new THREE.Vector3(0, 0, 0);
positions.paddle2Position = new THREE.Vector3(0, 0, 0);

var xDiff, yDiff, zDiff;

var oldVal;

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
        //console.log('Server: ' + e.data);
        //console.log(e.data);
        /*var strs = e.data.split(" ");

        var oldZ = positions.ballPosition.z;
        var newZ = parseFloat(strs[2]);
        var diffz = newZ - oldZ;
        if (zDiff != null) {
            if ((zDiff < 0 && diffz > 0) || (zDiff > 0 && diffz < 0)) {
                positions.paddleSound = true;
            } else {
                positions.paddleSound = false;
            }
        }
        zDiff = diffz;



        var oldY = positions.ballPosition.y;
        var newY = parseFloat(strs[1]);
        var diffy = newY - oldY;
        if (yDiff != null) {
            if ((yDiff < 0 && diffy > 0) || (yDiff > 0 && diffy < 0)) {
                positions.wallSoundy = true;
            } else {
                positions.wallSoundy = false;
            }
        }
        yDiff = diffy;

        var oldX = positions.ballPosition.x;
        var newX = parseFloat(strs[0]);
        var diffx = newX - oldX;
        if (xDiff != null) {
            if ((xDiff < 0 && diffx > 0) || (xDiff > 0 && diffx < 0)) {
                positions.wallSoundx = true;
            } else {
                positions.wallSoundx = false;
            }
        }

        xDiff = diffx;


        positions.ballPosition.x = strs[0];
        positions.ballPosition.y = strs[1];
        positions.ballPosition.z = strs[2];

        positions.paddle1Position.x = -1 * strs[3];
        positions.paddle1Position.y = strs[4];

        positions.paddle2Position.x = strs[5];
        positions.paddle2Position.y = strs[6];

        var timestamp = strs[7];


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

        positions.newVal = newVal;*/

        var update = JSON.parse(e.data);
        positions.ballPosition = update.ballLocation;
        positions.paddle1Position = update.paddle1Location;
        positions.paddle2Position = update.paddle2Location;

        positions.player1Score = update.player1Score;
        positions.player2Score = update.player2Score;

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

    };


}
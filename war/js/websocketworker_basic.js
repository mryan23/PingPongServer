importScripts('three.min.js');
var positions = new Object();
positions.ballPosition = new THREE.Vector3(0, 0, 0);
positions.paddle1Position = new THREE.Vector3(0, 0, 0);
positions.paddle2Position = new THREE.Vector3(0, 0, 0);
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
        var strs = e.data.split(" ");
        positions.ballPosition.x = strs[0];
        positions.ballPosition.y = strs[1];
        positions.ballPosition.z = strs[2];

        positions.paddle1Position.x = -1 * strs[3];
        positions.paddle1Position.y = strs[4];

        positions.paddle2Position.x = strs[5];
        positions.paddle2Position.y = strs[6];

        self.postMessage(positions);



    };
}
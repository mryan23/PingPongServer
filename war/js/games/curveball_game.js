var shapes = new Array();
var oldVal;
init();

function init() {
    container = document.getElementById("wrap");
    gameId = getURLParameter("id");
    playerNum = parseInt(getURLParameter("playerNum"));

    //scoreBoard = new ScoreBoard(document.getElementById("scoreBoard"), 2);

    // Create the scene and set the scene size.
    scene = new THREE.Scene();
    var WIDTH = container.offsetWidth;
    HEIGHT = container.offsetHeight;

    // More code goes here next...
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(WIDTH, HEIGHT);
    container.appendChild(renderer.domElement);
    camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 0.1, 20000);

    if (playerNum == 1) {
        //camera.position.set(-120, -4.5, -.5);
        camera.position.set(-.5, -4.5, -120);
        //camera.rotation.set(-1.71, -1.54, -1.71);
    } else if (playerNum == 2) {
        camera.position.set(-.5, -4.5, 120);
        //camera.rotation.set(1.71, 1.54, -1.71);
    }
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    scene.add(camera);

    window.addEventListener('resize', function() {
        var WIDTH = container.offsetWidth,
            HEIGHT = container.offsetHeight;
        renderer.setSize(WIDTH, HEIGHT);
        camera.aspect = WIDTH / HEIGHT;
        camera.updateProjectionMatrix();
    });

    //renderer.setClearColor(0x333F47, 1);
    renderer.setClearColor(0x000000, 1);

    // Create a light, set its position, and add it to the scene.
    var light = new THREE.AmbientLight(0xffffff);
    //light.position.set(-100,200,100);
    // light.position.set(0,100,100);
    scene.add(light);

    /*var tableImage = THREE.ImageUtils.loadTexture('images/table.png');

    var bottom = new THREE.Mesh(new THREE.CubeGeometry(52, 100, 1), new THREE.MeshBasicMaterial({
        map: tableImage
    }));
    var top = new THREE.Mesh(new THREE.CubeGeometry(52, 100, 1), new THREE.MeshBasicMaterial({
        map: tableImage
    }));
    var left = new THREE.Mesh(new THREE.CubeGeometry(100, 52, 1), new THREE.MeshBasicMaterial({
        map: tableImage
    }));
    var right = new THREE.Mesh(new THREE.CubeGeometry(100, 52, 1), new THREE.MeshBasicMaterial({
        map: tableImage
    }));
    bottom.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
    bottom.position.y = -26;
    top.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
    top.position.y = 26;
    left.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI / 2);
    left.position.x = -26;
    right.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI / 2);
    right.position.x = 26;
    //bottom.rotateOnAxis(new THREE.Vector3(0, 0, 1), Math.PI / 2);

    scene.add(bottom);
    scene.add(top);
    scene.add(left);
    scene.add(right);*/


    function drawShape(shape, x, y, z) {
        var points = shape.createPointsGeometry();

        var line = new THREE.Line(points, new THREE.LineBasicMaterial({
            color: "#00ff00",
            linewidth: 2
        }));
        line.position.set(x, y, z);
        scene.add(line);
        return line;
    }

    var rectShape = new THREE.Shape();
    rectShape.moveTo(0, 0);
    rectShape.lineTo(0, 50);
    rectShape.lineTo(50, 50);
    rectShape.lineTo(50, 0);
    rectShape.lineTo(0, 0);

    var counter = 0;
    for (var i = -50; i <= 50; i += 5) {
        shapes[counter++] = drawShape(rectShape, -25, -25, i);
    }
    oldVal = 0;
    console.log(shapes);
    //shapes[oldVal].material.color = new THREE.Color(0, 0, 255);


    //drawShape(rectShape, -25, -25, 0);
    //drawShape(rectShape, -25, -25, 5);


    ball = new PingPongBall(1, 0, 0, 0);
    ball.init(scene);
    ball.setMinimumY(-21);


    //paddle1 = new PingPongPaddle(-50, -7, 0, 20);
    paddle1 = new PingPongPaddle(0, -7, -50, 20);
    paddle1.init(scene);
    //paddle1.rotate(0,-Math.PI/16,0);
    //paddle2 = new PingPongPaddle(50, -7, 0, 20);
    paddle2 = new PingPongPaddle(0, -7, 50, 20);
    paddle2.init(scene);
    //paddle2.rotate(0,Math.PI/4,0);

    paddle1Position = new THREE.Vector3(paddle1.paddle.position.x,
        paddle1.paddle.position.y,
        paddle1.paddle.position.z);

    //table.getNormal();


    var controls = new THREE.OrbitControls(camera, renderer.domElement);

    paddleSounds = [];
    tableSounds = [];
    paddleSounds[0] = document.getElementById("paddleSound1");
    paddleSounds[1] = document.getElementById("paddleSound2");
    paddleSounds[2] = document.getElementById("paddleSound3");
    paddleSounds[3] = document.getElementById("paddleSound4");
    paddleSounds[4] = document.getElementById("paddleSound5");
    tableSounds[0] = document.getElementById("tableSound1");
    tableSounds[1] = document.getElementById("tableSound2");
    tableSounds[2] = document.getElementById("tableSound3");
    tableSounds[3] = document.getElementById("tableSound4");
    tableSounds[4] = document.getElementById("tableSound5");


    //connection = new WebSocket('ws://24.219.213.60:8080/socket/');
    //connection = new WebSocket('ws://localhost:8080/socket?gameId='+gameId);
    console.log(location.hostname);
    connection = new WebSocket('ws://' + location.hostname + ':8080/socket?gameId=' + gameId);
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
        ball.position.x = strs[0];
        ball.position.y = strs[1];
        ball.position.z = strs[2];

        var int = parseInt(ball.position.z);
        //console.log(shapes);
        if (int % 5 == 0 && int < 49 && int > -49) {
            if (oldVal < shapes.length)
                shapes[oldVal].material.color.setHex(0x00ff00);
            var distance = (int + 50) / 5;
            if (distance < shapes.length)
                shapes[distance].material.color.setHex(0xff0000);
            oldVal = distance;
        } else if (int >= 49) {
            if (oldVal < shapes.length)
                shapes[oldVal].material.color.setHex(0x00ff00);
            shapes[20].material.color.setHex(0xff0000);
            oldVal = 20;
        } else if (int <= -49) {
            if (oldVal < shapes.length)
                shapes[oldVal].material.color.setHex(0x00ff00);
            shapes[0].material.color.setHex(0xff0000);
            oldVal = 0;
        }
        //console.log(int);
        ball.update();

        paddle1.paddle.position.x = -1 * strs[3];
        paddle1.paddle.position.y = strs[4];


        paddle2.paddle.position.x = strs[5];
        paddle2.paddle.position.y = strs[6];

        //console.log(e.data);

        renderer.render(scene, camera);

    }

}
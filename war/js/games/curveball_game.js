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
    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    container.appendChild(stats.domElement);

    otherStats = new Stats();
    otherStats.domElement.style.position = 'absolute';
    otherStats.domElement.style.top = "50px";
    container.appendChild(otherStats.domElement);

    paddleStats = new Stats();
    paddleStats.domElement.style.position = 'absolute';
    paddleStats.domElement.style.top = "100px";
    container.appendChild(paddleStats.domElement);


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

    var lineMaterial = new THREE.LineBasicMaterial({
        color: 0x00ff00,
        linewidth: 2
    });

    function drawShape(shape, x, y, z) {
        var points = shape.createPointsGeometry();

        var line = new THREE.Line(points, new THREE.LineBasicMaterial({
            color: "#00ff00"
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
    for (var i = -50; i <= 50; i += 10) {
        shapes[counter++] = drawShape(rectShape, -25, -25, i);
    }
    oldVal = 0;
    console.log(shapes);



    var line1Geo = new THREE.Geometry();
    line1Geo.vertices.push(new THREE.Vector3(25, 25, -50));
    line1Geo.vertices.push(new THREE.Vector3(25, 25, 50));

    var line2Geo = new THREE.Geometry();
    line2Geo.vertices.push(new THREE.Vector3(-25, 25, -50));
    line2Geo.vertices.push(new THREE.Vector3(-25, 25, 50));

    var line3Geo = new THREE.Geometry();
    line3Geo.vertices.push(new THREE.Vector3(-25, -25, -50));
    line3Geo.vertices.push(new THREE.Vector3(-25, -25, 50));

    var line4Geo = new THREE.Geometry();
    line4Geo.vertices.push(new THREE.Vector3(25, -25, -50));
    line4Geo.vertices.push(new THREE.Vector3(25, -25, 50));
    scene.add(new THREE.Line(line1Geo, lineMaterial));
    scene.add(new THREE.Line(line2Geo, lineMaterial));
    scene.add(new THREE.Line(line3Geo, lineMaterial));
    scene.add(new THREE.Line(line4Geo, lineMaterial));

    //shapes[oldVal].material.color = new THREE.Color(0, 0, 255);


    //drawShape(rectShape, -25, -25, 0);
    //drawShape(rectShape, -25, -25, 5);


    ball = new PingPongBall(1, 0, 0, 0);
    ball.init(scene);
    ball.setMinimumY(-21);

    console.log(ball.sphere.position);


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

    var worker = new Worker('js/websocketworker_curveball.js');
    worker.onmessage = function(event) {
        var positions = event.data;
        ball.position = positions.ballPosition;
        ball.update();

        if (paddle1.paddle.position.x != -1 * positions.paddle1Position.x ||
            paddle1.paddle.position.y != positions.paddle1Position.y) {
            paddleStats.update();
        }

        paddle1.paddle.position.x = -1 * positions.paddle1Position.x;
        paddle1.paddle.position.y = positions.paddle1Position.y;


        paddle2.paddle.position.x = positions.paddle2Position.x;
        paddle2.paddle.position.y = positions.paddle2Position.y;

        if (positions.paddleSound) {
            randomSound("paddle");
        }
        if (positions.wallSoundx || positions.wallSoundy) {
            randomSound("wall");
        }

        if (positions.newVal != null && oldVal != positions.newVal) {
            if (oldVal < shapes.length)
                shapes[oldVal].material.color.setHex(0x00ff00);
            shapes[positions.newVal].material.color.setHex(0xff0000);
            oldVal = positions.newVal;
        }
        otherStats.update();
        //renderer.render(scene, camera);
    };
    worker.postMessage('ws://' + location.hostname + ':8080/socket?gameId=' + gameId);

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

    animate();

}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    stats.update();
}

function randomSound(type) {
    var index = Math.floor(Math.random() * 5);
    //console.log(index);
    if (type == "paddle")
        paddleSounds[index].play();
    else
        tableSounds[index].play();
}
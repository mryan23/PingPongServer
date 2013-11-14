var scene, camera, renderer;
var accelx = 0;
var accely = -.04;
var accelz = 0;
var velx = 2;
var vely = -.0;
var velz = 0;
var effx = 1;
var effy = 1.01;
var effz = 1;

var table;
var ball;
var paddle1;
var paddle2;
var paddleSounds;
var tableSounds;
var gameId;
var playerNum;
var container;

//animate();
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

    renderer.setClearColor(0x333F47, 1);

    // Create a light, set its position, and add it to the scene.
    var light = new THREE.AmbientLight(0xffffff);
    //light.position.set(-100,200,100);
    // light.position.set(0,100,100);
    scene.add(light);

    table = new PingPongTable(100, 50, 5);
    table.init(scene);
    table.setPosition(0, -26, 0);


    ball = new PingPongBall(1, 0, 0, 0);
    ball.init(scene);
    ball.setAcceleration(accelx, accely, accelz);
    ball.setVelocity(velx, vely, velz);
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

    table.getNormal();


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

    var worker = new Worker('js/websocketworker_basic.js');
    worker.onmessage = function(event) {
        var positions = event.data;
        ball.position = positions.ballPosition;
        ball.update();

        paddle1.paddle.position.x = positions.paddle1Position.x;
        paddle1.paddle.position.y = positions.paddle1Position.y;


        paddle2.paddle.position.x = positions.paddle2Position.x;
        paddle2.paddle.position.y = positions.paddle2Position.y;

        renderer.render(scene, camera);
    };
    worker.postMessage('ws://' + location.hostname + ':8080/socket?gameId=' + gameId);


}

function readyChange(request) {
    if (request.readyState == 4 && request.status == 200) {
        var str = request.responseText;
        var strs = str.split(":");
        var y = parseInt(strs[0]);
        var z = parseInt(strs[1]);
        paddle1.paddle.position.y = y;
        paddle1.paddle.position.z = z;
    }
}

function randomSound(type) {
    var index = Math.floor(Math.random() * 5);
    //console.log(index);
    if (type == "paddle")
        paddleSounds[index].play();
    else
        tableSounds[index].play();
}


var hitTablePrevious = false;
var hitPaddlePrevious = false;

/*function animate() {

    // Read more about requestAnimationFrame at http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/

    requestAnimationFrame(animate);

    connection.send("BLAH");
    if (!hitTablePrevious && table.hitTable(ball.position.x, ball.position.y, ball.position.z, ball.radius)) {
        ball.velocity.y *= -1 * effy;
        hitTablePrevious = true;
        randomSound("table");
    }

    if (table.hitNet(ball.position.x, ball.position.y, ball.position.z, ball.radius)) {
        ball.reset();
        ball.velocity.y = 0;
        console.log("HIT NET");
    }
    if (!hitPaddlePrevious && paddle1.hitPaddle(ball.position.x, ball.position.y, ball.position.z, ball.radius)) {
        //ball.velocity.x*=-1*effx;
        ball.velocity.y = .5;
        hitPaddlePrevious = true;


        var theta = -paddle1.rotation.y;

        var phi = Math.atan(ball.velocity.z / Math.abs(ball.velocity.x));
        //phi *=(ball.velocity.z<0)?-1:1;
        console.log(ball.velocity.z, ball.velocity.x, ball.velocity.z / ball.velocity.x, phi);
        var sigma = 2 * theta + phi;
        var l = Math.sqrt(Math.pow(ball.velocity.z, 2) + Math.pow(ball.velocity.x, 2));
        ball.velocity.x = l * Math.cos(sigma);
        ball.velocity.z = l * Math.sin(sigma);




        //paddleSounds[0].play();
        randomSound("paddle");
        //console.log(paddle1.paddle.geometry.faces[0].normal);
    }
    if (!hitPaddlePrevious && paddle2.hitPaddle(ball.position.x, ball.position.y, ball.position.z, ball.radius)) {
        ball.velocity.x *= -1 * effx;
        ball.velocity.y = .5;
        hitPaddlePrevious = true;
        //paddleSounds[0].play();
        randomSound("paddle");
        //console.log(paddle2.rotation);
    }
    if (ball.position.z < -25 || ball.position.z > 25) {
        ball.velocity.z *= -1 * effz;
    }

    if (ball.position.x < -100 || ball.position.x > 100) {
        ball.reset();
        ball.velocity.y = 0;
        //ball.velocity.z=0;
        console.log("MISS");
    }
    hitTablePrevious = false;
    hitPaddlePrevious = false;
    ball.update();

    // Render the scene.
    renderer.render(scene, camera);


    //controls.update();

}*/
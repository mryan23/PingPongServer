function PingPongPaddle(x, y, z, radius) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.radius = radius;
}

PingPongPaddle.prototype = {
    rotation: new THREE.Vector3(0, 0, 0),
    init: function(scene) {
        var tableImage = THREE.ImageUtils.loadTexture('images/paddle_texture.jpg');
        //var geometry = new THREE.CubeGeometry(this.radius, this.radius, .1);
        var geometry = new THREE.CylinderGeometry(this.radius, this.radius, .1, 16, 1);
        this.paddle = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
            map: tableImage,
            transparent: true,
            opacity: .5
        }));
        //this.paddle.doubleSided = true;
        this.rotate(Math.PI / 2, 0, 0);
        this.paddle.position.x = this.x;
        this.paddle.position.y = this.y;
        this.paddle.position.z = this.z;
        scene.add(this.paddle);
    },
    update: function() {
        if (this.paddle.position.y > 20) {
            direction = -1;
        } else if (this.paddle.position.y < -20) {
            direction = 1;
        }
        this.paddle.position.y += direction * .1;
    },
    hitPaddle: function(x, y, z, radius) {
        if (Math.abs(this.paddle.position.x - x) < radius) {
            return isBetween(y, this.paddle.position.y + this.radius / 2, this.paddle.position.y - this.radius / 2) && isBetween(z, this.paddle.position.z + this.radius / 2, this.paddle.position.z - this.radius / 2);
        }
    },
    rotate: function(x, y, z) {
        this.paddle.rotateOnAxis(new THREE.Vector3(1, 0, 0), x);
        this.rotation.x += x;
        this.paddle.rotateOnAxis(new THREE.Vector3(0, 1, 0), y);
        this.rotation.y += y;
        this.paddle.rotateOnAxis(new THREE.Vector3(0, 0, 1), z);
        this.rotation.z += z;
    }

}
var direction = 1;

function isBetween(x, x1, x2) {
    return (x <= x1 && x >= x2) || (x >= x1 && x <= x2);
}
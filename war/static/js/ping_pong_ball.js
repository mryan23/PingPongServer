function PingPongBall(radius, origx,origy, origz){
	this.radius = radius;
	this.orig.x=origx;
	this.orig.y=origy;
	this.orig.z=origz;
}
PingPongBall.prototype={
	position:{x:0,y:0,z:0},
	acceleration:{x:0,y:0,z:0},
	velocity:{x:0,y:0,z:0},
	orig:{x:0,y:0,z:0},
	init:function(scene){
		this.sphere = new THREE.Mesh(new THREE.SphereGeometry(this.radius, 50, 50), new THREE.MeshPhongMaterial());
	    //sphere.overdraw=true;
	    scene.add(this.sphere);
	},
	setAcceleration:function(x,y,z){
		this.acceleration.x=x;
		this.acceleration.y=y;
		this.acceleration.z=z;
	},
	setVelocity:function(x,y,z){
		this.velocity.x=x;
		this.velocity.y=y;
		this.velocity.z=z;
	},
	setMinimumY:function(y){
		this.minY=y;
	},
	reset:function(){
		this.position.x=this.orig.x;
		this.position.y=this.orig.y;
		this.position.z=this.orig.z;
	},
	update:function(){
		/*this.velocity.x+=this.acceleration.x;
		this.velocity.y+=this.acceleration.y;
		this.velocity.z+=this.acceleration.z;

		this.position.x+=this.velocity.x;
		this.position.y+=this.velocity.y;
		if(this.position.y-this.radius/2 < this.minY){
			this.position.y=this.minY+this.radius/2;
		}
		this.position.z+=this.velocity.z;*/
		this.sphere.position.x=this.position.x;
		this.sphere.position.y=this.position.y;
		this.sphere.position.z=this.position.z;

		//console.log(this.velocity.y);
	}
}
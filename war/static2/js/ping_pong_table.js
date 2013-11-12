function PingPongTable(width, height, netHeight){
	this.width=width;
	this.height = height;
	this.netHeight = netHeight
}

PingPongTable.prototype={
	position:{x:0,y:0,z:0},
	rotation:{x:0,y:0,z:0},
	init: function(scene){
		var tableImage = THREE.ImageUtils.loadTexture('images/table.png');
	    this.table = new THREE.Mesh(new THREE.CubeGeometry(this.height,this.width,1), new THREE.MeshBasicMaterial({map:tableImage}));
	    //this.tableBottom = new THREE.Mesh(new THREE.PlaneGeometry(this.height,this.width), new THREE.MeshBasicMaterial({map:tableImage}));
	    
	    


		var netImage = THREE.ImageUtils.loadTexture('images/netWhite.png');	
	    this.net = new THREE.Mesh(new THREE.CubeGeometry(this.width,this.netHeight,1),new THREE.MeshBasicMaterial({map:netImage, transparent: true}));
	    this.net.rotation.y=Math.PI/2;
	    //this.netBack = new THREE.Mesh(new THREE.PlaneGeometry(this.width,this.netHeight),new THREE.MeshBasicMaterial({map:netImage,transparent: true}));
	    //this.netBack.rotation.y=-Math.PI/2;
	    this.setRotationX(Math.PI/2);
	    this.update();
	    
	    scene.add(this.net);
	    scene.add(this.netBack);
	    
	    scene.add(this.table);
	    scene.add(this.tableBottom);
	},
	setPosition:function(x,y,z){
		this.position.x=x;
		this.position.y=y;
		this.position.z=z;
		
		this.update();
	},
	setRotationX:function(x){
		this.rotation.x=x;
		this.rotation.y=0;
		this.rotation.z=0;
		this.update();
	},
	update:function(){
		this.table.position.x=this.position.x;
		this.table.position.y=this.position.y;
		this.table.position.z=this.position.z;
		//this.tableBottom.position.x=this.position.x;
		//this.tableBottom.position.y=this.position.y+((this.position.y<0)?-.01:.01);
		//this.tableBottom.position.z=this.position.z;

		this.table.rotation.x=this.rotation.x;
		this.table.rotation.y=this.rotation.y;
		this.table.rotation.z=this.rotation.z;

		//this.tableBottom.rotation.x=-1*this.rotation.x;
		//this.tableBottom.rotation.y=this.rotation.y;
		//this.tableBottom.rotation.z=this.rotation.z;

		this.net.position.y=this.position.y+this.netHeight/2;
	    //this.netBack.position.y=this.position.y+this.netHeight/2;
	},
	hitTable:function(x,y,z, radius){
		if(Math.abs(y-this.position.y)<radius){
			//console.log("POSSIBLE HIT"+(this.position.x+this.width/2));
			return isBetween(x,this.position.x+this.height/2, this.position.x-this.height/2)&& isBetween(z,this.position.z+this.width/2,this.position.z-this.width/2);
		}
		return false;
	},
	hitNet:function(x,y,z,radius){
		if(Math.abs(y-this.position.y)<this.netHeight){
			return isBetween(this.position.x,x+radius/2, x-radius/2);
		}
	},
	belowTable:function(x,y,z){
		return y < this.position.y;
	},
	getNormal:function(){
		/*var plane = new THREE.Mesh(new THREE.PlaneGeometry(10,10,10),null);
		plane.rotation=this.table.rotation;
		var myVec = new THREE.Vector3(0,0,1);
		var v = plane.position.clone();
		v.addSelf(myVec);
		plane.lookAt(v);
		console.log(plane.rotation);*/
	}
}

function isBetween(x, x1, x2){
	return (x<=x1 && x >=x2)||(x>=x1&&x<=x2);
}


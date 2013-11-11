package com.pingpong.test.model;

public class BallModel {
	public float radius;
	public float x;
	public float y;
	public float z;
	public float velx=0;
	public float vely=0;
	public float velz=0;
	public BallModel(float radius, float x, float y, float z){
		this.radius = radius;
		this.x = x;
		this.y = y;
		this.z = z;
	}
	
	public void setVelocity(float xv, float yv, float zv){
		velx=xv;
		vely=yv;
		velz=zv;
	}
	
	public void move(){
		x+=velx;
		y+=vely;
		z+=velz;
	}
	
}

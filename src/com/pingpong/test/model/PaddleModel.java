package com.pingpong.test.model;

public class PaddleModel {
	float radius;
	
	// These are for the center
	float x;
	float y;
	float z;
	
	// Note: This constructor is for compatibility, the size of the paddle is not exact using this
	public PaddleModel(float h, float w, float x, float y, float z){
		this.x = x;
		this.y = y;
		this.z = z;
		this.radius = 0.25f * (w + h);	// 1/2 the average of the width and height
	}
	
	// This is the preferred constructor
	public PaddleModel(float r, float x, float y, float z) {
		this.x = x;
		this.y = y;
		this.z = z;
		this.radius = r;
	}
	
	public boolean collision(BallModel ball){
//		float xMin = x-width;
//		float xMax = x+width;
//		float yMin = y-height;
//		float yMax = y+height;
//		if(Math.abs(z-ball.z)<=ball.radius){
//			return isBetween(xMin, xMax, ball.x) && 
//					isBetween(yMin, yMax, ball.y);
//		}
//		return false;
		
		if(Math.abs(z-ball.z)<=ball.radius){
			double dist = Math.sqrt(Math.pow(ball.x - x, 2) + Math.pow(ball.y - y, 2));
			return (dist <= radius);
		} else {
			return false;
		}
	}
}

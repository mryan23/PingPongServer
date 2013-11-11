package com.pingpong.test.model;

public class PaddleModel {
	float height;
	float width;
	float x;
	float y;
	float z;
	
	public PaddleModel(float h, float w, float x, float y, float z){
		this.x = x;
		this.y = y;
		this.z = z;
		height = h;
		width = w;
	}
	
	public boolean collision(BallModel ball){
		float xMin = x-width;
		float xMax = x+width;
		float yMin = y-height;
		float yMax = y+height;
		if(Math.abs(z-ball.z)<=ball.radius){
			return isBetween(xMin, xMax, ball.x) && 
					isBetween(yMin, yMax, ball.y);
		}
		return false;
	}
	
	public static boolean isBetween(float v1, float v2, float v){
		return (v>=v1&&v<=v2) || (v<=v1&&v>=v2);
	}

}

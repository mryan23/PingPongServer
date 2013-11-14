package com.pingpong.test.model;

public class GameUpdate {
	public Coordinate ballLocation=new Coordinate();
	public Coordinate ballVelocity=new Coordinate();
	public Coordinate ballAcceleration=new Coordinate();
	public Coordinate paddle1Location=new Coordinate();
	public Coordinate paddle2Location=new Coordinate();
	public Coordinate paddle1Rotation=new Coordinate();
	public Coordinate paddle2Rotation=new Coordinate();
	public boolean wallHit;
	public boolean paddleHit;
	
	public class Coordinate{
		public float x;
		public float y;
		public float z;
	}

}

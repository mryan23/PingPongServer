package com.pingpong.test.model;

import java.util.ArrayList;
import java.util.Timer;
import java.util.TimerTask;

import com.google.gson.Gson;
import com.pingpong.test.PingPongWebSocket;

public class TestGame extends GameModel{
	public PaddleModel paddle1, paddle2;
	Gson gson = new Gson();
	public BallModel ball;
	public int p1Score, p2Score;
	public TestGame(){
		paddle1=new PaddleModel(8, 0, 0, 50);
		paddle2=new PaddleModel(8,0,0,-50);
		ball=new BallModel(1,0,0,0);
		ball.setVelocity(.5f,1,1);
		started = false;
		sockets = new ArrayList<PingPongWebSocket>();
		p1Score = 0;
		p2Score = 0;
	}
	
	/*public void start(){
		timer=new Timer();
		timer.scheduleAtFixedRate(new TimerTask(){

			@Override
			public void run() {
				ball.move();
				if(paddle1.collision(ball) || paddle2.collision(ball)){
					ball.setVelocity(ball.velx, ball.vely, -1*ball.velz);
				}
				if(ball.x<-25||ball.x>25){
					ball.setVelocity(-1*ball.velx, ball.vely, ball.velz);
				}
				if(ball.y<-25||ball.y>25){
					ball.setVelocity(ball.velx,-1*ball.vely, ball.velz);
				}
				for(PingPongWebSocket ws:sockets)
					ws.sendMessage(getMessage());
			}
			
		}, 500, 25);
		started =true;
	}*/
	
	public void movePaddle(int paddleNum, float x, float y){
		if(paddleNum==1){
			paddle1.x=x;
			paddle1.y=y;
		}else if(paddleNum==2){
			paddle2.x=x;
			paddle2.y=y;
		}
	}
	/*public void stop(){
		timer.cancel();
		started = false;
	}*/
	
	/*public boolean isStarted(){
		return started;
	}
	
	public void addWebSocket(PingPongWebSocket ws){
		sockets.add(ws);
		System.out.println(sockets.size());
	}
	public void removeWebSocket(PingPongWebSocket ws){
		sockets.remove(ws);
	}*/
	
	public String getMessage(){
		/*String result="";
		result+=ball.x;
		result+=" ";
		result+=ball.y;
		result+=" ";
		result+=ball.z;
		result+=" ";
		result+=paddle1.x;
		result+=" ";
		result+=paddle1.y;
		result+=" ";
		result+=paddle2.x;
		result+=" ";
		result+=paddle2.y;
		result+=" ";
		result+=System.currentTimeMillis();*/
		
		GameUpdate update=new GameUpdate();
		update.ballLocation.x=ball.x;
		update.ballLocation.y=ball.y;
		update.ballLocation.z=ball.z;
		update.ballVelocity.x=ball.velx;
		update.ballVelocity.y=ball.vely;
		update.ballVelocity.z=ball.velz;
		update.paddle1Location.x=paddle1.x;
		update.paddle1Location.y=paddle1.y;
		update.paddle1Location.z=paddle1.z;
		update.paddle2Location.x=paddle2.x;
		update.paddle2Location.y=paddle2.y;
		update.paddle2Location.z=paddle2.z;
		update.wallHit=false;
		update.paddleHit=false;
		
		return gson.toJson(update);
	}

	@Override
	public boolean isReady() {
		// TODO Auto-generated method stub
		return false;
	}

	public void update(){
		ball.move();
		if(paddle1.collision(ball) || paddle2.collision(ball)){
			ball.setVelocity(ball.velx, ball.vely, -1*ball.velz);
		}
		if((ball.x<-25||ball.x>25)&&(ball.z<50&&ball.z>-50)){
			ball.setVelocity(-1*ball.velx, ball.vely, ball.velz);
		}
		if((ball.y<-25||ball.y>25)&&(ball.z<50&&ball.z>-50)){
			ball.setVelocity(ball.velx,-1*ball.vely, ball.velz);
		}
		
		// Out of bounds reset (should never happen)
		if(ball.z>100||ball.z<-100){
			ball.z = 0;
			ball.x = 0;
			ball.y = 0;
			ball.setVelocity((float)Math.random(), (float)Math.random(), (float)Math.random());
		}
		
		if (ball.z>(50 + (3* ball.radius))) {
			// Player 2 scored!
			// We will reset the ball and give it random velocity
			
			p2Score++;
			
			ball.z = 0;
			ball.x = 0;
			ball.y = 0;
			ball.setVelocity((float)Math.random(), (float)Math.random(), (float)Math.random());
		} else if (ball.z<(-50 - (3* ball.radius))) {
			// Player 1 scored!
			// We will reset the ball and give it random velocity
			
			p1Score++;
			
			ball.z = 0;
			ball.x = 0;
			ball.y = 0;
			ball.setVelocity((float)Math.random(), (float)Math.random(), (float)Math.random());
		}
		
		postMessage(getMessage());
		//for(PingPongWebSocket ws:sockets)
			//ws.sendMessage(getMessage());
	}

}

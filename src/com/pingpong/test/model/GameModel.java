package com.pingpong.test.model;

import java.util.ArrayList;
import java.util.Queue;
import java.util.Timer;
import java.util.TimerTask;
import java.util.concurrent.ConcurrentLinkedQueue;

import com.pingpong.test.PingPongWebSocket;

public abstract class GameModel{
	ArrayList<PingPongWebSocket> sockets=new ArrayList<PingPongWebSocket>();
	public Timer timer;
	boolean started = false;
	int period=25;
	private String[] names={"Player1","Player2"};
	
	Thread webSocketThread;
	Queue<String> messageQueue;
	
	public GameModel(){
		messageQueue = new ConcurrentLinkedQueue<String>();
		webSocketThread = new Thread(new Runnable(){

			@Override
			public void run() {
				String message;
				System.out.println(Thread.currentThread().getName());
				while(true&&!Thread.interrupted()){
					message = messageQueue.poll();
					if(message!=null){
						for(PingPongWebSocket ws:sockets){
							ws.sendMessage(message);
						}
					}
					
				}
				
			}
			
		});
		webSocketThread.start();
		
	}
	public void addWebSocket(PingPongWebSocket ws){
		sockets.add(ws);
	}
	public void removeWebSocket(PingPongWebSocket ws){
		sockets.remove(ws);
	}
	public abstract boolean isReady();
	public boolean isStarted(){
		return started;
	}
	public void start(){
		timer = new Timer();
		timer.scheduleAtFixedRate(new TimerTask(){

			@Override
			public void run() {
				update();
				
			}
			
		}, 500, this.getPeriod());
		started = true;
	}
	public void stop(){
		timer.cancel();
		webSocketThread.interrupt();
		started = false;		
	}
	public abstract void movePaddle(int paddleNum, float x, float y);
	public abstract void update();
	public void setPeriod(int period){
		this.period = period;
	}
	public int getPeriod(){
		return period;
	}
	public void postMessage(String message){
		messageQueue.add(message);
	}
	public int numberWebSockets(){
		return sockets.size();
	}
	public String getName(int playerNum){
		return names[playerNum-1];
	}
	public void setName(int playerNum, String name)
	{
		names[playerNum-1]=name;
	}
}
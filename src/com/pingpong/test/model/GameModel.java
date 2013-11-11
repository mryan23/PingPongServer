package com.pingpong.test.model;

import java.util.ArrayList;
import java.util.Timer;
import java.util.TimerTask;

import com.pingpong.test.PingPongWebSocket;

public abstract class GameModel{
	ArrayList<PingPongWebSocket> sockets=new ArrayList<PingPongWebSocket>();
	public Timer timer;
	boolean started = false;
	int period=25;
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
		timer.scheduleAtFixedRate(this.getTimerTask(), 500, this.getPeriod());
		started = true;
	}
	public void stop(){
		timer.cancel();
		started = false;
	}
	public abstract void movePaddle(int paddleNum, float x, float y);
	public abstract TimerTask getTimerTask();
	public void setPeriod(int period){
		this.period = period;
	}
	public int getPeriod(){
		return period;
	}
}
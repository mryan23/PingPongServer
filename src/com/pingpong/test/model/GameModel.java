package com.pingpong.test.model;

import java.util.ArrayList;
import java.util.Queue;
import java.util.Timer;
import java.util.TimerTask;
import java.util.concurrent.ConcurrentLinkedQueue;

import com.google.gson.Gson;
import com.pingpong.test.PingPongWebSocket;

public abstract class GameModel {
	ArrayList<PingPongWebSocket> sockets = new ArrayList<PingPongWebSocket>();
	public Timer timer;
	boolean started = false;
	int period = 25;
	Gson gson = new Gson();
	Thread webSocketThread;
	Queue<String> messageQueue;
	private GameUpdate prevSentUpdate;

	public GameModel() {
		messageQueue = new ConcurrentLinkedQueue<String>();
		webSocketThread = new Thread(new Runnable() {

			@Override
			public void run() {
				String message;
				System.out.println(Thread.currentThread().getName());
				while (true && !Thread.interrupted()) {
					message = messageQueue.poll();
					if (message != null) {
						for (PingPongWebSocket ws : sockets) {
							ws.sendMessage(message);
						}
					}

				}

			}

		});
		webSocketThread.start();

	}

	public void addWebSocket(PingPongWebSocket ws) {
		sockets.add(ws);
	}

	public void removeWebSocket(PingPongWebSocket ws) {
		sockets.remove(ws);
	}

	public abstract boolean isReady();

	public boolean isStarted() {
		return started;
	}

	public void start() {
		timer = new Timer();
		timer.scheduleAtFixedRate(new TimerTask() {

			@Override
			public void run() {
				update();

			}

		}, 500, this.getPeriod());
		started = true;
	}

	public void stop() {
		timer.cancel();
		webSocketThread.interrupt();
		started = false;
	}

	public abstract void movePaddle(int paddleNum, float x, float y);

	public abstract void update();

	public void setPeriod(int period) {
		this.period = period;
	}

	public int getPeriod() {
		return period;
	}

	public void postMessage(GameUpdate update) {
		boolean send = false;
		if (prevSentUpdate == null) {
			prevSentUpdate = update;
			send = true;
		}
		if(!prevSentUpdate.ballVelocity.equals(update.ballVelocity)){
			send=true;
		} else if(!prevSentUpdate.paddle1Location.equals(update.paddle1Location)||
				!prevSentUpdate.paddle2Location.equals(update.paddle2Location)){
			send=true;
		}
		if (send) {
			prevSentUpdate = update;
			messageQueue.add(gson.toJson(update));
		}
	}

	public int numberWebSockets() {
		return sockets.size();
	}
}
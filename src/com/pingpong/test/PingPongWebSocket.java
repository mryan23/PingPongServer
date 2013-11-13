package com.pingpong.test;

import java.io.IOException;

import org.eclipse.jetty.websocket.WebSocket.OnTextMessage;

import com.pingpong.test.model.GameModel;

public class PingPongWebSocket implements OnTextMessage {

	Connection connection;
	Long open,close;
	GameModel game;
	float y=0;
	float z=0;
	int dir=1;
	
	public PingPongWebSocket(GameModel g){
		game = g;
	}
	@Override
	public void onClose(int arg0, String arg1) {
		// TODO Auto-generated method stub
	
		System.out.println("ON CLOSE");
		System.out.println(System.currentTimeMillis()-open);
		game.removeWebSocket(this);
		if(game.numberWebSockets()==0&&game.isStarted()){
			game.stop();
			
		}
			
		//if(game.isStarted())
			//game.stopGame();
	}

	@Override
	public void onOpen(Connection arg0) {
		// TODO Auto-generated method stub
		System.out.println("ON OPEN");
		this.connection = arg0;
		open =System.currentTimeMillis();
		//game = new GameModel();
		game.addWebSocket(this);
		if(!game.isStarted()){
			game.start();
		}
	}

	@Override
	public void onMessage(String arg0){
		// TODO Auto-generated method stub
		/*System.out.println(arg0);
		try {
			connection.sendMessage(y+" "+z);
			if(y<-20||y>20)
				dir*=-1;
			y+=dir;
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}*/
		
	}
	
	public void sendMessage(String message){
		try {
			connection.sendMessage(message);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}

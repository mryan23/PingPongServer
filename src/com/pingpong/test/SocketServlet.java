package com.pingpong.test;

import javax.servlet.http.HttpServletRequest;

import org.eclipse.jetty.websocket.WebSocket;
import org.eclipse.jetty.websocket.WebSocketServlet;

import com.pingpong.test.model.GameModel;

public class SocketServlet extends WebSocketServlet {
	

	@Override
	public WebSocket doWebSocketConnect(HttpServletRequest arg0, String arg1){
		// TODO Auto-generated method stub
		String gameId=arg0.getParameter("gameId");
		System.out.println(gameId);
		if(!PingPongWebServer.games.containsKey(gameId))
			return null;
		GameModel game =PingPongWebServer.games.get(gameId);
		return new PingPongWebSocket(game);
	}

}

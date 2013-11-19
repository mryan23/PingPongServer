package com.pingpong.test;

import java.io.IOException;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.pingpong.test.model.GameModel;

public class UserNameServlet extends HttpServlet {
	
	static Gson gson = new Gson();
	
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException{
		int gameId = Integer.parseInt(req.getParameter("gameId"));
		GameModel game = PingPongWebServer.games.get(gameId+"");
		Response response = new Response();
		response.player1=game.getName(1);
		response.player2=game.getName(2);
		resp.setContentType("application/json");
		resp.getWriter().write(gson.toJson(response));
	}
	
	protected void doPost(HttpServletRequest req, HttpServletResponse resp){
		int gameId=Integer.parseInt(req.getParameter("gameId"));
		int playerNum=Integer.parseInt(req.getParameter("playerNum"));
		String name=req.getParameter("name");
		GameModel game = PingPongWebServer.games.get(gameId+"");
		game.setName(playerNum, name);
	}
	
	private class Response{
		public String player1;
		public String player2;
	}

}

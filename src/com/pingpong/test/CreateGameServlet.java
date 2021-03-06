package com.pingpong.test;

import java.io.BufferedReader;
import java.io.IOException;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.pingpong.test.model.GameModel;
import com.pingpong.test.model.TestGame;

public class CreateGameServlet extends HttpServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	public static Gson gson = new Gson();

	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {

		StringBuffer jb = new StringBuffer();
		String line = null;
		try {
			BufferedReader reader = req.getReader();
			while ((line = reader.readLine()) != null)
				jb.append(line);
		} catch (Exception e) { /* report an error */
		}
		String str = jb.toString();
		System.out.println(str);
		Request request = gson.fromJson(str, Request.class);
		System.out.println(request.numPlayers + " " + request.gameType);
		int gameId;
		do {
			gameId = (int) (Math.random() * 9000)+1000;
		} while (PingPongWebServer.games.containsKey(gameId + ""));
		GameModel game = new TestGame();
		Response response = new Response();
		response.gameId = gameId;
		response.playerNum = (int) (Math.random() * request.numPlayers) + 1;
		response.gameType = request.gameType;

		if (request.userName != null) {
			game.setName(response.playerNum, request.userName);
		}

		PingPongWebServer.games.put(gameId + "", game);
		resp.getWriter().write(gson.toJson(response));
	}

	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		int gameId = Integer.parseInt(req.getParameter("gameId"));
		Response response = new Response();
		response.gameId = gameId;
		response.playerNum = 2;
		resp.getWriter().write(gson.toJson(response));
	}

	private class Request {
		public int numPlayers;
		public int gameType;
		public String userName;
	}

	private class Response {
		public int gameId;
		public int playerNum;
		public int gameType;
	}
}

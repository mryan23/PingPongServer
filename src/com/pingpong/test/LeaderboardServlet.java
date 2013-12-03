package com.pingpong.test;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Vector;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

public class LeaderboardServlet extends HttpServlet {
	
	static Gson gson = new Gson();
	
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
		
		Vector<String> scores = getUserScores();
		
		Response response = new Response();
		response.result = scores;
		
		resp.setContentType("application/json");
		resp.getWriter().write(gson.toJson(response));
	}

	public static Vector<String> getUserScores() {
		Vector<String> resultVector = new Vector<String>();
		
		Connection c = PingPongWebServer.database_;
		
		PreparedStatement stmt;
		try {
			stmt = c.prepareStatement("SELECT * FROM class ORDER BY score DESC;");
			ResultSet result = stmt.executeQuery();
			while (result.next()) {
				String name = result.getString("username");
				int score = result.getInt("score");
				int wins = result.getInt("wins");
				int losses = result.getInt("losses");
				resultVector.add(name + " " + String.valueOf(score) + " " + String.valueOf(wins) + "/" + String.valueOf(losses));
			}
			result.close();
			stmt.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return resultVector;
	}
	
	private class Response {
		Vector<String> result;
	}
}

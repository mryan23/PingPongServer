package com.pingpong.test;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import javax.servlet.http.HttpServlet;

import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.webapp.WebAppContext;

import com.pingpong.test.model.GameModel;
import com.pingpong.test.model.TestGame;
import com.pingpong.test.udp.UdpThread;

public class PingPongWebServer extends HttpServlet {
	
	public static Map<String,GameModel> games;
	public static Connection database_;

	public static void main(String[] args) throws Exception {
		games = new ConcurrentHashMap<String,GameModel>();
		//game = new TestGame();
		Thread t = new Thread(new UdpThread(games));
		t.start();
		Server server = new Server(8080);
		
		try {
			System.out.println("connect to database");
			Class.forName("org.sqlite.JDBC");
			database_ = DriverManager.getConnection("jdbc:sqlite:leaderboard.db");
			
			createTable(database_);
		}
		catch (Exception e) {
			System.err.println(e.getClass().getName() + ": " + e.getMessage());
		}
		
		WebAppContext context = new WebAppContext();
		context.setWar("war");
		context.setContextPath("/");
		server.setHandler(context);
		server.start();
		server.join();
	}
	
	public static void createTable (Connection c) throws SQLException {
		System.out.println("Creating table");
		Statement stmt = c.createStatement();
		String sql = "CREATE TABLE IF NOT EXISTS class " 
				+ "(id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL," 
				+ " username TEXT NOT NULL, "
				+ " password TEXT NOT NULL, "
				+ "score INT NOT NULL)";
		stmt.executeUpdate(sql);
		stmt.close();
	}
	
	public static void updateScores(String player1, String player2, int p1Score, int p2Score) {
		int p1New = 0;
		int p2New = 0;
		
		try {
			PreparedStatement stmt = database_.prepareStatement("SELECT * FROM class WHERE username=?");
			stmt.setString(1, player1);
			ResultSet result = stmt.executeQuery();
			while (result.next()) {
				String name = result.getString("username");
				if (player1.matches(name)) {
					p1New = result.getInt("score");
				}
			}
			result.close();
			stmt.close();
			
			stmt = database_.prepareStatement("UPDATE class SET score=? WHERE username=?");
			stmt.setInt(1, p1New + p1Score);
			stmt.setString(2, player1);
			stmt.executeUpdate();
			stmt.close();
			
			stmt = database_.prepareStatement("SELECT * FROM class WHERE username=?");
			stmt.setString(1, player2);
			ResultSet rs = stmt.executeQuery();
			while (rs.next()) {
				String name = rs.getString("username");
				if (player2.matches(name)) {
					p2New = rs.getInt("score");
				}
			}
			result.close();
			stmt.close();
			
			stmt = database_.prepareStatement("UPDATE class SET score=? WHERE username=?");
			stmt.setInt(1, p2New + p2Score);
			stmt.setString(2, player2);
			stmt.executeUpdate();
			stmt.close();
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
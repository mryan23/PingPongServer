package com.pingpong.test;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class SignUpServlet extends HttpServlet {
	
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
		
		String username = req.getParameter("username");
		String password = req.getParameter("password");
	
		Boolean result = signUpUser(username, password);
		
		//Send result back
        resp.setContentType("text/xml; charset=UTF-8");
        resp.setStatus(HttpServletResponse.SC_OK);
        resp.getWriter().write("<?xml version=1.0 encoding=UTF-8?>");
        
        String success = "";
        if (result) {
        	success = "Success";
        }
        else {
        	success = "Username already in use";
        }
		
		resp.getWriter().write("<login>");
        resp.getWriter().write("<result>" + success + "</result>");
        resp.getWriter().write("<username>" + username + "</username>");
        resp.getWriter().write("<password>" + password + "</password>");
        resp.getWriter().write("</login>");
	}
	
	public static Boolean signUpUser(String username, String password) {
		
		Connection c = PingPongWebServer.database_;
		
		try {
			PreparedStatement stmt = c.prepareStatement("SELECT * FROM class WHERE username=?");
			stmt.setString(1, username);
			ResultSet result = stmt.executeQuery();
			while (result.next()) {
				String name = result.getString("username");
				if (username.matches(name)) {
					return false;
				}
			}
			result.close();
			stmt.close();
			
			Statement myStatment = c.createStatement();
			String sql = "INSERT INTO class (username,password,score) "
					+"VALUES ('" + username + "', '" + password + "', 0);";
			myStatment.executeUpdate(sql);
			myStatment.close();
			
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return true;
	}
}

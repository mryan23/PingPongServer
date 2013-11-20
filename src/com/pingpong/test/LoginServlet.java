package com.pingpong.test;

import java.io.IOException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

public class LoginServlet extends HttpServlet {
	
	static Gson gson = new Gson();
	
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
		
		String username = req.getParameter("username");
		String password = req.getParameter("password");
		String hashPassword = null;
		
		MessageDigest md;
		try {
			md = MessageDigest.getInstance("SHA-256");
			md.update(password.getBytes());
			 
	        byte byteData[] = md.digest();
	 
	        //convert the byte to hex format
	        StringBuffer sb = new StringBuffer();
	        for (int i = 0; i < byteData.length; i++) {
	        	sb.append(Integer.toString((byteData[i] & 0xff) + 0x100, 16).substring(1));
	        }
	        
	        hashPassword = sb.toString();
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}
        
		Boolean result = logInUser(username, hashPassword);
        
        String success = "";
        if (result) {
        	success = "Success";
        }
        else {
        	success = "Incorrect username or password";
        }
		
        Response response = new Response();
        response.username = username;
        response.password = password;
        response.result = success;
        
        resp.setContentType("application/json");
		resp.getWriter().write(gson.toJson(response));
	}
	
	public static Boolean logInUser(String username, String password) {
		
		Connection c = PingPongWebServer.database_;
		
		try {
			PreparedStatement stmt = c.prepareStatement("SELECT * FROM class WHERE username=?");
			stmt.setString(1, username);
			ResultSet result = stmt.executeQuery();
			while (result.next()) {;
				String name = result.getString("username");
				String passphrase = result.getString("password");
				if (username.matches(name) && password.matches(passphrase)) {
					return true;
				}
			}
			result.close();
			stmt.close();	
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return false;
	}
	
	private class Response {
		public String username;
		public String password;
		public String result;
	}

}

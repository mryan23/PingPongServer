package com.pingpong.test;

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

	public static void main(String[] args) throws Exception {
		games = new ConcurrentHashMap<String,GameModel>();
		//game = new TestGame();
		Thread t = new Thread(new UdpThread(games));
		t.start();
		Server server = new Server(8080);
		

		WebAppContext context = new WebAppContext();
		context.setWar("war");
		context.setContextPath("/");
		server.setHandler(context);
		server.start();
		server.join();
	}

}
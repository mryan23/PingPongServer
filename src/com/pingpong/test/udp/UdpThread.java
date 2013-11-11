package com.pingpong.test.udp;

import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.SocketException;
import java.util.Map;

import com.pingpong.test.model.GameModel;

public class UdpThread implements Runnable{
	
	private Map<String,GameModel> games;
	private DatagramSocket serverSocket;
	
	public UdpThread(Map<String,GameModel> g){
		games = g;
	}

	@Override
	public void run() {
		try {
			serverSocket = new DatagramSocket(6789);
		} catch (SocketException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
			return;
		}
		System.out.println("UDP");
		
		while (true) {
			byte[] receiveData = new byte[1024];
			try {
				DatagramPacket receivePacket = new DatagramPacket(receiveData,
						receiveData.length);
				serverSocket.receive(receivePacket);
				
				String str ="";
				for(int i = 0; i < receiveData.length; i++){
					if(receiveData[i]!=0)
						str+=(char)receiveData[i];
					else
						break;
				}
				System.out.println("RECIEVED: "+str);
				String[] strs = str.split(" ");
				String id=strs[0];
				if(strs.length >=3){
					int paddleNum = Integer.parseInt(strs[1]);
					float x = Float.parseFloat(strs[2]);
					float y=Float.parseFloat(strs[3]);
					GameModel game = games.get(id);
					System.out.println(x+" "+y+" "+paddleNum+" "+(game==null));
					game.movePaddle(paddleNum, x,y);
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}

}

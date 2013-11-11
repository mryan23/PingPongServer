import java.net.*;
public class UDPClient{


	public static void main(String[] args){
		try{
			DatagramSocket clientSocket=new DatagramSocket();
			byte[] sendData = new byte[1024];
			sendData=args[0].getBytes();
			InetAddress host = InetAddress.getByName("192.168.1.7");
			DatagramPacket sendPacket = new DatagramPacket(sendData, sendData.length,host, 6789);
			clientSocket.send(sendPacket);
			System.out.println("SENT");
		}catch(Exception e){
			e.printStackTrace();
		}
	
	}

}

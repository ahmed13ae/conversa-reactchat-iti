import useWebSocket from "react-use-websocket";
import { useState, KeyboardEvent,FormEvent, useEffect } from "react";
import { useAuthService } from "../services/AuthServices";
import useCrud from "../hooks/useCrud";
import { WS_ROOT } from "../config";
import { Server } from "../@types/server"


interface Message {
    sender: string;
    content: string;
    timestamp: string;
    attachment?: string; 
  }
const useChatWebSocket = (channelId: string, serverId: string) =>{

  useEffect(() => {
   
    return () => {
      // Close the WebSocket connection
      sendJsonMessage({ type: "disconnect" });
    };
  }, []); // Empty dependency array ensures this effect runs only on unmount
  reconnectInterval: 5000 // 5000 milliseconds (5 seconds)
    const [newMessage, setNewMessage] = useState<Message[]>([]);
    const [message, setMessage] = useState("");
    const { logout, refreshAccessToken } = useAuthService();
    const { fetchData } = useCrud<Server>(
      [],
      `/messages/?channel_id=${channelId}`
    );

    const socketUrl = channelId
    ? `${WS_ROOT}/${serverId}/${channelId}`
    : null;
    
    const [reconnectionAttempt, setReconnectionAttempt] = useState(0);
    const maxConnectionAttempts = 4;
    
    const { sendJsonMessage } = useWebSocket(socketUrl, {
    
      onOpen: async () => {
        try {
          const data = await fetchData();
          if (Array.isArray(data)) {
            setNewMessage(data);
          }
          console.log("Connected!!!");
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      },
      onClose: (event: CloseEvent) => {
        console.log("WebSocket closed with code:", event.code);
        if (event.code === 4001) {
          console.log("Authentication Error");
                    refreshAccessToken().catch((error) => {
            if (error.response && error.response.status === 401) {
              logout();
            }
          });

          // Handle authentication error...
        }
        setReconnectionAttempt((prevAttempt) => prevAttempt + 1);
      },
     
      onError: () => {
        console.log("Error!");
      },
      onMessage: (msg) => {
        const data = JSON.parse(msg.data);
        setNewMessage((prev_msg) => [
          ...prev_msg,
           data.new_message,
        ]);
        setMessage("");
      },
      shouldReconnect: (closeEvent) => {
        if (
          closeEvent.code === 4001 &&
          reconnectionAttempt >= maxConnectionAttempts
        ) {
          setReconnectionAttempt(0);
          return false;
        }
        return true;
      },
      reconnectInterval: 1000,
    });

    return {
        newMessage,
        message,
        setMessage,
        sendJsonMessage
    }

}
export default useChatWebSocket



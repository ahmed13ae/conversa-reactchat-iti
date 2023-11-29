import React, { useState, FormEvent, KeyboardEvent, ChangeEvent } from "react";
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
  useTheme,

} from "@mui/material";
import MessageInterfaceChannels from "./MessageInterfaceChannels";
import Scroll from "./Scroll";
import { useParams } from "react-router-dom";
import { Server } from "../../@types/server.d";
import useChatWebSocket from "../../services/chatService";
import Picker from "emoji-picker-react";
import { EmojiClickData } from "emoji-picker-react";
import AddChannelsButton from "../../pages/AddChannelsButton";

interface SendMessageData {
  type: string;
  message: string;
  [key: string]: any;
}

interface ServerChannelProps {
  data: Server[];
}

interface Message {
  sender: string;
  content: string;
  timestamp: string;
}

const MessageInterface: React.FC<ServerChannelProps> = (props) => {
  const { data } = props;
  const theme = useTheme();



  const { serverId, channelId } = useParams();

  const { newMessage, message, setMessage, sendJsonMessage } = useChatWebSocket(
    channelId || "",
    serverId || ""
  );
  const currentUserInfo = {
    userId: localStorage.getItem("user_id"),
    username: localStorage.getItem("username"),
  };


  const server_name = data?.[0]?.name ?? "Server";

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage();
  };

  const sendMessage = () => {
    sendJsonMessage({
      type: "message",
      message,
    } as SendMessageData);
    
    // Clear the input fields after sending the message
    setMessage("");
  };

  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);

  const onEmojiClick = (
    emoji: EmojiClickData,
    event: React.MouseEvent<Element, MouseEvent>
  ) => {
    setMessage((prevMessage) => prevMessage + emoji?.emoji);
  };

  function formatTimeStamp(timestamp: string): string {
    const date = new Date(Date.parse(timestamp));
    const formattedDate = `${
      date.getMonth() + 1
    }/${date.getDate()}/${date.getFullYear()}`;

    const formattedTime = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    return `${formattedDate} at ${formattedTime}`;
  }

  return (
    <>
      <MessageInterfaceChannels data={data} />
      {channelId == undefined ? (
        <Box
          sx={{
            overflow: "hidden",
            p: { xs: 0 },
            height: `calc(80vh)`,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box sx={{ textAlign: "center" }}>
            <Typography
              variant="h4"
              fontWeight={700}
              letterSpacing={"-0.5px"}
              sx={{ px: 5, maxWidth: "600px" , textAlign:'center', marginLeft:'200px' , paddingBottom:'10px' }}
            >
              Welcome to {server_name}
            </Typography>
            <Typography>
              {data?.[0]?.description ?? "This is our home"}
            </Typography>
            <Typography>
              <AddChannelsButton onServerAdded={() => {}} />
            </Typography>
          </Box>
        </Box>
      ) : (
        <>
           <Box
        sx={{
          overflow: "hidden",
          p: 0,
          height: `calc(100vh - 100px)`,
        }}
      >
        <Scroll>
          <List sx={{ width: "100%", bgcolor: "background.paper" }}>
            {newMessage.map((msg: Message, index: number) => (
              <ListItem
              key={index}
              alignItems="flex-start"
              sx={{
                flexDirection: currentUserInfo.userId === msg.sender ? "row-reverse" : "row",
                backgroundColor: currentUserInfo.userId === msg.sender ? theme.palette.success.main : theme.palette.primary.main,
                borderRadius: "10px",
                margin: "5px",
                p: 1,
                alignSelf: currentUserInfo.userId === msg.sender ? "flex-end" : "flex-start",
              }}
            >
                <ListItemAvatar>
                  <Avatar alt="user image" />
                </ListItemAvatar>
                <ListItemText
                  primaryTypographyProps={{
                    fontSize: "12px",
                    variant: "body2",
                  }}
                  primary={
                    <>
                      <Typography
                        component="span"
                        variant="body1"
                        color="text.primary"
                        sx={{ display: "inline", fontW: 600 }}
                      >
                        {msg.sender}
                      </Typography>
                      <Typography
                        component="span"
                        variant="caption"
                        color="textSecondary"
                      >
                        {" at "}
                        {formatTimeStamp(msg.timestamp)}
                      </Typography>
                    </>
                  }
                  secondary={
                    <>
                      <Typography
                        variant="body1"
                        style={{
                          overflow: "visible",
                          whiteSpace: "normal",
                          textOverflow: "clip",
                        }}
                        sx={{
                          display: "inline",
                          lineHeight: 1.2,
                          fontWeight: 400,
                          letterSpacing: "-0.2px",
                        }}
                        component="span"
                        color="text.primary"
                      >
                        {msg.content}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Scroll>
      </Box>

          <Box sx={{ position: "sticky", bottom: 0, width: "100%" }}>
            <form
              onSubmit={handleSubmit}
              style={{
                bottom: 0,
                right: 0,
                padding: "1rem",
                backgroundColor: theme.palette.background.default,
                zIndex: 1,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <TextField
                  fullWidth
                  multiline
                  value={message}
                  minRows={1}
                  maxRows={4}
                  onKeyDown={handleKeyDown}
                  onChange={(e) => setMessage(e.target.value)}
                  sx={{ flexGrow: 1 }}
                  placeholder="Type a message..."
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: "29%",
                    right: 25,
                    zIndex: 2,
                    fontSize: "20px",
                    marginRight: "5px",
                  }}
                >
                  {showEmojiPicker && (
                    <Picker onEmojiClick={onEmojiClick as any} />
                  )}
                  <button
                    type="button"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  >
                    {showEmojiPicker ? "😊" : "😊"}
                  </button>
                </div>
              </Box>
            </form>
          </Box>
        </>
      )}
    </>
  );
};

export default MessageInterface;


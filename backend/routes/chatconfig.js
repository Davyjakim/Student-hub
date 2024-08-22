const { Server } = require("socket.io");
const { authMessage } = require("../middleware/authMessage");
const { Messages } = require("../models/message");
module.exports = function (Chatserver) {
  const io = new Server(Chatserver, {
    cors: {
      origin: "http://localhost:3000", // Corrected the URL
      methods: ["GET", "POST"],
    },
  });
  io.use(authMessage);

  try {
    io.on("connection", async (socket) => {
      let chatRoomMessage;
      console.log(`userId ${socket.id}`);
      socket.on("connect_error", (err) => {
        console.error(`Connection error due to ${err}`);
      });
      socket.on("join_room", async (data) => {
        socket.join(data);
        chatRoomMessage = await Messages.findOne({ chatRoom: data });
      });
      
      socket.on("requestChatList",async(data)=>{
        
       const chatlist = await Messages.findOne({chatRoom:data})
         
          if (!chatlist) {
            console.log('No chat room found for:', data);
            socket.emit("chatList", []);
            return;
          }
          socket.emit("chatList",chatlist.messagelist)
        
      })

      socket.on("send_message", async (messageData) => {
        try {
          chatRoomMessage.messagelist.push({
            SentBy: messageData.SentBy,
            ReceivedBy: messageData.ReceivedBy,
            content: messageData.content,
            isAudio: messageData.isAudio,
            duration:messageData.duration,
            timestamp: messageData.timestamp,
          });
          const saveMessage = await chatRoomMessage.save();

          
          

          if (saveMessage) {
            console.log("message saved")
            const saved = {
              SentBy: messageData.Sentby,
              ReceivedBy: messageData.ReceivedBy,
              content: messageData.content,
              isAudio: messageData.isAudio,
              duration:messageData.duration,
              timestamp: messageData.timestamp,
            };
            socket.to(messageData.Room).emit("receive_message", saved);
          }
        } catch (error) {
          console.log(error);
        }
      });

      socket.on("disconnect", () => {
        console.log("user Disconnected", socket.id);
      });
    });
  } catch (error) {
    console.log(error);
  }
};

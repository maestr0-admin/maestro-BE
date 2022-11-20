import { Socket } from "socket.io";
import ISocketUser from "../types/SocketUser";

let users: ISocketUser[] = [];
const addUser = (senderId: string, socketId: string) => {
  !users.some((user) => user.senderId === senderId) &&
    users.push({ senderId, socketId });
};
const removeUser = (socketId: string) => {
  users = users.filter((user) => user.socketId !== socketId);
};
const getUser = (userId: string): ISocketUser | undefined => {
  return users.find((user) => user.senderId === userId);
};

export default function socket(io: Socket) {
  io.on("connection", (socket) => {
    console.log("connected");
    //connect
    socket.on("addUser", (senderId: string) => {
      console.log("addUser", senderId);
      addUser(senderId, socket.id);
    });

    //send message
    socket.on("sendMessage", (data: ISocketUser & { receiverId: string }) => {
      console.log("sendMessage", data);
      const user = getUser(data.receiverId);
      if (user) io.to(user.socketId).emit("getMessage", data);
    });

    //disconnect
    socket.on("disconnect", () => {
      console.log("disconnected");
      removeUser(socket.id);
    });
  });
}

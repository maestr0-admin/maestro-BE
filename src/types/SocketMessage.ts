interface SocketMessage {
  sender: string;
  receiver: string;
  message: string;
  messageRoomId: string;
  createdAt: string;
}

export default SocketMessage;

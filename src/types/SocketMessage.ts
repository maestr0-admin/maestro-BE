interface SocketMessage {
  senderId: string;
  recevierId: string;
  message: string;
  messageRoomId: string;
  createdAt: string;
}

export default SocketMessage;

import IEntity from "./Entity";
interface IMessage extends IEntity {
  id: string;
  messageRoomId: string;
  message?: string;
  sender: string;
  receiver: string;
  image?: string;
  video?: string;
  audio?: string;
}

export default IMessage;

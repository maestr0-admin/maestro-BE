import IEntity from "./Entity";

interface IMessageRoom extends IEntity {
  id: string;
  participants: string[];
  createdAt: Date;
}
export default IMessageRoom;

// 1. Create an interface representing a document in MongoDB.
interface IUser {
  name: string;
  phoneNumber: string;
  type: "athlete" | "brand";
  avatar?: string;
}
export default IUser;

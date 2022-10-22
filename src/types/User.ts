// 1. Create an interface representing a document in MongoDB.
interface IUser {
  uid: string;
  name: string;
  phoneNumber?: string;
  email?: string;
  type: "athlete" | "brand";
  avatar?: string;
}
export default IUser;


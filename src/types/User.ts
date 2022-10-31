import IEntity from "./Entity";
// 1. Create an interface representing a document in MongoDB.
interface IUser extends IEntity {
  uid: string;
  name: string;
  gender: "male" | "female";
  phoneNumber?: string;
  email?: string;
  type: "athlete" | "brand";
  avatar?: string;
  profileId: string;
  favoriteAthletes?: string[];
}
export default IUser;

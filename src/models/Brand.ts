import { Schema, model } from "mongoose";
import IBrandProfile from "../types/BrandProfile";

const brandSchema = new Schema<IBrandProfile>({
  email: { type: String },
  description: { type: String },
  location: { type: String },
  size: { type: String },
  tags: { type: [String] },
  backgroundPicture: { type: String },
  profileLogo: { type: String },
});

const Brand = model<IBrandProfile>("Brand", brandSchema);

export default Brand;

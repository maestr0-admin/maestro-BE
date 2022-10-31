import { Schema, model, connect } from "mongoose";
import IAthleteProfile from "./../types/AthleteProfile";
import IStat from "./../types/Stat";
import ISocialMedia from "./../types/SocialMedia";

const statSchema = new Schema<IStat>({
  name: { type: String, required: true },
  value: { type: String, required: true },
});

const socialSchema = new Schema<ISocialMedia>({
  link: { type: String, required: true },
  followerCount: { type: String, required: true },
});

const athleteSchema = new Schema<IAthleteProfile>({
  type: { type: String, required: true },
  rating: { type: Number, required: true },
  shopLink: { type: String, required: true },
  profileLink: { type: String },
  description: { type: String, required: true },
  hometown: { type: String, required: true },
  school: { type: String, required: true },
  marketability: { type: String, required: true },
  reach: { type: String, required: true },
  tags: { type: [String], required: true },
  instagram: { type: [socialSchema], required: true },
  tiktok: { type: [socialSchema], required: true },
  twitter: { type: [socialSchema], required: true },
  youtube: { type: [socialSchema], required: true },
  stats: [statSchema],
  skillsAndInterests: { type: [String], required: true },
  backgroundImage: { type: String, required: true, default:"https://i.stack.imgur.com/l60Hf.png"},
});

const Athletes = model<IAthleteProfile>("Athlet", athleteSchema);

export default Athletes;

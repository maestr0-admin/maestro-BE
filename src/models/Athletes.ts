import { Schema, model, connect } from "mongoose";
import IAthleteProfile from "./../types/AthleteProfile";


const athletSchema = new Schema<IAthleteProfile>({
  id: { type: String, required: true, unique: true },
  type: { type: String, required: true },
  rating: { type: Number, required: true },
  shopLink: { type: String, required: true },
  profileLink: { type: String },
  description: { type: String, required: true },
  hometown: { type: String, required: true },
  school: { type: String, required: true },
  marketability: { type: String, required: true },
  reach: { type: String, required: true },
  tags:{type:[String],required:true},
  instagram: { type: String, required: true },
  tiktok:{type:String,required:true},
  twitter:{type:String,required:true},
  youtube:{type:String,required:true},
  stats:{type:[String],required:true},
  skillsAndInterests:{type:[String],required:true},
backgroungImage:{type:String,required:true}

});

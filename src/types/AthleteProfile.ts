import IStat from "./Stat";
import ISocialMedia from "./SocialMedia";

interface IAthleteProfile {
  type: "elite" | "select" | "recruit";
  rating: number;
  shopLink?: string;
  profileLink?: string;
  description: string;
  hometown: string;
  school: string;
  marketability?: string; // TODO: make this is a required field
  reach?: string; // TODO: make this is a required field
  tags?: string[]; // TODO: make this is a required field
  instagram?: ISocialMedia;
  tiktok?: ISocialMedia;
  twitter?: ISocialMedia;
  youtube?: ISocialMedia;
  stats: IStat[];
  skillsAndInterests?: string[]; // TODO: make this is a required field
  sport?: string; // TODO: make this is a required field
  backgroundImage?: string; // TODO: make this is a required field
}

export default IAthleteProfile;

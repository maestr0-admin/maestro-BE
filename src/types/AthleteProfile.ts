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
  marketability?: string;
  reach?: string;
  tags?: string[];
  instagram?: ISocialMedia;
  tiktok?: ISocialMedia;
  twitter?: ISocialMedia;
  youtube?: ISocialMedia;
  stats: IStat[];
  skillsAndInterests?: string[];
  backgroundImage?: string;
}

export default IAthleteProfile;


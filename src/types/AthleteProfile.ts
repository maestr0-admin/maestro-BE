import IStat from "./Stat";

interface IAthleteProfile {
  id: string;
  type: "elite" | "select" | "recruit";
  rating:number;
  shopLink: string;
  profileLink?: string;
  description: string;
  hometown: string;
  school:string;
  marketability: string;
  reach: string;
  tags: string[];
  instagram: string;
  tiktok:string;
  twitter:string;
  youtube:string;
  stats: IStat[];
  skillsAndInterests: string[];
  backgroungImage:string;
}

export default IAthleteProfile;

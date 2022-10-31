import IEntity from './Entity';

interface IBrandProfile extends IEntity {
  id: string;
  phoneNumber: string;
  type: string;
  description: string;
  location: string;
  size: string;
  tags: string[];
  backgroundPicture: string;
  profileLogo: string;
}

export default IBrandProfile;

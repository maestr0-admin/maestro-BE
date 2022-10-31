interface IDeliverable {
    deliverableNumber: number;
    type: number;
    date: Date;
    description: string;
    completed: boolean;
    picture: string;
    completionText: string;
  }
  
  export default IDeliverable;
  
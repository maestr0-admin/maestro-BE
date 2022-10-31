interface IContract {
    id: string;
    athleteId: string;
    brandId: string;
    deliverables: object[];
    state: "awaiting-approvel" | "pending" | "active" | "completed";
    budget: number;
  }
  
  export default IContract;
  
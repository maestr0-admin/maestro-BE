import { NextFunction, Request, Response } from "express";
import Contract from "../models/Contract";
import IContract from "../types/Contract";

class ContractController {
  async createContract(req: Request<{}, IContract, IContract>, res: Response) {
    try {
      const contract = req.body;
      const newContract = await Contract.create(contract);
      res.status(200).json({
        id: newContract._id,
        athleteId: newContract.athleteId,
        brandId: newContract.brandId,
        deliverables: newContract.deliverables,
        state: newContract.state,
        budget: newContract.budget,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

export default new ContractController();

import { NextFunction, Request, Response } from "express";
import Contract from "../models/Contract";
import User from "../models/User";
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

  async getUserContracts(req: Request, res: Response) {
    try {
      const { uid } = res.locals.user;
      const user = await User.findOne({ uid });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      //find user contracts and find athelete info with athleteId and add athlete info to each contract object
      const contracts = await Contract.find({
        $or: [{ athleteId: user._id }, { brandId: user._id }],
      });

      const contractsWithAthleteInfo = await Promise.all(
        contracts.map(async (contract) => {
          const athlete = await User.findById({
            _id: contract.athleteId,
          });
          return {
            ...contract.toObject(),
            id: contract._id,
            athlete: {
              name: athlete?.name,
              email: athlete?.email,
            },
          };
        })
      );

      return res.status(200).json(contractsWithAthleteInfo);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

export default new ContractController();

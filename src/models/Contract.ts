import { Schema, model } from "mongoose";
import IBrandProfile from "../types/BrandProfile";
import IContract from "../types/Contract";

const contractSchema = new Schema<IContract>({
  athleteId: {
    type: String,
    ref: "Athlete",
    required: true,
  },
  brandId: {
    type: String,
    ref: "Brand",
    required: true,
  },
  deliverables: {
    type: [Object],
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  budget: {
    type: Number,
    required: true,
  },
});

const Contract = model<IContract>("Contract", contractSchema);

export default Contract;

import { Request, Response } from "express";
import Brand from "../models/Brand";
import IBrandProfile from "../types/BrandProfile";

class BrandController {
  async getBrand(req: Request<{ id: string }, IBrandProfile>, res: Response) {
    try {
      const { id } = req.params;
      const brand = await Brand.findById(id);
      if (!brand) {
        return res.status(404).json({ message: "Brand not found" });
      }

      return res.status(200).json({
        id: brand._id,
        email: brand.email,
        description: brand.description,
        location: brand.location,
        size: brand.size,
        tags: brand.tags,
        backgroundPicture: brand.backgroundPicture,
        profileLogo: brand.profileLogo,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async createBrand(
    req: Request<{}, IBrandProfile, IBrandProfile>,
    res: Response
  ) {
    try {
      const brand = req.body;
      const newBrand = await Brand.create(brand);
      res.status(200).json(newBrand);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async deleteBrand(req: Request<{ id: string }>, res: Response) {
    try {
      const { id } = req.params;
      await Brand.findByIdAndDelete(id);
      res.status(200).json({ message: "Brand deleted successfully" });
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async updateBrand(
    req: Request<{ id: string }, IBrandProfile, IBrandProfile>,
    res: Response
  ) {
    try {
      const { id } = req.params;
      const brand = req.body;
      const newBrand = await Brand.findByIdAndUpdate(id, brand, { new: true });
      if (!newBrand)
        return res.status(404).json({ message: "Brand not found" });

      res.status(200).json({
        id: newBrand._id,
        email: newBrand.email,
        description: newBrand.description,
        location: newBrand.location,
        size: newBrand.size,
        tags: newBrand.tags,
        backgroundPicture: newBrand.backgroundPicture,
        profileLogo: newBrand.profileLogo,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async uploadBackgroundPicture(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { file } = req;

      if (!id || !file)
        return res.status(400).json({ message: "Missing id or file" });

      const brand = await Brand.findByIdAndUpdate(
        id,
        // @ts-ignore
        { backgroundPicture: file.location },
        { new: true }
      );

      if (!brand) return res.status(404).json({ message: "Brand not found" });

      res.status(200).json({
        id: brand._id,
        email: brand.email,
        description: brand.description,
        location: brand.location,
        size: brand.size,
        tags: brand.tags,
        backgroundPicture: brand.backgroundPicture,
        profileLogo: brand.profileLogo,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async uploadProfileLogo(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { file } = req;

      if (!id || !file)
        return res.status(400).json({ message: "Missing id or file" });

      const brand = await Brand.findByIdAndUpdate(
        id,
        // @ts-ignore
        { profileLogo: file.location },
        { new: true }
      );

      if (!brand) return res.status(404).json({ message: "Brand not found" });

      res.status(200).json({
        id: brand._id,
        email: brand.email,
        description: brand.description,
        location: brand.location,
        size: brand.size,
        tags: brand.tags,
        backgroundPicture: brand.backgroundPicture,
        profileLogo: brand.profileLogo,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

export default new BrandController();

import { Request, Response } from "express";
import * as Yup from "yup";
import Orphanage from "../models/Orphanage";
import orphanageView from "../views/orphanages_view";
import { AppDataSource } from "../database/connection";

export default {
  async index(req: Request, res: Response) {
    const orphanageRepository = AppDataSource.getRepository(Orphanage);
    const orphanages = await orphanageRepository.find({
      relations: { images: true },
    });
    return res.json(orphanageView.renderMany(orphanages));
  },

  async show(req: Request, res: Response) {
    const { id } = req.params;
    const orphanageRepository = AppDataSource.getRepository(Orphanage);

    try {
      const orphanage = await orphanageRepository.findOneOrFail({
        where: { id: Number(id) },
        relations: { images: true },
      });
      return res.json(orphanageView.render(orphanage));
    } catch {
      return res.status(404).json({ message: "Orphanage not found" });
    }
  },

  async create(req: Request, res: Response) {
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
    } = req.body;

    const orphanageRepository = AppDataSource.getRepository(Orphanage);

    const requestImages = req.files as Express.Multer.File[];
    
    const images = requestImages.map((image) => {
      return { path: image.filename };
    });

    const data = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends : open_on_weekends === "true",
      images,
    };

    const orphanageSchema = Yup.object().shape({
      name: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().max(300).required(),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.boolean().required(),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required(),
        }),
      ).required(),
    });

    await orphanageSchema.validate(data, {
      abortEarly: false,
    });

    const orphanage = orphanageRepository.create(data);

    await orphanageRepository.save(orphanage);

    return res.status(201).json(orphanageView.render(orphanage));
  },
};

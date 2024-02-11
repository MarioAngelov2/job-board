import { Request, Response, NextFunction } from "express";
import Joi, { Schema } from "joi";

export const addJobSchema = Joi.object({
  company: Joi.string().required(),
  jobTitle: Joi.string().required(),
  location: Joi.string().required(),
  employmentType: Joi.string().required(),
  salaryRange: Joi.string().required(),
  salaryType: Joi.string(),
  seniorityLevel: Joi.string().required(),
  seniorityType: Joi.string(),
  tasks: Joi.string().required(),
  requirements: Joi.array().items(Joi.string()).required(),
  benefits: Joi.array().items(Joi.string()),
  companyLogo: Joi.object(),
  aboutUs: Joi.string()
});

export const jobValidation =
  (schema: Schema) => (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  };

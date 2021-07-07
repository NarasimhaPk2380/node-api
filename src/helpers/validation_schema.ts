import joi from "joi";

export const bookSchema = joi.object({
  name: joi.string().required(),
  author: joi.array().items(joi.string()).required(),
  price: joi.string().required(),
  publisher: joi
    .object({
      publisher_id: joi.string().required(),
      name: joi.string().required(),
      location: joi.string().required(),
    })
    .required(),
});

export const reviewSchema = joi.object({
  reviewer: joi.string().required(),
  message: joi.string().required(),
});

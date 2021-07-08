import { NextFunction, Request, Response } from "express";
import oktaClientService from "../../services/okta-client.service";
import { Unauthorized, BadRequest } from "http-errors";
import logger from "../../loaders/logger";
import Joi from "joi";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let cookiesSessionId = req.headers.cookie
    ?.split(";")
    .find((item) => item.includes("sessionid"));
  if (cookiesSessionId) {
    cookiesSessionId = cookiesSessionId.split("=")[1];
    const sessionData = await oktaClientService.getSessionBySessionId(
      cookiesSessionId,
      next
    );
    if (sessionData?.userId) {
      next();
    } else {
      logger.error("Unauthorized");
      next(
        new Unauthorized("Please login with the okta user, else register user")
      );
    }
  } else {
    logger.error("Sessionid is not provided");
    next(new BadRequest("Please provide sessionid in the cookie"));
  }
};

export const joiValidation =
  (schema: Joi.ObjectSchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      const errorsText = error.details.map((x) => x.message).join(", ");
      logger.error(errorsText);
      next(new BadRequest(`Validation error: ${errorsText}`));
    } else {
      next();
    }
  };

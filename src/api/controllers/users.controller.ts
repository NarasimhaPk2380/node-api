import { NextFunction, Request, Response } from "express";
import oktaClientService from "../../services/okta-client.service";
import logger from "../../loaders/logger";
import { ILoginData, IRegisterData } from "../../interfaces/IUser";
export default {
  registerOktaUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.debug("Register Okta User Api invoked");
      await oktaClientService.register(req.body as IRegisterData);
      logger.debug("Okta User is created ");
      return res
        .json({
          statusCode: 200,
          message: "Okta user has been created. Now you can login",
        })
        .status(200);
    } catch (e) {
      logger.error(e.message);
      next(e);
    }
  },
  loginOktaUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.debug("Login Okta User Api invoked");
      const sessionData = await oktaClientService.sessionLogin(
        req.body as ILoginData
      );
      logger.debug("Logged in and user session is created ");
      return res.json(sessionData).status(200);
    } catch (e) {
      logger.error(e.message);
      next(e);
    }
  },
};

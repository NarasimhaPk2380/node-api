import { Router } from "express";
import {
  loginUserSchema,
  regiserUserSchema,
} from "../../helpers/validation_schema";
import usersController from "../controllers/users.controller";
import { joiValidation } from "../middlewares/auth";

const router = Router();
export default (app: Router) => {
  app.use("/oktauser", router);
  router.post(
    "/register",
    joiValidation(regiserUserSchema),
    usersController.registerOktaUser
  );
  router.post(
    "/login",
    joiValidation(loginUserSchema),
    usersController.loginOktaUser
  );
};

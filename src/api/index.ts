import { Router } from "express";
import books from "./routes/books";
import users from "./routes/users";

export default () => {
  const app = Router();
  books(app);
  users(app);
  return app;
};

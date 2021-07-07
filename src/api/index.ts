import { Router } from "express";
import books from "./routes/books";

export default () => {
  const app = Router();
  books(app);
  return app;
};

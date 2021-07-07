import { Router, Request, Response } from "express";
import booksController from "../controllers/books.controller";

const router = Router();
export default (app: Router) => {
  app.use("/books", router);
  router.get("/", booksController.getBooks);
  router.get("/:book_id", booksController.getBookDetails);
  router.get("/:book_id/reviews", booksController.getBookReviews);
  router.get("/:book_id/reviews/:review_id", booksController.getBookReview);

  router.post("/", booksController.createBook);
  router.post("/:book_id/reviews", booksController.createBookReview);

  router.put("/:book_id", booksController.updateBook);
  router.put("/:book_id/reviews/:review_id", booksController.updateBookReview);

  router.delete("/:book_id", booksController.deleteBook);
  router.delete(
    "/:book_id/reviews/:review_id",
    booksController.deleteBookReview
  );
};

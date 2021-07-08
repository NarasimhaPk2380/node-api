import { Router } from "express";
import { authMiddleware, joiValidation } from "../middlewares/auth";
import booksController from "../controllers/books.controller";
import { bookSchema, reviewSchema } from "../../helpers/validation_schema";

const router = Router();
export default (app: Router) => {
  app.use("/books", authMiddleware, router);
  router.get("/", booksController.getBooks);
  router.get("/:book_id", booksController.getBookDetails);
  router.get("/:book_id/reviews", booksController.getBookReviews);
  router.get("/:book_id/reviews/:review_id", booksController.getBookReview);

  router.post("/", joiValidation(bookSchema), booksController.createBook);
  router.post(
    "/:book_id/reviews",
    joiValidation(reviewSchema),
    booksController.createBookReview
  );

  router.put(
    "/:book_id",
    joiValidation(bookSchema),
    booksController.updateBook
  );
  router.put(
    "/:book_id/reviews/:review_id",
    joiValidation(reviewSchema),
    booksController.updateBookReview
  );

  router.delete("/:book_id", booksController.deleteBook);
  router.delete(
    "/:book_id/reviews/:review_id",
    booksController.deleteBookReview
  );
};

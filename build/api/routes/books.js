"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_1 = require("../middlewares/auth");
var books_controller_1 = __importDefault(require("../controllers/books.controller"));
var validation_schema_1 = require("../../helpers/validation_schema");
var router = express_1.Router();
exports.default = (function (app) {
    app.use("/books", auth_1.authMiddleware, router);
    router.get("/", books_controller_1.default.getBooks);
    router.get("/:book_id", books_controller_1.default.getBookDetails);
    router.get("/:book_id/reviews", books_controller_1.default.getBookReviews);
    router.get("/:book_id/reviews/:review_id", books_controller_1.default.getBookReview);
    router.post("/", auth_1.joiValidation(validation_schema_1.bookSchema), books_controller_1.default.createBook);
    router.post("/:book_id/reviews", auth_1.joiValidation(validation_schema_1.reviewSchema), books_controller_1.default.createBookReview);
    router.put("/:book_id", auth_1.joiValidation(validation_schema_1.bookSchema), books_controller_1.default.updateBook);
    router.put("/:book_id/reviews/:review_id", auth_1.joiValidation(validation_schema_1.reviewSchema), books_controller_1.default.updateBookReview);
    router.delete("/:book_id", books_controller_1.default.deleteBook);
    router.delete("/:book_id/reviews/:review_id", books_controller_1.default.deleteBookReview);
});

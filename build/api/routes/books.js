"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var books_controller_1 = __importDefault(require("../controllers/books.controller"));
var router = express_1.Router();
exports.default = (function (app) {
    app.use("/books", router);
    router.get("/", books_controller_1.default.getBooks);
    router.get("/:book_id", books_controller_1.default.getBookDetails);
    router.get("/:book_id/reviews", books_controller_1.default.getBookReviews);
    router.get("/:book_id/reviews/:review_id", books_controller_1.default.getBookReview);
    router.post("/", books_controller_1.default.createBook);
    router.post("/:book_id/reviews", books_controller_1.default.createBookReview);
    router.put("/:book_id", books_controller_1.default.updateBook);
    router.put("/:book_id/reviews/:review_id", books_controller_1.default.updateBookReview);
    router.delete("/:book_id", books_controller_1.default.deleteBook);
    router.delete("/:book_id/reviews/:review_id", books_controller_1.default.deleteBookReview);
});

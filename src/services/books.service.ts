import { Book as BookI, Review as ReviewI } from "../interfaces/IBook";
import Book from "../models/books.model";
import Review from "../models/review.model";
export default {
  getBooks: () => {
    try {
      return Book.find({}).populate("reviews");
    } catch (e) {
      throw new Error(e.message);
    }
  },
  createBook: async (bookData: BookI) => {
    try {
      const book = new Book(bookData);
      return book.save();
    } catch (e) {
      throw new Error(e.message);
    }
  },
  getBookDetails: async (bookId: string) => {
    try {
      return Book.findById(bookId);
    } catch (e) {
      throw new Error(e.message);
    }
  },
  updateBook: async (bookId: string, bookData: BookI) => {
    try {
      return Book.findByIdAndUpdate(bookId, {
        ...bookData,
      });
    } catch (e) {
      throw new Error(e.message);
    }
  },
  deleteBook: async (bookId: string) => {
    try {
      return Book.findByIdAndDelete(bookId);
    } catch (e) {
      throw new Error(e.message);
    }
  },

  getBookReviews: (bookId: string) => {
    try {
      return Book.findById(bookId, "reviews").populate("reviews");
    } catch (e) {
      throw new Error(e.message);
    }
  },
  createBookReview: async (bookId: string, reviewData: ReviewI) => {
    try {
      const book = await Book.findById(bookId);
      const review = new Review(reviewData);
      await review.save();
      book?.reviews.push(review);
      return book?.save();
    } catch (e) {
      throw new Error(e.message);
    }
  },
  getBookReview: async (reviewId: string) => {
    try {
      return Review.findById(reviewId);
    } catch (e) {
      throw new Error(e.message);
    }
  },
  updateBookReview: async (
    bookId: string,
    reviewId: string,
    reviewData: ReviewI
  ) => {
    try {
      return Review.findByIdAndUpdate(reviewId, {
        ...reviewData,
      });
    } catch (e) {
      throw new Error(e.message);
    }
  },
  deleteBookReview: async (bookId: string, reviewId: string) => {
    try {
      return Review.findByIdAndDelete(reviewId);
    } catch (e) {
      throw new Error(e.message);
    }
  },
};

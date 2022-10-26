import express from 'express'
import asyncHandler from 'express-async-handler'
const router = express.Router()
import Book from '../models/bookModel.js'

// @desc    Fetch all books
// @route   GET /api/books
// @access  Public
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const books = await Book.find({})
    res.json(books)
  })
)

// @desc    Fetch single book
// @route   GET /api/books/:id
// @access  Public
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id)

    if (book) {
      res.json(book)
    } else {
      res.status(404)
      throw new Error('Book not found')
    }
  })
)

export default router
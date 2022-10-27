import asyncHandler from 'express-async-handler'
import Book from '../models/bookModel.js'

// @desc    Fetch all books
// @route   GET /api/books
// @access  Public
const getBooks = asyncHandler(async (req, res) => {
  const Books = await Book.find({})

  res.json(Books)
})

// @desc    Fetch single book
// @route   GET /api/Books/:id
// @access  Public
const getBookById = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id)

  if (book) {
    res.json(book)
  } else {
    res.status(404)
    throw new Error('Book not found')
  }
})

// @desc    Delete a book
// @route   DELETE /api/books/:id
// @access  Private/Admin
const deleteBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id)

  if (book) {
    await book.remove()
    res.json({ message: 'Book removed' })
  } else {
    res.status(404)
    throw new Error('Book not found')
  }
})

export { getBooks, getBookById, deleteBook }
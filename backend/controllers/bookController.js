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

// @desc    Create a book
// @route   POST /api/books
// @access  Private/Admin
const createBook = asyncHandler(async (req, res) => {
  const book = new Book({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    publisher: 'Sample publisher',
    genre: 'Sample genre',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  })

  const createdBook = await book.save()
  res.status(201).json(createdBook)
})

// @desc    Update a book
// @route   PUT /api/books/:id
// @access  Private/Admin
const updateBook = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    publisher,
    genre,
    countInStock,
  } = req.body

  const book = await Book.findById(req.params.id)

  if (book) {
    book.name = name
    book.price = price
    book.description = description
    book.image = image
    book.publisher = publisher
    book.genre = genre
    book.countInStock = countInStock

    const updatedBook = await book.save()
    res.json(updatedBook)
  } else {
    res.status(404)
    throw new Error('Book not found')
  }
})

export { getBooks, getBookById, deleteBook, createBook, updateBook }
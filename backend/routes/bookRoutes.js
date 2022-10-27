import express from 'express'
const router = express.Router()
import {
  getBooks,
  getBookById,
  deleteBook,
  createBook,
  updateBook,
  createBookReview,
  getTopBooks
} from '../controllers/bookController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getBooks).post(protect, admin, createBook)
router.route('/:id/reviews').post(protect, createBookReview)
router.get('/top', getTopBooks)
router
  .route('/:id')
  .get(getBookById)
  .delete(protect, admin, deleteBook)
  .put(protect, admin, updateBook)

export default router
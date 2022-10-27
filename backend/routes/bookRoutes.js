import express from 'express'
const router = express.Router()
import {
  getBooks,
  getBookById,
  deleteBook
} from '../controllers/bookController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getBooks)
router.route('/:id').get(getBookById).delete(protect, admin, deleteBook)

export default router
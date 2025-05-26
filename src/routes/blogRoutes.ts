import express from 'express';
import { createBlog, getAllBlogs } from '../controllers/blogController';
import { protect, adminOnly } from '../middleware/authMiddleware';
import {
  updateBlog,
  deleteBlog,
} from '../controllers/blogController';


const router = express.Router();

router.get('/', getAllBlogs);
router.post('/', protect, adminOnly, createBlog);
router.put('/:id',protect, adminOnly, updateBlog);
router.delete('/:id', protect,adminOnly, deleteBlog);

export default router;

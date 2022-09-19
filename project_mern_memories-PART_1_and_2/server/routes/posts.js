import express from 'express';

import { getPostsBySearch, getPosts, getPost, createPost, updatePost, likePost, deletePost } from '../controllers/posts.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

router.get('/', getPosts);
router.get('/search', auth, getPostsBySearch);
router.get('/:id', getPost);
router.post('/', auth, createPost);
router.get('/:id', auth, getPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);

export default router;

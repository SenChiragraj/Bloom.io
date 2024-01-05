import express from "express";
import { addComment, getAllBlogs } from "../controller/CommentController.js";
import isAuthenticated from '../middleware/isAuthenticated.js'

const route = express.Router();

route.get('/:blogID', isAuthenticated , getAllBlogs);
route.post('/add',isAuthenticated, addComment);

export default route;
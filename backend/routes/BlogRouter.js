import express, { Router } from "express";
import { addBlog, deleteBlog, getAllBlogs, getBlogById, getCurrentBlog, getCurrentUserBlogs, upDateBlog } from "../controller/BlogController.js";
import isAuthenticated from '../middleware/isAuthenticated.js'

const route = express.Router();

route.get('/all', getAllBlogs);
route.get('/get', isAuthenticated, getCurrentUserBlogs);
route.get('/:id', isAuthenticated, getBlogById);
route.post('/add',isAuthenticated, addBlog);
route.put('/update', isAuthenticated, upDateBlog);
route.delete('/delete', isAuthenticated, deleteBlog);

export default route;
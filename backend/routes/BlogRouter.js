import express, { Router } from "express";
import { addBlog, deleteBlog, getAllBlogs, getBlogById, getCurrentBlog, getCurrentUserBlogs, upDateBlog } from "../controller/BlogController.js";
import isAuthenticated from '../middleware/isAuthenticated.js'

const route = express.Router();

route.get('/all', getAllBlogs);
route.get('/:id', getBlogById);
route.post('/add',isAuthenticated, addBlog);
route.post('/currblog/',isAuthenticated, getCurrentBlog);
route.get('/getblog', isAuthenticated, getCurrentUserBlogs);
route.put('/update', isAuthenticated, upDateBlog);
route.delete('/delete', isAuthenticated, deleteBlog);

export default route;
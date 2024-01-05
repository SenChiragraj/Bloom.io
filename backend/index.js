import express from "express";
import cors from 'cors';

import { connect } from "./data/database/config.js";
import UserRouter from "./routes/UserRouter.js";
import BlogRouter from "./routes/BlogRouter.js";
import CommentRouter from "./routes/CommentRoute.js";
connect();
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(cors({credentials : true,origin : 'http://localhost:3000',}));


app.use('/api/user/', UserRouter);
app.use('/api/user/blog', BlogRouter)
app.use('/api/user/blog/comment', CommentRouter)
// app.use('/api/user/blog',)

app.listen(5000, () => { console.log('Running')})

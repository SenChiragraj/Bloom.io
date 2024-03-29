import express from "express";
import cors from 'cors';
import { configDotenv } from "dotenv";

import { connect } from "./data/database/config.js";
import UserRouter from "./routes/UserRouter.js";
import BlogRouter from "./routes/BlogRouter.js";
import CommentRouter from "./routes/CommentRoute.js";
configDotenv();
connect();
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(cors({credentials : true, origin : process.env.CLIENT_URL,}));


app.use('/api/user/', UserRouter);
app.use('/api/user/blog', BlogRouter)
app.use('/api/user/blog/comment', CommentRouter)
// app.use('/api/user/blog',)

app.listen(process.env.PORT || 5000, () => { console.log('Running on port :', process.env.PORT) });

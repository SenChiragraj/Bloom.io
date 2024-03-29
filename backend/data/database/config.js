import mongoose from "mongoose";

export const connect = () => {
  mongoose.connect(process.env.DB_URL+'/blogger').then(
    console.log('Connected😊')
  )
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
    });
};

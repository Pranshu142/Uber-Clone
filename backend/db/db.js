import mongoose from "mongoose";

const connectionToDatabase = () => {
  mongoose
    .connect(process.env.DB_URL)
    .then(() => {
      console.log("sucessfully connected to database");
    })
    .catch((err) => console.log("error connecting", err));
};

export default connectionToDatabase;
import mongoose from "mongoose";

export default () => {
  const db = process.env.DATABASE_URL as string;

  mongoose
    .connect(db)
    .then(() => console.log(`Connected to mongo db database...`));
};

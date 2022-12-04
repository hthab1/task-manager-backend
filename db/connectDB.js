const mongoose = require("mongoose");

const connectDB = () => {
  return mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("DB is connected!");
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = connectDB;

//basic requirment
require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
//Database connection
const contectToDatabase = require("./DB/connect");
//import middlewares
const { errorHandlerMW } = require("./middleware/error-handler");
//import routes
const loginRouter = require("./routes/login");
const userInfoRouter = require("./routes/user");

//middlewares
app.use(express.json());
app.use("/api/v1", loginRouter);
app.use("/api/v1", userInfoRouter);

//common middlewares
app.use(errorHandlerMW);
//runing project
const listen = async () => {
  try {
    await contectToDatabase(process.env.MONGODB_URL).then(() =>
      console.log("connected to database")
    );
    app.listen(PORT, () => console.log(`app is listening on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};
listen();

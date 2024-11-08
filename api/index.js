import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import { corsOptions } from "../src/config/corsOptions.js";
import { credentials } from "../src/middleware/credentials.js";

import ListEntryRouter from "../src/routes/listentry.js";
import UserRouter from "../src/routes/users.js";

const app = express();

const PORT = process.env.PORT || 3000;
const DBNAME = process.env.DATABASE_NAME;
const APPNAME = process.env.APP_NAME;
const CLUSTERNAME = process.env.CLUSTER_NAME;
const DBUSERNAME = process.env.DATABASE_USERNAME;
const DBPASSWORD = process.env.DATABASE_PASSWORD;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use(credentials); //use in deployment to block any sites other than allowed origins
app.use(cors(corsOptions));
app.use(cookieParser());
app.use("/api/users", UserRouter);
app.use("/api/listentries", ListEntryRouter);

mongoose.set("strictQuery", false);
mongoose
  .connect(
    `mongodb+srv://${DBUSERNAME}:${DBPASSWORD}@${CLUSTERNAME}.lax4b.mongodb.net/${DBNAME}?retryWrites=true&w=majority&appName=${APPNAME}`
  )
  .then(() => {
    console.log("Connected to Database");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

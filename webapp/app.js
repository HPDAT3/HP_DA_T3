const express = require("express");
const cors = require("cors");
const app = express();

require("dotenv").config({ path: __dirname + "/config.env" });

const mongoose = require("mongoose");
// app.use(cookieParser());
app.use(express.json());
app.use(cors());

let mongoUrl_digialpha = process.env["MONGO_URL"];
// mongoUrl_digialpha+="/DigiAlpha"

if (!mongoUrl_digialpha) {
  // No mongourl is defined, use default database
  mongoUrl_digialpha = "mongodb+srv://Piyush:ginniferpep123@cluster0.ewfh1.mongodb.net/SaaS_Metrics";
}

console.log("Mongo Url using",mongoUrl_digialpha);

const companyRouter = require("./routes/Company");
app.use("/company", companyRouter);
const formRouter = require("./routes/Form");
app.use("/form", formRouter);
const tableRouter = require("./routes/Table");
app.use("/table", tableRouter);
mongoose
.connect(mongoUrl_digialpha, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Database Connected Successfully"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
app.listen(PORT, () => {
  console.log("Express Server Started");
});

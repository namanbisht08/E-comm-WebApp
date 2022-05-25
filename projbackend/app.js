require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//middleware defined
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());

//My Routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");

//my routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);

//databse connection enstablished
// mongoose
//   .connect(process.env.DATABASE_NAME, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//   })
//   .then(() => {
//     console.log("DB CONNECTED");
//   })
//   .catch(() => console.log("Ooops FAIL TO MAKE A CONNECTION WITH DB....!!!"));

mongoose
  .connect(process.env.MONGO_ATLAS_CLOUD, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch(() => console.log("Ooops FAIL TO MAKE A CONNECTION WITH DB....!!!"));

//starting server
const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});

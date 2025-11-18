const express = require("express");
const errorHandler = require("./middleware/errorhandler");
const connectDb = require("./config/dbConnection");
const app = express();
const dotenv = require("dotenv").config();
connectDb();
app.use(express.json());
const port = process.env.PORT || 5069;

app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);
app.listen(port, () => {
  console.log(`server running on ${port}`);
});

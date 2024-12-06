const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");

dotenv.config();

const app = express();

app.use(bodyParser.json());

app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server đang chạy trên cổng ${PORT}`);
});
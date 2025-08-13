require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 6600;
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const taskRoute = require("./routes/taskRoute");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "Stage 1-2 Task Server" });
});

app.use("/api/auth", authRoutes);
app.use("/api/task", taskRoute);

app.use((req, res) => {
  res.status(404).json({ success: false, message: "ROUTE NOT FOUND" });
});

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, { dbName: "task" });
    app.listen(PORT, () => {
      console.log(`App is running on Port: ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};
startServer();

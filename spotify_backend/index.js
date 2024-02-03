// npm init: package.json -- This is a node project
// npm i express: expressJs package install hogya. -- project came to know that we are using express
// we finally use express

const connectToMongo = require("./db");
const express = require("express");
const authRoutes = require("./routes/auth");
const songRoutes = require("./routes/song");
const playlistRoutes = require("./routes/playlist");
connectToMongo();
const app = express();
const cors = require("cors");
const port = 5000;
app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/song", songRoutes);
app.use("/playlist", playlistRoutes);
app.listen(port, () => {
  console.log(` backend listening on port ${port}`);
});

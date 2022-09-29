require("dotenv").config();
const express = require("express");
const userRoute = require("./api/users/user.route")
const app = express();
app.use(express.json())
app.get("/api/users",userRoute)
app.get("/api", (req, res) => {
  res.json({
    sucess: 1,
    message: "This rest api is working",
  });
});

app.listen(process.env.APP_PORT, () => {
  console.log("Server is up and running", process.env.APP_PORT );
});
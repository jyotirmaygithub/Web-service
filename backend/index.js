const connectToMongo = require("./config/db");
const express = require("express");
const cors = require("cors");

// connect with database
connectToMongo();

const app = express();

// port number.
const port = 7000;

app.use(cors());
// we are using middleware to convert raw json data into js object. 
app.use(express.json());

// available routes in the project
app.use("/api/user", require("./routes/user"));

app.listen(port, () => {
  console.log(`user-backend is working on port number :  ${port}`);
});

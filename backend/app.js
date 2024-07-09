const express = require("express");
const cors = require("cors");
const tasksRouter = require("./routes/tasks");
const authRouter = require("./routes/auth");
const useAuth = require("./middlewares/authMiddleware");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
app.use(useAuth);
app.use("/tasks", tasksRouter);



app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

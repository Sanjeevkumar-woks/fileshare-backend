const express = require("express");
const cors=require('cors')
const app = express();

const PORT = 9000 || process.env.PORT;

const connectDB = require("./config/db");
connectDB();
app.use(express.json())
app.use(cors());
app.use("/api/files", require("./routes/files"));
app.use("/files/download", require("./routes/download"));
app.use("/files/login", require("./routes/login"));


app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

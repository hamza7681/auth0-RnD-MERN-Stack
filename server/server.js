const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

app.use(require("./routes/routes"));

app.listen(5000, () => console.log("server is running on port", 5000));

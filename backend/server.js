const express = require("express");
const cors = require("cors");
const connectDatabase = require("./config/database");
// require("dotenv").config();

const PORT = process.env.PORT || 5000;

const routes = ["auth", "room"];

const app = express();

(async function () {
  await connectDatabase();
})();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

routes.forEach(route => {
  app.use(`/api/${route}`, require(`./routes/${route}`));
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

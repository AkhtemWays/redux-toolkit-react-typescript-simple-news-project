const express = require("express");
const cors = require("cors");
const app = express();
const parser = require("body-parser");

var allowedOrigins = ["http://localhost:3000", "http://yourapp.com"];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin
      // (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          "The CORS policy for this site does not " +
          "allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use("/api/user/", require("./routes/user.routes"));
app.use("/api/news/", require("./routes/news.routes"));
app.use("/api/comments/", require("./routes/comments.routes"));
app.use("/api/users/", require("./routes/users.routes"));

const PORT = 5000;
app.listen(PORT, () => console.log(`app has been started at port ${PORT}`));

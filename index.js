const express = require("express");

const cookieParser = require("cookie-parser");

const path = require("path");

const PORT = 8000;

const staticRoute = require("./routes/staticRouter");

const { checkForAuthentication, restrictTo } = require("./middleware/auth")

const { restrictLoggedInUser, checkAuth } = require("./middleware/auth");

const app = express();

const urlRoute = require("./routes/url");

const connectDb = require("./connection");

const URL = require("./models/url");

const userRoute = require("./routes/user");
// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(checkForAuthentication)
// view engine setup
app.set("view engine", "ejs");
app.set("views", path.join("views"));
// Routes
app.use("/url", restrictTo(['NORMAL' , 'ADMIN']), urlRoute);
app.use("/user", userRoute);
app.use("/",  staticRoute);
// Routes
app.get("/home", (req, res) => {
  return res.render("home");
});
app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
});
// connection
connectDb("mongodb://127.0.0.1:27017/short-url")
  .then(() => console.log("connected with db"))
  .catch((err) => console.error(err));

app.listen(PORT, () => console.log(`server started at port ${PORT}`));

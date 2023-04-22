const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
// const expressLayout = require("express-ejs-layouts");
const dotenv = require("dotenv");
const morgan = require("morgan");
const passport = require("passport");
const { ensureAuth, ensureGuest } = require("./middleware/auth");
const { login } = require("./controller/login");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const connectDB = require("./config/db");
require("./config/passport")(passport);
const User = require("./models/User");
const Appointment = require("./models/Appointment");

dotenv.config({ path: "./config/config.env" });

connectDB();

const app = express();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("dev"));

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
    }),
  })
);

// app.use(expressLayout);
app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");

// app.use((req, res) => {
//   res.status(404).send("<h1>404, Page Not Found</h1>");
// });

app.use(passport.initialize());
app.use(passport.session());
app.use("/", require("./routes/auth"));

const PORT = process.env.PORT || 3000;


app.get("/appointment", async (request, response) => {
  const foundUser = request.user;
  const appointments = foundUser.appointments;
  appointments.sort((a, b) => a.date - b.date);
  response.render("appointment", { appointments: appointments });
});

app.post("/appointment", async (req, res) => {
  const Founduser = req.user;
  // clg
  try {
    const user = await User.findById(Founduser.id);
    // console.log(freq)

    if (user) {
      const appointmentDateStr = req.body.date;
      const arr = appointmentDateStr.split("/");
      const appointDate = new Date(`${arr[2]}-${arr[1]}-${arr[0]}`);
      // console.log(appointDate);
      var appoint = await Appointment.create({
        ...req.body,
        user: user._id,
        date: appointDate,
      });
      user.appointments.push(appoint._id);

      await user.save();
      res.status(200).redirect("/appointment");
    } else {
      res.status(404).send("User not found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }

  // response.redirect("/appointment");
});
// end of appointment -----

// code of profile

var name, mobile, mail, address, weight, height, gen, BMI, bg;

app.post("/profile", async (request, response) => {
  name = request.body.Name;
  mobile = request.body.phone;
  bg = request.body.blood_grp;
  mail = request.body.Email1;
  address = request.body.address;
  weight = Number(request.body.Weight);
  height = Number(request.body.Height);
  gen = request.body.gender;
  BMI = (weight * 100 * 100) / (height * height);
  BMI = BMI.toFixed(1);

  // console.log("profile", mobile);
  const Founduser = request.user;
  try {
    const user = await User.findById(Founduser.id);

    if (user) {
      user.displayName = name;
      // user.userDetails.mobile = mobile;
      // user.userDetails.bg = bg;
      // user.userDetails.address = address;
      // user.userDetails.weight = weight;
      // user.userDetails.height = height;
      // user.userDetails.gen = gen;
      // user.userDetails.BMI = BMI;
      // user.userDetails.mail = mail;

      var d = {
        weight,
        height,
        gen,
        BMI,
        bg,
        address,
        mail,
        mobile,
      };
      user.userDetails = d;
      await user.save();
      // res.status(200).redirect("/dashboard");
      response.redirect("/profile");
    } else {
      res.status(404).send("User not found");
    }
  } catch (err) {
    console.error(err);
    response.status(500).send("Server Error");
  }
});

app.get("/profile", function (request, response) {
  // console.log(request);
  const foundUser = request.user;
  response.render("profile", { foundUser, userDetails: foundUser.userDetails });
});
// end of profile

// code of dashboard

app.post("/dashboard", async (req, res) => {
  var medname, time, freq;
  medname = req.body.Medicine_name;
  time = req.body.medicine_time;
  freq = req.body.medicine_freq;
  const Founduser = req.user;
  // clg
  const user = await User.findById(Founduser.id);
  // console.log(freq)

  if (user) {
    var d = {
      medname,
      time,
      freq,
    };
    user.details.push(d);

    await user.save();
    res.status(200).redirect("/dashboard");
  } else {
    res.status(404).send("User not found");
  }

  // response.redirect("/dashboard");
});

app.get("/dashboard", ensureAuth, function (request, response) {
  foundUser = request.user;
  response.render("index", { foundUser });
});
// end of dashboard

// code of calorie
var Food = [];
var Calories = [];
var food, calories;
var sum = Number(0);
app.post("/calorie_tracker", async (req, res) => {
  food = req.body.Item;
  calories = Number(req.body.cal);

  const Founduser = req.user;
  // clg
  const user = await User.findById(Founduser.id);

  if (user) {
    var d = {
      food,
      calories,
    };
    sum = sum + calories;

    user.meals.push(d);

    await user.save();
    res.status(200).redirect("/calorie_tracker");
  } else {
    res.status(404).send("User not found");
  }
  // response.redirect("/calorie_tracker");
});

app.get("/calorie_tracker", function (req, res) {
  const foundUser = req.user;
  res.render("calorie", { meals: foundUser.meals, sum: sum });
});
// end of calorie

// for disese
app.get("/disease", function (req, res) {
  res.render("disease.ejs");
});
// end for disese

app.get("/admin", async (req, res) => {
  const currentDate = new Date();

  const upcomingAppointments = await Appointment.find({
    date: { $gte: currentDate },
  }).sort("date");
  console.log(upcomingAppointments);
  res.render("admin.ejs", { appointments: upcomingAppointments });
});

app.listen(PORT, console.log(`Server running on ${PORT}`));

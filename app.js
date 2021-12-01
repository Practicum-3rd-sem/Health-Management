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
      mongoUrl:
        "mongodb+srv://gunjan:wJJsSJViDLiBx2GA@cluster0.vjert.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
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

// code of appointment ----------
var Dates=[];
var Descriptions=[];
var Start_times=[];
var End_times=[];

var Date,Description,Start_time, End_time;

app.get("/appointment",function(request,response){
    response.render("appointment", {DATE: Dates, DESCRIPTION: Descriptions, START_TIME:Start_times, END_TIME:End_times});
});

app.post("/appointment",function(request,response){
    Date=request.body.date;
    Description=request.body.description;
    Start_time=request.body.start_time;
    End_time=request.body.end_time;
    Dates.push(Date);
    Descriptions.push(Description);
    Start_times.push(Start_time);
    End_times.push(End_time);

    response.redirect("/appointment");
});
// end of appointment -----

// code of profile

var name,mobile,mail,address,weight,height,gen,BMI,bg;

app.post("/profile", function(request,response){
  name=request.body.Name;
  mobile=request.body.phone;
  mail=request.body.Email1;
  bg=request.body.blood_grp;
  address=request.body.address;
  weight=Number(request.body.Weight);
  height=Number(request.body.Height);
  gen=request.body.gender;
  BMI=(weight*100*100)/(height*height); 
  BMI=BMI.toFixed(1);   
  response.redirect("/profile");
});

app.get("/profile", function(request,response){
  response.render("profile", {NAME : name, MAIL: mail, WEIGHT: weight, HEIGHT: height, bmi: BMI, BLOOD_GRP: bg});
});
// end of profile

// code of dashboard
var medicines=[];
var times=[];
var frequencies=[];
var medname, time, freq;

app.post("/dashboard", async (req, res) => {
  medname=req.body.Medicine_name;
  time=req.body.medicine_time;
  freq=req.body.medicine_freq;
  const Founduser = req.user;
  // clg
  const user = await User.findById(Founduser.id)
    console.log(freq)

  if(user){
    user.medname.push(medname);
    user.time.push(time);
    user.freq.push(freq);

    await user.save();
    res.status(200).redirect("/dashboard");
  }else{
    res.status(404).send("User not found");
  }

  // response.redirect("/dashboard");
});

app.get("/dashboard",ensureAuth,function(request, response){
  foundUser=request.user;
  response.render("index", {MEDICINES: medicines, TIMES: times, FREQ: frequencies,foundUser});

});
// end of dashboard

// code of calorie
var Food=[];
var Calories=[];
var food,calories;
var sum=Number(0);
app.post("/calorie_tracker",function(request,response){
  food=request.body.Item;
  Food.push(food);
  calories=Number(request.body.cal);
  Calories.push(calories);
  sum=sum+calories;
  response.redirect("/calorie_tracker");
});

app.get("/calorie_tracker", function(request,response){
  response.render("calorie",{FOOD: Food, CALORIES: Calories,SUM:sum});
});
// end of calorie


app.listen(PORT, console.log(`Server running on ${PORT}`));

const path = require("path");
const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const tagsRoutes = require("./routes/tagRoute");
const worksDoneRoutes = require("./routes/worksDoneRoute");
const authRoutes = require("./routes/authRoute");
const mailRoutes = require("./routes/mailRoute");
const offerRoutes = require("./routes/offerRoute");
const offerConditionsRoutes = require("./routes/offerconditionsRoute");

const app = express();

//mongodb://QCDB_admin:N5P=Mqs2H+P6r1f$7{As@mongodb.guebs.net:27017/ch12048_QCDB
mongoose.connect("mongodb://localhost:27017/QCdb", { useNewUrlParser: true , useUnifiedTopology: true })
//mongoose.connect("mongodb+srv://admin:GVb8jDlmoPUrUw8c@cluster0-sujbd.mongodb.net/test?retryWrites=true&w=majority")
.then(() =>{
    console.log('Connected to database');
})
.catch(() => {
    console.log("Error to connected database")
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/documents", express.static(path.join(__dirname, "documents")));
app.use("/", express.static(path.join(__dirname, "angular")));


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
  });
  
app.use("/api/worksdone", worksDoneRoutes);
app.use("/api/tags", tagsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/mail", mailRoutes);
app.use("/api/offer", offerRoutes);
app.use("/api/offerConditionsRoutes", offerConditionsRoutes);
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "angular", "index.html"));
})

module.exports = app;
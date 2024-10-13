const express = require("express")
const path = require('path')
const mongoose= require('mongoose')
const multer = require('multer')
const hbs= require('express-handlebars')
const logger= require('morgan')
const cors = require('cors')
const app =express()
const productRouter = require("./routes/productRouter");

app.use(logger('dev'));
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }));
mongoose.connect("mongodb://127.0.0.1:27017/userauthentication");
app.engine("hbs", hbs.engine({
    extname:"hbs",
    defaultLayout: "layout",
    layoutsDir: __dirname+ "/views/layouts"
  }));
  
  
  app.set("views", path.join(__dirname, "views"));
  app.set("view engine", "hbs");
  app.use(express.static(path.join(__dirname,"public")));
  
  app.use("/", productRouter);
app.listen(3001,()=>{
    console.log("server is running");
})

module.exports = app;
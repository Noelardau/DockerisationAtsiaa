var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors")


// import du model!!

const model = require("./models/lrbbhm")


// router

const categorieRouter = require("./routes/Categorie")
const joueurRouter = require("./routes/Joueur")
const equipeRouter = require("./routes/Equipe")
const tournoiRouter = require("./routes/Tournoi")
const participerRouter = require("./routes/Participer")
const rencontreRouter = require("./routes/Rencontre")
const statRouter = require("./routes/Statistique")
const userRouter = require("./routes/User")
const coachRouter = require("./routes/Coach")

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())


// Les routes
app.use("/api.categorie/",categorieRouter)
   .use("/api.joueur/",joueurRouter)
   .use("/api.joueur/",joueurRouter)
   .use("/api.equipe/",equipeRouter)
   .use("/api.tournoi/", tournoiRouter)
   .use("/api.participer/", participerRouter)
   .use("/api.rencontre/", rencontreRouter)
   .use("/api.stat/", statRouter)
   .use("/api.user/", userRouter)
   .use("/api.coach/", coachRouter)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
 
 res.redirect("/")
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



console.log(require("sequelize"))

module.exports = app;

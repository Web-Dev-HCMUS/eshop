const productsRouter = require("./products");
const detailRouter = require("./detail-product");
const aboutRouter = require("../components/about");
const contactRouter = require("../components/contact");
const loginRouter = require("../components/login");
const homeRouter = require("./home");
const userProfile = require("../components/profile");
const createError = require("http-errors");
const userRouter = require('../components/auth/index')

function route(app){
  app.use('/products', productsRouter);
  app.use('/detail-product', detailRouter);
  app.use('/about', aboutRouter);
  app.use('/contact', contactRouter);
  app.use('/auth', userRouter);
  app.use('/login', loginRouter);
  app.use('/userProfile', userProfile);
  app.use('/', homeRouter);

// catch 404 and forward to error handler
  app.use(function (req, res, next) {
    next(createError(404));
  });

// error handler
  app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
  });

}

module.exports = route;

const createError = require("http-errors");
const productsRouter = require("./products");
const detailRouter = require("../components/detailProduct");
const aboutRouter = require("../components/about");
const contactRouter = require("../components/contact");
const homeRouter = require("../components/home");
const userProfileRouter = require("../components/profile");
const myPurchaseRouter = require("../components/myPurchase");
const userRouter = require("../components/auth/index");
const cartRouter = require("../components/cart/index");
const apiRouter = require("../api/index");
const authMiddleWare = require("../middleware/authMiddleware");
const forgotPassword = require("../components/forgotPassword");

function route(app) {
  app.use("/products", productsRouter);
  app.use("/detail-product", detailRouter);
  app.use("/about", aboutRouter);
  app.use("/contact", contactRouter);
  app.use("/auth", userRouter);
  app.use("/user-profile", authMiddleWare, userProfileRouter);
  app.use("/my-purchase", authMiddleWare, myPurchaseRouter);
  app.use("/forgotPassword", forgotPassword);
  app.use("/cart", cartRouter); //Router for cart
  app.use("/api", apiRouter); //Router for api
  app.use("/", homeRouter);

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

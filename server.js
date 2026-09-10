const express = require("express");

const app = express();
const PORT = 3000;

const logger = (req, res, next) => {
  const currentTime = new Date().toLocaleString();
  console.log(`${req.method} ${req.url} ${currentTime}`);
  next();
};

const responseTimeLogger = (req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const responseTime = Date.now() - start;
    console.log(`Response Time: ${req.method} ${req.url} took ${responseTime}ms`);
  });

  next();
};

app.use(logger);
app.use(responseTimeLogger);

const apiRouter = express.Router();

const routerLogger = (req, res, next) => {
  const currentTime = new Date().toLocaleString();
  console.log(`routerLogger: ${req.method} ${req.url} ${currentTime}`);
  next();
};

apiRouter.use(routerLogger);

apiRouter.get("/students", (req, res) => {
  res.send("Students List");
});

apiRouter.get("/courses", (req, res) => {
  res.send("Courses List");
});

apiRouter.get("/faculty", (req, res) => {
  res.send("Faculty List");
});

app.use("/api", apiRouter);

app.get("/", (req, res) => {
  res.send("Welcome to Home Page");
});

app.get("/about", (req, res) => {
  res.send("About Us");
});

app.get("/contact", (req, res) => {
  res.send("Contact Information");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

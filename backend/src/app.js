const express = require("express");
const usersRouter = require("./routers/users");
require("./mongoose/db/mongoose");

// setting up the express server
const app = express();

//middleware - req n res work is done move to next
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, PATCH, POST, DELETE");
    return res.status(200).json({});
  }
  next();
});

app.use(express.json());
app.use(usersRouter);

module.exports = app;


//Here's what each line of the code does:

/*app.use((req, res, next) => { ... }); sets up middleware to handle requests. Middleware is a function that can modify incoming requests and outgoing responses.
res.header("Access-Control-Allow-Origin", "*"); sets the Access-Control-Allow-Origin header to allow all origins to access this server.
res.header("Access-Control-Allow-Headers", "*"); sets the Access-Control-Allow-Headers header to allow all headers to be sent with requests to this server.
if (req.method === "OPTIONS") { ... } checks if the incoming request is an OPTIONS request. OPTIONS requests are used to determine what HTTP methods are allowed for a particular resource.
res.header("Access-Control-Allow-Methods", "GET, PATCH, POST, DELETE"); sets the Access-Control-Allow-Methods header to allow GET, PATCH, POST, and DELETE requests for this resource.
return res.status(200).json({}); sends an empty JSON object with a status code of 200 to complete the OPTIONS request.
next(); calls the next middleware or route handler.*/

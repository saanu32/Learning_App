 const mongoose = require("mongoose");


// connection to database //mongodb://127.0.0.1:27017/learning-app-easy
mongoose.connect("mongodb://127.0.0.1:27017/learning-app-easy", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  //useCreateIndex: true,
  //useFindAndModify: false // corrected to false, as it is the recommended value
}).then(() => {
  console.log("Connected to MongoDB");
}).catch((error) => {
  console.log("Error connecting to MongoDB:", error);
});









const mongoose = require("mongoose");
const Course = require("../models/courses");
require("./mongoose");

const courseOneObjectID = new mongoose.Types.ObjectId();
const courseTwoObjectID = new mongoose.Types.ObjectId();
const courseThreeObjectID = new mongoose.Types.ObjectId();
const courseFourObjectID = new mongoose.Types.ObjectId();
const courseFiveObjectID = new mongoose.Types.ObjectId();

const courseOne = {
  _id: courseOneObjectID,
  courseName: "Node.js",
  courseDept: "WD",
  description: "Node.js is used to create back-end services",
  duration: 10,
  isRated: true,
  isApplied: true,
  noOfRatings: 15,
  rating: 4.5,
};

const courseTwo = {
  _id: courseTwoObjectID,
  courseName: "React.js",
  courseDept: "WD",
  description: "React.js is used to create front-end services",
  duration: 14,
  isRated: true,
  isApplied: true,
  noOfRatings: 145,
  rating: 4.3,
};

const courseThree = {
  _id: courseThreeObjectID,
  courseName: "Angular",
  courseDept: "WD",
  description: "Angular is used to create front-end services",
  duration: 18,
  isRated: false,
  isApplied: false,
  noOfRatings: 10,
  rating: 4.1,
};

const courseFour = {
  _id: courseFourObjectID,
  courseName: "Machine Learning",
  courseDept: "AI",
  description: "Machine Learning is used in AI",
  duration: 14,
  isRated: true,
  isApplied: true,
  noOfRatings: 145,
  rating: 4.3,
};

const courseFive = {
  _id: courseFiveObjectID,
  courseName: "Springboot",
  courseDept: "WD",
  description: "Springboot is used to create back-end services",
  duration: 12,
  isRated: false,
  isApplied: false,
  noOfRatings: 6,
  rating: 4.4,
};

//The code you provided is already setting up and sending data to a MongoDB database using Mongoose. The setUpDatabase function uses the 
//deleteMany method to delete any existing documents in the Course collection, then saves five new course documents to the collection using the save method.

const setUpDatabase = async () => {
  await Course.deleteMany();
  await new Course(courseOne).save();
  await new Course(courseTwo).save();
  await new Course(courseThree).save();
  await new Course(courseFour).save();
  await new Course(courseFive).save();
  console.log("Database set up complete.");
  await mongoose.disconnect();
};

//setUpDatabase();

setUpDatabase()
  .then(() => console.log("Data sent to MongoDB."))
  .catch((error) => console.error(error));

  

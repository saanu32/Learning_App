const express = require("express");
const Course = require("../mongoose/models/courses");
const { request } = require("../app");

// Setting up the student router 
const usersRouter = new express.Router();

// GET request to fetch all courses
usersRouter.get("/", async (req, res) => {
  try {
    const courses = await Course.find({});
    res.send(courses);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// POST request to update the rating and number of courses
usersRouter.post("/:id", async (req, res) => {
  //const { rating, numCourses } = req.body;
  //const { id } = req.params;
  let id = req.params.id;
  let newRating = req.body.rating;

  try {
    const course = await Course.findById(id);
    if(course.isApplied){
      return res.status(403).send({error:"you have already applied for this course"})
    }
    let enrolled = await Course.findByIdAndUpdate({_id:id}, {isApplied:true},{new:true})
    return res.status(200).send({message:"you have successfully enrolled for the course"})
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// DELETE request to delete/drop a course
usersRouter.delete("/:id", async (req, res) => {
  let id = req.params.id;
  try {
    const course = await Course.findById(id);
    if(course.isApplied){
      let drop = await Course.findByIdAndUpdate({_id:id}, {isApplied:false},{new:true})
      return res.status(200).send({message: "you have dropped the course"})
    }
    return res.status(403).send({error: "you have not enrolled for th course"})
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// PATCH request to update a course
usersRouter.patch("/:id", async (req, res) => {
  let id = req.params.id;
  let newRating = req.body.rating;

  try {
    const course = await Course.findById(id);
    let isRating = course.isRated;

    if(course != null && !isRating){
      let oldRating = course.rating;
      let oldNoRating = course.noOfRatings;
      let result = ((oldNoRating*oldNoRating)+newRating)/(oldNoRating+1)
      let updatedRating = await Course.findByIdAndUpdate({_id:id}, {rating:result, noOfRatings: oldNoRating+1},{new:true})
      return res.status(200).send({message: "you have rated this course"})
    }else if(isRating){
      return res.status(403).send({error:"you have already rated this course"})
    }
    return res.status(400).send({error: "you have not enrolled for this course"})
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

module.exports = usersRouter;

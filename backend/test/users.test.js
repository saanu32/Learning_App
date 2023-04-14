const request = require("supertest");
const app = require("../src/app");
const Course = require("../src/mongoose/models/courses");
const {
  setUpDatabase,
  courseOne,
  courseTwo,
  courseThree,
  courseFour,
  courseFive,
} = require("./utils/testDB");

beforeEach(setUpDatabase);

// User getting all the courses
test("Viewing all the courses", async () => {
  const response = await request(app).get("/courses/get").expect(200);
  expect(response.body.length).toBe(5);
  expect(response.body[0].courseName).toBe(courseOne.courseName);
  expect(response.body[1].courseName).toBe(courseTwo.courseName);
  expect(response.body[2].courseName).toBe(courseThree.courseName);
  expect(response.body[3].courseName).toBe(courseFour.courseName);
  expect(response.body[4].courseName).toBe(courseFive.courseName);
});

// User enrolling for a course
test("Enrolling in a course", async () => {
  await request(app)
    .post(`/courses/enroll/${courseThree.id}`)
    .expect(200);
  const enrolledCourse = await Course.findById(courseThree.id);
  expect(enrolledCourse.isApplied).toBe(true);
});

// User enrolling for an already enrolled course
test("Enrolling in an already enrolled course", async () => {
  await request(app)
    .post(`/courses/enroll/${courseOne.id}`)
    .expect(403);
  const course = await Course.findById(courseOne.id);
  expect(course.isApplied).toBe(true);
});

// User dropping a course
test("Dropping a course", async () => {
  await request(app)
    .post(`/courses/drop/${courseTwo.id}`)
    .expect(200);
  const droppedCourse = await Course.findById(courseTwo.id);
  expect(droppedCourse.isApplied).toBe(false);
});

// User dropping an unenrolled course
test("Dropping an unenrolled course", async () => {
  await request(app)
    .post(`/courses/drop/${courseThree.id}`)
    .expect(403);
  const course = await Course.findById(courseThree.id);
  expect(course.isApplied).toBe(false);
});

// User giving rating to a course
test("Rating a course", async () => {
  await request(app)
    .patch(`/courses/rating/${courseFour.id}`)
    .send({
      rating: 5,
    })
    .expect(200);
  const ratedCourse = await Course.findById(courseFour.id);
  expect(ratedCourse.rating).toBe(4.6);
  expect(ratedCourse.noOfRatings).toBe(courseFour.noOfRatings + 1);
});

// User giving rating to an already rated course
test("Rating an already rated course", async () => {
  await request(app)
    .patch(`/courses/rating/${courseOne.id}`)
    .send({
      rating: 5,
    })
    .expect(403);
});

// User giving rating to a course he has not enrolled in
test("Giving rating to an unenrolled course", async () => {
  await request(app)
    .patch(`/courses/rating/${courseFive.id}`)
    .send({
      rating: 5,
    })
    .expect(403);
});

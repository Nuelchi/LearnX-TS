import { Router } from "express";
import {CourseController} from "../Controllers/course.controller";

const {addCourse, getCourseById, getCourses, updateCourse} = new CourseController
const router = Router();

router.post("/courses", addCourse);
router.get("/courses", getCourses);
router.get("/courses/:id", getCourseById);
router.put("/courses/:id", updateCourse);

export default router;
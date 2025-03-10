import { Router } from "express";
import {CourseController} from "../Controllers/course.controller";
import { Authorization } from "../Authorization/auth.middleware";


const {authUser, payAuth, restriction} = new Authorization
const {addCourse, getCourseById, getCourses, getCourseCategry, updateCourse} = new CourseController
const router = Router();

router.post("/courses", addCourse);
router.get("/courses", authUser,getCourses);
router.get("/courses", authUser,getCourseCategry);
router.get("/courses/:id", authUser,getCourseById);
router.put("/courses/:id", updateCourse);

export default router;
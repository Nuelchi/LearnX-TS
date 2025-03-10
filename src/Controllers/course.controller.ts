import { Request, Response } from "express";
import CourseService from "../Services/course.service";
import { Authorization } from "../Authorization/auth.middleware";

//Auth instance
const {authUser, payAuth} = new Authorization

export class CourseController {
    // Add a new course
    async addCourse(req: Request, res: Response): Promise<void> {
        try {
            const course = await CourseService.addCourse(req.body);
            res.status(201).json({ message: "Course added successfully!", course });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    // Get a course by ID
    async getCourseById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const course = await CourseService.getCourseById(id);

            if (!course) {
                res.status(404).json({ message: "Course not found" });
                return;
            }

            res.status(200).json(course);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    // Get all courses
    async getCourses(req: Request, res: Response): Promise<void> {
        try {
            const { title } = req.query;
            const courses = await CourseService.getCourses(title as string);

            if (!courses.length) {
                res.status(404).json({ message: "No courses found" });
                return;
            }

            res.status(200).json(courses);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
    // Get all courses in a category (backend, frontend etc)
    async getCourseCategry(req: Request, res: Response): Promise<void> {
        try {
            const { category } = req.query;
            const courses = await CourseService.getCourseCategory(category as string);

            if (!courses.length) {
                res.status(404).json({ message: "No courses found" });
                return;
            }

            res.status(200).json(courses);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    // Update a course by ID
    async updateCourse(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const updatedCourse = await CourseService.updateCourse(id, req.body);

            if (!updatedCourse) {
                res.status(404).json({ message: "Course not found, provide a valid ID" });
                return;
            }

            res.status(200).json({ message: "Course updated successfully!", course: updatedCourse });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
}

export default new CourseController();
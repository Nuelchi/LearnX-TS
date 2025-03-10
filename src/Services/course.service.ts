import {Icourse}  from "../Interface/course.interface";
import Course from "../Model/course.model";

export class CourseService {
    // Add a new course
    async addCourse(courseData: Icourse): Promise<Icourse> {
        return await Course.create(courseData);
    }

    // Get a course by ID
    async getCourseById(id: string): Promise<Icourse | null> {
        return await Course.findById(id);
    }

    // Get all courses (optionally filter by title)
    async getCourses(title?: string): Promise<Icourse[]> {
        if (title) {
            return await Course.find({ title: { $regex: new RegExp(title, "i") } });
        }
        return await Course.find({});
    }

     // Get all courses in a category (backend, frontend etc)
    async getCourseCategory(category?: string): Promise<Icourse[]> {
        if (category) {
            return await Course.find({ category: { $regex: new RegExp(category, "i") } });
        }
        return await Course.find({});
    }

    // Update a course by ID
    async updateCourse(id: string, courseData: Partial<Icourse>): Promise<Icourse | null> {
        return await Course.findByIdAndUpdate(id, courseData, { new: true, runValidators: true });
    }
}

export default new CourseService();
import mongoose, { model, Schema } from "mongoose";
import { Icourse } from "../Interface/course.interface";

const courseSchema = new Schema<Icourse>({
    name: {
        type: String,
        required: [true, 'please enter the title of the book'],
        unique: true
    },
    author: {
        type: String,
        required: [true, 'please enter the author']
    },
    category: {
        type: String,
        enum:['backend', 'frontend','artificial intelligence','product design', 'digital marketing', 'business and consulting', 'design and development', 'financial management','marketing and communication'],
        required: [true, 'please enter the category of the course'],
        lowercase: true
    },
    type: {
        type: String,
        enum:['Video','Book'],
        required: [true, 'please enter the type of the course']
    },
    uploadLink: {
        type: String,
        required: [true, 'please enter the course or book upload url']
    },
    quantity: {
        type: Number,
        required: [true, 'please enter the number of copies available']
    },

});

export default mongoose.model("course", courseSchema)
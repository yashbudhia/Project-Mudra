import mongoose, { Schema, Document } from 'mongoose';

interface ICourse extends Document {
    title: string;
    description: string;
    level: string;
    duration: string;
}

const courseSchema = new Schema<ICourse>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    level: { type: String, required: true },
    duration: { type: String, required: true },
});

export default mongoose.model<ICourse>('Course', courseSchema);
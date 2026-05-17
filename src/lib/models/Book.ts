import mongoose, { Schema, Document } from "mongoose";

export interface IBook extends Document {
  title: string;
  author: string;
  description: string;
  category: "Story" | "Tech" | "Science";
  available_quantity: number;
  image_url: string;
}

const BookSchema = new Schema<IBook>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, enum: ["Story", "Tech", "Science"], required: true },
    available_quantity: { type: Number, required: true, default: 1 },
    image_url: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Book || mongoose.model<IBook>("Book", BookSchema);

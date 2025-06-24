import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  excerpt: String,
  coverImage: String,
  tags: [String],
  isPublished: { type: Boolean, default: false },
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  likes: { type: Number, default: 0 },
  views: { type: Number, default: 0 }
}, { timestamps: true }); // Adds createdAt and updatedAt

export default mongoose.models.Blog || mongoose.model("Blog", blogSchema);

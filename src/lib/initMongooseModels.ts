import Blog from "@/models/blogModel";
import User from "@/models/userModel";

export default function initMongooseModels() {
  return { Blog, User }; // forces both models to register
}

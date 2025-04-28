// Import necessary Mongoose functions: Schema creator, model creator, and registered models
import { Schema, model, models } from "mongoose";

// Define the User schema structure
const UserSchema = new Schema(
  {
    // Email field: must be unique and required
    email: {
      type: String,
      unique: [true, "Email already exists"], // Ensures no duplicate emails (handled at MongoDB level)
      required: [true, "Email is required"], // Validation error message if missing
    },
    // Username field: required
    username: {
      type: String,
      required: [true, "Username is required"], // Validation error message if missing
    },
    // Image field: optional profile picture URL
    image: {
      type: String,
    },
    // Bookmarks field: an array of references to "Property" documents
    bookmarks: [
      {
        type: Schema.Types.ObjectId, // References the ID of a Property document
        ref: "Property", // Tells Mongoose to populate from the "Property" model
      },
    ],
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

// Check if the "User" model already exists to prevent OverwriteModelError during hot-reloading
const User = models.User || model("User", UserSchema);

// Export the User model for use elsewhere in the project
export default User;

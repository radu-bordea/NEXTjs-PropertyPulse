// Import necessary Mongoose functions: Schema creator, model creator, and registered models
import { Schema, model, models } from "mongoose";

// Define the User schema structure
const MessageSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    recepient: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    property: {
      type: Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    phone: String,
    body: String,
    read: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

// Check if the "Message" model already exists to prevent OverwriteModelError during hot-reloading
const Message = models.Message || model("Message", MessageSchema);

// Export the Message model for use elsewhere in the project
export default Message;

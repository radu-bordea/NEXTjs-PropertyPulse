// Import the mongoose library for MongoDB interactions
import mongoose from "mongoose";

// Track the connection status
let connected = false;

// Function to connect to the MongoDB database
const connectDB = async () => {
  // Set mongoose to use strict query mode
  mongoose.set("strictQuery", true);

  // If already connected, skip connecting again
  if (connected) {
    console.log("MongoDB is connected");
    return;
  }

  // Attempt to connect to MongoDB
  try {
    await mongoose.connect(process.env.MONGODB_URI); // Use the URI from environment variables
    connected = true; // Set connection status to true on successful connection
    console.log("MongoDB connected successfully");
  } catch (error) {
    // Log any errors if connection fails
    console.log("MongoDB connection error:", error);
  }
};

// Export the connectDB function for use in other parts of the application
export default connectDB;

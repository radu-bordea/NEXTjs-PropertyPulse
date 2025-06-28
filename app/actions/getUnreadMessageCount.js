"use server";

import connectDB from "@/config/database"; // Connect to MongoDB
import Message from "@/models/Message"; // Mongoose model for messages
import { getSessionUser } from "@/utils/getSessionUser"; // Utility to get the logged-in user's session info

async function getUnreadMessageCount() {
  // Establish a database connection
  await connectDB();

  // Retrieve the currently authenticated user from session
  const sessionUser = await getSessionUser();

  // Return an error if the user is not authenticated
  if (!sessionUser || !sessionUser.user) {
    return { error: "User ID is required" };
  }

  const { userId } = sessionUser;

  // Count unread messages for the current user
  const count = await Message.countDocuments({
    recipient: userId,
    read: false,
  });

  // Return the unread message count
  return { count };
}

export default getUnreadMessageCount;

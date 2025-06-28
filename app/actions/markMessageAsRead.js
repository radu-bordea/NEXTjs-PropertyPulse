"use server";

import connectDB from "@/config/database"; // Connect to MongoDB
import Message from "@/models/Message"; // Mongoose model for messages
import { getSessionUser } from "@/utils/getSessionUser"; // Utility to retrieve the current session user
import { revalidatePath } from "next/cache"; // Revalidate the messages page after update

async function markMessageAsRead(messageId) {
  // Establish a database connection
  await connectDB();

  // Get the currently authenticated user from session
  const sessionUser = await getSessionUser();

  // Ensure a valid session and user are present
  if (!sessionUser || !sessionUser.user) {
    throw new Error("User ID is required");
  }

  const { userId } = sessionUser;

  // Retrieve the message by its ID
  const message = await Message.findById(messageId);

  // Handle case where the message doesn't exist
  if (!message) throw new Error("Message not found");

  // Ensure the logged-in user is the intended recipient of the message
  if (message.recipient.toString() !== userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  // Toggle the read status of the message
  message.read = !message.read;

  // Revalidate the messages page to reflect the updated state
  revalidatePath("/messages", "page");

  // Persist the updated message state
  await message.save();

  // Return the updated read status as a plain value
  return message.read;
}

export default markMessageAsRead;

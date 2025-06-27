"use server"; // Indicates this file is meant to run on the server side

// Import database connection, model, session helper, and revalidation utility
const connectDB = require("@/config/database");
const Message = require("@/models/Message");
const { getSessionUser } = require("@/utils/getSessionUser");
import { revalidatePath } from "next/cache";

// Server action to toggle the read status of a message
async function markMessageAsRead(messageId) {
  // Ensure database is connected
  await connectDB();

  // Get the current logged-in user from the session
  const sessionUser = await getSessionUser();

  // Ensure we have a valid user
  if (!sessionUser || !sessionUser.userId) {
    return { error: "User ID is required" };
  }

  const { userId } = sessionUser;

  // Find the message by its ID
  const message = await Message.findById(messageId);

  // Throw an error if message is not found
  if (!message) throw new Error("Message not found");

  // Check if the message recipient matches the current user
  if (message.recipient.toString() !== userId) {
    throw new Error("Unauthorized");
  }

  // Toggle the read status
  message.read = !message.read;

  // Trigger a revalidation of the messages page for fresh data
  revalidatePath("/messages", "page");

  // Save the updated message
  await message.save();

  // Return the new read status
  return message.read;
}

export default markMessageAsRead;

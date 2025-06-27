"use server";

// Import required modules and configurations
import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

// Main function to add a new property
async function addMessage(previousState, formData) {
  // Connect to the MongoDB database
  await connectDB();

  // Get the current session user
  const sessionUser = await getSessionUser();

  // Ensure user is authenticated and has a valid user ID
  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User ID is required");
  }

  const { userId } = sessionUser;

  const recepient = formData.get("recipient");

  if (userId === recepient) {
    return { error: "You can not send a message to yourself" };
  }

  const newMessage = new Message({
    sender: userId,
    recepient,
    property: formData.get("property"),
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    body: formData.get("body"),
  });

  await newMessage.save();

  return { submitted: true };
}

export default addMessage;

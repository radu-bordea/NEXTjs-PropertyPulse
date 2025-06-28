"use server";

import connectDB from "@/config/database"; // Connect to the MongoDB database
import Message from "@/models/Message"; // Mongoose model for messages
import { getSessionUser } from "@/utils/getSessionUser"; // Utility to retrieve the session user
import { revalidatePath } from "next/cache"; // (Optional import here if unused)

async function addMessage(previousState, formData) {
  // Establish a connection to the database
  await connectDB();

  // Retrieve the currently logged-in user
  const sessionUser = await getSessionUser();

  // Return error if user is not authenticated
  if (!sessionUser || !sessionUser.user) {
    return { error: "You must be logged in to send a message" };
  }

  const { user } = sessionUser;

  // Extract recipient from form data
  const recipient = formData.get("recipient");

  // Prevent users from messaging themselves
  if (user.id === recipient) {
    return { error: "You can not send a message to yourself" };
  }

  // Create a new message document using form data
  const newMessage = new Message({
    sender: user.id,
    recipient,
    property: formData.get("property"),
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    body: formData.get("message"),
  });

  // Save the message to the database
  await newMessage.save();

  // Return success response
  return { submitted: true };
}

export default addMessage;

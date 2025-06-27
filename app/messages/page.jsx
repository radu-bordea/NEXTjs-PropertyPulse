import MessageCard from "@/components/MessageCard"; // Component to display individual message cards
import connectDB from "@/config/database"; // Function to connect to the MongoDB database
import Message from "@/models/Message"; // Message model schema
import "@/models/Property"; // Ensure the Property model is registered (side-effect import)
import { convertToSerializeableObject } from "@/utils/convertToObject"; // Utility to convert Mongoose docs to plain objects
import { getSessionUser } from "@/utils/getSessionUser"; // Utility to get the logged-in user's session info

const MessagesPage = async () => {
  // Connect to the database
  await connectDB();

  // Get the currently logged-in user
  const sessionUser = await getSessionUser();
  const { userId } = sessionUser;

  // Fetch all read messages for the user, newest first
  const readMessages = await Message.find({
    recipient: userId,
    read: true,
  })
    .sort({ createdAt: -1 }) // Sort by date descending
    .populate("sender", "username") // Populate sender's username
    .populate("property", "name") // Populate property's name
    .lean(); // Convert Mongoose documents to plain JS objects

  // Fetch all unread messages for the user, newest first
  const unreadMessages = await Message.find({
    recipient: userId,
    read: false,
  })
    .sort({ createdAt: -1 })
    .populate("sender", "username")
    .populate("property", "name")
    .lean();

  // Combine and convert messages to serializable format
  const messages = [...unreadMessages, ...readMessages].map((messageDoc) => {
    const message = convertToSerializeableObject(messageDoc);
    message.sender = convertToSerializeableObject(messageDoc.sender);
    message.property = convertToSerializeableObject(messageDoc.property);
    return message; // fixed typo from "messaeg"
  });

  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-24 max-w-6xl">
        {/* Main content box */}
        <div className="bg-white px-6 py-8 mb-4 shaddow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Messages</h1>

          {/* Message list or placeholder text */}
          <div className="space-y-4">
            {" "}
            {/* fixed typo from 'cl' to 'className' */}
            {messages.length === 0 ? (
              <p>You have no messages</p>
            ) : (
              // Render a MessageCard for each message
              messages.map((message) => (
                <MessageCard key={message._id} message={message} />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MessagesPage;

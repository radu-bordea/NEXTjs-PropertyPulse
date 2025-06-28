"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import markMessageAsRead from "@/app/actions/markMessageAsRead";
import deleteMessage from "@/app/actions/deleteMessage";
import { useGlobalContext } from "@/context/GlobalContext";

const MessageCard = ({ message }) => {
  // Local state to track message read/deleted status
  const [isRead, setIsRead] = useState(message.read);
  const [isDeleted, setIsDeleted] = useState(false);

  // Access global context to update unread message count
  const { setUnreadCount } = useGlobalContext();

  // Toggle read/unread status of the message
  const handleReadClick = async () => {
    const read = await markMessageAsRead(message._id); // Update server state
    setIsRead(read); // Update local UI
    setUnreadCount((prevCount) => (read ? prevCount - 1 : prevCount + 1)); // Sync unread count
    toast.success(`Marked as ${read ? "read" : "new"}`); // Show success message
  };

  // Soft delete the message
  const handleDeleteClick = async () => {
    await deleteMessage(message._id); // Remove message server-side
    setIsDeleted(true); // Hide from UI
    setUnreadCount((prevCount) => (isRead ? prevCount : prevCount - 1)); // Adjust unread count if necessary
    toast.success("Message Deleted"); // Show deletion toast
  };

  // Render nothing if message is deleted
  if (isDeleted) {
    return <p>Deleted message</p>;
  }

  return (
    <div className="relative bg-white p-4 rounded-md shadow-md border border-gray-200">
      {/* Badge for unread messages */}
      {!isRead && (
        <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-md">
          New
        </div>
      )}

      {/* Message details */}
      <h2 className="text-xl mb-4">
        <span className="font-bold">Property Inquiry:</span>{" "}
        {message.property.name}
      </h2>
      <p className="text-gray-700">{message.body}</p>

      {/* Contact & timestamp info */}
      <ul className="mt-4">
        <li>
          <strong>Reply Email:</strong>{" "}
          <a href={`mailto:${message.email}`} className="text-blue-500">
            {message.email}
          </a>
        </li>
        <li>
          <strong>Reply Phone:</strong>{" "}
          <a href={`tel:${message.phone}`} className="text-blue-500">
            {message.phone}
          </a>
        </li>
        <li>
          <strong>Received:</strong>{" "}
          {new Date(message.createdAt).toLocaleString()}
        </li>
      </ul>

      {/* Action buttons */}
      <button
        onClick={handleReadClick}
        className={`mt-4 mr-3 ${
          isRead ? "bg-gray-300" : "bg-blue-500 text-white"
        } py-1 px-3 rounded-md`}
      >
        {isRead ? "Mark As New" : "Mark As Read"}
      </button>

      <button
        onClick={handleDeleteClick}
        className="mt-4 bg-red-500 text-white py-1 px-3 rounded-md"
      >
        Delete
      </button>
    </div>
  );
};

export default MessageCard;

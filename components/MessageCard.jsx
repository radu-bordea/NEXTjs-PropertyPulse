// MessageCard component displays details of a property inquiry message
const MessageCard = ({ message }) => {
  return (
    // Container with styling for the message card
    <div className="relative bg-white p-4 rounded-md shaddow-md border border-gray-200">
      {/* Title displaying the property name */}
      <h2 className="text-xl mb-4">
        <span className="font-bold">Property Inquiry:</span>{" "}
        {message.property.name}
      </h2>

      {/* Body of the message */}
      <p className="text-gray-700">{message.body}</p>

      {/* Contact and timestamp details */}
      <ul className="mt-4">
        {/* Email link to reply */}
        <li>
          <strong>Reply Email:</strong>{" "}
          <a href={`mailto:${message.email}`} className="text-blue-500">
            {message.email}
          </a>
        </li>

        {/* Phone link to call */}
        <li>
          <strong>Reply Phone:</strong>{" "}
          <a href={`tel:${message.phone}`} className="text-blue-500">
            {message.phone}
          </a>
        </li>

        {/* Display the message creation timestamp */}
        <li>
          <strong>Received:</strong>{" "}
          {new Date(message.createdAt).toLocaleString()}
        </li>
      </ul>

      {/* Buttons for actions */}
      <button className="mt-4 mr-3 bg-blue-500 text-white py-1 px-3 rounded-md">
        Mark As Read
      </button>
      <button className="mt-4 bg-red-500 text-white py-1 px-3 rounded-md">
        Delete
      </button>
    </div>
  );
};

export default MessageCard;

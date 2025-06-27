"use client";

import { useEffect } from "react";
import { useActionState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import addMessage from "@/app/actions/addMessage"; // Action to handle form submission
import SubmitMessageButton from "./SubmitMessageButton"; // Submit button component

// Form component for users to contact the property owner
const PropertyContactForm = ({ property }) => {
  const { data: session } = useSession(); // Get current session user

  // useActionState hook to handle form submission state
  const [state, formAction] = useActionState(addMessage, {});

  // Show toast notifications based on submission result
  useEffect(() => {
    if (state.error) toast.error(state.error); // Display error toast
    if (state.submitted) toast.success("Message sent successfully"); // Display success toast
  }, [state]);

  // If message was submitted successfully, show confirmation message
  if (state.submitted) {
    return <p className="text-green-500 mb-4">Your message has been sent</p>;
  }

  // Render form only if user is authenticated
  return (
    session && (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-6">Contact Property Manager</h3>

        {/* Form to send a message */}
        <form action={formAction}>
          {/* Hidden field with property ID */}
          <input
            type="hidden"
            id="property"
            name="property"
            defaultValue={property._id}
          />

          {/* Hidden field with property owner's ID (recipient) */}
          <input
            type="hidden"
            id="recipient"
            name="recipient"
            defaultValue={property.owner}
          />

          {/* Name input */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              name="name"
              type="text"
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Email input */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Phone input */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phone"
            >
              Phone:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phone"
              name="phone"
              type="text"
              placeholder="Enter your phone number"
            />
          </div>

          {/* Message textarea */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="body"
            >
              Message:
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-44 focus:outline-none focus:shadow-outline"
              id="message"
              name="body"
              placeholder="Enter your message"
            ></textarea>
          </div>

          {/* Submit button */}
          <div>
            <SubmitMessageButton />
          </div>
        </form>
      </div>
    )
  );
};

export default PropertyContactForm;

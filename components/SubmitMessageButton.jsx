import { useFormStatus } from "react-dom"; // Hook to track form submission state
import { FaPaperPlane } from "react-icons/fa"; // Paper plane icon for the button

// Submit button component for the message form
const SubmitMessageButton = () => {
  const { pending } = useFormStatus(); // Destructure the pending state from form status

  return (
    <button
      type="submit" // Indicates this is a form submit button
      disabled={pending} // Disable button while form is submitting
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline flex items-center justify-center"
    >
      {/* Icon and dynamic label */}
      <FaPaperPlane className="mr-2" /> {/* Plane icon to indicate sending */}
      {pending ? "Sending..." : "Send Message"}{" "}
      {/* Label changes based on pending state */}
    </button>
  );
};

export default SubmitMessageButton;

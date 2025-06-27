"use client";

import { useState, useEffect } from "react";
import { FaBookmark } from "react-icons/fa"; // Bookmark icon
import { useSession } from "next-auth/react"; // Hook to access session data
import bookmarkProperty from "@/app/actions/bookmarkProperty"; // Server action to toggle bookmark status
import checkBookmarkStatus from "@/app/actions/checkBookmarkStatus"; // Server action to check if property is already bookmarked
import { toast } from "react-toastify"; // For displaying notifications

// Component to bookmark or unbookmark a property
const BookmarkButton = ({ property }) => {
  const { data: session } = useSession(); // Get current logged-in user session
  const userId = session?.user?.id;

  const [isBookmarked, setIsBookmarked] = useState(false); // Track bookmark status
  const [loading, setLoading] = useState(true); // Track loading state while checking bookmark status

  useEffect(() => {
    // If user is not logged in, stop loading
    if (!userId) {
      setLoading(false);
      return;
    }

    // Check if the current property is bookmarked by the user
    checkBookmarkStatus(property._id).then((res) => {
      if (res.error) toast.error(res.error); // Show error toast if any
      if (res.isBookmarked) setIsBookmarked(res.isBookmarked); // Update state if bookmarked
      setLoading(false); // Set loading to false once done
    });
  }, [property._id, userId]); // Re-run effect if property ID or user changes

  // Handle bookmark button click
  const handleClick = async () => {
    // If user is not logged in, show error
    if (!userId) {
      toast.error("You need to sign in to bookmark a property");
      return;
    }

    // Toggle bookmark status
    bookmarkProperty(property._id).then((res) => {
      if (res.error) return toast.error(res.error); // Show error if toggle fails
      setIsBookmarked(res.isBookmarked); // Update UI state
      toast.success(res.message); // Show success message
    });
  };

  // Show loading state while checking bookmark status
  if (loading) return <p className="text-center">Loading...</p>;

  // Render bookmark/unbookmark button based on current state
  return isBookmarked ? (
    <button
      onClick={handleClick}
      className="bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
    >
      <FaBookmark className="mr-2" /> Remove Bookmark
    </button>
  ) : (
    <button
      onClick={handleClick}
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
    >
      <FaBookmark className="mr-2" /> Bookmark Property
    </button>
  );
};

export default BookmarkButton;

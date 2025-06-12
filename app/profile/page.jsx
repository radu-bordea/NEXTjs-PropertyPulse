// Import necessary modules and components
import Image from "next/image";
import connectDB from "@/config/database"; // Function to connect to MongoDB
import Property from "@/models/Property"; // Mongoose model for Property
import { getSessionUser } from "@/utils/getSessionUser"; // Utility to retrieve currently logged-in user
import profileDefault from "@/assets/images/profile.png"; // Default profile image
import ProfileProperties from "@/components/ProfileProperties"; // Component to display user's property listings
import { convertToSerializeableObject } from "@/utils/convertToObject"; // Utility to prepare Mongoose docs for serialization

// Async function representing the Profile page component
const ProfilePage = async () => {
  // Establish database connection
  await connectDB();

  // Retrieve the logged-in user's session data
  const sessionUser = await getSessionUser();

  // Destructure userId from session data
  const { userId } = sessionUser;

  // If no user ID is present, throw an error
  if (!userId) {
    throw new Error("User ID is required");
  }

  // Query properties from the database where the logged-in user is the owner
  const propertiesDocs = await Property.find({ owner: userId }).lean();

  // Convert documents to a serializable format for Next.js
  const properties = propertiesDocs.map(convertToSerializeableObject);

  // Return the JSX for the profile page
  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-24">
        {/* Card container */}
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Profile</h1>

          {/* Layout for profile info and property listings */}
          <div className="flex flex-col md:flex-row">
            {/* Left column: User profile details */}
            <div className="md:w-1/4 mx-20 mt-10">
              <div className="mb-4">
                {/* Display user image or fallback to default */}
                <Image
                  className="h-32 w-32 md:h-48 md:w-48 rounded-full mx-auto md:mx-0"
                  src={sessionUser.user.image || profileDefault}
                  width={200}
                  height={200}
                  alt="User"
                />
              </div>

              {/* Display user name and email */}
              <h2 className="text-2xl mb-4">
                <span className="font-bold block">Name: </span>{" "}
                {sessionUser.user.name}
              </h2>
              <h2 className="text-2xl">
                <span className="font-bold block">Email: </span>{" "}
                {sessionUser.user.email}
              </h2>
            </div>

            {/* Right column: User property listings */}
            <div className="md:w-3/4 md:pl-4">
              <h2 className="text-xl font-semibold mb-4">Your Listings</h2>
              {/* Conditional rendering for property listings */}
              {properties.length === 0 ? (
                <p>You have no property listings</p>
              ) : (
                <ProfileProperties properties={properties} />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Export the ProfilePage component as default
export default ProfilePage;

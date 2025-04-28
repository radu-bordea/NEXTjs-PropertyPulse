// Import the PropertyCard component to display individual properties
import PropertyCard from "../../components/PropertyCard";
// Import the database connection function
import connectDB from "@/config/database";
// Import the Property model to interact with the MongoDB collection
import Property from "@/models/Property";

// Async component for fetching and displaying properties
const PropertiesPage = async () => {
  // Establish the connection to the database before querying
  await connectDB();

  // Fetch all properties from the database, and use `.lean()` to return plain JavaScript objects (no Mongoose methods)
  const properties = await Property.find({}).lean();

  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        {/* Conditional rendering based on whether there are any properties */}
        {properties.length === 0 ? (
          // If no properties are found, display this message
          <p>No properties found</p>
        ) : (
          // If properties are found, render them in a grid layout
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Map through the properties and render a PropertyCard for each */}
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

// Export the PropertiesPage component to use it elsewhere
export default PropertiesPage;

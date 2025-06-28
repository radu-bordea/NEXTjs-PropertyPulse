import FeaturedPropertyCard from "@/components/FeaturedPropertyCard";
import connectDB from "@/config/database";
import Property from "@/models/Property";

// Async server component to fetch and display featured properties
const FeaturedProperties = async () => {
  // Connect to the database
  await connectDB();

  // Query properties where 'is_featured' is true
  const properties = await Property.find({
    is_featured: true,
  }).lean(); // Use .lean() for better performance (returns plain JS objects)

  // If there are featured properties, render them
  return properties.length > 0 ? (
    <section className="bg-blue-50 px-4 pt-6 pb-10">
      <div className="container-xl lg:container m-auto">
        {/* Section heading */}
        <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
          Featured Properties
        </h2>

        {/* Responsive grid of featured property cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {properties.map((property) => (
            // Render each featured property using the FeaturedPropertyCard component
            <FeaturedPropertyCard key={property._id} property={property} />
          ))}
        </div>
      </div>
    </section>
  ) : null; // Return nothing if there are no featured properties
};

export default FeaturedProperties;

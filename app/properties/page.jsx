import PropertyCard from "@/components/PropertyCard";
import PropertySearchForm from "@/components/PropertySearchForm";
import Pagination from "@/components/Pagination";
import Property from "@/models/Property";
import connectDB from "@/config/database";

// This is a server component that receives search parameters from the URL
const PropertiesPage = async ({ searchParams: { pageSize = 2, page = 1 } }) => {
  // Ensure the database is connected
  await connectDB();

  // Calculate how many documents to skip for pagination
  const skip = (page - 1) * pageSize;

  // Get the total number of property documents
  const total = await Property.countDocuments({});

  // Fetch the current page's properties with pagination
  const properties = await Property.find({}).skip(skip).limit(pageSize);

  // Determine if pagination controls should be shown
  const showPagination = total > pageSize;

  return (
    <>
      {/* Search form section with blue background */}
      <section className="bg-blue-700 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-start">
          <PropertySearchForm />
        </div>
      </section>

      {/* Main content section for displaying properties */}
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto px-4 py-6">
          <h1 className="text-2xl mb-4">Browse Properties</h1>

          {/* Show message if no properties are found */}
          {properties.length === 0 ? (
            <p>No properties found</p>
          ) : (
            // Render grid of property cards
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {properties.map((property, index) => (
                <PropertyCard property={property} key={index} />
              ))}
            </div>
          )}

          {/* Show pagination if needed */}
          {showPagination && (
            <Pagination
              page={parseInt(page)}
              pageSize={parseInt(pageSize)}
              totalItems={total}
            />
          )}
        </div>
      </section>
    </>
  );
};

export default PropertiesPage;

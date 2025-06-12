// Import required components and modules
import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import PropertyDetails from "@/components/PropertyDetails";
import PropertyImages from "@/components/PropertyImages";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { convertToSerializeableObject } from "@/utils/convertToObject";

// Async server component for rendering a single property's page
const PropertyPage = async ({ params: rawParams }) => {
  // Connect to the MongoDB database
  await connectDB();

  // Await params if needed (depending on framework behavior)
  const params = await rawParams;

  // Fetch the property by ID from the database and lean it for a plain JS object
  const propertyDocs = await Property.findById(params.id).lean();
  const property = convertToSerializeableObject(propertyDocs);

  if (!property) {
    return (
      <h1 className="text-center text-2xl font-bold mt-10">
        Property Not Found
      </h1>
    );
  }

  return (
    <>
      {/* Header image of the property */}
      <PropertyHeaderImage image={property.images[0]} />

      {/* Navigation link to go back to the properties listing */}
      <section>
        <div className="container m-auto py-6 px-6">
          <Link
            href="/properties"
            className="text-blue-500 hover:text-blue-600 flex items-center"
          >
            <FaArrowLeft className="mr-2" /> Back to Properties
          </Link>
        </div>
      </section>

      {/* Property details section */}
      <section className="bg-blue-50">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
            {/* Detailed information about the property */}
            <PropertyDetails property={property} />
          </div>
        </div>
      </section>
      <PropertyImages images={property.images} />
    </>
  );
};

export default PropertyPage;

// Import required components and modules
import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import PropertyDetails from "@/components/PropertyDetails";
import PropertyImages from "@/components/PropertyImages";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { convertToSerializeableObject } from "@/utils/convertToObject";
import BookmarkButton from "@/components/BookmarkButton";
import ShareButtons from "@/components/ShareButtons";
import PropertyContactForm from "@/components/PropertyContactForm";

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
      {/* Header image */}
      <PropertyHeaderImage image={property.images[0]} />

      {/* Back link */}
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

      {/* Property Details and Sidebar */}
      <section className="bg-blue-50">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-[70%_30%] w-full gap-6">
            {/* Main property details */}
            <div>
              <PropertyDetails property={property} />
            </div>

            {/* Sidebar */}
            <aside className="space-y-4">
              <BookmarkButton property={property} />
              <ShareButtons property={property} />
              <PropertyContactForm property={property} />
            </aside>
          </div>
        </div>
      </section>

      {/* Additional images */}
      <PropertyImages images={property.images} />
    </>
  );
};

export default PropertyPage;

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import deleteProperty from "@/app/actions/deleteProperty";
import { toast } from "react-toastify";

const ProfileProperties = ({ properties: initialProperties }) => {
  // Initialize state with list of properties passed in as props
  const [properties, setProperties] = useState(initialProperties);

  // Handle deletion of a property by its ID
  const handleDeleteProperty = async (propertyId) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this property?"
    );

    if (!confirm) {
      return; // Cancel if user does not confirm
    }

    await deleteProperty(propertyId); // Perform server-side delete

    // Filter out the deleted property from state
    const updatedProperties = properties.filter(
      (property) => property._id !== propertyId
    );

    setProperties(updatedProperties); // Update UI
    toast.success("Property Deleted Successfully!"); // Show success notification
  };

  // Render a card for each property
  return properties.map((property) => (
    <div key={property._id} className="mb-10">
      {/* Link to property detail page */}
      <Link href={`/properties/${property._id}`}>
        <Image
          className="h-32 w-full rounded-md object-cover"
          src={property.images[0]}
          width={1000}
          height={200}
          alt="Property 1"
        />
      </Link>

      {/* Property name and address */}
      <div className="mt-2">
        <p className="text-lg font-semibold">{property.name}</p>
        <p className="text-gray-600">
          Address: {property.location.street} {property.location.city}{" "}
          {property.location.state}
        </p>
      </div>

      {/* Edit and Delete buttons */}
      <div className="mt-2">
        <Link
          href={`/properties/${property._id}/edit`}
          className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
        >
          Edit
        </Link>
        <button
          className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
          type="button"
          onClick={() => handleDeleteProperty(property._id)}
        >
          Delete
        </button>
      </div>
    </div>
  ));
};

export default ProfileProperties;

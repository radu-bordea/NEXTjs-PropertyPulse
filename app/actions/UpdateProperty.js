"use server";

// Import necessary modules and utilities
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Function to update an existing property
async function UpdateProperty(propertyId, formData) {
  // Connect to MongoDB
  await connectDB();

  // Get the current logged-in user
  const sessionUser = await getSessionUser();

  // Check if the user is authenticated
  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User ID is required");
  }

  const { userId } = sessionUser;

  // Retrieve the existing property from the database
  const existingProperty = await Property.findById(propertyId);

  // Verify that the current user owns the property
  if (existingProperty.owner.toString() !== userId) {
    throw new Error("Current user does not own this property");
  }

  // Construct the updated property data from the form input
  const propertyData = {
    owner: userId,
    type: formData.get("type"),
    name: formData.get("name"),
    description: formData.get("description"),
    location: {
      street: formData.get("location.street"),
      city: formData.get("location.city"),
      state: formData.get("location.state"),
      zipcode: formData.get("location.zipcode"),
    },
    beds: formData.get("beds"),
    baths: formData.get("baths"),
    square_feet: formData.get("square_feet"),
    amenities: formData.getAll("amenities"),
    rates: {
      nightly: formData.get("rates.nightly"),
      weekly: formData.get("rates.weekly"), // 
      monthly: formData.get("rates.monthly"),
    },
    seller_info: {
      name: formData.get("seller_info.name"),
      email: formData.get("seller_info.email"),
      phone: formData.get("seller_info.phone"),
    },
  };

  // Update the property in the database using the new data
  const updatedProperty = await Property.findByIdAndUpdate(
    propertyId,
    propertyData
  );

  // Revalidate the homepage layout cache
  revalidatePath("/", "layout");

  // Redirect the user to the updated property's detail page
  redirect(`/properties/${updatedProperty._id}`);
}

export default UpdateProperty;

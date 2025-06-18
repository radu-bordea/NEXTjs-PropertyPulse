"use server";

// Import required modules and configurations
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import cloudinary from "@/config/cloudinary";

// Main function to add a new property
async function addProperty(formData) {
  // Connect to the MongoDB database
  await connectDB();

  // Get the current session user
  const sessionUser = await getSessionUser();

  // Ensure user is authenticated and has a valid user ID
  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User ID is required");
  }

  const { userId } = sessionUser;

  // Get all selected amenities from the form data
  const amenities = formData.getAll("amenities");

  // Get all uploaded images and filter out empty entries
  const images = formData
    .getAll("images")
    .filter((image) => image.phone !== "");

  // Construct the property data object
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
    amenities,
    rates: {
      nightly: formData.get("rates.nightly"),
      weekly: formData.get("rates.weekly"), 
      monthly: formData.get("rates.monthly"),
    },
    seller_info: {
      name: formData.get("seller_info.name"),
      email: formData.get("seller_info.email"),
      phone: formData.get("seller_info.phone"),
    },
  };

  // Array to hold uploaded image URLs
  const imageUrls = [];

  // Upload each image to Cloudinary
  for (const imageFile of images) {
    const imageBuffer = await imageFile.arrayBuffer();
    const imageArray = Array.from(new Uint8Array(imageBuffer));
    const imageData = Buffer.from(imageArray);

    // Convert image to base64
    const imageBase64 = imageData.toString("base64");

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(
      `data:image/png;base64,${imageBase64}`,
      {
        folder: "propertypulse", // Organize uploads in a specific folder
      }
    );

    // Add the secure URL of the uploaded image to the array
    imageUrls.push(result.secure_url);
  }

  // Attach the uploaded image URLs to the property data
  propertyData.images = imageUrls;

  // Create a new Property document and save it to the database
  const newProperty = new Property(propertyData);
  await newProperty.save();

  // Revalidate the cache for the homepage layout
  revalidatePath("/", "layout");

  // Redirect the user to the new property's detail page
  redirect(`/properties/${newProperty._id}`);
}

export default addProperty;

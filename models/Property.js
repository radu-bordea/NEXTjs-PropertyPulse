// Import necessary Mongoose functions: Schema creator, model creator, and registered models
import { Schema, model, models } from "mongoose";

// Define the Property schema structure
const PropertySchema = new Schema(
  {
    // Owner field: references the User model (each property is owned by a user)
    owner: {
      type: Schema.Types.ObjectId, // Refers to the ObjectId type (unique identifier for documents)
      ref: "User", // Refers to the "User" model, establishing a relationship
      required: true, // Property must have an owner
    },
    // Property name field: required field for the property's name
    name: {
      type: String,
      required: true, // Validation: Property name must be provided
    },
    // Property type field: required field for the type (e.g., apartment, house, etc.)
    type: {
      type: String,
      required: true, // Validation: Property type must be provided
    },
    // Description field: optional field for additional property details
    description: {
      type: String,
    },
    // Location field: structured as an object with street, city, state, and zipcode
    location: {
      street: String,
      city: String,
      state: String,
      zipcode: String,
    },
    // Number of beds field: required field indicating how many bedrooms
    beds: {
      type: Number,
      required: true, // Validation: Beds must be provided
    },
    // Number of baths field: required field indicating how many bathrooms
    baths: {
      type: Number,
      required: true, // Validation: Baths must be provided
    },
    // Square feet field: required field for the property size in square feet
    square_feet: {
      type: Number,
      required: true, // Validation: Square feet must be provided
    },
    // Amenities field: optional array of strings for amenities (e.g., pool, gym)
    amenities: [{ type: String }],
    // Rates field: contains nightly, weekly, and monthly rates
    rates: {
      nightly: Number,
      weekly: Number,
      monthly: Number,
    },
    // Seller info field: optional details about the seller (name, email, phone)
    seller_info: {
      name: String,
      email: String,
      phone: String,
    },
    // Images field: an array of strings (URLs) representing property images
    images: [{ type: String }],
    // Featured flag: boolean indicating whether the property is featured or not
    is_featured: {
      type: Boolean,
      default: false, // Default is false if not explicitly set
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields for the property
  }
);

// Check if the "Property" model already exists to prevent OverwriteModelError during hot-reloading
const Property = models.Property || model("Property", PropertySchema);

// Export the Property model for use elsewhere in the project
export default Property;

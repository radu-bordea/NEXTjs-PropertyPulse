/**
 * Converts a Mongoose lean document into a serializable plain JavaScript object.
 *
 * This is useful when working with Next.js (especially in server-side rendering or API responses),
 * as certain Mongoose types like ObjectId or Date may not be directly serializable to JSON.
 *
 * @param {Object} leanDocument - The Mongoose lean document to be converted.
 * @returns {Object} A plain JavaScript object that is a serializable representation of the input document.
 */
export function convertToSerializeableObject(leanDocument) {
  // Iterate through each key in the lean document
  for (const key of Object.keys(leanDocument)) {
    // Check if the value has both `toJSON` and `toString` methods
    // This helps identify types like ObjectId that can be stringified
    if (leanDocument[key].toJSON && leanDocument[key].toString) {
      // Convert the value to a string to ensure it is JSON-serializable
      leanDocument[key] = leanDocument[key].toString();
    }
  }

  // Return the modified document which is now safe to serialize
  return leanDocument;
}

// Import necessary icons from react-icons
import {
  FaTimes,
  FaBed,
  FaBath,
  FaRulerCombined,
  FaCheck,
  FaMapMarker,
} from "react-icons/fa";
import PropertyMap from "./PropertyMap";

// PropertyDetails component receives a single property object as props
const PropertyDetails = ({ property }) => {
  return (
    <main>
      {/* Property basic information card */}
      <div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
        {/* Property type (e.g., Apartment, House) */}
        <div className="text-gray-500 mb-4">{property.type}</div>

        {/* Property name/title */}
        <h1 className="text-3xl font-bold mb-4">{property.name}</h1>

        {/* Property location (street, city, zipcode) */}
        <div className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
          <FaMapMarker className="text-orange-700 mt-1 mr-1" />
          <p className="text-orange-700">
            {property.location.street} {property.location.city}{" "}
            {property.location.zipcode}
          </p>
        </div>

        {/* Section for displaying rates */}
        <h3 className="text-lg font-bold my-6 bg-gray-800 text-white p-2">
          Rates & Options
        </h3>

        {/* Rate information: Nightly, Weekly, Monthly */}
        <div className="flex flex-col md:flex-row justify-around">
          {/* Nightly Rate */}
          <div className="flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0">
            <div className="text-gray-500 mr-2 font-bold">Nightly</div>
            <div className="text-2xl font-bold text-blue-500">
              {property.rates.nightly ? (
                `$${property.rates.nightly.toLocaleString()}`
              ) : (
                <FaTimes className="text-red-700" />
              )}
            </div>
          </div>

          {/* Weekly Rate */}
          <div className="flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0">
            <div className="text-gray-500 mr-2 font-bold">Weekly</div>
            <div className="text-2xl font-bold text-blue-500">
              {property.rates.weekly ? (
                `$${property.rates.weekly.toLocaleString()}`
              ) : (
                <FaTimes className="text-red-700" />
              )}
            </div>
          </div>

          {/* Monthly Rate */}
          <div className="flex items-center justify-center mb-4 pb-4 md:pb-0">
            <div className="text-gray-500 mr-2 font-bold">Monthly</div>
            <div className="text-2xl font-bold text-blue-500">
              {property.rates.monthly ? (
                `$${property.rates.monthly.toLocaleString()}`
              ) : (
                <FaTimes className="text-red-700" />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Description and property details card */}
      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h3 className="text-lg font-bold mb-6">Description & Details</h3>

        {/* Beds, Baths, and Square footage */}
        <div className="flex justify-center gap-4 text-blue-500 mb-4 text-xl space-x-9">
          <p>
            <FaBed className="inline-block mr-2" /> {property.beds}{" "}
            <span className="hidden sm:inline">Beds</span>
          </p>
          <p>
            <FaBath className="inline-block mr-2" /> {property.baths}{" "}
            <span className="hidden sm:inline">Baths</span>
          </p>
          <p>
            <FaRulerCombined className="inline-block mr-2" />
            {property.square_feet}{" "}
            <span className="hidden sm:inline">sqft</span>
          </p>
        </div>

        {/* Property description */}
        <p className="text-gray-500 mb-4">{property.description}</p>
      </div>

      {/* Amenities list card */}
      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h3 className="text-lg font-bold mb-6">Amenities</h3>

        {/* List of amenities */}
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 list-none">
          {property.amenities.map((amenity, index) => (
            <li key={index}>
              <FaCheck className="inline-block text-green-600 mr-2" /> {amenity}
            </li>
          ))}
        </ul>
      </div>

      {/* Map placeholder (to be implemented) */}
      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <PropertyMap property={property}/>
      </div>
    </main>
  );
};

export default PropertyDetails;

import Link from "next/link";

// Pagination component receives current page, page size, and total items
const Pagination = ({ page, pageSize, totalItems }) => {
  // Calculate the total number of pages based on items and page size
  const totalPages = Math.ceil(totalItems / pageSize);

  return (
    <section className="container mx-auto flex justify-center items-center my-8">
      {/* Render "Previous" button only if we're not on the first page */}
      {page > 1 ? (
        <Link
          className="mr-2 px-2 py-1 border border-gray-300 rounded"
          href={`/properties?page=${page - 1}`}
        >
          Previous
        </Link>
      ) : null}

      {/* Display the current page and total pages */}
      <span className="mx-2">
        {" "}
        Page {page} of {totalPages}
      </span>

      {/* Render "Next" button only if we're not on the last page */}
      {page < totalPages ? (
        <Link
          className="ml-2 px-2 py-1 border border-gray-300 rounded"
          href={`/properties?page=${page + 1}`}
        >
          Next
        </Link>
      ) : null}
    </section>
  );
};

export default Pagination;

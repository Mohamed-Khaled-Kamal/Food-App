import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination justify-content-center">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
            Previous
          </button>
        </li>

        {totalPages > 1 && (
          <>
            <li className={`page-item ${currentPage === 1 ? "active" : ""}`}>
              <button className="page-link" onClick={() => handlePageChange(1)}>1</button>
            </li>
            {totalPages > 1 && (
              <li className={`page-item ${currentPage === 2 ? "active" : ""}`}>
                <button className="page-link" onClick={() => handlePageChange(2)}>2</button>
              </li>
            )}
          </>
        )}

        {currentPage > 5 && <li className="page-item disabled"><span className="page-link">...</span></li>}

        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .slice(Math.max(2, currentPage - 2), Math.min(totalPages - 2, currentPage + 1))
          .map(page => (
            <li className={`page-item ${page === currentPage ? "active" : ""}`} key={page}>
              <button className="page-link" onClick={() => handlePageChange(page)}>{page}</button>
            </li>
          ))}

        {currentPage < totalPages - 4 && <li className="page-item disabled"><span className="page-link">...</span></li>}

        {totalPages > 2 && (
          <>
            <li className={`page-item ${currentPage === totalPages - 1 ? "active" : ""}`}>
              <button className="page-link" onClick={() => handlePageChange(totalPages - 1)}>{totalPages - 1}</button>
            </li>
            <li className={`page-item ${currentPage === totalPages ? "active" : ""}`}>
              <button className="page-link" onClick={() => handlePageChange(totalPages)}>{totalPages}</button>
            </li>
          </>
        )}

        <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
          <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;

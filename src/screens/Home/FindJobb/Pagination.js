import React from "react";

function Pagination({ totalPages, currentPage, onPageChange }) {
  const pageNumbers = [...Array(totalPages).keys()].map((num) => num + 1);

  return (
    <div className="pagination-area pb-115 text-center">
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="single-wrap d-flex justify-content-center">
              <nav aria-label="Page navigation example">
                <ul className="pagination">
                  {pageNumbers.map((number) => (
                    <li key={number} className={`page-item ${currentPage === number ? "active" : ""}`}>
                      <a className="page-link" href="#" onClick={() => onPageChange(number)}>
                        {number}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pagination;

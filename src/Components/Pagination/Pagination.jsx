import React from "react";
import "./Pagination.css";

const Pagination = ({ newsPerPage, totalNews, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalNews / newsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="center">
      <div className="pagination">
        {pageNumbers.map((number) => {
        let qwer = number == currentPage ? 'active' : '';
          return (
              <a
            href="#"
            className={qwer}
            onClick={() => paginate(number)}
            key={number}
          >
            {number}
          </a>
        )})}
      </div>
    </div>
  );
};

export default Pagination;

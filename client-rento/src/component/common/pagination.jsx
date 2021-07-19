import React from "react";
// import _ from "lodash";
// import PropTypes from "prop-types";

const Pagination = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;
  // const pages = _.range(1, pagesCount + 1);
  let pages = [];
  for (var i = 1; i <= pagesCount; i++) pages.push(i);
  const style = { cursor: "pointer" };

  return (
    <ul className="pagination pagination-md">
      <li className="page-item" key="previous" style={style}>
        <p className="page-link" onClick={() => onPageChange(currentPage - 1)}>
          Previous
        </p>
      </li>
      {pages.map((page) => {
        return (
          <li
            key={page}
            style={style}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <p className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </p>
          </li>
        );
      })}
      <li className="page-item" key="Next" style={style}>
        <p className="page-link" onClick={() => onPageChange(currentPage + 1)}>
          Next
        </p>
      </li>
    </ul>
  );
};

// Pagination.propTypes = {
//   itemsCount: PropTypes.number.isRequired,
//   pageSize: PropTypes.number.isRequired,
//   currentPage: PropTypes.number.isRequired,
//   onPageChange: PropTypes.func.isRequired,
// };

export default Pagination;

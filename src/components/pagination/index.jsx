import React from "react";
import PropTypes from "prop-types";

import "./style.css";

const LEFT_PAGE = "LEFT";
const RIGHT_PAGE = "RIGHT";

const range = (from, to, step = 1) => {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }

  return range;
};

class Pagination extends React.Component {
  static propTypes = {
    totalRecords: PropTypes.number.isRequired,
    pageLimit: PropTypes.number,
    pageNeighbours: PropTypes.number,
    onPageChanged: PropTypes.func
  };

  constructor(props) {
    super(props);
    const { totalRecords = null, pageLimit = 30, pageNeighbours = 0 } = props;

    this.pageLimit = typeof pageLimit === "number" ? pageLimit : 30;
    this.totalRecords = typeof totalRecords === "number" ? totalRecords : 0;

    this.pageNeighbours =
      typeof pageNeighbours === "number"
        ? Math.max(0, Math.min(pageNeighbours, 2))
        : 0;
    const lastPageNumber = Math.ceil(this.totalRecords / this.pageLimit);
    this.totalPages = lastPageNumber >= 1 ? 100 : lastPageNumber % 100;

    this.state = { currentPage: 1 };
    console.log(`total users: ${totalRecords}`);
  }

  componentDidMount() {
    this.gotoPage(1);
  }

  gotoPage = page => {
    const { onPageChanged = f => f } = this.props;

    const currentPage = Math.max(0, Math.min(page, this.totalPages));

    const paginationData = {
      currentPage,
      totalPages: this.totalPages,
      pageLimit: this.pageLimit,
      totalRecords: this.totalRecords
    };

    this.setState({ currentPage }, () => onPageChanged(paginationData));
  };

  handleClick = (page, evt) => {
    evt.preventDefault();
    this.gotoPage(page);
  };

  handleMoveLeft = evt => {
    evt.preventDefault();
    this.gotoPage(this.state.currentPage - this.pageNeighbours);
  };

  handleMoveRight = evt => {
    evt.preventDefault();
    this.gotoPage(this.state.currentPage + this.pageNeighbours);
  };

  fetchPageNumbers = () => {
    const totalPages = this.totalPages;
    const currentPage = this.state.currentPage;
    const pageNeighbours = this.pageNeighbours;

    const totalNumbers = this.pageNeighbours * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      let pages = [];

      const leftBound = currentPage - pageNeighbours;
      const rightBound = currentPage + pageNeighbours;
      const beforeLastPage = totalPages - 1;

      const startPage = leftBound > 2 ? leftBound : 2;
      const endPage = rightBound < beforeLastPage ? rightBound : beforeLastPage;

      pages = range(startPage, endPage);

      const pagesCount = pages.length;
      const singleSpillOffset = totalNumbers - pagesCount - 1;

      const leftSpill = startPage > 2;
      const rightSpill = endPage < beforeLastPage;

      const leftSpillPage = LEFT_PAGE;
      const rightSpillPage = RIGHT_PAGE;

      if (leftSpill && !rightSpill) {
        const extraPages = range(startPage - singleSpillOffset, startPage - 1);
        pages = [leftSpillPage, ...extraPages, ...pages];
      } else if (!leftSpill && rightSpill) {
        const extraPages = range(endPage + 1, endPage + singleSpillOffset);
        pages = [...pages, ...extraPages, rightSpillPage];
      } else if (leftSpill && rightSpill) {
        pages = [leftSpillPage, ...pages, rightSpillPage];
      }

      return [1, ...pages, totalPages];
    }

    return range(1, totalPages);
  };

  render() {
    if (!this.totalRecords) return null;

    if (this.totalPages === 1) return null;

    const { currentPage } = this.state;
    const pages = this.fetchPageNumbers();

    return (
      <div>
        <nav aria-label="Pagination">
          <ul className="pagination">
            {pages.map((page, index) => {
              if (page === LEFT_PAGE)
                return (
                  <li key={index} className="pagination__page-item">
                    <button
                      className="pagination__page-link"
                      type="button"
                      aria-label="Previous"
                      onClick={this.handleMoveLeft}
                    >
                      <span aria-hidden="true">Previous</span>
                      <span className="sr-only">Previous</span>
                    </button>
                  </li>
                );

              if (page === RIGHT_PAGE)
                return (
                  <li key={index} className="pagination__page-item">
                    <button
                      className="pagination__page-link"
                      type="button"
                      aria-label="Next"
                      onClick={this.handleMoveRight}
                    >
                      <span aria-hidden="true">Next</span>
                      <span className="sr-only">Next</span>
                    </button>
                  </li>
                );

              return (
                <li
                  key={index}
                  className={`pagination__page-item${
                    currentPage === page ? " active" : ""
                  }`}
                >
                  <button
                    className="pagination__page-link"
                    type="button"
                    onClick={e => this.handleClick(page, e)}
                  >
                    {page}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    );
  }
}

export default Pagination;

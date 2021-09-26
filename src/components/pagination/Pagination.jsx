import React from 'react';
import styles from './Pagination.module.css';
import PropTypes from 'prop-types';
import { getPagesArray } from '../../utils/pages';

export const Pagination = ({ page, changePage, totalPages }) => {
  let pagesArray = getPagesArray(totalPages);

  return (
    <div className={styles.pageWrapper}>
      {pagesArray.map((p) => {
        return (
          <span
            key={p}
            onClick={() => changePage(p)}
            className={page === p ? `${styles.page} ${styles.pageCurrent}` : `${styles.page}`}
          >
            {p}
          </span>
        );
      })}
    </div>
  );
};

Pagination.propTypes = {
  page: PropTypes.number,
  changePage: PropTypes.func,
  totalPages: PropTypes.number,
};

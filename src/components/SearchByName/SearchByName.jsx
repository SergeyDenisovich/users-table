import React from 'react';
import styles from './SearchByName.module.css';

export const SearchByName = React.forwardRef((props, ref) => {
  return (
    <div className={styles.searchBlock}>
      <img src='/image/search.svg' alt='Search' />
      <input ref={ref} {...props} />
    </div>
  );
});

// export const Search = () => {
//   const [searchValue, setSearchValue] = React.useState('');

//   const handleInputChange = (e) => {
//     setSearchValue(e.target.value);
//   };

//   return (
//     <div className={styles.searchBlock}>
//       <img src='/image/search.svg' alt='Search' />
//       <input placeholder='Search by user...' value={searchValue} onChange={handleInputChange} />
//     </div>
//   );
// };

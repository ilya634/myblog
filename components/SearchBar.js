// components/SearchBar.js
import { useState } from 'react';
import styles from '../styles/Home.module.css';

export default function SearchBar ({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className={styles['search-bar']}>
      <input
        type="text"
        placeholder="Поиск по блогу"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit" onClick={handleSearch}>
        Поиск
      </button>
    </div>
  );
};
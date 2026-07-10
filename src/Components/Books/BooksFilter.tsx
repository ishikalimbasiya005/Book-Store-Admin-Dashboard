import { allBooks } from '../../Data/books';
import type { BooksFilterProps, BookType, FilterState } from '../../Types';
import ISO6391 from 'iso-639-1';
import { CommonButton, CommonSelect } from '../../Attributes';

const categories = ['All', ...Array.from(new Set(allBooks.map((b) => b.category))).sort()];
const authors    = ['All', ...Array.from(new Set(allBooks.map((b) => b.author))).sort()];

const languageCodes = ISO6391.getAllCodes();
const languageOptions = [
  { value: '', label: 'All Languages', englishName: 'all languages', code: '' },
  ...languageCodes.map((code) => ({
    value: code,
    label: `${ISO6391.getName(code)} (${code.toUpperCase()})`,
    englishName: ISO6391.getName(code).toLowerCase(),
    code: code.toLowerCase(),
  }))
];

export function applyFilters(books: BookType[], filters: FilterState): BookType[] {
  return [...books]
    .filter((b) => {
      const matchSearch   = b.title.toLowerCase().includes(filters.search.toLowerCase());
      const matchCategory = filters.category === 'All' || b.category === filters.category;
      const matchAuthor   = filters.author   === 'All' || b.author   === filters.author;
      const matchLanguage = !filters.language || (b.languages && b.languages.includes(filters.language));
      return matchSearch && matchCategory && matchAuthor && matchLanguage;
    })
    .sort((a, b) => {
      if (filters.sort === 'title')  return a.title.localeCompare(b.title);
      if (filters.sort === 'price')  return a.price  - b.price;
      if (filters.sort === 'rating') return b.rating - a.rating;
      if (filters.sort === 'stock')  return a.stock  - b.stock;
      return 0;
    });
}

const BooksFilter = ({ filters, onChange, resultCount }: BooksFilterProps) => {
  const set = (key: keyof FilterState, value: string) => onChange({ ...filters, [key]: value });

  const clearAll = () => onChange({ search: '', category: 'All', author: 'All', sort: 'title', language: '' });

  const isActive =
    filters.search !== '' ||
    filters.category !== 'All' ||
    filters.author !== 'All' ||
    filters.sort !== 'title' ||
    (filters.language && filters.language !== '');

  return (
    <div className="books-filter-container">
      {/* Row 1 — inputs */}
      <div className="books-filter-row">

        {/* Search */}
        <div className="bf-field-search">
          <label className="bf-label">Search</label>
          <input type="text" value={filters.search} onChange={(e) => set('search', e.target.value)} placeholder="Search by title..." className="bf-input"/>
        </div>

        {/* Language Filter */}
        <div className="bf-field" style={{ display: 'flex', flexDirection: 'column' }}>
          <label className="bf-label">Language</label>
          <CommonSelect<string> placeholder="All Languages" value={filters.language || undefined} onChange={(val) => set('language', val || '')} className="language-filter-select" width={240} options={languageOptions} />
        </div>

        {/* Category */}
        <div className="bf-field">
          <label className="bf-label">Category</label>
          <select value={filters.category} onChange={(e) => set('category', e.target.value)} className="bf-input" > {categories.map((c) => <option key={c} value={c}>{c}</option>)} </select>
        </div>

        {/* Author */}
        <div className="bf-field-wide">
          <label className="bf-label">Author</label>
          <select value={filters.author} onChange={(e) => set('author', e.target.value)} className="bf-input" > {authors.map((a) => <option key={a} value={a}>{a}</option>)} </select>
        </div>

        {/* Sort */}
        <div className="bf-field">
          <label className="bf-label">Sort By</label>
          <select value={filters.sort} onChange={(e) => set('sort', e.target.value as FilterState['sort'])} className="bf-input" >
            <option value="title">Name (A–Z)</option>
            <option value="price">Price</option>
            <option value="rating">Rating</option>
            <option value="stock">Stock (Low first)</option>
          </select>
        </div>
      </div>

      {/* Row 2 — results counter + clear */}
      <div className="bf-footer">
        <span className="bf-count"> Showing <span className="bf-count-num">{resultCount}</span> book{resultCount !== 1 ? 's' : ''} </span>
        {isActive && ( <CommonButton onClick={clearAll} className="bf-clear-btn" text="✕ Clear Filters" /> )}
      </div>
    </div>
  );
};

export default BooksFilter;
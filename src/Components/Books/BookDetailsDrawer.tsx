import React from 'react';
import { useAppSelector } from '../../Store/Hooks';
import type { BookDetailsDrawerProps } from '../../Types/Books';
import { CommonDrawer, CommonRating, LanguageTags } from '../../Components/Common';
import { getBookInfoItems } from '../../Data/books';

const BookDetailsDrawer: React.FC<BookDetailsDrawerProps> = ({ open, book, onClose }) => {
  const themeMode = useAppSelector((s) => s.layout.theme);
  const isDark = themeMode === 'dark';

  if (!book) return null;

  const inStock = book.stock > 0;
  const infoItems = getBookInfoItems(book);

  return (
    <CommonDrawer open={open} onClose={onClose} isDark={isDark}>
      {/* Header info  */}
      <div className="bdd-header">
        <span className="bdd-header-title">Book Preview</span>
        <span className={`bdd-status-badge ${ inStock ? isDark ? 'bdd-status-in-stock-dark' : 'bdd-status-in-stock-light' : isDark ? 'bdd-status-out-of-stock-dark' : 'bdd-status-out-of-stock-light' }`} > {inStock ? 'In Stock' : 'Out of Stock'} </span>
      </div>

      {/* Book Cover Container */}
      <div className="bdd-book-cover">
        {book.image ? (
          <img src={book.image} alt={book.title} className="bdd-book-cover-image" />
        ) : (
          <div className={`bdd-book-cover-placeholder ${book.coverColor}`}>
            <span className="bdd-book-cover-placeholder-letter">{book.title.charAt(0)}</span>
          </div>
        )}
      </div>

      {/* Title & Author & Rating */}
      <div className="bdd-title-section">
        <h2 className="bdd-book-title">{book.title}</h2>
        <p className="bdd-book-author">{book.author}</p>
        
        <div className="bdd-rating-container">
          <CommonRating name={`drawer-rating-${book.id}`} value={book.rating} size="medium" />
          <span className="bdd-rating-label">({book.rating.toFixed(1)})</span>
        </div>
      </div>

      {/* Structured Info Grid */}
      <div className="bdd-info-section">
        <h3 className="bdd-info-title">Book Information</h3>
        <div className="bdd-info-grid">
          {infoItems.map((item, idx) => (
            <div key={idx} className="bdd-info-item">
              <p className="bdd-info-label">{item.label}</p>
              <p className={`bdd-info-value ${ item.highlight ? isDark ? 'bdd-info-value-highlight-dark' : 'bdd-info-value-highlight-light' : '' }`} > {item.value} </p>
            </div>
          ))}
        </div>
      </div>

      {/* Available Languages Section */}
      <LanguageTags languages={book.languages} isDark={isDark} />

      {/* Description Section */}
      <div className="bdd-description-section">
        <h3 className="bdd-description-title">Description</h3>
        {book.description ? (
          <div className="bdd-description-text ProseMirror" dangerouslySetInnerHTML={{ __html: book.description }} />
        ) : (
          <p className="bdd-description-text"> Experience a literary masterpiece. Dive into this amazing narrative where key characters, intriguing plots, and deep themes unravel in an elegant fashion. This book contains a beautifully crafted storyline suitable for readers looking to explore new intellectual and emotional frontiers. </p>
        )}
      </div>
    </CommonDrawer>
  );
};

export default BookDetailsDrawer;

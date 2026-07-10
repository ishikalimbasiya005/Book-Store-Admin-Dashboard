import { useState, useMemo } from 'react';
import BookBanner from '../../Components/Books/Banner';
import BookGrid from '../../Components/Books/BookGrid';
import BooksFilter, { applyFilters } from '../../Components/Books/BooksFilter';
import type { FilterState } from '../../Types';
import BookModal from '../../Components/Books/BookModal';
import BookDetailsDrawer from '../../Components/Books/BookDetailsDrawer';
import type { BookType } from '../../Types/Books';
import { useBookStore } from '../../Store/useBookStore';

const defaultFilters: FilterState = {
  search: '',
  category: 'All',
  author: 'All',
  sort: 'title',
  language: '',
};

const Books = () => {
  const { books, deleteBook } = useBookStore();
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [editing, setEditing] = useState<BookType | null>(null);
  const [selectedBook, setSelectedBook] = useState<BookType | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const filteredBooks = useMemo(() => applyFilters(books, filters), [books, filters]);

  const handleEdit = (b: BookType) => {
    setEditing(b);
    setModalMode('edit');
    setModalOpen(true);
  };

  const handleSelect = (b: BookType) => {
    setSelectedBook(b);
    setDrawerOpen(true);
  };

  const handleAddClick = () => {
    setEditing(null);
    setModalMode('add');
    setModalOpen(true);
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <BookBanner onAddClick={handleAddClick} />
      <BooksFilter filters={filters} onChange={setFilters} resultCount={filteredBooks.length} />
      <BookGrid books={filteredBooks} onEdit={handleEdit} onSelect={handleSelect} onDelete={deleteBook} />
      <BookModal open={modalOpen} mode={modalMode} book={editing} onClose={() => setModalOpen(false)} />
      <BookDetailsDrawer open={drawerOpen} book={selectedBook} onClose={() => setDrawerOpen(false)} />
    </div>
  );
};

export default Books;

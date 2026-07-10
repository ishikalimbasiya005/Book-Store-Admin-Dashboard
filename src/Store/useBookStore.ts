import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { allBooks } from '../Data/books';
import type { BookState } from '../Types/Books';
import { notifier } from '../Attributes/Notification';

export const useBookStore = create<BookState>()(
  persist(
    (set) => ({
      books: allBooks,
      addBook: (book) => {
        set((state) => ({ books: [book, ...state.books] }));
        notifier.success('create');
      },
      updateBook: (updated) => {
        set((state) => ({
          books: state.books.map((b) => (b.id === updated.id ? updated : b)),
        }));
        notifier.success('update');
      },
      deleteBook: (id) => {
        set((state) => ({
          books: state.books.filter((b) => b.id !== id),
        }));
        notifier.success('delete');
      },
    }),
    {
      name: 'book-store',
    }
  )
);

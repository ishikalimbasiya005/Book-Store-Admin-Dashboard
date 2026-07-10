import { allBooks } from '../Data/books';
import type { BookType } from '../Types/Books';

export const INITIAL_BOOK_VALUES: BookType = {
  id: '',
  title: '',
  author: '',
  price: 0,
  category: '',
  rating: 5,
  stock: 0,
  sales: 0,
  description: '',
  image: '',
  coverColor: 'bg-indigo-500',
  isbn: '',
  language: 'English',
  languages: [],
  publisher: '',
  publishedDate: '',
};

export const BOOK_CATEGORIES = Array.from(new Set(allBooks.map((b) => b.category))).sort();

export const COVER_COLORS = [
  'bg-indigo-500',
  'bg-emerald-500',
  'bg-rose-500',
  'bg-amber-500',
  'bg-cyan-500',
  'bg-purple-600',
  'bg-blue-600'
];

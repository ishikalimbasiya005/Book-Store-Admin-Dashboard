
export interface BookType {
  id: string;
  title: string;
  author: string;
  price: number;
  rating: number;
  category: string;   
  stock: number;      
  sales: number;      
  coverColor: string; 
  image?: string;    
  description?: string;
  isbn?: string;
  language?: string;
  languages?: string[];
  publisher?: string;
  publishedDate?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type BookBannerProps = {
  onAddClick?: () => void;
};

export interface BookCardProps {
  book: BookType;
  onEdit?: (book: BookType) => void;
  onSelect?: (book: BookType) => void;
  onDelete?: (id: string) => void;
}

export interface BookGridProps {
  books: BookType[];
  onEdit?: (book: BookType) => void;
  onSelect?: (book: BookType) => void;
  onDelete?: (id: string) => void;
}

export interface FilterState {
  search: string;
  category: string;
  author: string;
  sort: 'title' | 'price' | 'rating' | 'stock';
  language: string;
}

export interface BooksFilterProps {
  filters: FilterState;
  onChange: (f: FilterState) => void;
  resultCount: number;
}

export interface BookModalProps {
  open: boolean;
  mode: 'add' | 'edit';
  book?: BookType | null;
  onClose: () => void;
}

export type BookDetailsDrawerProps = {
  open: boolean;
  book?: BookType | null;
  onClose: () => void;
};

export interface LanguageSelectProps {
  value?: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  className?: string;
  status?: '' | 'error' | 'warning';
}

export interface BookState {
  books: BookType[];
  addBook: (book: BookType) => void;
  updateBook: (book: BookType) => void;
  deleteBook: (id: string) => void;
}

export interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}


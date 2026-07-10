import { motion } from 'framer-motion';
import BookCard from './BookCard';
import type { BookGridProps } from '../../Types';

const BookGrid = ({ books, onEdit, onSelect, onDelete }: BookGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full pb-10">
      {books.map((book, index) => (
        <motion.div key={book.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.06, ease: 'easeOut' }} whileHover={{ y: -4, transition: { duration: 0.2 } }}>
          <BookCard book={book} onEdit={onEdit} onSelect={onSelect} onDelete={onDelete} />
        </motion.div>
      ))}

      {books.length === 0 && (
        <div className="col-span-full text-center py-20 text-secondary-text text-base"> No books match your filters. </div>
      )}
    </div>
  );
};

export default BookGrid;

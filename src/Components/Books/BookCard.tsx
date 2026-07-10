import React from 'react';
import { EditOutlined } from '@ant-design/icons'; 
import { MdDeleteOutline } from "react-icons/md";
import { CommonButton } from '../../Attributes';
import { handleCommonDeleteAction } from '../Common/CommonMsg';
import type { BookCardProps } from '../../Types';
import { CommonRating } from '../Common';

const BookCard: React.FC<BookCardProps> = ({ book, onEdit, onSelect, onDelete }) => {
  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onEdit) { onEdit(book); }
  };
  const handleSelect = () => {
    if (onSelect) { onSelect(book); }
  };
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleCommonDeleteAction('Book', () => {
      if (onDelete) { onDelete(book.id); }
    });
  };
  return (
    <div className="book-card cursor-pointer" onClick={handleSelect}>

      {/* Left: Book Cover — real image or colored placeholder */}
      <div className={`book-card-cover ${book.coverColor}`}>
        {book.image ? (
          <img src={book.image} alt={`Cover for ${book.title}`} className="w-full h-full object-cover" />
        ) : (
          <span className="text-white text-3xl font-black opacity-80"> {book.title.charAt(0)} </span>
        )}
      </div>
      
      {/* Right: Content */}
      <div className="book-card-content">
        <h3 className="book-card-title"> {book.title} </h3>
        <p className="book-card-author text-primary-text!"> {book.author} </p>
        <p className="book-card-price"> ${book.price.toFixed(2)} </p>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-y-1">
          <CommonRating name={`rating-${book.id}`} value={book.rating} size="small" />
          <div className="flex gap-2">
            <CommonButton className="action-edit" title="Edit" onClick={handleEdit} icon={<EditOutlined className="text-lg" />} />
            <CommonButton className="action-delete" title="Delete" onClick={handleDelete} icon={<MdDeleteOutline className="text-lg" />} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;

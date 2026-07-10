import { PlusOutlined } from '@ant-design/icons';
import type { BookBannerProps } from '../../Types';
import { CommonButton } from '../../Attributes';

const BookBanner: React.FC<BookBannerProps> = ({ onAddClick }) => {
  return (
    <div className="book-banner">

      {/* Left Content */}
      <div className="book-banner-left">
        <h1 className="book-banner-title">Upload your book <br /> to increase your sales</h1>
        <p className="book-banner-desc"> Engage your shop book with this dashboard <br /> and make sales everyday to your shop </p>
        <div className="flex gap-4">
          <CommonButton className="book-button" onClick={onAddClick} icon={<PlusOutlined />} text="Add New Book" />
        </div>
      </div>

      {/* Right Image with Wavy Cutout */}
      <div className="book-banner-right">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" >
          <path d="M0,0 C60,0 60,33 100,33 C60,33 60,66 100,66 C60,66 60,100 0,100 Z" />
        </svg>
        <img src="/assets/Images/bookshelf_background.png" alt="Bookshelf Background" />
      </div>
    </div>
  );
};

export default BookBanner;

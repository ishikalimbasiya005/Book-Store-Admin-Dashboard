import React from 'react';
import Rating from '@mui/material/Rating';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import type { CommonRatingProps } from '../../Types';

export const CommonRating: React.FC<CommonRatingProps> = ({ value, name, precision = 0.5, readOnly = true, size = 'small', onChange, }) => {
  return (
    <Rating
      name={name}
      value={value}
      precision={precision}
      readOnly={readOnly}
      size={size}
      onChange={onChange}
      icon={<FavoriteIcon fontSize="inherit" className="icon-fav text-rose-500" />}
      emptyIcon={<FavoriteBorderIcon fontSize="inherit" className="icon-fav-empty text-gray-400" />}
    />
  );
};

import React from 'react';
import './ImageGalleryItem.css';

export const ImageGalleryList = ({
  picture,
  tags,
  largeImage,
  onOpenImage,
}) => {
  return (
    <li className="ImageGalleryItem">
      <img
        className="ImageGalleryItem-image"
        src={picture}
        alt={tags}
        onClick={() => onOpenImage(largeImage)}
      />
    </li>
  );
};

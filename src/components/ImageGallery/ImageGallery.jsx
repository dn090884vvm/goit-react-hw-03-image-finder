import React from 'react';
import { ImageGalleryList } from './ImageGalleryItem';
import './ImageGallery.css';

export const ImageGallery = ({ images, onImageClick }) => {
  return (
    <ul className="ImageGallery">
      {images.map(({ id, webformatURL, tags, largeImageURL }) => (
        <ImageGalleryList
          key={id}
          picture={webformatURL}
          largeImage={largeImageURL}
          tags={tags}
          onOpenImage={onImageClick}
        />
      ))}
    </ul>
  );
};

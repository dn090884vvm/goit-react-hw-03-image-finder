export const ImageGalleryList = ({ picture, onImageClick }) => {
  return (
    <li className="gallery-item">
      <img
        src={picture.webformatURL}
        alt=""
        width="100"
        height="100"
        onClick={() => onImageClick(picture.largeImageURL)}
      />
    </li>
  );
};

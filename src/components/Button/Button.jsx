import './Button.css';
export const Button = ({ onLoadMoreClick }) => (
  <button className="Button" onClick={onLoadMoreClick} type="button">
    Load More
  </button>
);

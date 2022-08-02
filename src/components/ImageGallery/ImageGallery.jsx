import React, { Component } from 'react';
import { ImageGalleryList } from './ImageGalleryItem';
import { List } from './ImageGallery.styled';
import { Button } from 'components/Button/Button';
// import picturesAPI from '../../services/fetch-api';
import Modal from 'components/Modal/Modal';

class ImageGallery extends Component {
  state = {
    pictures: [],
    isLoading: false,
    error: null,
    page: 1,
    showModal: false,
    bigImage: '',
  };

  fetchImages = (prevSearchValue, nextSearchValue) => {
    this.setState({ isLoading: true });
    const searchWord = this.props.searchWord;
    const { page } = this.state;
    fetch(
      `https://pixabay.com/api/?q=${searchWord}&page=${page}&key=28022649-289628139dcfe0cc9a597312e&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(
          new Error(`We did not find anything with ${nextSearchValue}`)
        );
      })
      .then(response => {
        if (response.hits.length === 0) {
          alert(`We did not find any picures with ${nextSearchValue}`);
          this.setState({ isLoading: false });
          return;
        }

        if (this.state.page > response.totalHits / 12) {
          alert(
            'We are sorry, but you have reached the end of search results.'
          );
          this.setState({ isLoading: false });
          return;
        }
        this.setState(prevState => ({
          isLoading: false,
          pictures: [...prevState.pictures, ...response.hits],
          page: (prevState.page += 1),
        }));
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  };

  componentDidUpdate(prevProps, prevState) {
    const prevSearchValue = prevProps.searchWord;
    const nextSearchValue = this.props.searchWord;

    if (prevSearchValue !== nextSearchValue) {
      this.fetchImages(prevSearchValue, nextSearchValue);
      this.setState({ page: 1, pictures: [] });
    }
  }

  openModal = image => {
    this.setState({
      showModal: true,
      bigImage: image,
    });
  };

  closeModal = () => {
    this.setState({ showModal: false, bigImage: '' });
  };
  render() {
    const { pictures, isLoading, error, showModal, bigImage } = this.state;

    return (
      <div>
        <List>
          {error && <p>{error.message}</p>}

          {isLoading && <p>Loading...</p>}
          {pictures.map(picture => (
            <ImageGalleryList
              key={picture.id}
              picture={picture}
              onImageClick={this.openModal}
            />
          ))}
          {this.state.page > 1 && <Button onLoadMoreClick={this.fetchImages} />}
        </List>
        {showModal && (
          <Modal onClose={this.closeModal}>
            <img src={bigImage} alt="" />
          </Modal>
        )}
      </div>
    );
  }
}

export default ImageGallery;

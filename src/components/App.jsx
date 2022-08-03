import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { getPictures } from 'services/axios-api';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import Modal from './Modal/Modal';
import './App.css';

class App extends Component {
  state = {
    searchWord: '',
    page: 1,
    pictures: [],
    isLoading: false,
    bigImage: '',
    error: null,
    showModal: false,
  };

  handleSearchFormSubmit = searchName => {
    this.setState({ searchWord: searchName, pictures: [], page: 1 });
  };

  componentDidUpdate(prevProps, prevState) {
    const prevValue = prevState.searchWord;
    const nextValue = this.state.searchWord;

    if (prevValue !== nextValue) {
      this.fetchImages();
    }
  }

  fetchImages = async () => {
    try {
      this.setState({ isLoading: true });
      const { searchWord, page } = this.state;
      const { data } = await getPictures(searchWord, page);

      if (data.hits.length === 0) {
        alert(
          'Sorry, there are no images matching your search query. Please try again'
        );
        this.setState({ isLoading: false });
        return;
      }
      if (this.state.page > data.totalHits / 12) {
        alert('We are sorry, but you have reached the end of search results.');
        this.setState({ isLoading: false });
        return;
      }
      this.setState(prevState => ({
        isLoading: false,
        pictures: [...prevState.pictures, ...data.hits],
        page: prevState.page + 1,
      }));
    } catch (error) {
      console.log(error);
    }
  };

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
    const { searchWord, page, pictures, isLoading, showModal, bigImage } =
      this.state;

    const searchRequest = this.handleSearchFormSubmit;
    return (
      <div className="App">
        <Searchbar onSubmit={searchRequest} />
        {<ImageGallery images={pictures} onImageClick={this.openModal} />}
        {isLoading && (
          <div className="Load">
            <Loader />
          </div>
        )}
        {page > 1 && <Button onLoadMoreClick={this.fetchImages} />}
        {showModal && (
          <Modal onClose={this.closeModal}>
            <img src={bigImage} alt={searchWord} />
          </Modal>
        )}
      </div>
    );
  }
}

export default App;

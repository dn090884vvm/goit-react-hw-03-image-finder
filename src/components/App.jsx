import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

class App extends Component {
  state = {
    searchword: '',
  };

  handleSearchFormSubmit = searchName => {
    this.setState({ searchword: searchName });
  };

  render() {
    const { searchword } = this.state;
    const searchRequest = this.handleSearchFormSubmit;
    return (
      <>
        <Searchbar onSubmit={searchRequest} />
        <div>{<ImageGallery searchWord={searchword} />}</div>
      </>
    );
  }
}

export default App;

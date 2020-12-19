import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import s from './App.module.css';
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Button from './components/Button/Button';
import Modal from './components/Modal/Modal';
import Loader from './components/Loader/Loader';
import apiServices from './apiServices/apiServices';

class App extends Component {
  state = {
    showModal: false,
    searchQuery: '',
    page: 1,
    loading: false,
    images: [],
    largeImage: '',
  };

  handleSearchSubmit = searchQuery => {
    if (this.state.searchQuery !== searchQuery)
      this.setState({
        images: [],
        searchQuery: searchQuery,
        page: 1,
      });
  };

  handleOpenLargeImage = imageUrl => {
    this.setState({
      showModal: true,
      largeImage: imageUrl,
    });
  };

  handleAddPage = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  componentDidUpdate(prevProps, prevState) {
    const { page, searchQuery } = this.state;

    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      this.setState({
        loading: true,
      });
      apiServices
        .fetchImages(searchQuery, page)
        .then(data => {
          this.setState(prevState => ({
            images: [...prevState.images, ...data.hits],
          }));
        })
        .catch(error => console.error(error))
        .finally(() => this.setState({ loading: false }));
    }
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { images, showModal, loading, largeImage } = this.state;
    const buttonIsVisible = images.length > 0 && !loading;

    return (
      <div className={s.app}>
        <Searchbar onSearch={this.handleSearchSubmit} />
        <ImageGallery iamges={images} onOpenImage={this.handleOpenLargeImage} />
        <div className={s.boxSpinner}>
          <Loader loading={loading} />
        </div>
        {buttonIsVisible && <Button onClick={this.handleAddPage} />}
        {showModal && (
          <Modal onClose={this.toggleModal} onLargeImage={largeImage} />
        )}
        <ToastContainer />
      </div>
    );
  }
}

export default App;

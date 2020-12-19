import React, { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import s from './Searchbar.module.css';
import PropTypes from 'prop-types';

class Searchbar extends Component {
  state = {
    searchValue: '',
  };

  static propTypes = {
    onSearch: PropTypes.func,
  };

  handleChange = ({ target }) => {
    this.setState({ searchValue: target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { searchValue } = this.state;
    if (searchValue.trim() === '') {
      toast.warn('Введите ключевое слово для поиска изображения', {
        position: toast.POSITION.TOP_LEFT,
      });
      return;
    }
    this.props.onSearch(searchValue);
    this.setState({ searchValue: '' });
  };

  render() {
    const { searchValue } = this.state;
    return (
      <header className={s.searchbar}>
        <form className={s.searchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={s.searchFormButton}>
            <span className={s.searchFormButtonLabel}>Search</span>
          </button>

          <input
            className={s.searchFormInput}
            type="text"
            name="searchValue"
            value={searchValue}
            onChange={this.handleChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;

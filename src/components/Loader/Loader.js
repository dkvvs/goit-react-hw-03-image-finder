import React, { Component } from 'react';
import PuffLoader from 'react-spinners/PuffLoader';
import PropTypes from 'prop-types';

class Loader extends Component {
  render() {
    const { loading } = this.props;
    return (
      <div className="sweet-loading">
        <PuffLoader size={80} color="#df101b" loading={loading} />
      </div>
    );
  }
}

Loader.propTypes = {
  loading: PropTypes.bool,
};

export default Loader;

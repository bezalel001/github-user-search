import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

class Search extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = { searchTerm: '' };
  }

  onFormSubmit = event => {
    event.preventDefault();
    const { searchTerm } = this.state;
    const { onSubmit } = this.props;
    onSubmit(searchTerm);
  };

  render() {
    const { searchTerm } = this.state;
    return (
      <div className="search">
        <form
          onSubmit={this.onFormSubmit}
          className="search__form"
          autoComplete="off"
        >
          <div className="search__form-control">
            <input
              type="text"
              className="search__form-input"
              placeholder="GitHub username"
              id="username"
              value={searchTerm}
              onChange={e => this.setState({ searchTerm: e.target.value })}
            />
            <label htmlFor="username" className="search__form-label">
              Please enter your GitHub username
            </label>
          </div>

          <div className="search__form-control">
            <button type="button" className="btn btn--green">
              Find User
            </button>
          </div>
        </form>
      </div>
    );
  }
}
export default Search;

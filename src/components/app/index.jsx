import React from 'react';

import './style.css';

import Search from '../search';
import github from '../../api/github';
import User from '../user';

const PER_PAGE = 10; // number of search results per page

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: '',
      totalNumberOfUsers: 0,
      usersPerPage: [],
      currentPage: 1,
      lastPageNumber: 1,
      link: ''
    };
  }

  onSearchSubmit = async searchTerm => {
    try {
      const response = await github.get('/search/users', {
        params: {
          q: searchTerm,
          page: this.state.currentPage,
          per_page: PER_PAGE
        }
      });
      const totalNumberOfUsers = await response.data.total_count;
      const usersPerPage = await response.data.items;
      const link = await response.headers.link;

      console.log(`User per page: ${usersPerPage}`);

      // extract the last page number from the link header
      if (this.state.currentPage === 1 && link) {
        const pages = link.split(' ');
        console.log(`pages: ${pages}`);
        const lastPage = pages[pages.length - 2];
        console.log(`Last page: ${lastPage}`);
        const lastPageUrl = lastPage.substring(1, lastPage.length - 2);
        console.log(`Last page url: ${lastPageUrl}`);
        console.log(`Last page url split: ${lastPageUrl.split('&')[1]}`);
        const lastPageNumber = lastPageUrl.split('&')[1].substring(5);
        console.log(`Last page number: ${lastPageNumber}`);
        this.setState({ lastPageNumber });
      }

      this.setState({ searchTerm, totalNumberOfUsers, usersPerPage, link });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <div className="container-fluid">
        <div className="app">
          <header className="header">
            <h1 className="header__header-title">GitHub User Search</h1>
          </header>
          <Search onSubmit={this.onSearchSubmit} />
          {this.state.usersPerPage.length && (
            // eslint-disable-next-line react/jsx-one-expression-per-line
            <h2>Found {this.state.totalNumberOfUsers} GitHub users </h2>
          )}

          <User user={this.state.usersPerPage} />
        </div>
      </div>
    );
  }
}
export default App;

import React from "react";

import "./style.css";

import Search from "../search";
import github from "../../api/github";
import UserList from "../users-list";
import Pagination from "../pagination";

class App extends React.Component {
  state = {
    totalNumberOfUsers: null,
    users: [],
    currentPage: null,
    totalPages: null,
    pageLimit: 10,
    pageNeighbours: 1,
    error: null
  };

  onSearchSubmit = async (term, page = 1, pageLimit = 10) => {
    try {
      const response = await github.get("/search/users", {
        params: { q: term, page, per_page: pageLimit }
      });
      await this.setState({
        totalNumberOfUsers: response.data.total_count,
        users: response.data.items,
        term,
        currentPage: page
      });
    } catch (error) {
      this.setState({ error });
    }
  };

  onPageChanged = data => {
    const { currentPage, totalPages, pageLimit } = data;
    const { term } = this.state;
    this.onSearchSubmit(term, currentPage, pageLimit);

    this.setState({ currentPage, totalPages });
  };

  render() {
    const {
      totalNumberOfUsers,
      users,
      pageLimit,
      pageNeighbours,
      error
    } = this.state;

    if (error) {
      return <div className="error">{error}</div>;
    }

    return (
      <div className="container-fluid">
        <div className="app">
          <header className="header">
            <h1 className="header__header-title">GitHub User Search</h1>
          </header>
          <Search onSubmit={this.onSearchSubmit} />
          {users.length > 0 && (
            // eslint-disable-next-line react/jsx-one-expression-per-line
            <h2 className="users-found">
              Found 
{' '}
{totalNumberOfUsers}
{' '}
GitHub users
</h2>
          )}

          <UserList users={users} />

          {totalNumberOfUsers && (
            <Pagination
              totalRecords={totalNumberOfUsers}
              pageLimit={pageLimit}
              pageNeighbours={pageNeighbours}
              onPageChanged={this.onPageChanged}
            />
          )}
        </div>
      </div>
    );
  }
}

export default App;

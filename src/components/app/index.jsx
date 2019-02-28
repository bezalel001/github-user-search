import React from "react";

import "./style.css";

import axios from "axios";

import Search from "../search";
import github from "../../api/github";
import UserList from "../users-list";
import Pagination from "../pagination";
import Loading from "../common/loading";

class App extends React.Component {
  signal = axios.CancelToken.source();

  state = {
    totalNumberOfUsers: null,
    users: [],
    currentPage: null,
    totalPages: null,
    pageLimit: 10,
    pageNeighbours: 1,
    error: null,
    loading: false,
    term: ""
  };

  onSearchSubmit = async (term, page = 1, pageLimit = 10) => {
    try {
      this.setState({ term });

      if (!term) {
        return "";
      }

      this.setState({ loading: true });

      const response = await github.get("/search/users", {
        params: { q: term, page, per_page: pageLimit },
        cancelToken: this.signal.token
      });
      this.setState({
        loading: false,
        totalNumberOfUsers: response.data.total_count,
        users: response.data.items,
        currentPage: page
      });
      return response;
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log(`Error in axios token`);
      } else {
        this.setState({ error: error.message });
      }
    }
  };

  onPageChanged = data => {
    const { currentPage, totalPages, pageLimit } = data;
    const { term } = this.state;
    this.onSearchSubmit(term, currentPage, pageLimit);

    this.setState({ currentPage, totalPages, loading: false });
  };

  render() {
    const {
      totalNumberOfUsers,
      users,
      pageLimit,
      pageNeighbours,
      error,
      loading,
      term
    } = this.state;

    if (loading) {
      return (
        <div className="loading__container">
          <Loading />
        </div>
      );
    }
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

          {term && <UserList users={users} />}

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

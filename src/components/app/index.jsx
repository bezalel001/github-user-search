import React from 'react';

import './style.css';

import Search from '../search';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.state = { term: '' };
  }

  onSearchSubmit(searchTerm) {
    this.setState({ term: searchTerm });
    console.log(searchTerm);
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="app">
          <header className="header">
            <h1 className="header__header-title">GitHub User Search</h1>
          </header>
          <Search onSubmit={this.onSearchSubmit} />
        </div>
      </div>
    );
  }
}
export default App;

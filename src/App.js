import React from 'react';
import './App.css';
import SearchForm from './components/SearchForm/SearchForm'

class App extends React.Component {
  
  constructor() {
    super();

    this.state = {
      searchTerm: '',
      isFetchingJokes: false,
      jokes: []
    }

    this.onSearchChange = this.onSearchChange.bind(this);
    this.searchJokes = this.searchJokes.bind(this);
  }

  searchJokes(limit) {
    this.setState({ isFetchingJokes: true });

    // cleaning the state before every request
    this.setState({ jokes: [] });

    fetch(
      `https://icanhazdadjoke.com/search?term=${
      this.state.searchTerm
      }&limit=${limit}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json'
        }
      }
    )
    .then (response => response.json())
    .then (json => {
      const jokes = json.results;
      this.setState({
        searchTerm: '',
        jokes: jokes,
        isFetchingJokes: false
      })
    });
  }

  onSearchChange(value) {
    this.setState ({
      searchTerm: value
    });
  }

  renderJokes() {
    return (
      <ul className="jokes-list">
        {this.state.jokes.map(item => 
          <li key={item.id}>{item.joke}</li>
        )}
      </ul>
    )
  }

  render() {
    return (
      <div className="App">
        <img
          className="logo"
          src={require("./img/ai.png")}
          alt="ai"
        />
        <h4>try "cat" or "dog"</h4>
        <SearchForm
          onFormSubmit = {this.searchJokes}
          onSearchValueChange = {this.onSearchChange}
          isSearching = {this.state.isFetchingJokes}
          onSingleSearchClick = {() => this.searchJokes(1)}
        />

        {this.state.isFetchingJokes
          ? 'Searching for jokes...'
          : this.renderJokes()
        }
      </div>
    );
  }
}

export default App;
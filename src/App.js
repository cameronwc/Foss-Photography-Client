import './App.css';
import Search from './components/search'
import Results from './components/results'
import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.url = 'https://pixel-helper-api.herokuapp.com/api'
    this.fetchPictures = this.fetchPictures.bind(this)
    this.search = this.search.bind(this)
    this.updateTerm = this.updateTerm.bind(this)
    this.hitBottom = this.hitBottom.bind(this)
    
    this.state = {
      'pictures': [],
      'page': 1,
      'term': 'mountains'
    }
  }
  
  componentDidMount() {
    this.fetchPictures()
  }

  fetchPictures() {
    let url = this.url + `?q=${this.state.term}&page=${this.state.page}`
    let currentPictures = this.state.pictures
    return fetch(url)
      .then((res) => res.json())
      .then((newPictures) => {
        let newSet = currentPictures.concat(newPictures)
        this.setState({'pictures': newSet});
      })
      .catch((err) => {
        console.log(err);
      })
  }

  search() {
    this.setState({'pictures': []})
    this.fetchPictures();
  }

  updateTerm(term) {
    this.setState({'term': term, 'page': 1});
  }

  hitBottom() {
    this.setState({'page': this.state.page + 1})
    this.fetchPictures()
  }

  render() {
    return (
      <div className="App">
        <Search search={this.search} updateTerm={this.updateTerm} />
        <p className='text-gray-500 py-4 pt-20'>Completely free images. Use anywhere, no attribution or license necessary.</p>
        <Results pictures={this.state.pictures} hitBottom={this.hitBottom} />
      </div>
    );
  }
}

export default App;

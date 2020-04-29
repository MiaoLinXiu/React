import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Header from './components/Header';
import Movie from './components/Movie';
import Search from './components/Search';

function App() {
  const [loading, setLoding] = useState(true);
  const [movies, setMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    //useEffectHook视作componentDidMount，componentDidUpdate和componentWillUnmount的组合体。
    axios.get('https://www.omdbapi.com/?s=man&apikey=4a3b711b').then(res => {
      if(res.data.Response === 'True'){
        setMovies(res.data.Search);
        setLoding(false);
      }
    }).catch(err => {
      console.log(err)
    })
  })

  const search = (searchVal) => {
    setLoding(true);
    setErrorMessage(null);
    axios.get(`https://www.omdbapi.com/?s=${searchVal}&apikey=4a3b711b`).then(res => {
      if(res.data.Response === 'True'){
        setMovies(res.data.Search);
        setLoding(false);
      }else{
        setErrorMessage(res.data.Error);
        setLoding(false);
      }
    })
  }

  return (
    <div className="App">
      <Header text="Hooked" />
      <Search search={search}/>
      <p className="App-intro">Sharing a few of our favourite movies</p>
      <div className="Movies">
        {loading && !errorMessage ? (
          <span>loading...</span>
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) :(
          movies.map((movie, index) => {
            return <Movie key={index} movie={movie}/>
          })
         )
        }
      </div>
    </div>
  );
}

export default App;

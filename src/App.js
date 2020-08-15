import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import axios from 'axios'
import { MovieListContext } from './contexts/MovieListContext'
import Library from './pages/Library'
import Watch from './pages/Watch'

function App() {

  const [MovieList, setMovieList] = useState()

  useEffect(() => {
    const url = 'http://localhost:5000/anime/all'
    axios.get(url)
      .then(res => {
        setMovieList(res.data)
      })
  }, [])

  return (
    <div className="App">
      <Router>
        <Switch>
          <MovieListContext.Provider value={MovieList}>
            <Route path="/" exact component={Library} />
            <Route path="/watch/:title" component={Watch} />
          </MovieListContext.Provider>
        </Switch>
      </Router>
    </div>
  )
}

export default App

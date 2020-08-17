import React, { useState, useReducer } from 'react'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Library from './pages/Library'
import Watch from './pages/Watch'

function App() {

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Library} />
          <Route path="/watch/:title" component={Watch} />
        </Switch>
      </Router>
    </div>
  )
}

export default App

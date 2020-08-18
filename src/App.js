import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Library from './pages/Library'
import Watch from './pages/Watch'
import { DatabaseContext } from './contexts/DatabaseContext'
import axios from 'axios'

function App() {

  // Load database
  const [database, setDatabase] = useState([])
  useEffect(() => {
    axios
      .get('http://localhost:5000/database')
      .then(res => { setDatabase(res.data) })
    
  }, [])

  if (database.length == 0) return 'Loading ...'
  return (
    <div className="App">
        <Router>
          <DatabaseContext.Provider value={{database, setDatabase}}>
            <Switch>
              <Route path="/" exact component={Library} />
              <Route path="/watch/:id" component={Watch} />
            </Switch>
          </DatabaseContext.Provider>
        </Router>
    </div>
  )
}

export default App

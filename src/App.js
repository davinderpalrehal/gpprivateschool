import React from 'react'
import './App.scss'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import Home from './pages/Home'
import Pay from './pages/Pay'
import Header from './components/Header'

function App () {
  return (
    <Router>
      <div className='gb'>
        <Header />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/pay' exact component={Pay} />
        </Switch>
      </div>
    </Router>
   )
}

export default App;

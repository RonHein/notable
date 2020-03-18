import React, {Component} from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Appointments from './components/Appointments';
import Physicians from './components/Physicians';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Physicians/>
          <Route path="/appointments/:id" component={Appointments} />
        </div>
      </Router>
    );
  }
}

export default App;

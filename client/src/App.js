import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import landingPage from './pages/LandingPage';
import selectBoard from './pages/SelectBoard';

function App() {
  return (
    <Router>
        <Switch>
          <Route exact path="/" component={landingPage} />
          <Route exact path="/selectBoard" component={selectBoard} />
        </Switch>
        {/* <Footer/> */}
    </Router>
  );
}

export default App;

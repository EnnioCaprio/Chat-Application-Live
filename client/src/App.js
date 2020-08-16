import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Join from './components/Join';
import Chat from './components/Chat';
import './App.css';
import { UserProvider } from './context/UserContext';

function App() {

  return (
   <UserProvider>
      <div className="container">
        <Router>
          <Switch>
            <Route path="/" exact component={Join}/>
            <Route path="/chat" exact component={Chat}/>
          </Switch>
        </Router>
      </div>
    </UserProvider>
  );
}

export default App;
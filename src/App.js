import Login from './components/Auth/Login';
import Register from './components/Auth/Register'
import Chat from './components/Chat/Chat'

import { BrowserRouter as Router,Route,Switch, Routes} from 'react-router-dom'


import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
      <Routes path='/'Component={Chat}/>
      <Routes path='/login'Component={Login}/>
      <Routes path='/'Component={Register}/>
      </Router>
    </div>
  );
}

export default App;

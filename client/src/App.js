import './App.css';
import SignIn from './Components/SignIn'
import SignUp from './Components/SignUp'
import Dashboard from './Components/Dashboard'
import { HashRouter , Route , Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <HashRouter >
          <Switch>
             <Route exact path='/' component = {SignIn} />
             <Route path='/register' component = {SignUp} />
             <Route path='/dashboard' component = {Dashboard} />
          </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
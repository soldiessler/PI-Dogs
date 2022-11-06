import { Switch, Route, BrowserRouter} from 'react-router-dom';
import LandingPage from './components/landing/LandingPage';
import Detail from './components/detail/Detail';
import Create from './components/create/Create';
import Home from './components/home/Home';


function App() {
  return (
  <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path='/' component={LandingPage}/>
        <Route exact path='/home' component={Home}/>
        <Route exact path='/dogs/:id' component={Detail}/>
        <Route exact path='/create' component={Create}/>
      </Switch>  
    </div>
  </BrowserRouter>
  );
}

export default App;

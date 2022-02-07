import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Home from "./Routes/Home";
import Search from "./Routes/Search";
import Tv from "./Routes/Tv";

function App() {
  
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Header/>
      <Switch>
        <Route path="/tv">
          <Tv/>
        </Route>
        <Route path="/search">
        <Search/>
          </Route>
        <Route path={["/","/movies/:movieId"]}>
        <Home/>
          </Route>
      </Switch>
      <Footer/>
    </Router>
  );
}

export default App;

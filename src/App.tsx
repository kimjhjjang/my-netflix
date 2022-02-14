import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Browse from "./Routes/Browse";
import Home from "./Routes/Home";
import Main from "./Routes/Main";
import ManageProfiles from "./Routes/ManageProfiles";
import Search from "./Routes/Search";
import Tv from "./Routes/Tv";

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Header />
      <Switch>
        <Route path="/tv">
          <Tv />
        </Route>
        <Route path="/search">
          <Search />
        </Route>
        <Route path="/browse">
          <Browse />
        </Route>
        <Route path="/manageProfiles">
          <ManageProfiles />
        </Route>
        <Route path={["/home","/movies/:movieId"]}>
          <Home />
        </Route>
        <Route path={["/" ]}>
          <Main />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;

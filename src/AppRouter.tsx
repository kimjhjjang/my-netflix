import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "Routes/Login";
import Signup from "Routes/SignUp";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Browse from "./Routes/Browse";
import Home from "./Routes/Home";
import Main from "./Routes/Main";
import ManageProfiles from "./Routes/ManageProfiles";
import Search from "./Routes/Search";
import Tv from "./Routes/Tv";

function AppRouter({ isLoggedIn, currentUser, isProfiles, selectedProfile }: any) {
  return (
    <Router/*  basename={process.env.PUBLIC_URL} */>
      <Header isLoggedIn={(isLoggedIn)} isProfiles={isProfiles} selectedProfile={selectedProfile}/>
      
        {isLoggedIn ? (
          <Switch>
            <Route path="/tv">
              <Tv />
            </Route>
            <Route path="/search">
              <Search />
            </Route>
            <Route path="/browse">
              <Browse currentUser={currentUser} isProfiles={isProfiles} selectedProfile={selectedProfile}/>
            </Route>
            <Route path="/manageProfiles">
              <ManageProfiles currentUser={currentUser} isProfiles={isProfiles} selectedProfile={selectedProfile} />
            </Route>
            <Route path={["/home", "/movies/:movieId"]}>
              <Home />
            </Route>
            <Route path="/signup">
              <Signup isLoggedIn={isLoggedIn}/>
            </Route>
            <Route path={["/"]}>
              <Main isLoggedIn={isLoggedIn}/>
            </Route>
          </Switch>
        ) : (
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <Signup isLoggedIn={isLoggedIn} />
            </Route>
            <Route path={["/"]}>
              <Main isLoggedIn={isLoggedIn}/>
            </Route>
            </Switch>
        )}
      <Footer />
    </Router>
  );
}

export default AppRouter;
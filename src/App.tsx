import { authService } from "fbase";
import { useState } from "react";
import AppRouter from "./AppRouter";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  return (
    <AppRouter isLoggedIn={isLoggedIn}/>
  );
}

export default App;

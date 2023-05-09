import React, {useState} from "react";
import "./App.css";
// this are the imports needed to work
import { BrowserRouter, Link, Route, Routes as Switch } from "react-router-dom";
import Favorites from "./components/favorite";
import Home from "./components/Home";
import { FavoritesProvider } from "./context/FavoriteContext";

function App() {
  const [activeLink, setActiveLink] = useState("/");

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };
  return (
    // i added the react-router-dom to help in page navigation, this is what is used for page navigation.
    // you need to have <BrowserRouter></BrowserRouter> wrapping the whole app otherwise its not going tp work.
    <BrowserRouter>
      <div className="App">
        <h1>Products</h1>
        <nav>
        <ul>
      <li>
        {/* Link is same as <a href=""> but to instead we say to="/" */}
        <Link
          to="/"
          style={{ fontWeight: activeLink === "/" ? "bold" : "normal", textDecoration: activeLink === "/" ? "underline" : "none" }}
          onClick={() => handleLinkClick("/")}
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          to="/favorites"
          style={{ fontWeight: activeLink === "/favorites" ? "bold" : "normal", textDecoration: activeLink === "/favorites" ? "underline" : "none" }}
          // the onclick is going to change the state so we can applly different styling when the clicked navigation link is for the active page.
          onClick={() => handleLinkClick("/favorites")}
        >
          Favorites
        </Link>
      </li>
    </ul>
        </nav>

{/* to use the routing this how is done below, first start with Switch, then Route where you need to add the path that is going to be pointed on the browser and the element that is going to be renderd when that path is pointed */}
        <Switch>
          <Route path="/" element={<Home />} />

          <Route
            path="/favorites"
            element={
              <FavoritesProvider>
                <Favorites />
              </FavoritesProvider>
            }
          />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;

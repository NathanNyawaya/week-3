import React, { createContext, useState, useEffect } from "react";
// we use createContext hook to create new context
// context is going to help us to share the state to every component that needs the state. 
// Because our favourite page is going to need the ids that were likes so we can show them on the favorite page we use context here.

// we are exporting the context so we can use it anywhere we need to access the state. in our case the liked id array
export const FavoriteContext = createContext([]);


export const FavoritesProvider = ({ children }) => {
  // this is the array that we are going to share across the components "favorites"
  const [favorites, setFavorites] = useState(() => {
    // we check if there were any products likes before in the local storage
    const storedFavorites = localStorage.getItem("favorites");
    // if there is we return the array by "JSON.parse(storedFavorites)", if there is no products liked, we return an empty array []
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  // this function toggles the like icon on and off, its takes in a id prop that will actually be saved to the context array.
  const toggleFavorite = (id) => {
    // we check if the context array contains the id of the clicked product if yes we remove the id from the array, otherwise we add it to the array.
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favoriteId) => favoriteId !== id));
    } else {
      // the "...favorites" is called spreading, it takes all the data from the array and copies it to a new array and the "id" id added to the new array
      setFavorites([...favorites, id]);
    }
  };

  // this saves the data to the local storage so that we can persist the data from page to page. it runs eveytime the "favorites" array changes
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  return (
    // we wrap all the components that are going to need the state  with the "<FavoriteContext.Provider> <FavoriteContext.Provider/>", also see we are passing the favorites state, and toggleFavorite function to the components so that they can access and toggle the like icon.
    <FavoriteContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};

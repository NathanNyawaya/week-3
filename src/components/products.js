import React, { useEffect, useState } from "react";
import { ProductsItem } from "./products-item";
// we impoetr our custom hook
import { useFetch } from '../customHook/useFetch';
import { FavoritesProvider } from "../context/FavoriteContext";

export const Products = ({ categoryName, loadin }) => {
  const [isLoaded, setIsLoaded] = useState(loadin);
  const [categoryProducts, setCategoryProducts] = useState([]);
  // our custom hook works by passing an array as below, and we get the data, error, in return.
  const { data: categoryData, error } = useFetch(
    categoryName ? `https://fakestoreapi.com/products/category/${categoryName}` : "https://fakestoreapi.com/products"
  );

  // here we are checking if the category exists and the setting our state respectively with the false and new data we just received from our custom hook
  useEffect(() => {
    if (categoryData) {
      setIsLoaded(false);
      setCategoryProducts(categoryData);
    }
    // notice we have [categoryData, isLoaded] as our dependency array, to mean, it will execute everytime one of the two changes.
  }, [categoryData, isLoaded]);

  // if for some reason we get an error when fetchin the data we are going to display the error with the following code
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
    {/* we want to make sure that the isloaded is true and then we can show loading */}
      {isLoaded && (
        <div className="loading--notification">
          <p className="loading">Loading...</p>
        </div>
      )}
      {/* we only share the products when the isloaded is false here. */}
      {!isLoaded && (
        // we are wrapping our productsItem with the FavoriteProvider because we want it to access the array in the context state
        <FavoritesProvider>
          <ul className="products">
            {categoryProducts.map((product) => {
              return (
                <li key={product.id} className="products--item">
                  <ProductsItem product={product} id={product.id} />
                </li>
              );
            })}
          </ul>
        </FavoritesProvider>
      )}
    </>
  );
};

import React, { useContext } from "react";
// we are using our FavoriteContext here
import { FavoriteContext } from "../context/FavoriteContext";
import { heartRegular, heartSolid } from "../assets";

export const ProductsItem = ({ product }) => {
  // we destructure the product object just to help us not to write product.title/product.image down below
  const { title, image, id } = product;
  // this is how the context we set earlier works, we destructure the favorites and toggleFavorite from the FavoriteCOntext
  const { favorites, toggleFavorite } = useContext(FavoriteContext);
  // we check if the product is already liked, so we check it if it is in the context array 
  const isFavorite = favorites.includes(id);
  

  return (
    <div className="product-card">
      <div className="product-card__image">
        <img className="product--image" src={image} alt={title} />
        <button
          className="product-card__like-button"
          // the onclick helps us toggleFavorite  add or remove
          onClick={() => toggleFavorite(id) }
        >
          <img
          // if the isFavorite returns true from the above check we use a solid black icon otherwise just a regular to show it is not yet liked
            src={isFavorite ? heartSolid : heartRegular}
            alt={isFavorite ? "liked" : "like"}
          />
        </button>
      </div>
      <div className="product-card__info">
        <span className="product--title" title={title}>
          {title}
        </span>
      </div>
    </div>
  );
};

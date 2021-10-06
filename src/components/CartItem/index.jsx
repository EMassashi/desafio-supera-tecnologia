import { Button } from "@mui/material";
import "./index.css";
import React from "react";

export default ({ item, addToCart, removeFromCart }) => {
  return (
    <div className="cart-item">
      <div>
        <h3>{item.name}</h3>

        <div className="price">
          <p>Price: R$ {item.price}</p>
          <p>Total: R$ {(item.amount * item.price).toFixed(2)}</p>
        </div>

        <div className="buttons">
          <Button
            size="small"
            disableElevation
            variant="contained"
            onClick={() => removeFromCart(item.id)}
          >
            -
          </Button>

          <p>{item.amount}</p>

          <Button
            size="small"
            disableElevation
            variant="contained"
            onClick={() => addToCart(item)}
          >
            +
          </Button>
        </div>
      </div>
      <img
        src={`/images/${item.image}`}
        alt={item.name}
        className="product-img"
      />
    </div>
  );
};

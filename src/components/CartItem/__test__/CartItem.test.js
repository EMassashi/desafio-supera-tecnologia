import { render } from "@testing-library/react";
import CartItem from "../index";
import productList from "../../../assets/products.json";
import App from "../../../App";

test("is rendering without crashes", () => {
  const item = productList[0];
  render(
    <CartItem
      key={item.id}
      item={item}
      addToCart={App.handleAddToCart}
      removeFromCart={App.handleRemoveFromCart}
    />
  );
});

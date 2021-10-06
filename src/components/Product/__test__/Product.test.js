import { render, fireEvent, screen, cleanup } from "@testing-library/react";
import Product from "../index";
import productList from "../../../assets/products.json";

afterEach(() => {
  cleanup();
});

test("is rendering without crashes", () => {
  const item = productList[0];
  render(<Product item={item} handleAddToCart={Product.handleAddToCart} />);
});

test("ís rendering correctly", () => {
  const item = productList[0];

  render(<Product item={item} handleAddToCart={Product.handleAddToCart} />);

  const element = screen.getByTestId("test-card");
  expect(element).toContainHTML("img");
  expect(element).toHaveTextContent(item.name.substring(0, 17));
  expect(element).toHaveTextContent(item.price);
  expect(element).toHaveTextContent(item.score);
  expect(element).toContainHTML("Button");
});

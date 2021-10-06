import { render, fireEvent, screen, cleanup } from "@testing-library/react";
import App from "./App";

afterEach(cleanup);

test("should render grid layout", () => {
  render(<App />);
  const gridElement = screen.getByTestId("grid-test-01");
  expect(gridElement).toBeInTheDocument();
});

test("should add item to cart", () => {
  const { getAllByText } = render(<App />);
  expect(getAllByText("ADD TO CART").textContent).toBeInTheDocument;
  fireEvent.click(getAllByText("ADD TO CART")[0]);
});

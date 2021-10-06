import "./index.css";
import CartItem from "../CartItem";
import CancelIcon from "@material-ui/icons/Cancel";

export default ({
  cartItems,
  addToCart,
  removeFromCart,
  setCartIsOpen,
  getTotalItems,
}) => {
  const calculateSubTotal = (items) =>
    items.reduce((ack, item) => ack + item.amount * item.price, 0);

  const calculateShippingFee = (items) => {
    if (calculateSubTotal(items) > 250) {
      return 0;
    } else {
      return 10 * getTotalItems(items);
    }
  };

  return (
    <div className="shopping-cart">
      <div className="shopping-cart-header">
        <h3 className="shopping-cart-title">Shopping Cart</h3>
        <CancelIcon
          className="close-button"
          onClick={() => setCartIsOpen(false)}
        />
      </div>

      {cartItems.length === 0 ? (
        <div>
          <span className="no-item-placeholder">No items yet.</span>
          <CancelIcon visibility="hidden" className="close-button" />
        </div>
      ) : null}
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))}
      <div className="totals">
        <h3>Sub Total: R$ {calculateSubTotal(cartItems).toFixed(2)}</h3>

        <h3>
          Shipping Fee:
          {calculateShippingFee(cartItems) === 0
            ? " Free"
            : ` R$ ${calculateShippingFee(cartItems).toFixed(2)}`}{" "}
        </h3>
        
        <h2>
          Total: R$
          {(
            calculateShippingFee(cartItems) + calculateSubTotal(cartItems)
          ).toFixed(2)}
        </h2>
      </div>
    </div>
  );
};

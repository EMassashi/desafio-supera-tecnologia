//Style
import "./App.css";
//Components
import { Drawer, IconButton } from "@mui/material";
import Badge from "@material-ui/core/Badge";
import Cart from "./components/Cart";
import { Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import Product from "./components/Product";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
//assets
import ShoppingCart from "./assets/cart-icon.svg";
import productList from "./assets/products.json";

function App() {
  //States
  const [dataList, setDataList] = useState([]);
  const [sortType, setSortType] = useState("Price");
  const [cartIsOpen, setCartIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  //Insert amount property in the json
  productList.map((item) => {
    item.amount = 0;
  });

  const handleChange = (event) => {
    setSortType(event.target.value);
  };

  const handleAddToCart = (clickedItem) => {
    setCartItems((prev) => {
      const isItemInCart = prev.find((item) => item.id === clickedItem.id);
      //Item already in the cart just adds to the amount
      if (isItemInCart) {
        return prev.map((item) =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }
      //Item is added first time in the cart
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };

  const handleRemoveFromCart = (id) => {
    setCartItems((prev) =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          //If there is only one item it will remove from the cart
          if (item.amount === 1) return ack;
          //If there is more than one it will only subtract one from the total amount
          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ack, item];
        }
      }, [])
    );
  };

  //Get the total amount of all items in the cart
  const getTotalItems = (items) =>
    items.reduce((ack, item) => ack + item.amount, 0);

  useEffect(() => {
    //Sort Data from json file by user parameter
    const sortData = (type) => {
      let sorted;
      //Types of sorting options
      const types = {
        Price: "price",
        Score: "score",
        Name: "name",
      };
      const sortProperty = types[type];

      //Function to sort alphabetically
      const alphabeticalSort = () => {
        return function (a, b) {
          var result =
            a[sortProperty] < b[sortProperty]
              ? -1
              : a[sortProperty] > b[sortProperty]
              ? 1
              : 0;
          return result;
        };
      };
      //Conditional to sort using the alphabetical sorting function or numerical one
      if (sortProperty === "name") {
        sorted = [...productList].sort(alphabeticalSort());
      } else {
        sorted = [...productList].sort(
          (a, b) => b[sortProperty] - a[sortProperty]
        );
      }

      //Sets the useState of the data already sorted
      setDataList(sorted);
    };

    sortData(sortType);
  }, [sortType]);

  return (
    <div className="container">
      <Drawer
        anchor="right"
        open={cartIsOpen}
        onClose={() => setCartIsOpen(false)}
      >
        <Cart
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
          setCartIsOpen={setCartIsOpen}
          getTotalItems={getTotalItems}
        />
      </Drawer>

      <IconButton
        onClick={() => setCartIsOpen(true)}
        className="shopping-cart-button"
      >
        <Badge
          badgeContent={getTotalItems(cartItems)}
          color="error"
          data-testid="test-badge"
        >
          <img src={ShoppingCart} className="shopping-cart-icon" />
        </Badge>
      </IconButton>

      <div className="sort-filter">
        <FormControl sx={{ m: 1, minWidth: 80 }}>
          <InputLabel id="filter-label">Sort</InputLabel>
          <Select
            labelId="filter-label"
            id="select"
            value={sortType}
            onChange={handleChange}
            autoWidth
            label="filter"
          >
            <MenuItem value="Price">
              <em>Price</em>
            </MenuItem>
            <MenuItem value={"Score"}>Score</MenuItem>
            <MenuItem value={"Name"}>Name</MenuItem>
          </Select>
        </FormControl>
      </div>

      <Grid
        container
        spacing={3}
        className="product-list"
        id="product-list"
        data-testid="grid-test-01"
      >
        {dataList?.map((item, key) => (
          <Grid item key={key} className="product-list-item">
            <Product item={item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default App;

import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./index.css";

export default ({ item, handleAddToCart }) => {
  //subtract if name too large
  let itemName = item.name;
  if (itemName.length > 17) {
    itemName = item.name.substring(0, 17) + "...";
  }

  return (
    <Card
      className="card"
      data-testid="test-card"
      sx={{ maxWidth: 240, maxHeight: 427, minWidth: 240, minHeight: 427 }}
    >
      <CardMedia
        component="img"
        height="240"
        image={`/images/${item.image}`}
        alt={item.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {itemName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Score: {item.score}
          <br />
          <b className="item-price">R$ {item.price}</b>
        </Typography>
      </CardContent>
      <CardActions className="card--buttons">
        <Button onClick={() => handleAddToCart(item)} size="small">
          ADD TO CART
        </Button>
      </CardActions>
    </Card>
  );
};

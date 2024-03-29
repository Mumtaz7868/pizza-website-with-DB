const { json } = require("express");

function cartController() {
  return {
    index(req, res) {
      console.log(req.session.cart);
      res.render("customers/cart");
    },
    update(req, res) {
      // for the first time creating cart and adding basic object struct
      if (!req.session.cart) {
        req.session.cart = {
          items: {},
          totalQty: 0,
          totalPrice: 0,
        };
      }
      let cart = req.session.cart;
      // check if items does not exist
      if (!cart.items[req.body._id]) {
        cart.items[req.body._id] = {
          item: req.body,
          qty: 1,
        };
        cart.totalQty = cart.totalQty + 1;
        cart.totalPrice = Number(cart.totalPrice) + Number(req.body.price);
      } else {
        (cart.items[req.body._id].qty = cart.items[req.body._id].qty + 1),
          (cart.totalQty = cart.totalQty + 1),
          (cart.totalPrice = cart.totalPrice + req.body.price);
      }

      return res.json({ totalQty: req.session.cart.totalQty });
    },
  };
}
module.exports = cartController;

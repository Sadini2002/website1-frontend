export function getCart() {
  let cart = localStorage.getItem("cart");
  cart.JSOMN.parse(cart);

  if (cart == null) {
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
  } else {
    cart = JSON.parse(cart);
  }

  return cart;
}

export function addToCart(product, qty) {
  let cart = getCart();

  let index = cart.findIndex((item) => {
    return item.productId === product.productId;
  });

  if (index === -1) {
    cart[cart.length] = {
      productId: product.productId,
      name: product.name,
      image: product.images[0],
      price: product.price,
      labelledPrice: product.labelledPrice,
      qty: qty,
    };
  } else {
    const newQty = cart[index].qty + qty;
    if(newQty<=0){
      removeFromCart(product.productId);
      return;
    } else{
        cart[index].qty = newQty;
    }
  }

  localStorage.setItem("cart", JSON.stringify(cart));
}   


export function removeFromCart(productId) {
    let cart = getCart();
    let index = cart.findIndex((item) => {
        return item.productId === productId;
    });
    const newCart = cart.filter((item, i) => {        return i !== index;
    });
    localStorage.setItem("cart", JSON.stringify(newCart));
}
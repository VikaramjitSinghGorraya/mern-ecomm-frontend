export const addItem = (item = [], count = 0, next = f => f) => {
  let cart = [];

    if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
    }
    cart.push({
          ...item,
          count: 1
    });
      cart = Array.from(new Set(cart.map(p => p._id))).map(id => {
          return cart.find(p => p._id === id);
      });

      localStorage.setItem('cart', JSON.stringify(cart));
      next();
  
};


  export const itemTotal = () => {
    if (localStorage.getItem('cart')) {
        return JSON.parse(localStorage.getItem('cart')).length;
    }
    return 0;
};

export const totalQuantity = () =>{
  let cart = []
  let totalQuantity = 0
  cart = JSON.parse(localStorage.getItem('cart'));
  
  cart.map((product, i) => (
      totalQuantity += parseInt (cart[i].count)
  ));

  return totalQuantity
}

export const totalPrice = () =>{
  let cart = []
  let totalPrice = 0
  cart = JSON.parse(localStorage.getItem('cart'));
  
  cart.map((product, i) => (
      totalPrice += parseInt (cart[i].price * cart[i].count)
  ));

  return totalPrice
}

 export const editItem = (itemId, amount) => {

  let cart = [];

    if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
    }

    cart.map((product, i) => {
        if (product._id === itemId) {
            cart[i].count = amount;
        }
    });
localStorage.setItem('cart', JSON.stringify(cart));
  
}

  export const getCart = () => {
    if(localStorage.getItem('cart')){
      return JSON.parse(localStorage.getItem('cart'));
    }

    return []
  };

  export const removeItem = productId => {
    let cart = [];
   
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
        }

        cart.map((product, i) => {
            if (product._id === productId) {
                cart.splice(i, 1);
            }
        });

        localStorage.setItem('cart', JSON.stringify(cart));
    
    return cart;
};
  


export const emptyCart = next => {
  if (localStorage.getItem('cart')) {
      localStorage.removeItem('cart');
      next();
  }
}


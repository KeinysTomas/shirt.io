class OrderStorage {
    static addToCart(product) {
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      const existingProductIndex = cart.findIndex(item => item.id === product.id);
  
      if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity += 1;
        cart[existingProductIndex].subtotal = cart[existingProductIndex].quantity * cart[existingProductIndex].price;
      } else {
        cart.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1,
          subtotal: product.price
        });
      }
  
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  
    static removeFromCart(productId) {
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      cart = cart.filter(item => item.id !== productId);
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  
    static getCart() {
      return JSON.parse(localStorage.getItem('cart')) || [];
    }
  
    static clearCart() {
      localStorage.removeItem('cart');
      localStorage.removeItem('checkoutTotal');
      localStorage.removeItem('checkoutItems');
    }
  
    static saveOrder(customerDetails) {
      const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
      const totalAmount = localStorage.getItem('checkoutTotal');
      const orderId = 'ORD' + Date.now();
  
      const order = {
        orderId: orderId,
        customerDetails: customerDetails,
        items: cartItems,
        totalAmount: totalAmount,
        date: new Date().toISOString()
      };
  
      let orders = JSON.parse(localStorage.getItem('orders')) || [];
      orders.push(order);
      localStorage.setItem('orders', JSON.stringify(orders));
  
      return order; // Return the order object
    }
  
    static getOrders() {
      return JSON.parse(localStorage.getItem('orders')) || [];
    }
  
    static updateOrderStatus(orderId, newStatus) {
      let orders = JSON.parse(localStorage.getItem('orders')) || [];
      const orderIndex = orders.findIndex(order => order.orderId === orderId);
  
      if (orderIndex !== -1) {
        orders[orderIndex].status = newStatus;
        localStorage.setItem('orders', JSON.stringify(orders));
        return true;
      }
  
      return false;
    }
  }
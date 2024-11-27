class OrderStorage {
    static saveOrder(formData) {
        const orderData = {
            orderId: 'ORD-' + Date.now(),
            timestamp: new Date().toISOString(),
            customerDetails: {
                fullName: formData.fullName,
                email: formData.email,
                address: formData.address,
                city: formData.city,
                postCode: formData.postCode
            },
            orderItems: JSON.parse(localStorage.getItem('checkoutItems') || '[]'),
            totalAmount: localStorage.getItem('checkoutTotal'),
            status: 'completed'
        };

        const orders = JSON.parse(localStorage.getItem('orders') || '[]');
        orders.push(orderData);
       
        localStorage.setItem('orders', JSON.stringify(orders));
       
        return orderData;
    }

    static clearCart() {
        localStorage.removeItem('cartData');
        localStorage.removeItem('checkoutTotal');
        localStorage.removeItem('checkoutItems');
    }
}
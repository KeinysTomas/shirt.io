class OrderStorage {
    static async saveOrder(formData) {
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

        try {
            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });

            if (!response.ok) {
                throw new Error('Failed to save order');
            }

            const savedOrder = await response.json();
            return savedOrder;
        } catch (error) {
            console.error('Error saving order:', error);
            throw error;
        }
    }

    static clearCart() {
        localStorage.removeItem('cartData');
        localStorage.removeItem('checkoutTotal');
        localStorage.removeItem('checkoutItems');
    }

    static async getOrders() {
        try {
            const response = await fetch('/api/orders');
            if (!response.ok) {
                throw new Error('Failed to fetch orders');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching orders:', error);
            throw error;
        }
    }
}
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

class OrderStorage {
    static firebaseConfig = {
        apiKey: "AIzaSyAWkJwdhk9VdT24ykFVv4TpkNtm_WDXMh4",
        authDomain: "shirtkj.firebaseapp.com",
        projectId: "shirtkj",
        storageBucket: "shirtkj.firebasestorage.app",
        messagingSenderId: "643296189935",
        appId: "1:643296189935:web:34d6b484eb43aaad35aa1a",
        measurementId: "G-ZLBVCE5TZV"
    };

    static app = initializeApp(this.firebaseConfig);
    static db = getFirestore(this.app);

    static async saveOrder(formData) {
        // Format order items without images
        const orderItems = JSON.parse(localStorage.getItem('checkoutItems') || '[]')
            .map(item => ({
                name: item.name,
                quantity: item.quantity,
                subtotal: item.subtotal
            }));

        // Format address in UK postal format
        const formattedAddress = `${formData.fullName}\n${formData.address}\n${formData.city}\n${formData.postCode}`.toUpperCase();

        const orderData = {
            orderId: 'ORD-' + Date.now(),
            timestamp: new Date().toISOString(),
            formattedAddress: formattedAddress,
            email: formData.email.toLowerCase(),
            items: orderItems,
            totalAmount: localStorage.getItem('checkoutTotal'),
            status: 'completed'
        };

        try {
            const docRef = await addDoc(collection(this.db, "orders"), orderData);
            console.log("Order saved to Firebase with ID: ", docRef.id);

            // Keep local storage functionality for compatibility
            const orders = JSON.parse(localStorage.getItem('orders') || '[]');
            orders.push(orderData);
            localStorage.setItem('orders', JSON.stringify(orders));

            return orderData;
        } catch (error) {
            console.error("Error saving order: ", error);
            throw error;
        }
    }

    static clearCart() {
        localStorage.removeItem('cartData');
        localStorage.removeItem('checkoutTotal');
        localStorage.removeItem('checkoutItems');
    }
}

export default OrderStorage;

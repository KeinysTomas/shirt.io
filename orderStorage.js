// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWkJwdhk9VdT24ykFVv4TpkNtm_WDXMh4",
  authDomain: "shirtkj.firebaseapp.com",
  projectId: "shirtkj",
  storageBucket: "shirtkj.firebasestorage.app",
  messagingSenderId: "643296189935",
  appId: "1:643296189935:web:34d6b484eb43aaad35aa1a",
  measurementId: "G-ZLBVCE5TZV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

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
      const docRef = await addDoc(collection(db, "orders"), orderData);
      console.log("Order saved with ID: ", docRef.id);
      return orderData;
    } catch (error) {
      console.error("Error adding order: ", error);
      throw error;
    }
  }

  static clearCart() {
    localStorage.removeItem('cartData');
    localStorage.removeItem('checkoutTotal');
    localStorage.removeItem('checkoutItems');
  }

  // You might want to add a method to retrieve orders from Firestore
  static async getOrders() {
    // Implementation for retrieving orders from Firestore
    // This would replace any previous logic that read from localStorage
  }
}

export default OrderStorage;
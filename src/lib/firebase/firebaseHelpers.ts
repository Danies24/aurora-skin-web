import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  collection,
  query,
  where,
  orderBy,
  serverTimestamp,
  addDoc,
  Timestamp,
  onSnapshot,
  QuerySnapshot,
  DocumentData,
} from "firebase/firestore";
import { db } from "./firebase";

// Types
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  pincode: string;
  address?: string;
  createdAt: Timestamp;
}

export interface CartItem {
  id: string;
  productId: string;
  productName: string;
  variant: string;
  quantity: number;
  price: number;
  image: string;
  weight: string;
  createdAt: Timestamp;
}

export interface AddressDetail {
  id: string;
  fullName: string;
  phone: string;
  pincode: string;
  addressLine1: string;
  addressLine2?: string;
  landmark?: string;
  city: string;
  state: string;
  default: boolean;
  createdAt: Timestamp;
}

// User Management
export const createUser = async (
  userData: Omit<User, "id" | "createdAt">
): Promise<string> => {
  try {
    const userRef = doc(collection(db, "users"));
    const userDoc = {
      ...userData,
      id: userRef.id,
      createdAt: serverTimestamp(),
    };

    await setDoc(userRef, userDoc);
    return userRef.id;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const getUserByPhone = async (phone: string): Promise<User | null> => {
  try {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("phone", "==", phone));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null;
    }

    const userDoc = querySnapshot.docs[0];
    return userDoc.data() as User;
  } catch (error) {
    console.error("Error getting user by phone:", error);
    throw error;
  }
};

export const getUserById = async (userId: string): Promise<User | null> => {
  try {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return userSnap.data() as User;
    }
    return null;
  } catch (error) {
    console.error("Error getting user by ID:", error);
    throw error;
  }
};

// Cart Management
export const addToCart = async (
  userId: string,
  cartItem: Omit<CartItem, "id" | "createdAt">
): Promise<string> => {
  try {
    const cartRef = collection(db, `users/${userId}/cartItems`);
    const cartItemDoc = {
      ...cartItem,
      createdAt: serverTimestamp(),
    };

    const docRef = await addDoc(cartRef, cartItemDoc);
    return docRef.id;
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error;
  }
};

export const getCartItems = async (userId: string): Promise<CartItem[]> => {
  try {
    const cartRef = collection(db, `users/${userId}/cartItems`);
    const q = query(cartRef, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as CartItem[];
  } catch (error) {
    console.error("Error getting cart items:", error);
    throw error;
  }
};

export const updateCartItemQuantity = async (
  userId: string,
  cartItemId: string,
  quantity: number
): Promise<void> => {
  try {
    const cartItemRef = doc(db, `users/${userId}/cartItems`, cartItemId);
    await updateDoc(cartItemRef, { quantity });
  } catch (error) {
    console.error("Error updating cart item quantity:", error);
    throw error;
  }
};

export const removeFromCart = async (
  userId: string,
  cartItemId: string
): Promise<void> => {
  try {
    const cartItemRef = doc(db, `users/${userId}/cartItems`, cartItemId);
    await deleteDoc(cartItemRef);
  } catch (error) {
    console.error("Error removing from cart:", error);
    throw error;
  }
};

export const clearCart = async (userId: string): Promise<void> => {
  try {
    const cartItems = await getCartItems(userId);
    const deletePromises = cartItems.map((item) =>
      deleteDoc(doc(db, `users/${userId}/cartItems`, item.id))
    );
    await Promise.all(deletePromises);
  } catch (error) {
    console.error("Error clearing cart:", error);
    throw error;
  }
};

// Address Management
export const addAddress = async (
  userId: string,
  addressData: Omit<AddressDetail, "id" | "createdAt">
): Promise<string> => {
  try {
    const addressRef = collection(db, `users/${userId}/addressDetails`);

    // If this is the first address or marked as default, update other addresses
    if (addressData.default) {
      await updateDefaultAddresses(userId);
    }

    const addressDoc = {
      ...addressData,
      createdAt: serverTimestamp(),
    };

    const docRef = await addDoc(addressRef, addressDoc);
    return docRef.id;
  } catch (error) {
    console.error("Error adding address:", error);
    throw error;
  }
};

export const getAddresses = async (
  userId: string
): Promise<AddressDetail[]> => {
  try {
    const addressRef = collection(db, `users/${userId}/addressDetails`);
    const q = query(addressRef, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as AddressDetail[];
  } catch (error) {
    console.error("Error getting addresses:", error);
    throw error;
  }
};

export const updateAddress = async (
  userId: string,
  addressId: string,
  addressData: Partial<AddressDetail>
): Promise<void> => {
  try {
    const addressRef = doc(db, `users/${userId}/addressDetails`, addressId);

    // If setting as default, update other addresses
    if (addressData.default) {
      await updateDefaultAddresses(userId);
    }

    await updateDoc(addressRef, addressData);
  } catch (error) {
    console.error("Error updating address:", error);
    throw error;
  }
};

export const deleteAddress = async (
  userId: string,
  addressId: string
): Promise<void> => {
  try {
    const addressRef = doc(db, `users/${userId}/addressDetails`, addressId);
    await deleteDoc(addressRef);
  } catch (error) {
    console.error("Error deleting address:", error);
    throw error;
  }
};

export const setDefaultAddress = async (
  userId: string,
  addressId: string
): Promise<void> => {
  try {
    // First, set all addresses to non-default
    await updateDefaultAddresses(userId);

    // Then set the specified address as default
    const addressRef = doc(db, `users/${userId}/addressDetails`, addressId);
    await updateDoc(addressRef, { default: true });
  } catch (error) {
    console.error("Error setting default address:", error);
    throw error;
  }
};

// Helper function to update default addresses
const updateDefaultAddresses = async (userId: string): Promise<void> => {
  try {
    const addresses = await getAddresses(userId);
    const updatePromises = addresses
      .filter((addr) => addr.default)
      .map((addr) =>
        updateDoc(doc(db, `users/${userId}/addressDetails`, addr.id), {
          default: false,
        })
      );

    if (updatePromises.length > 0) {
      await Promise.all(updatePromises);
    }
  } catch (error) {
    console.error("Error updating default addresses:", error);
    throw error;
  }
};

// Real-time cart subscription
export const subscribeToCartItems = (
  userId: string,
  callback: (items: CartItem[]) => void
): (() => void) => {
  const cartRef = collection(db, `users/${userId}/cartItems`);
  const q = query(cartRef, orderBy("createdAt", "desc"));
  return onSnapshot(q, (snapshot: QuerySnapshot<DocumentData>) => {
    const items = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as CartItem[];
    callback(items);
  });
};

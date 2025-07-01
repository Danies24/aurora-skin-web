"use client";
import { useEffect } from "react";
import { auth, db } from "@/lib/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useAuthStore } from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";
import { collection, addDoc, getDocs } from "firebase/firestore";

// Define LocalCartItem type for localStorage
type LocalCartItem = {
  id: string;
  name: string;
  price: number;
  size: string;
  weight: string;
  image: string;
  quantity: number;
};

export default function AuthCartSync() {
  const { setLoggedIn, setUserId, setUser } = useAuthStore();
  const { syncWithFirestore, unsubscribe } = useCartStore();

  // Merge local cart into Firestore on login
  const syncLocalCartWithFirebase = async (userId: string) => {
    const localCart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (!localCart.length) return;

    const cartRef = collection(db, "users", userId, "cartItems");
    const existing = await getDocs(cartRef);
    const existingIds = existing.docs.map((doc) => doc.data().productId);

    await Promise.all(
      localCart.map(async (item: LocalCartItem) => {
        if (!existingIds.includes(item.id)) {
          await addDoc(cartRef, {
            productId: item.id,
            productName: item.name,
            price: item.price,
            variant: item.size,
            weight: item.weight,
            image: item.image,
            quantity: item.quantity,
          });
        }
      })
    );

    localStorage.removeItem("cart");
  };

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setLoggedIn(true);
        setUserId(firebaseUser.uid);
        await syncLocalCartWithFirebase(firebaseUser.uid); // Merge local cart before subscribing
        syncWithFirestore(firebaseUser.uid);
      } else {
        setLoggedIn(false);
        setUserId(null);
        setUser(null);
        unsubscribe();
        const cart = JSON.parse(
          localStorage.getItem("cart") || "[]"
        ) as LocalCartItem[];
        useCartStore.setState({
          items: cart,
          totalItems: cart.reduce(
            (sum: number, i: LocalCartItem) => sum + i.quantity,
            0
          ),
          totalPrice: cart.reduce(
            (sum: number, i: LocalCartItem) => sum + i.price * i.quantity,
            0
          ),
        });
      }
    });
    return () => {
      unsubscribeAuth();
      unsubscribe();
    };
  }, [setLoggedIn, setUserId, setUser, syncWithFirestore, unsubscribe]);
  return null;
}

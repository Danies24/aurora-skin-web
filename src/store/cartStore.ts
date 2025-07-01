import { create } from "zustand";
import { persist } from "zustand/middleware";
import { subscribeToCartItems } from "@/lib/firebase/firebaseHelpers";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  size: string;
  weight: string;
  image: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addItem: (item: CartItem) => void;
  removeItem: (id: string, size: string) => void;
  updateQuantity: (id: string, size: string, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
  syncWithFirestore: (userId: string) => void;
  unsubscribe: () => void;
}

let unsubscribeCart: (() => void) | null = null;

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,

      addItem: (item) => {
        const state = get();
        const existingItem = state.items.find(
          (i) => i.id === item.id && i.size === item.size
        );

        if (existingItem) {
          set({
            items: state.items.map((i) =>
              i.id === item.id && i.size === item.size
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
          });
        } else {
          set({ items: [...state.items, item] });
        }

        // Update totals
        const newItems = get().items;
        const totalItems = newItems.reduce((sum, i) => sum + i.quantity, 0);
        const totalPrice = newItems.reduce(
          (sum, i) => sum + i.price * i.quantity,
          0
        );

        set({ totalItems, totalPrice });
      },

      removeItem: (id, size) => {
        const state = get();
        const newItems = state.items.filter(
          (item) => !(item.id === id && item.size === size)
        );

        const totalItems = newItems.reduce((sum, i) => sum + i.quantity, 0);
        const totalPrice = newItems.reduce(
          (sum, i) => sum + i.price * i.quantity,
          0
        );

        set({ items: newItems, totalItems, totalPrice });
      },

      updateQuantity: (id, size, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id, size);
          return;
        }

        const state = get();
        const newItems = state.items.map((item) =>
          item.id === id && item.size === size ? { ...item, quantity } : item
        );

        const totalItems = newItems.reduce((sum, i) => sum + i.quantity, 0);
        const totalPrice = newItems.reduce(
          (sum, i) => sum + i.price * i.quantity,
          0
        );

        set({ items: newItems, totalItems, totalPrice });
      },

      clearCart: () => {
        set({ items: [], totalItems: 0, totalPrice: 0 });
      },

      getItemCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },

      syncWithFirestore: (userId: string) => {
        if (unsubscribeCart) unsubscribeCart();
        unsubscribeCart = subscribeToCartItems(userId, (firestoreItems) => {
          set({
            items: firestoreItems.map((item) => ({
              id: item.productId,
              name: item.productName,
              price: item.price,
              size: item.variant,
              weight: item.weight,
              image: item.image,
              quantity: item.quantity,
            })),
          });
          const newItems = firestoreItems.map((item) => ({
            id: item.productId,
            name: item.productName,
            price: item.price,
            size: item.variant,
            weight: item.weight,
            image: item.image,
            quantity: item.quantity,
          }));
          const totalItems = newItems.reduce((sum, i) => sum + i.quantity, 0);
          const totalPrice = newItems.reduce(
            (sum, i) => sum + i.price * i.quantity,
            0
          );
          set({ totalItems, totalPrice });
        });
      },

      unsubscribe: () => {
        if (unsubscribeCart) {
          unsubscribeCart();
          unsubscribeCart = null;
        }
      },
    }),
    {
      name: "cart-storage",
    }
  )
);

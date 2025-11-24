import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "../types/product";

type CartItem = Product & { quantity: number };

type CartState = {
    items: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (id: number) => void;
    increment: (id: number) => void;
    decrement: (id: number) => void;
    clear: () => void;
    totalCount: () => number;
    totalPrice: () => number;
};

export const useCart = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            addToCart: (product) =>
                set((state) => {
                    const existing = state.items.find((i) => i.id === product.id);
                    if (existing) {
                        return {
                            items: state.items.map((i) =>
                                i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
                            ),
                        };
                    }
                    return { items: [...state.items, { ...product, quantity: 1 }] };
                }),
            removeFromCart: (id) =>
                set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
            increment: (id) =>
                set((state) => ({
                    items: state.items.map((i) =>
                        i.id === id ? { ...i, quantity: i.quantity + 1 } : i
                    ),
                })),
            decrement: (id) =>
                set((state) => ({
                    items: state.items
                        .map((i) => (i.id === id ? { ...i, quantity: Math.max(1, i.quantity - 1) } : i))
                        .filter(Boolean),
                })),
            clear: () => set({ items: [] }),
            totalCount: () => get().items.reduce((s, i) => s + i.quantity, 0),
            totalPrice: () => get().items.reduce((s, i) => s + i.price * i.quantity, 0),
        }),
        {
            name: "nexus-cart", // key in localStorage
        }
    )
);

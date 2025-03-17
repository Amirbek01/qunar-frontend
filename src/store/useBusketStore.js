import { create } from "zustand";

export const useBusketStore = create((set) => ({
    busket: [],

    addToBusket: (product) => set((state) => {
        const existing = state.busket.find(item => item.id === product.id);
        if (existing) {
            return {
                busket: state.busket.map(item => 
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                )
            };
        }
        return { busket: [...state.busket, { ...product, quantity: 1 }] };
    }),

    updateQuantity: (id, quantity) => set((state) => ({
        busket: state.busket.map(item =>
            item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
        )
    })),

    removeFromBusket: (id) => set((state) => ({
        busket: state.busket.filter(item => item.id !== id)
    })),
}));

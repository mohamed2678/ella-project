import { defineStore } from "pinia";

export const useCartStore = defineStore("useCartStore", {
  state: () => ({
    cartItem: [],
  }),
  actions: {
    addCartItem(item) {
      let exists = false;
      for (let i = 0; i < this.cartItem.length; i++) {
        if (this.cartItem[i].id == item.id) {
          this.cartItem[i].quantity += item.quantity;
          exists = true;
          break;
        }
      }
      if (!exists) {
        this.cartItem.push({ ...item });
      }
      localStorage.setItem("cartItem", JSON.stringify(this.cartItem));
    },
    getItem() {
      if (localStorage.getItem("cartItem")) {
        this.cartItem = JSON.parse(localStorage.getItem("cartItem"));
      }
    },
    deleteItem(id) {
      for (let i = 0; i < this.cartItem.length; i++) {
        if (this.cartItem[i].id == id) {
          this.cartItem.splice(i, 1);
          break;
        }
      }
      localStorage.setItem("cartItem", JSON.stringify(this.cartItem));
    },
    setLocalStorge() {
      localStorage.setItem("cartItem", JSON.stringify(this.cartItem));
    },
    resetItems() {
      this.cartItem = [];
      localStorage.removeItem("cartItem");
    },
  },
});

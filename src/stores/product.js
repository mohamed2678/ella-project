import { defineStore } from "pinia";
import axios from "axios";

export const productsModule = defineStore("productsModule", {
  state: () => ({
    FlashDeals: [],
  }),
  actions: {
    async getProduct() {
      await axios
        .get("https://dummyjson.com/products")
        .then((res) => (this.FlashDeals = res.data.products.slice(7, 15)))
        .catch((err) => console.log(err));
    },
  },
});

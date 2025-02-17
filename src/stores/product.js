import { defineStore } from "pinia";
import axios from "axios";

export const productsModule = defineStore("productsModule", {
  state: () => ({
    FlashDeals: [],
    Labtops: [],
    MobilProducts: [],
    TVs: [],
    mens: [],
    womens: [],
    jewelery: [],
  }),
  actions: {
    async getProduct() {
      await axios
        .get("https://dummyjson.com/products")
        .then((res) => {
          this.FlashDeals = res.data.products.slice(7, 15);
        })
        .catch((err) => console.log(err));
    },
    async getMobil() {
      await axios
        .get("https://dummyjson.com/products/category/smartphones")
        .then((res) => {
          this.MobilProducts = res.data.products;
          // console.log((this.MobilProducts = res.data.products));
        })
        .catch((err) => console.log(err));
    },
    async getLap() {
      await axios
        .get("https://dummyjson.com/products/category/laptops")
        .then((res) => {
          this.Labtops = res.data.products;
          // console.log((this.Labtops = res.data.products));
        })
        .catch((err) => console.log(err));
    },
    async getTV() {
      await axios
        .get("https://fakestoreapi.com/products/category/electronics")
        .then((res) => {
          this.TVs = res.data;
          console.log((this.TVs = res.data));
        })
        .catch((err) => console.log(err));
    },
    async getMan() {
      await axios
        .get("https://fakestoreapi.com/products/category/men's clothing")
        .then((res) => {
          this.mens = res.data;
          console.log((this.mens = res.data));
        })
        .catch((err) => console.log(err));
    },
    async getWomens() {
      await axios
        .get("https://fakestoreapi.com/products/category/women's clothing")
        .then((res) => {
          this.womens = res.data;
          console.log((this.womens = res.data));
        })
        .catch((err) => console.log(err));
    },
    async getJewelery() {
      await axios
        .get("https://fakestoreapi.com/products/category/jewelery")
        .then((res) => {
          this.jewelery = res.data;
          console.log((this.jewelery = res.data));
        })
        .catch((err) => console.log(err));
    },
  },
});

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
    productsCategory: [],
    singleProduct: "",
    categories: [
      {
        title: "Mens Shoes",
        route: "mens-shoes",
      },
      {
        title: "laptops",
        route: "laptops",
      },
      {
        title: "Smart Phones",
        route: "smartphones",
      },
      {
        title: "jewellery",
        route: "womens-jewellery",
      },
      {
        title: "fragrances",
        route: "fragrances",
      },
      {
        title: "motorcycle",
        route: "motorcycle",
      },
      {
        title: "Dresses",
        route: "womens-dresses",
      },
    ],
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
        .get("https://dummyjson.com/products/category/motorcycle")
        .then((res) => {
          this.TVs = res.data.products;
        })
        .catch((err) => console.log(err));
    },
    async getMan() {
      await axios
        .get("https://dummyjson.com/products/category/mens-shoes")
        .then((res) => {
          this.mens = res.data.products;
        })
        .catch((err) => console.log(err));
    },
    async getWomens() {
      await axios
        .get("https://dummyjson.com/products/category/womens-dresses")
        .then((res) => {
          this.womens = res.data.products;
        })
        .catch((err) => console.log(err));
    },
    async getJewelery() {
      await axios
        .get("https://dummyjson.com/products/category/womens-jewellery")
        .then((res) => {
          this.jewelery = res.data.products;
        })
        .catch((err) => console.log(err));
    },
    async getProductByCategory(category) {
      await axios
        .get(`https://dummyjson.com/products/category/${category}`)
        .then((res) => (this.productsCategory = res.data));
    },
    async getSingleProduct(productId) {
      await axios
        .get(`https://dummyjson.com/products/${productId}`)
        .then((res) => (this.singleProduct = res.data));
    },
  },
});

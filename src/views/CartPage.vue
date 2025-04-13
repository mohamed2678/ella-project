<template>
  <div class="cart-page">
    <v-container fluid>
      <v-row>
        <v-col cols="12" class="pm-0">
          <v-breadcrumbs :items="['home', 'Your Cart']" style="font-size: 15px">
            <template v-slot:divider>
              <v-icon color="#878484">mdi-chevron-right</v-icon>
            </template>
          </v-breadcrumbs>
        </v-col>
        <v-col cols="12" class="py-0" v-if="cartItem.length">
          <v-card-title style="font-size: 35px; font-weight: bold" class="px-0"
            >Your Cart</v-card-title
          >
          <div class="bar-perant mt-3 position-relative">
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="shipping-fast"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 512"
              class="svg-inline--fa fa-shipping-fast fa-w-20 fa-3x"
              :fill="
                parseInt((calctotal / 10000) * 100) < 50
                  ? 'red'
                  : parseInt((calctotal / 10000) * 100) < 80
                  ? 'orange'
                  : 'green'
              "
              width="30"
              :style="` position: absolute;
            bottom: 50%;
            z-index: 10;
            left: calc(${
              parseInt((calctotal / 10000) * 100) <= 100
                ? parseInt((calctotal / 10000) * 100)
                : 100
            }% - 15px);
            transition: 0.15s all ease-in-out;
            transform: perspective(600px) rotateY(20deg);`"
            >
              <path
                d="M624 352h-16V243.9c0-12.7-5.1-24.9-14.1-33.9L494 110.1c-9-9-21.2-14.1-33.9-14.1H416V48c0-26.5-21.5-48-48-48H112C85.5 0 64 21.5 64 48v48H8c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h272c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H40c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h208c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H8c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h208c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H64v128c0 53 43 96 96 96s96-43 96-96h128c0 53 43 96 96 96s96-43 96-96h48c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zM160 464c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm320 0c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm80-208H416V144h44.1l99.9 99.9V256z"
                class=""
              ></path>
            </svg>
            <v-progress-linear
              :color="
                parseInt((calctotal / 10000) * 100) < 50
                  ? 'red'
                  : parseInt((calctotal / 10000) * 100) < 80
                  ? 'orange'
                  : 'green'
              "
              height="10"
              rounded
              :model-value="
                parseInt((calctotal / 10000) * 100) <= 100
                  ? parseInt((calctotal / 10000) * 100)
                  : 100
              "
              striped
            >
            </v-progress-linear>
          </div>
          <v-card-text
            class="mt-1"
            v-if="cartItem.length && 10000 - calctotal > 0"
          >
            Only ${{ 10000 - calctotal }} away from free shapping</v-card-text
          >
          <v-card-text
            class="mt-1"
            v-if="cartItem.length && 10000 - calctotal <= 0"
          >
            Your order is now free shipping</v-card-text
          >
        </v-col>
        <v-col cols="12" lg="8">
          <v-table class="w-100" v-if="cartItem.length">
            <thead>
              <tr>
                <th style="font-size: 14px; font-weight: bold">Product</th>
                <th
                  class="text-center"
                  style="font-size: 14px; font-weight: bold"
                >
                  Price
                </th>
                <th
                  class="text-center"
                  style="font-size: 14px; font-weight: bold"
                >
                  Quantity
                </th>
                <th
                  class="text-center"
                  style="font-size: 14px; font-weight: bold"
                >
                  Total
                </th>
              </tr>
            </thead>
            <tbody class="t-card">
              <tr v-for="item in cartItem" :key="item.id">
                <td style="width: 55%">
                  <v-row class="alighn-center">
                    <v-col cols="5">
                      <v-img
                        :src="item.thumbnail ? item.thumbnail : item.image"
                        class="w-100"
                        style="
                          width: 100%;
                          max-height: 80%;
                          border-radius: 10px;
                        "
                      ></v-img>
                    </v-col>
                    <v-col cols="7">
                      <v-card-title
                        style="
                          white-space: pre-wrap;
                          font-size: 14px;
                          font-weight: bold;
                          color: #6f6f6f;
                          line-height: 1.5;
                        "
                        >{{ item.title }} sample-
                        {{ item.category }}</v-card-title
                      >
                      <v-card-text style="color: #6f6f6f; font-size: 12px">
                        Category: {{ item.category }}
                      </v-card-text>
                    </v-col>
                  </v-row>
                </td>
                <td class="text-center" style="width: 15%">
                  <span class="discounted-price" v-if="item.discountPercentage">
                    ${{
                      (
                        item.price -
                        item.price * (item.discountPercentage / 100)
                      ).toFixed(2)
                    }}
                  </span>
                  <span
                    class="discounted-price"
                    v-if="!item.discountPercentage"
                  >
                    ${{ item.price }}
                  </span>
                </td>
                <td class="text-center" style="width: 15%">
                  <div class="item-footer d-flex justify-space-between">
                    <div
                      class="counter"
                      style="display: flex; align-items: center"
                    >
                      <v-icon
                        @click="
                          decreaseQuantity(item) > 1
                            ? decreaseQuantity(item)
                            : false
                        "
                        size="22"
                        style="cursor: pointer"
                        >mdi-minus</v-icon
                      >
                      <input
                        type="number"
                        class="quantity-input"
                        v-model.number="item.quantity"
                        readonly
                        style="
                          width: 20px;
                          text-align: center;
                          margin: 0 10px;
                          border: none;
                          background: transparent;
                          font-size: 16px;
                          color: #6f6f6f;
                        "
                      />
                      <v-icon
                        @click="increaseQuantity(item)"
                        size="22"
                        style="cursor: pointer"
                        >mdi-plus</v-icon
                      >
                    </div>
                  </div>
                </td>
                <td class="text-center" style="width: 15%">
                  ${{ (item.price * item.quantity).toFixed(0) }}
                </td>
                <td class="text-center">
                  <v-icon @click="removeItem(item)">mdi-close</v-icon>
                </td>
              </tr>
              <v-divider length="100%" color="black"></v-divider></tbody
          ></v-table>
          <v-card-text
            class="mt-4 d-flex align-center"
            style="color: #6f6f6f; gap: 15px"
            v-if="cartItem.length"
          >
            <span>
              <svg
                id="Layer_1"
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 179.94 179.96"
                class="icon icon-shield-check"
                width="20"
              >
                <path
                  d="M90,0,5,42.78C13.73,105.26,38.14,154.32,90,180c51.83-25.64,76.25-74.7,85-137.18Z"
                ></path>
                <polygon
                  fill="white"
                  class="cls-1"
                  points="149.83 67.57 134.81 52.55 79.31 108.05 49.74 78.48 34.72 93.5 79.15 137.94 79.31 137.78 79.47 137.94 149.83 67.57"
                ></polygon></svg
            ></span>
            <span>Secure Shopping Guarantee</span>
          </v-card-text>
          <img
            v-if="cartItem.length"
            width="270"
            src="@/assets/images/cart-page-cards.webp"
            alt="Secure Shopping"
          />
        </v-col>
        <v-col cols="12" lg="4">
          <v-card elevation="0" v-if="cartItem.length">
            <v-card-title style="font-size: 16px; font-weight: bold"
              >Order Summary</v-card-title
            >
            <v-divider length="100%" color="black"></v-divider>
            <v-divider length="100%" color="black"></v-divider>
            <v-divider length="100%" color="black"></v-divider>
            <v-divider length="100%" color="black"></v-divider>
            <v-card-text class="d-flex justify-space-between align-center">
              <span>subtotal</span
              ><span style="font-weight: bold; font-size: 16px"
                >${{ calctotal.toFixed() }}.00</span
              >
            </v-card-text>
            <v-divider length="100%" color="black"></v-divider>
            <v-card-text class="">
              <span>Get Shipping Estimate</span>
            </v-card-text>
            <select
              style="
                font-size: 14px;
                color: #6f6f6f;
                padding: 10px;
                border: 1px solid #b8b8b8;
                border-radius: 30px;
                margin-bottom: 10px;
                width: 100%;
                cursor: pointer;
              "
              name=""
              id=""
              class="pa-3"
            >
              <option
                v-for="country in countries"
                :key="country"
                :value="country"
              >
                {{ country }}
              </option>
            </select>
            <div class="d-flex justify-space-between">
              <select
                style="
                  font-size: 14px;
                  color: #6f6f6f;
                  padding: 10px;
                  border: 1px solid #b8b8b8;
                  border-radius: 30px;
                  margin-bottom: 10px;
                  width: 55%;
                  cursor: pointer;
                "
                name=""
                id=""
                class="pa-3"
              >
                <option
                  v-for="country in countries"
                  :key="country"
                  :value="country"
                >
                  {{ country }}
                </option>
              </select>
              <input
                class="pa-3"
                type="text"
                style="
                  border: 1px solid rgb(184, 184, 184);
                  border-radius: 30px;
                  font-size: 14px;
                  width: 43%;
                  margin-left: 2%;
                "
                placeholder="Zip Code"
              />
            </div>
            <v-card-actions class="px-0 my-5">
              <v-btn
                style="
                  text-transform: none;
                  border-radius: 30px;
                  border-color: rgb(199, 199, 199);
                  background-color: rgb(2, 33, 143);
                "
                class="py-3 px-12 mb-4"
                outlined
                density="compact"
                height="50"
                width="95%"
                color="white"
                >Calculate Shipping</v-btn
              >
            </v-card-actions>
            <v-divider length="100%" color="black"></v-divider>
            <v-card-text class="d-flex justify-space-between align-center">
              <span>Total</span
              ><span style="font-weight: bold; font-size: 16px"
                >${{ calctotal.toFixed() }}</span
              >
            </v-card-text>
            <v-divider length="100%" color="black"></v-divider>
            <v-card-text class="px-0">
              <input
                class="pa-3 w-100 mb-3"
                type="text"
                style="
                  border: 1px solid rgb(184, 184, 184);
                  border-radius: 30px;
                  font-size: 14px;
                "
                placeholder="Enter Coupon Code"
              />
              <span style="color: rgb(184, 184, 184)"
                >Coupon code will be applied on the checkout page</span
              >
            </v-card-text>
            <v-divider length="100%" color="black"></v-divider>
            <v-card-text>
              <div class="terms">
                <input
                  v-model="termsAccepted"
                  required
                  type="checkbox"
                  name=""
                  id=""
                />
                <span style="font-size: 14px; color: #6f6f6f; margin-left: 10px"
                  >I agree to the
                  <span style="font-weight: bold; text-decoration: underline"
                    >Terms & Conditions</span
                  ></span
                >
              </div>
            </v-card-text>
            <v-card-actions class="px-0 my-5" style="flex-direction: column">
              <v-btn
                style="
                  text-transform: none;
                  border-color: rgb(199, 199, 199);
                  background-color: rgb(2, 33, 143);
                "
                class="py-3 px-12 mb-4"
                variant="outlined"
                density="compact"
                height="50"
                width="95%"
                color="white"
                @click="goToCheckout"
                >Proceed TO Checkout</v-btn
              >
              <v-btn
                style="text-transform: none; border-color: rgb(199, 199, 199)"
                color="primary"
                width="95%"
                @click="$router.go(-1)"
                >Continue Shopping</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col v-if="!cartItem.length" cols="12">
          <v-card
            elevation="0"
            class="mx-auto"
            style="max-width: 400px; text-align: center; padding: 20px"
          >
            <v-card-text>
              <h2 style="color: #2f2f2f; font-size: 24px; font-weight: bold">
                Your Cart is Empty
              </h2>
              <p style="color: #6f6f6f; font-size: 16px">
                You have no items in your shopping cart.
              </p>
              <v-btn
                style="
                  text-transform: none;
                  border-radius: 30px;
                  border-color: rgb(199, 199, 199);
                  background-color: rgb(2, 33, 143);
                "
                class="py-3 px-12 mb-4"
                variant="outlined"
                density="compact"
                height="50"
                width="95%"
                color="white"
                @click="$router.push({ name: 'home' })"
                >Continue Shopping</v-btn
              >
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useCartStore } from "@/stores/cart";
export default {
  data() {
    return {
      countries: ["Egypt", "USA", "Canada", "France", "Germany", "UK"],
    };
  },
  computed: {
    ...mapState(useCartStore, ["cartItem"]),
    calctotal() {
      let total = 0;
      this.cartItem.forEach((product) => {
        if (product.discountPercentage) {
          total += Math.ceil(
            (product.price -
              product.price * (product.discountPercentage / 100)) *
              product.quantity
          );
        } else {
          total += product.price * product.quantity;
        }
      });
      return total;
    },
  },
  methods: {
    ...mapActions(useCartStore, ["getItem", "deleteItem", "setLocalStorge"]),
    increaseQuantity(item) {
      item.quantity++;
    },
    decreaseQuantity(item) {
      if (item.quantity > 1) {
        item.quantity--;
      }
    },
    removeItem(item) {
      this.deleteItem(item.id);
    },
    goToCheckout() {
      this.setLocalStorge();
      this.$router.push({ name: "checkout_page" });
    },
  },
};
</script>

<style lang="scss">
.v-table__wrapper {
  &::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #333;
    border-radius: 5px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }
  &::-webkit-scrollbar-track {
    background-color: #f0f0f0;
    border-radius: 5px;
  }
}

@media (max-width: 787px) {
  .cart-page {
    table {
      width: 800px !important;
    }
  }
}
</style>

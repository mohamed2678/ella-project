<template>
  <div class="drawer">
    <v-navigation-drawer
      class="px-7 py-5 cart-drawer"
      app
      location="right"
      v-model="drawer"
      temporary
      :width="windoWidth <= 767 ? windoWidth / 2 : 370"
    >
      <v-card elevation="0" class="cart-drawer">
        <v-card-title style="font-size: 17px; font-weight: bold"
          >Shopping Cart</v-card-title
        >
        <v-btn
          v-if="cartItem.length"
          @click="
            cartItem.forEach((item) => {
              deleteItem(item.id);
            })
          "
          ><v-icon>mdi-delete</v-icon></v-btn
        >
        <v-card-text style="color: #6f6f6f"
          >{{ cartItem.length }} Items</v-card-text
        >
        <v-card-text
          v-if="!cartItem.length"
          style="color: #6f6f6f"
          class="pt-0"
        >
          Free shipping for all orders over $800</v-card-text
        >
        <v-card-text
          v-if="!cartItem.length"
          style="color: #6f6f6f"
          class="pt-0 text-center"
          >Your Cart is Empty</v-card-text
        >
        <div class="bar-perant mt-5 position-relative" v-if="cartItem.length">
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="shipping-fast"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 512"
            class="svg-inline--fa fa-shipping-fast fa-w-20 fa-3x"
            fill="#F44336"
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
            color="red"
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
        <v-card-actions v-if="!cartItem.length" class="pt-0">
          <v-btn color="primary" class="mx-auto" @click="drawer = false"
            >Continue Shopping</v-btn
          >
        </v-card-actions>
      </v-card>
      <v-card-text v-if="cartItem.length && 10000 - calctotal > 0">
        Only ${{ 10000 - calctotal }} away from free shapping</v-card-text
      >
      <v-card-text v-if="cartItem.length && 10000 - calctotal <= 0">
        Your order is now free shipping</v-card-text
      >
      <v-card
        elevation="0"
        v-if="cartItem.length"
        class="cart-drawer"
        max-height="280"
        style="overflow-y: auto"
      >
        <v-container class="px-1">
          <v-row v-for="item in cartItem" :key="item.id" class="alighn-center">
            <v-col cols="12" sm="5">
              <v-img
                :src="item.thumbnail ? item.thumbnail : item.image"
                class="w-100"
                style="width: 100%; max-height: 80%; border-radius: 10px"
              ></v-img>
            </v-col>
            <v-col cols="12" sm="7">
              <v-card-title
                style="
                  white-space: pre-wrap;
                  font-size: 14px;
                  font-weight: bold;
                  color: #6f6f6f;
                  line-height: 1.5;
                "
                >{{ item.title }} sample- {{ item.category }}</v-card-title
              >
              <v-card-text style="color: #6f6f6f; font-size: 12px">
                Category: {{ item.category }}
              </v-card-text>
              <v-card-text>
                <span class="discounted-price" v-if="item.discountPercentage">
                  ${{
                    (
                      (item.price -
                        item.price * (item.discountPercentage / 100)) *
                      item.quantity
                    ).toFixed(2)
                  }}
                </span>
                <span class="discounted-price" v-if="!item.discountPercentage">
                  ${{ item.price * item.quantity }}
                </span>
              </v-card-text>
              <div class="item-footer d-flex justify-space-between">
                <div class="counter" style="display: flex; align-items: center">
                  <v-icon
                    v-if="item.quantity > 1"
                    @click="decreaseQuantity(item)"
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
                      width: 40px;
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
                <v-icon @click="removeItem(item)">mdi-close</v-icon>
              </div>
            </v-col>
            <v-col cols="12">
              <v-divider>*</v-divider>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
      <v-card elevation="0" class="mt-5" v-if="cartItem.length">
        <v-card-actions class="flex-column">
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
            @click="goToCheckout"
            >Check Out</v-btn
          >
          <v-btn
            style="
              text-transform: none;
              border-radius: 30px;
              border-color: rgb(199, 199, 199);
            "
            class="py-3 px-12"
            variant="outlined"
            density="compact"
            height="50"
            width="95%"
            @click="$router.push({ name: 'cart_page' })"
            >View Cart</v-btn
          >
          {{ calctotal }}
        </v-card-actions>
      </v-card>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useCartStore } from "@/stores/cart";
export default {
  inject: ["Emitter"],
  props: {
    windoWidth: {
      type: Number,
    },
  },
  data: () => ({
    drawer: false,
  }),
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
  mounted() {
    this.Emitter.on("openCart", () => {
      this.drawer = true;
    });
    this.getItem();
  },
};
</script>

<style lang="scss">
.cart-drawer {
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
@media (max-width: 580px) {
  .drawer {
    .v-card-text {
      font-size: 12px !important;
    }
    .v-card-title {
      font-size: 14px !important;
    }
    .v-card-actions {
      font-size: 12px;
      button {
        font-size: 12px !important;
      }
    }
    .quantity-input {
      width: 30px !important;
      font-size: 14px !important;
    }
  }
}
</style>

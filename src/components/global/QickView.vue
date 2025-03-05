<template>
  <div class="quick-view">
    <v-dialog
      v-model="dialog"
      max-width="900"
      max-height="700"
      @click:outside="closeDialog"
    >
      <v-card elevation="0" class="content_card py-0 px-1">
        <v-container fluid class="bg-white pt-10">
          <v-row>
            <v-col cols="7">
              <v-icon
                style="
                  position: absolute;
                  top: 10px;
                  right: 10px;
                  font-size: 30px;
                  color: #4caf50;
                  cursor: pointer;
                  z-index: 10;
                "
                @click="closeDialog"
                >mdi-close</v-icon
              >
              <div class="parent-img">
                <v-img
                  :src="
                    tab
                      ? tab
                      : product.thumbnail
                      ? product.thumbnail
                      : product.image
                  "
                  class="w-100"
                  alt=""
                  height="500"
                  v-if="!loading"
                  lazy-src="path/to/placeholder.jpg"
                />
              </div>
              <v-skeleton-loader
                v-if="loading"
                type="image"
                class="w-100"
                height="500"
              ></v-skeleton-loader>
              <v-tabs center-active height="220" v-model="tab" class="mt-10">
                <v-tab
                  v-for="(img, i) in product.images"
                  :key="i"
                  class="mx-10"
                  :value="img"
                >
                  <v-img
                    :src="img"
                    width="100"
                    height="100"
                    lazy-src="path/to/placeholder.jpg"
                  />
                </v-tab>
              </v-tabs>
            </v-col>

            <v-col cols="5" class="pt-0 pl-6">
              <v-skeleton-loader
                v-if="loading"
                type="article"
              ></v-skeleton-loader>

              <v-card elevation="0" v-if="!loading">
                <v-card-title
                  class="px-0 product-title"
                  style="white-space: pre-wrap"
                >
                  ({{ product.title }}) - Sample - {{ product.category }} For
                  Sale
                </v-card-title>

                <div class="rating d-flex align-center">
                  <v-rating
                    v-model="product.rating"
                    half-increments
                    color="yellow-darken-3"
                    size="x-small"
                    density="compact"
                    readonly
                  ></v-rating>
                  <span class="stock-text ml-5">
                    (Stock - {{ product.stock }})</span
                  >
                </div>

                <v-card-text class="description-text">
                  {{ product.description }}
                </v-card-text>
                <v-card-text class="description-text"
                  >Brand: {{ product.brand }}</v-card-text
                >
                <v-card-text class="description-text">
                  Availability:
                  {{ product.stock > 0 ? "In Stock" : "Out Of Stock" }}
                </v-card-text>

                <v-card-text class="pl-0 pt-0">
                  <del>${{ product.price }}</del> From
                  <span
                    class="discounted-price"
                    v-if="product.discountPercentage"
                  >
                    ${{
                      (
                        product.price -
                        product.price * (product.discountPercentage / 100)
                      ).toFixed(2)
                    }}
                  </span>
                  <span v-if="!product.discountPercentage">
                    ${{ product.price }}
                  </span>
                </v-card-text>

                <v-card-text class="pl-0 pt-0">Quantity</v-card-text>
                <div class="counter">
                  <v-icon
                    v-if="quantity > 1"
                    @click="decreaseQuantity"
                    size="22"
                    >mdi-minus</v-icon
                  >
                  <input
                    type="number"
                    class="quantity-input"
                    v-model.number="quantity"
                    readonly
                  />
                  <v-icon @click="increaseQuantity" size="22">mdi-plus</v-icon>
                </div>

                <v-card-text
                  class="pl-0 pt-0"
                  v-if="product.discountPercentage"
                >
                  Subtotal: $
                  {{
                    (
                      (product.price -
                        product.price * (product.discountPercentage / 100)) *
                      quantity
                    ).toFixed(2)
                  }}
                </v-card-text>
                <v-card-text
                  class="pl-0 pt-0"
                  v-if="!product.discountPercentage"
                >
                  Subtotal: $
                  {{ (product.price * quantity).toFixed(2) }}
                </v-card-text>

                <v-card-actions class="pt-0 mt-7 w-100">
                  <v-btn
                    variant="outlined"
                    class="add-to-cart-btn"
                    @click="addToCart(product)"
                    :loading="btnLoading"
                    >Add to Cart</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { VSkeletonLoader } from "vuetify/lib/components/index.mjs";
import { useCartStore } from "@/stores/cart";
import { mapActions } from "pinia";

export default {
  inject: ["Emitter"],
  name: "QuickView",
  data: () => ({
    loading: false,
    quantity: 1,
    dialog: false,
    product: "",
    tab: null,
    btnLoading: false,
  }),
  methods: {
    ...mapActions(useCartStore, ["addCartItem"]),
    addToCart(item) {
      item.quantity = this.quantity;
      this.btnLoading = true;
      setTimeout(() => {
        this.btnLoading = false;
        this.addCartItem(item);
        this.Emitter.emit("openCart");
        this.Emitter.emit("showMsg", item.title);
        this.closeDialog();
      }, 1000);
    },
    increaseQuantity() {
      this.quantity++;
    },
    decreaseQuantity() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    },
    closeDialog() {
      this.dialog = false;
      this.product = "";
      this.quantity = 1;
      this.tab = null;
    },
  },
  components: {
    VSkeletonLoader,
  },
  beforeMount() {
    this.Emitter.on("openQuickView", (data) => {
      this.product = data;
      this.dialog = true;
    });
  },
  watch: {
    product(newVal) {
      this.tab = null;
      if (newVal) {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.content_card {
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #333;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background-color: #f0f0f0;
  }
}
.product-image {
  height: 100%;
  transition: 0.5s all ease-in-out;
  cursor: pointer;
}
.image-btn {
  border-radius: 50%;
}
.product-title {
  font-size: 19px;
  font-weight: bold;
  white-space: pre-wrap;
}
.stock-text {
  font-size: 12px;
  color: rgb(96, 96, 96);
}
.description-text {
  font-size: 13px;
  color: rgb(96, 96, 96);
}
.discounted-price {
  font-weight: bold;
}
.counter {
  border-radius: 30px;
  border: 1px solid rgb(201, 201, 201);
  width: fit-content;
  display: flex;
  align-items: center;
  padding: 0 10px;
}
.quantity-input {
  border: none;
  outline: none;
  width: 60px;
  font-size: 13px;
  text-align: center;
}
.add-to-cart-btn {
  font-size: 13px;
  border-radius: 30px;
  background-color: rgb(20, 20, 20);
  color: white;
  width: 75%;
  height: 45px;
}
</style>

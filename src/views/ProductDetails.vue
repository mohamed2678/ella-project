<template>
  <div class="product-details mt-16">
    <v-container fluid>
      <v-row>
        <v-col cols="12" sm="7">
          <div class="parent-img">
            <v-img
              :src="tab ? tab : singleProduct.thumbnail"
              class="w-100"
              alt=""
              height="500"
              v-if="!loading"
            />
          </div>
          <v-skeleton-loader
            v-if="loading"
            type="image, image, image"
          ></v-skeleton-loader>
          <v-tabs center-active height="220" v-model="tab" class="mt-10">
            <v-tab
              v-for="(img, i) in singleProduct.images"
              :key="i"
              class="mx-10"
              :value="img"
            >
              <v-img :src="img" width="100" height="100" />
            </v-tab>
          </v-tabs>
        </v-col>
        <v-col cols="12" sm="5" class="pt-0 pl-6">
          <v-skeleton-loader
            v-if="loading"
            type="article, article, article"
          ></v-skeleton-loader>
          <v-card elevation="0" v-if="!loading">
            <v-card-title class="product-title">
              ({{ singleProduct.title }}) - Sample -
              {{ singleProduct.category }} For Sale
            </v-card-title>
            <div class="rating d-flex align-center">
              <v-rating
                v-model="singleProduct.rating"
                half-increments
                color="yellow-darken-3 pm-1"
                size="x-small"
                density="compact"
                readonly
              ></v-rating>
              <span class="stock-info">
                (Stock - {{ singleProduct.stock }})
              </span>
            </div>
            <v-card-text class="product-description">
              {{ singleProduct.description }}
            </v-card-text>
            <v-card-text class="product-brand">
              Brand: {{ singleProduct.brand }}
            </v-card-text>
            <v-card-text class="product-availability">
              Availability:
              {{ singleProduct.stock > 0 ? "In Stock" : "Out Of Stock" }}
            </v-card-text>
            <v-card-text class="product-price">
              <del>${{ singleProduct.price }}</del> From
              <span
                class="discounted-price"
                v-if="singleProduct.discountPercentage"
              >
                ${{
                  (
                    singleProduct.price -
                    singleProduct.price *
                      (singleProduct.discountPercentage / 100)
                  ).toFixed(2)
                }}
              </span>
              <span v-if="!singleProduct.discountPercentage">
                ${{ singleProduct.price }}
              </span>
            </v-card-text>

            <v-card-text class="quantity-label"> Quantity </v-card-text>
            <div class="counter">
              <v-icon @click="quantity > 1 ? quantity-- : false" size="22">
                mdi-minus
              </v-icon>
              <input
                type="number"
                class="quantity-input"
                min="1"
                v-model="quantity"
                readonly
              />
              <v-icon @click="quantity++" size="22">mdi-plus</v-icon>
            </div>
            <v-card-text
              class="subtotal"
              v-if="singleProduct.discountPercentage"
            >
              Subtotal: $
              {{
                (
                  (singleProduct.price -
                    singleProduct.price *
                      (singleProduct.discountPercentage / 100)) *
                  quantity
                ).toFixed(2)
              }}
            </v-card-text>
            <v-card-text
              class="subtotal"
              v-if="!singleProduct.discountPercentage"
            >
              Subtotal: $
              {{ (singleProduct.price * quantity).toFixed(2) }}
            </v-card-text>
            <v-card-actions class="add-to-cart-actions">
              <v-btn
                variant="outlined"
                class="add-to-cart-btn"
                :loading="btnLoading"
                @click="addToCart(singleProduct)"
              >
                Add to Cart
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { productsModule } from "@/stores/product.js";
import { useCartStore } from "@/stores/cart.js";
import { mapActions, mapState } from "pinia";
import { VSkeletonLoader } from "vuetify/lib/components/index.mjs";
export default {
  inject: ["Emitter"],
  name: "ProductDetails",
  data() {
    return {
      loading: false,
      tab: null,
      quantity: 1,
      btnLoading: false,
    };
  },
  components: {
    VSkeletonLoader,
  },
  computed: {
    ...mapState(productsModule, ["singleProduct"]),
    ...mapState(useCartStore, ["cartItem"]),
  },
  methods: {
    ...mapActions(productsModule, ["getSingleProduct"]),
    ...mapActions(useCartStore, ["addCartItem"]),
    addToCart(item) {
      item.quantity = this.quantity;
      this.btnLoading = true;
      setTimeout(() => {
        this.btnLoading = false;
        this.addCartItem(item);
        this.Emitter.emit("openCart");
        this.Emitter.emit("showMsg", item.title);
      }, 1000);
    },
  },
  watch: {
    singleProduct: {
      handler(newVal) {
        if (newVal.images && newVal.images.length > 0) {
          this.tab = newVal.images[0];
        } else {
          this.tab = newVal.thumbnail;
        }
      },
      immediate: true,
    },
  },
  beforeMount() {
    this.loading = true;
    this.getSingleProduct(this.$route.params.productId).then(() => {
      this.loading = false;
    });
  },
};
</script>

<style scoped lang="scss">
.product-details {
  margin-top: 16px;
}

.parent-img {
  position: relative;
  width: 50%;
  overflow: hidden;
  border-radius: 10px;
  cursor: pointer;
  margin: auto;
}

.product-title {
  font-size: 19px;
  font-weight: bold;
}

.rating {
  gap: 10px;
}

.stock-info {
  font-size: 12px;
  color: rgb(96, 96, 96);
  margin-top: 1px;
}

.product-description,
.product-brand,
.product-availability {
  font-size: 13px;
  color: rgb(96, 96, 96);
}

.product-price {
  padding-left: 0;
  padding-top: 0;
}

.discounted-price {
  font-weight: bold;
}

.quantity-label {
  padding-left: 0;
  padding-top: 0;
}

.counter {
  border-radius: 30px;
  border: 1px solid rgb(201, 201, 201);
  width: fit-content;
  display: flex;
  align-items: center;
  padding: 0 10px;
  margin-bottom: 5px;
}

.quantity-input {
  border: none;
  outline: none;
  width: 60px;
  font-size: 13px;
  text-align: center;
  padding: 3px 0;
}

.subtotal {
  padding-left: 0;
  padding-top: 0;
}

.add-to-cart-actions {
  padding-top: 0;
  margin-top: 7px;
  width: 100%;
}

.add-to-cart-btn {
  font-size: 13px;
  border-radius: 30px;
  background-color: rgb(20, 20, 20);
  color: white;
  width: 75%;
  height: 45px;
  text-transform: capitalize;
}
@media (max-width: 580px) {
  .product-details {
    .v-card-actions {
      button {
        width: 100%;
      }
    }
  }
}
</style>

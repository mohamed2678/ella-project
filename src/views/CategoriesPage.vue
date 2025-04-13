<template>
  <div class="category-page mt-10">
    <h1 class="text-center">{{ $route.params.title }}</h1>
    <v-container>
      <!-- Show loading spinner while fetching -->
      <v-row v-if="loading" justify="center">
        <v-progress-circular
          indeterminate
          color="primary"
          size="50"
          style="margin: 300px auto"
        ></v-progress-circular>
      </v-row>
      <v-row v-else>
        <v-col
          cols="12"
          sm="6"
          md="4"
          lg="3"
          v-for="item in productsCategory.products"
          :key="item.id"
          class="px-5"
        >
          <v-card elevation="0" class="pm-5">
            <v-hover v-slot="{ isHovering, props }">
              <div
                class="img-parent position-relative"
                style="height: 250px; overflow: hidden"
              >
                <!-- Show loader while image is loading -->
                <v-skeleton-loader
                  v-if="!imageLoaded[item.id]"
                  type="image"
                  class="w-100"
                  height="250"
                ></v-skeleton-loader>
                <img
                  :src="
                    shownItem[item.title] || item.thumbnail || 'fallback.jpg'
                  "
                  loading="lazy"
                  class="w-100"
                  :style="`height: 100%;
                        transition: 0.5s all ease-in-out;
                        scale: ${isHovering ? 1.15 : 1};
                        cursor: pointer;`"
                  :alt="item.title"
                  v-bind="props"
                  @load="imageLoaded[item.id] = true"
                />
                <v-btn
                  density="compact"
                  width="60"
                  height="35"
                  variant="outlined"
                  class="bg-white quick-view-btn"
                  style="
                    text-transform: none;
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                    border-radius: 30px;
                    cursor: pointer;
                    font-size: 12px;
                    transition: 0.3s;
                    opacity: 0;
                    width: fit-content;
                  "
                  @click="openQuickView(item)"
                >
                  Quick View
                </v-btn>
              </div>
            </v-hover>
            <v-card-text class="pl-0" style="height: 40px">
              ({{ item.title }})
              {{
                item.description.split(" ").length <= 4
                  ? item.description
                  : item.description.split(" ").slice(0, 6).join(" ") + "..."
              }}
            </v-card-text>
            <v-rating
              v-model="item.rating"
              half-increments
              color="yellow-darken-3 pm-1"
              size="x-small"
              density="compact"
              readonly
              class="my-2"
            ></v-rating>
            <v-card-text class="pl-0 pt-0">
              <del>${{ item.price }}</del> From
              <span class="text-red font-weight-bold">
                ${{
                  (
                    item.price -
                    item.price * (item.discountPercentage / 100)
                  ).toFixed(1)
                }}</span
              >
            </v-card-text>
            <v-btn-toggle v-model="shownItem[item.title]" mandatory>
              <v-btn
                v-for="(pic, i) in item.images"
                :value="pic"
                :key="i"
                size="x-small"
                style="border-radius: 50%"
              >
                <img
                  :src="pic"
                  width="40"
                  height="40"
                  style="border-radius: 50%"
                  :alt="item.title"
                />
              </v-btn>
            </v-btn-toggle>
            <div class="mt-5">
              <v-btn
                class="py-3 px-12"
                style="text-transform: none; border-radius: 30px"
                variant="outlined"
                @click="
                  $router.push({
                    name: 'product_details',
                    params: { productId: item.id },
                  })
                "
                >Choose Options</v-btn
              >
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { productsModule } from "@/stores/product";
import { mapActions, mapState } from "pinia";

export default {
  inject: ["Emitter"],
  data() {
    return {
      shownItem: {},
      loading: false,
      imageLoaded: {},
    };
  },
  name: "CategoryPage",
  methods: {
    ...mapActions(productsModule, ["getProductByCategory"]),
    openQuickView(product) {
      this.Emitter.emit("openQuickView", product);
    },
  },
  computed: {
    ...mapState(productsModule, ["productsCategory"]),
  },
  watch: {
    async $route() {
      document.documentElement.scrollTo(0, 0);
      this.loading = true;
      this.imageLoaded = {};
      await this.getProductByCategory(this.$route.params.category);
      this.loading = false;
    },
  },
  async mounted() {
    if (!this.$route.params.category) {
      return this.$router.go(-1);
    }
    document.documentElement.scrollTo(0, 0);
    this.loading = true;
    await this.getProductByCategory(this.$route.params.category);
    this.loading = false;
  },
};
</script>

<style scoped lang="scss">
.category-page {
  .img-parent {
    position: relative;
    overflow: hidden;
  }
  .quick-view-btn {
    opacity: 0;
    transition: opacity 0.3s;
  }
  .img-parent:hover .quick-view-btn {
    opacity: 1;
  }
}
</style>

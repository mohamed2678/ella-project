<template>
  <div class="new-products py-12">
    <div
      class="Flash-Deals mb-10 px-5 d-flex align-center justify-space-between"
    >
      <h2 style="font-weight: 900; font-size: 30px" class="text-red">
        New Products
      </h2>
      <a href="#">Shop All</a>
    </div>
    <v-container fluid>
      <v-row v-if="!products.length">
        <v-col class="pt-14" cols="7">
          <v-row>
            <v-col cols="4" v-for="num in 3" :key="num">
              <v-skeleton-loader
                type="image, article, button"
              ></v-skeleton-loader>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row v-if="products.length">
        <v-col cols="7" class="pt-15">
          <Swiper
            :pagination="{ el: '.swiper-pagination', clickable: true }"
            :modules="modules"
            :slides-per-view="3"
            :space-between="20"
            class="pb-9"
            :autoplay="{ delay: 3000 }"
          >
            <swiper-slide v-for="item in products" :key="item.id">
              <v-card elevation="0" class="pm-5">
                <v-hover v-slot="{ isHovering, props }">
                  <div
                    class="img-parent position-relative"
                    style="height: 250px; overflow: hidden"
                  >
                    <img
                      :src="
                        showenItem[item.title] ||
                        item.thumbnail ||
                        'fallback.jpg'
                      "
                      loading="lazy"
                      class="w-100"
                      :style="`height: 100%;
                        transition: 0.5s all ease-in-out;
                        scale: ${isHovering ? 1.15 : 1};
                        cursor: pointer;`"
                      :alt="item.title"
                      v-bind="props"
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
                    item.description + " " + item.title.split(" ").length <= 4
                      ? item.description
                      : item.description.split(" ").slice(0, 6).join(" ") +
                        "..."
                  }}
                </v-card-text>
                <v-rating
                  v-model="item.rating"
                  half-increments
                  color="yellow-darken-3 pm-1"
                  size="x-small"
                  density="compact"
                  readonly
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
                <v-btn-toggle v-model="showenItem[item.title]">
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
                      :alt="pic.title"
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
            </swiper-slide>
            <div class="swiper-pagination"></div>
          </Swiper>
        </v-col>
        <v-col cols="5">
          <img
            src="@/assets/images/vr-banner.webp"
            alt="vr-banner-photo"
            class="w-100"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import { Pagination, Autoplay } from "swiper";
import { VSkeletonLoader } from "vuetify/lib/components/index.mjs";
export default {
  inject: ["Emitter"],
  methods: {
    openQuickView(product) {
      this.Emitter.emit("openQuickView", product);
    },
  },
  props: {
    products: {
      type: Array,
      required: true,
    },
  },
  components: {
    Swiper,
    SwiperSlide,
    VSkeletonLoader,
  },
  data: () => ({
    showenItem: {},
  }),
  setup() {
    return {
      modules: [Pagination, Autoplay],
    };
  },
};
</script>

<style lang="scss" scoped>
::v-deep(.swiper-button-prev),
::v-deep(.swiper-button-next) {
  display: none !important;
}
</style>

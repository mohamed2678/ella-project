<template>
  <div class="product-swiper pt-16">
    <div
      class="Flash-Deals mb-10 px-5 d-flex align-center justify-space-between"
    >
      <h2
        style="font-weight: 900; font-size: 30px"
        :class="[`text-${titleColor}`]"
      >
        {{ title }}
      </h2>
      <a href="#">Shop All</a>
    </div>
    <v-container fluid v-if="!products.length">
      <v-row>
        <v-col class="pt-14" cols="12">
          <v-row>
            <v-col cols="3" v-for="num in 4" :key="num">
              <v-skeleton-loader
                type="image, article, button"
              ></v-skeleton-loader>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <v-container fluid v-else>
      <Swiper
        :pagination="{ el: '.swiper-pagination', clickable: true }"
        :modules="modules"
        :slides-per-view="4"
        :space-between="35"
        class="pb-9"
        :navigation="{ prevIcon: '.swiper-prev', nextIcon: '.swiper-next' }"
        :autoplay="{ delay: 3000 }"
      >
        <swiper-slide v-for="item in products" :key="item.id">
          <v-card elevation="0" class="pm-5">
            <v-hover v-slot="{ isHovering, props }">
              <div class="img-parent position-relative" style="height: 300px">
                <img
                  :src="
                    showenItem[item.title]
                      ? showenItem[item.title]
                      : item.thumbnail || item.image
                  "
                  loading="lazy"
                  class="w-100"
                  :style="`height: 100%;
                transition: 0.5s all ease-in-out; scale: ${
                  isHovering ? 1.15 : 1
                }; cursor: pointer;`"
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
              {{
                `(${item.title}) ${item.description}`.length <= 57
                  ? `(${item.title}) ${item.description}`
                  : `(${item.title}) ${item.description}`.substring(0, 57) +
                    "..."
              }}
            </v-card-text>
            <v-rating
              :model-value="item.rating.rate"
              half-increments
              color="yellow-darken-3 pm-1"
              size="x-small"
              density="compact"
              readonly
            ></v-rating>
            <v-card-text class="pl-0 pt-0">
              <del v-if="item.discountPercentage"> ${{ item.price }} </del>
              <span class="text-red font-weight-bold">
                ${{
                  item.discountPercentage
                    ? (
                        item.price -
                        item.price * (item.discountPercentage / 100)
                      ).toFixed(1)
                    : item.price
                }}
              </span>
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
                  alt="pic.title"
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
              >
                Choose Options
              </v-btn>
            </div>
          </v-card>
        </swiper-slide>
        <div class="swiper-pagination"></div>
      </Swiper>
    </v-container>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import { Pagination, Navigation, Autoplay } from "swiper";
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
    title: {
      type: String,
    },
    titleColor: {
      type: String,
    },
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  data: () => ({
    showenItem: {},
  }),
  setup() {
    return {
      modules: [Pagination, Navigation, Autoplay],
    };
  },
};
</script>

<style lang="scss">
.product-swiper {
  .swiper-button-next,
  .swiper-button-prev {
    border-radius: 50%;
    width: 40px;
    height: 40px;
    border: 1px solid black;
    background-color: white;
    top: 40%;
    &::after {
      font-size: 15px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .swiper-pagination-bullet {
    width: 10px;
    height: 10px;
  }
  .swiper {
    margin-left: 15px !important;
  }
}
.img-parent:hover {
  .quick-view-btn {
    opacity: 1 !important;
    border: none;
  }
}
</style>

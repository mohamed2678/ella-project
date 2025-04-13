<template>
  <div class="home">
    <UpperBanner />
    <TheFeatures />
    <TopOffers />
    <ProductsComponents
      :products="FlashDeals"
      title="Flash Deals"
      titleColor="red"
      :index="2"
    />
    <TopCategory />
    <NewProducts :products="Labtops" />
    <QualityFeatures />
    <ProductsComponents
      :index="2"
      :products="MobilProducts"
      title="Top Mobile Phones"
    />
    <v-container fluid>
      <v-row class="py-10">
        <v-col cols="6">
          <img
            src="@/assets/images/band-right-cover.webp"
            alt="Mobil photo"
            class="w-100"
          />
        </v-col>
        <v-col cols="6">
          <img
            src="@/assets/images/band-left-cover.webp"
            alt="Mobil photo"
            class="w-100"
          />
        </v-col>
      </v-row>
    </v-container>
    <ProductsComponents :index="5" :products="TVs" title="motorcycle" />
    <v-container fluid>
      <v-row class="py-8">
        <v-col cols="12">
          <img
            src="@/assets/images/tv-banner.webp"
            alt="Tv photo"
            class="w-100"
          />
        </v-col>
      </v-row>
    </v-container>
    <ProductsComponents :index="0" :products="mens" title="Mens Shoes" />
    <v-container fluid>
      <v-row class="py-8">
        <v-col cols="12">
          <img src="@/assets/images/ella design.png" alt="tv" class="w-100" />
        </v-col>
      </v-row>
    </v-container>
    <ProductsComponents
      :index="5"
      :products="womens"
      title="women's clothing"
    />
    <ProductsComponents :index="3" :products="jewelery" title="jewelery" />
    <ShopWithus />
  </div>
</template>

<script>
import UpperBanner from "@/components/hoome_page/UpperBanner.vue";
import TheFeatures from "@/components/hoome_page/TheFeatures.vue";
import TopOffers from "@/components/hoome_page/TopOffers.vue";
import ProductsComponents from "@/components/hoome_page/ProductsSwipers.vue";
import TopCategory from "@/components/hoome_page/TopCategory.vue";
import NewProducts from "@/components/hoome_page/NewProducts.vue";
import QualityFeatures from "@/components/hoome_page/QualityFeatures.vue";
import ShopWithus from "@/components/hoome_page/ShopWithus.vue";
import { productsModule } from "@/stores/product";
import { mapActions, mapState } from "pinia";
export default {
  name: "HomeView",
  components: {
    UpperBanner,
    TheFeatures,
    TopOffers,
    ProductsComponents,
    TopCategory,
    NewProducts,
    QualityFeatures,
    ShopWithus,
  },
  computed: {
    ...mapState(productsModule, [
      "FlashDeals",
      "NewProducts",
      "MobilProducts",
      "Labtops",
      "TVs",
      "mens",
      "womens",
      "jewelery",
    ]),
  },
  methods: {
    ...mapActions(productsModule, [
      "getProduct",
      "getMobil",
      "getLap",
      "getTV",
      "getMan",
      "getWomens",
      "getJewelery",
    ]),
  },
  //get data in console
  async mounted() {
    await this.getProduct();
    await this.getMobil();
    await this.getLap();
    await this.getTV();
    await this.getMan();
    await this.getWomens();
    await this.getJewelery();
  },
};
</script>

<template>
  <div class="home">
    <UpperBanner />
    <TheFeatures />
    <TopOffers />
    <FlashDeals :products="FlashDeals" />
  </div>
</template>

<script>
import UpperBanner from "@/components/hoome_page/UpperBanner.vue";
import TheFeatures from "@/components/hoome_page/TheFeatures.vue";
import TopOffers from "@/components/hoome_page/TopOffers.vue";
import FlashDeals from "@/components/hoome_page/ProductsSwipers.vue";
import { productsModule } from "@/stores/product";
import { mapActions, mapState } from "pinia";
export default {
  name: "HomeView",
  components: {
    UpperBanner,
    TheFeatures,
    TopOffers,
    FlashDeals,
  },
  computed: {
    ...mapState(productsModule, ["FlashDeals"]),
  },
  methods: {
    ...mapActions(productsModule, ["getProduct"]),
  },
  //get data in console
  async mounted() {
    await this.getProduct();
    console.log(this.FlashDeals);
  },
};
</script>

<template>
  <div class="layout">
    <v-layout class="position-relative">
      <CartDrawer />
      <v-main style="padding-top: 150px">
        <slot></slot>
      </v-main>
      <AppNav />
      <FixedNav />
      <AppFooter />
    </v-layout>
  </div>
</template>

<script>
import AppNav from "./AppNav.vue";
import FixedNav from "./FixedNav.vue";
import AppFooter from "./AppFooter.vue";
import CartDrawer from "./CartDrawer.vue";
export default {
  data: () => ({
    drawer: true,
  }),
  components: {
    AppNav,
    FixedNav,
    AppFooter,
    CartDrawer,
  },
};
</script>

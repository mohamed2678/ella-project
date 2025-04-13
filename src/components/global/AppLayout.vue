<template>
  <div class="layout">
    <v-layout class="position-relative">
      <CartDrawer :windoWidth="windoWidth" />
      <menuDrawer :windoWidth="windoWidth" />
      <v-main
        :style="`padding-top: ${
          $route.name == 'checkout_page'
            ? '0'
            : windoWidth <= 990
            ? '50px'
            : '150px'
        }`"
      >
        <slot></slot>
      </v-main>
      <AppNav v-show="$route.name != 'checkout_page' && windoWidth > 990" />
      <ResponsiveNav
        v-show="windoWidth <= 990 && $route.name != 'checkout_page'"
      />
      <FixedNav v-show="$route.name != 'checkout_page' && windoWidth > 990" />
      <AppFooter v-show="$route.name != 'checkout_page'" />
    </v-layout>
  </div>
</template>

<script>
import AppNav from "./AppNav.vue";
import FixedNav from "./FixedNav.vue";
import AppFooter from "./AppFooter.vue";
import CartDrawer from "./CartDrawer.vue";
import ResponsiveNav from "./ResponsiveNav.vue";
import menuDrawer from "./MenuDrawer.vue";
export default {
  data: () => ({
    windoWidth: 0,
  }),
  components: {
    AppNav,
    FixedNav,
    AppFooter,
    CartDrawer,
    ResponsiveNav,
    menuDrawer,
  },
  mounted() {
    this.windoWidth = window.innerWidth;
    window.onresize = () => {
      this.windoWidth = window.innerWidth;
    };
  },
};
</script>

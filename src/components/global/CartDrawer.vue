<template>
  <v-navigation-drawer location="right" v-model="drawer" temporary>
    <p>mohamed mostaf galala</p>
  </v-navigation-drawer>
</template>
<script>
export default {
  inject: ["Emitter"],
  data: () => ({
    drawer: false,
  }),
  mounted() {
    this.Emitter.on("openCart", () => {
      this.drawer = true;
    });
  },
};
</script>

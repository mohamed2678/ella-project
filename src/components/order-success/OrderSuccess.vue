<template>
  <div class="order-success">
    <v-dialog v-model="dialog" width="50%" persistent>
      <v-card class="text-center">
        <div class="text-center my-5">
          <v-icon color="success" size="100">mdi-check-circle</v-icon>
        </div>
        <v-card-title
          style="font-size: 30px; font-weight: bold; color: rgb(93, 93, 93)"
          >Order Placed Successfully!</v-card-title
        >
        <v-card-text style="font-size: 17px; color: rgb(93, 93, 93)">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
          doloribus maiores ducimus recusandae nihil eius, ipsum repellendus
          aspernatur accusamus explicabo temporibus officiis hic cum minus a ab
          cupiditate vel quo.</v-card-text
        >
        <v-card-actions class="my-5 justify-center">
          <v-btn variant="elevated" color="primary" @click="resetData"
            >Got it!</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { useCartStore } from "@/stores/cart";
import { mapActions } from "pinia";
export default {
  data: () => ({
    dialog: false,
  }),
  methods: {
    ...mapActions(useCartStore, ["resetItems"]),
    resetData() {
      this.resetItems();
      this.dialog = false;
      this.$router.push("/");
    },
  },
  props: {
    popup: {
      type: Boolean,
    },
  },
  watch: {
    popup(newVal) {
      if (!newVal) {
        setTimeout(() => {
          this.$emit("close_popup");
        }, 200);
      }
    },
  },
  mounted() {
    this.dialog = this.popup;
  },
};
</script>

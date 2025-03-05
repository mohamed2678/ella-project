<template>
  <div>
    <div v-if="loading" class="loading-screen">
      <div class="dots-container">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
    </div>
    <div v-else>
      <app-layout>
        <router-view />
        <QuickView />
        <v-snackbar
          v-model="bar"
          location="left bottom"
          max-width="400"
          timeout="3000"
          transition="slide-x-transition"
          transition-duration="1000"
          color="blue"
        >
          {{ itemTitle }} has been added to the cart successfully!
          <template v-slot:actions>
            <v-icon @click="bar = false" color="white">mdi-close</v-icon>
          </template>
        </v-snackbar>
      </app-layout>
    </div>
  </div>
</template>

<script>
import AppLayout from "@/components/global/AppLayout.vue";
import QuickView from "@/components/global/QickView.vue";
export default {
  inject: ["Emitter"],
  components: {
    AppLayout,
    QuickView,
  },
  data() {
    return {
      loading: true,
      bar: false,
      itemTitle: "",
    };
  },
  mounted() {
    this.Emitter.on("showMsg", (data) => {
      this.itemTitle = data;
      this.bar = true;
    });
    setTimeout(() => {
      this.loading = false;
    }, 2000); // Adjust the timeout duration as needed
  },
};
</script>

<style>
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  z-index: 9999;
}

.dots-container {
  display: flex;
  justify-content: space-between;
  width: 60px;
}

.dot {
  width: 15px;
  height: 15px;
  background-color: #3498db;
  border-radius: 50%;
  animation: dot-blink 1.4s infinite both;
}

.dot:nth-child(1) {
  animation-delay: -0.32s;
}

.dot:nth-child(2) {
  animation-delay: -0.16s;
}

@keyframes dot-blink {
  0%,
  80%,
  100% {
    opacity: 0;
  }
  40% {
    opacity: 1;
  }
}
</style>

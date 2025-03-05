<template>
  <div class="bannar">
    <div class="parent">
      <v-container>
        <v-row>
          <v-col cols="6">
            <div class="cont">
              <h3>
                <span
                  v-for="(char, i) in 'Huge Saving'.split('')"
                  :key="i"
                  :style="{
                    animationDelay: `${i * 0.1}s`,
                    whiteSpace: char === ' ' ? 'pre' : 'normal',
                  }"
                  class="animated-char"
                  >{{ char }}</span
                >
                on UHD Televisions
              </h3>
              <p class="hint">
                <span
                  v-for="(
                    char, i
                  ) in 'sale up to 70% off on selected items'.split('')"
                  :key="i"
                  :style="{
                    animationDelay: `${i * 0.1}s`,
                    whiteSpace: char === ' ' ? 'pre' : 'normal',
                  }"
                  class="animated-char"
                  >{{ char }}</span
                >
              </p>
              <v-btn
                variant="outlined"
                class="py-3 px-10"
                density="compact"
                style="border-radius: 30px; text-transform: none"
                >Shop Now</v-btn
              >
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.bannar {
  .parent {
    height: 390px;
    background-image: url(../../assets/images/banner-bg.jpg);
    background-size: cover;
    background-position: -40px top;
  }
  .cont {
    color: white;
    padding: 40px 0 0 100px;
    h3 {
      font-size: 48px;
      font-weight: 900;
      letter-spacing: 1px;
      span {
        color: #00ff9d;
        display: inline-block;
        animation: fadeInUp 0.5s ease forwards;
        opacity: 0;
      }
    }
    .hint {
      margin: 20px 0 40px;
      span {
        display: inline-block;
        animation: fadeInUp 0.5s ease forwards;
        opacity: 0; /* Ensure characters are hidden before animation */
      }
    }
  }
  .v-btn.v-btn--density-compact {
    height: calc(var(--v-btn-height) + 8px) !important;
  }
}
</style>

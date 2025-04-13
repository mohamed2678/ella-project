<template>
  <div class="bannar">
    <div class="parent">
      <img src="@/assets/images/banner-bg.jpg" alt="" />
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
            v-for="(char, i) in 'sale up to 70% off on selected items'.split(
              ''
            )"
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
    position: relative;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .cont {
    color: white;
    padding: 40px 0 0 100px;
    position: absolute;
    left: 40px;
    top: 20px;
    width: 600px;
    h3 {
      font-size: 3rem;
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
// media qoury
@media (max-width: 990px) {
  .bannar {
    .parent {
      .cont {
        h3 {
          font-size: 35px;
        }
        width: 500px;
        left: 0;
      }
    }
  }
}
@media (max-width: 767px) {
  .bannar {
    .parent {
      height: 320px;
      .cont {
        padding-left: 20px;
        h3 {
          font-size: 30px;
        }
        width: 500px;
        left: 0;
        .hint {
          font-size: 14px;
        }
      }
    }
  }
}
@media (max-width: 580px) {
  .bannar {
    .parent {
      height: 250px;
      .cont {
        padding-left: 20px;
        padding-top: 20px;
        h3 {
          font-size: 21px;
        }
        width: 80%;
        left: 0;
        .hint {
          font-size: 12px;
        }
        button {
          height: 40px !important;
          width: 130px;
          font-size: 11px !important;
        }
      }
    }
  }
}
</style>

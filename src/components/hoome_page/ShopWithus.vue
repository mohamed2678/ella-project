<template>
  <div class="shop-withus py-14">
    <div class="title">
      <h2 class="text-center mb-5"><span>Whay shop</span> with us?</h2>
    </div>
    <v-container fluid>
      <v-row>
        <v-col cols="3" class="text-center text-white">
          <v-crad elevation="0">
            <div class="img-parent">
              <img src="@/assets/images/free-shipping.png" alt="" />
            </div>
            <v-card-title
              style="white-space: pre-wrap; line-height: 1.2; font-weight: 700"
            >
              Free Shipping on First Order
            </v-card-title>
            <v-card-text class="pb-0" style="font-size: 15px"
              >Lorem ipsum dolor sit amet</v-card-text
            >
            <div class="learn-more">
              <a
                class="text-white"
                style="font-weight: 700; font-size: 14px"
                href="#"
                >Learn More</a
              >
            </div>
          </v-crad>
        </v-col>
        <v-col cols="3" class="text-center text-white">
          <v-crad elevation="0">
            <div class="img-parent">
              <img src="@/assets/images/weekly-flash-sales.png" alt="" />
            </div>
            <v-card-title
              style="white-space: pre-wrap; line-height: 1.2; font-weight: 700"
            >
              Weekly Flash Sale
            </v-card-title>
            <v-card-text class="pb-0" style="font-size: 15px"
              >Lorem ipsum dolor sit amet</v-card-text
            >
            <div class="learn-more">
              <a
                class="text-white"
                style="font-weight: 700; font-size: 14px"
                href="#"
                >Learn More</a
              >
            </div>
          </v-crad>
        </v-col>
        <v-col cols="3" class="text-center text-white">
          <v-crad elevation="0">
            <div class="img-parent">
              <img src="@/assets/images/discount.png" alt="" />
            </div>
            <v-card-title
              style="white-space: pre-wrap; line-height: 1.2; font-weight: 700"
            >
              Annul Payment Discount
            </v-card-title>
            <v-card-text class="pb-0" style="font-size: 15px"
              >Lorem ipsum dolor sit amet</v-card-text
            >
            <div class="learn-more">
              <a
                class="text-white"
                style="font-weight: 700; font-size: 14px"
                href="#"
                >Learn More</a
              >
            </div>
          </v-crad>
        </v-col>
        <v-col cols="3" class="text-center text-white px-1">
          <v-crad elevation="0">
            <div class="img-parent">
              <img src="@/assets/images/cash-back.png" alt="" />
            </div>
            <v-card-title
              style="white-space: pre-wrap; line-height: 1.2; font-weight: 700"
            >
              Cashback Reward Program
            </v-card-title>
            <v-card-text class="pb-0" style="font-size: 15px"
              >Lorem ipsum dolor sit amet</v-card-text
            >
            <div class="learn-more">
              <a
                class="text-white"
                style="font-weight: 700; font-size: 14px"
                href="#"
                >Learn More</a
              >
            </div>
          </v-crad>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style lang="scss">
.shop-withus {
  background-image: url(../../assets/images/why-shop-with-us-banner.webp);
  background-repeat: repeat-x;
  background-size: cover;
  h2 {
    color: white;
    font-weight: 900;
    font-size: 30px;
    span {
      color: aqua;
    }
  }
}
</style>

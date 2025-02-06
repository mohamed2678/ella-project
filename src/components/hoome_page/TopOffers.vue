<template>
  <div class="top-offers bg-gray-lighten-4 py-9">
    <v-container fluid class="pt-9">
      <v-row>
        <v-col cols="4" class="pl-2">
          <v-hover v-slot="{ isHovering, props }">
            <div
              class="parent"
              v-bind="props"
              style="overflow: hidden; border-radius: 7px"
            >
              <img
                src="@/assets/images/playstations.webp"
                alt="PlayStation"
                :style="`width: 100%; transition: 0.5s all ease-in-out; cursor: pointer; scale: ${
                  isHovering ? 1.1 : 1
                }`"
              />
            </div>
          </v-hover>
        </v-col>
        <v-col cols="4" class="pl-2">
          <v-hover v-slot="{ isHovering, props }">
            <div
              class="parent"
              v-bind="props"
              style="overflow: hidden; border-radius: 7px"
            >
              <img
                src="@/assets/images/headset.webp"
                alt="PlayStation"
                :style="`width: 100%; transition: 0.5s all ease-in-out; cursor: pointer; scale: ${
                  isHovering ? 1.1 : 1
                }`"
              />
            </div>
          </v-hover>
        </v-col>
        <v-col cols="4" class="pl-2">
          <v-hover v-slot="{ isHovering, props }">
            <div
              class="parent"
              v-bind="props"
              style="overflow: hidden; border-radius: 7px"
            >
              <img
                src="@/assets/images/chairs.webp"
                alt="PlayStation"
                :style="`width: 100%; transition: 0.5s all ease-in-out; cursor: pointer; ;scale: ${
                  isHovering ? 1.1 : 1
                }`"
              />
            </div>
          </v-hover>
        </v-col>
      </v-row>
      <v-row class="mt-4">
        <v-col cols="6" class="mt-2 pr-5 py-0">
          <v-hover v-slot="{ isHovering, props }">
            <div
              class="parent"
              v-bind="props"
              style="overflow: hidden; height: 100%; border-radius: 7px"
            >
              <img
                src="@/assets/images/iphones.webp"
                alt="iphones"
                :style="`width: 100%; height: 100%; transition: 0.5s all ease-in-out; cursor: pointer; scale: ${
                  isHovering ? 1.1 : 1
                }`"
              />
            </div>
          </v-hover>
        </v-col>
        <v-col cols="6" class="mt-2 pl-5 py-0">
          <v-hover v-slot="{ isHovering, props }">
            <div
              class="parent"
              v-bind="props"
              style="overflow: hidden; height: 100%; border-radius: 7px"
            >
              <img
                src="@/assets/images/laptops.webp"
                alt="laptops"
                :style="`width: 100%; height: 100%; transition: 0.5s all ease-in-out; cursor: pointer; scale: ${
                  isHovering ? 1.1 : 1
                }`"
              />
            </div>
          </v-hover>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

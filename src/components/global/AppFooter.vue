<template>
  <div class="app-footer">
    <v-footer :app="true" color="black" absolute>
      <v-spacer></v-spacer>
      <div class="text-center">
        &copy; {{ new Date().getFullYear() }}
        <strong>My App by {{ name }}</strong>
      </div>
      <v-spacer></v-spacer>
    </v-footer>
  </div>
</template>

<script>
export default {
  data: () => ({
    name: "galal",
  }),
};
</script>

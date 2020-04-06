<template>
  <v-content> </v-content>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['user'])
  }
}
</script>
<style scoped></style>

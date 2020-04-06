<template>
  <v-content>
    <div class="pa-2"><v-btn @click="logOut" color="error">Log out</v-btn></div>
  </v-content>
</template>

<script>
import firebase from 'firebase'
export default {
  methods: {
    logOut() {
      firebase.auth().signOut()
      this.$router.push('/signIn')
    }
  }
}
</script>
<style scoped></style>

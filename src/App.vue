<template>
  <v-app>
    <v-app-bar
      app
      elevate-on-scroll
      color="white"
      v-show="$route.meta.requiresAuth"
    >
      <v-app-bar-nav-icon
        color="primary"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="primary--text font-weight-bold">{{
        $route.name
      }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon v-show="$route.name == 'Reminder'" to="/new">
        <v-icon color="primary">add</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" fixed temporary>
      <v-list dense nav>
        <v-list-item>
          <v-list-item-avatar>
            <v-img :src="user.photoURL"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ user.displayName }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item
          v-for="route in $router.options.routes"
          :key="route.name"
          link
          :to="route.path"
          v-show="route.meta.requiresAuth"
        >
          <v-list-item-icon>
            <v-icon>{{ route.meta.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ route.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <router-view />
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'App',
  data: () => ({
    drawer: false
  }),
  computed: mapState(['user']),
  created() {
    this.$store.dispatch('setCurrentUser')
  }
}
</script>

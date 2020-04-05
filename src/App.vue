<template>
  <v-app>
    <v-app-bar
      app
      elevate-on-scroll
      color="primary"
      v-show="$route.meta.requiresAuth"
    >
      <v-app-bar-nav-icon
        color="secondary"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="secondary--text font-weight-bold"
        >Reminder</v-toolbar-title
      >
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon color="secondary">add</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list dense nav>
        <v-list-item>
          <v-list-item-avatar>
            <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Mika Reich</v-list-item-title>
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
export default {
  name: 'App',
  data: () => ({
    drawer: false
  })
}
</script>

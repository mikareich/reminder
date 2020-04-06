<template>
  <div class="text-center pa-2">
    <v-avatar size="130" color="red">
      <img src="/img/notebook.jpg" alt="Notebook" />
    </v-avatar>
    <v-banner two-line class="text-left overline">
      Sign in so that you too can enjoy the benefits of Reminder and never
      forget anything again.
    </v-banner>
    <v-form class="mt-2" ref="form" v-model="isValid">
      <v-text-field
        prepend-inner-icon="face"
        filled
        label="Name"
        :rules="[rules.required]"
        v-model="name"
      ></v-text-field>
      <v-text-field
        prepend-inner-icon="alternate_email"
        filled
        label="Email"
        v-model="email"
        :rules="[rules.email, rules.required]"
      ></v-text-field>
      <v-text-field
        prepend-inner-icon="vpn_key"
        filled
        label="Password"
        v-model="password"
        :type="passwordShown ? 'text' : 'password'"
        :append-icon="passwordShown ? 'visibility' : 'visibility_off'"
        :rules="[rules.required, rules.password]"
        @click:append="passwordShown = !passwordShown"
      ></v-text-field>
      <v-btn color="primary" @click="signUp">Sign Up</v-btn>
    </v-form>
    <p class="overline mt-2">
      You're already a user? Then <a href="/signIn">click here</a> to sign in.
    </p>
    <v-snackbar v-model="snackbar" :timeout="8000">
      {{ snackbarText }}
      <v-btn color="primary" text @click="snackbar = false">
        Dismiss
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  data() {
    return {
      name: null,
      email: null,
      password: null,
      passwordShown: false,
      isValid: false,
      firebaseError: false,
      snackbar: false,
      snackbarText: null,
      rules: {
        email: v =>
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            v
          ) || 'Email is invalid',
        required: v => !!v || 'This field is required',
        password: v =>
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/.test(
            v
          ) ||
          'The password must be 8 characters long and contain an uppercase letter, a lowercase letter, a number and a special character.'
      }
    }
  },
  methods: {
    signUp() {
      this.$refs.form.validate()
      if (this.isValid) {
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .then(({ user }) => {
            user.updateProfile({
              displayName: this.name,
              photoURL: `https://api.adorable.io/avatars/110/${this.name}`
            })
          })
          .catch(err => {
            this.snackbarText = err.message
            this.snackbar = true
          })
      }
    }
  }
}
</script>

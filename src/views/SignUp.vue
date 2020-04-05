<template>
  <div class="text-center pa-2">
    <v-avatar size="130" color="red">
      <img src="/img/notebook.jpg" alt="Notebook" />
    </v-avatar>
    <v-banner
      two-line
      class="text-left d-flex align-center"
      :style="{ 'color: red': firebaseError }"
    >
      <v-avatar slot="icon" :color="firebaseError ? 'red' : 'orange'">
        <v-icon icon="error" color="white" v-if="firebaseError">
          error
        </v-icon>
        <v-icon icon="info" color="white" v-else>info</v-icon>
      </v-avatar>
      <p class="body-2 ma-auto">
        {{
          firebaseError
            ? firebaseError
            : 'Sign in so that you too can enjoy the benefits of Reminder and never forget anything again.'
        }}
      </p>
    </v-banner>
    <v-form class="mt-2" v-model="isValid">
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
      if (this.isValid) {
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .then(({ user }) => {
            user.updateProfile({
              displayName: this.name
            })
          })
          .catch(err => {
            this.firebaseError = err.message
          })
      }
    }
  }
}
</script>

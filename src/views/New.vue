<template>
  <v-content>
    <div class="pa-2">
      <v-banner class="overline">
        Create a memory to never forget anything again. Just enter the title,
        content and date and we will remind you.
      </v-banner>
      <v-form v-model="isValid" class="mt-2" ref="form">
        <v-text-field
          label="Title"
          v-model="title"
          hint="Title under which the reminder is listed."
          filled
          prepend-inner-icon="title"
          clear-icon="clear"
          clearable
          :rules="[rules.required]"
        ></v-text-field>
        <v-textarea
          filled
          label="Content"
          v-model="content"
          hint="Enter the reminder here."
          auto-grow
          prepend-inner-icon="text_fields"
          rows="1"
          clear-icon="clear"
          clearable
          :rules="[rules.required]"
        ></v-textarea>
        <v-menu
          ref="menu"
          v-model="datepickerShown"
          :close-on-content-click="false"
          :return-value.sync="date"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="date"
              label="Date to remind"
              prepend-inner-icon="event"
              readonly
              filled
              v-on="on"
              :disabled="!specificDate"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="date"
            no-title
            scrollable
            :min="new Date().toISOString().substr(0, 10)"
          >
            <v-btn text color="primary" @click="datepickerShown = false"
              >Cancel</v-btn
            >
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="$refs.menu.save(date)"
              >OK</v-btn
            >
          </v-date-picker>
        </v-menu>
        <v-checkbox
          v-model="specificDate"
          label="Bind to specific Date"
        ></v-checkbox>
        <v-btn color="primary" @click="submitReminder">Create</v-btn>
      </v-form>
      <v-snackbar v-model="snackbar" :timeout="8000">
        {{ snackbarText }}
        <v-btn color="primary" text @click="snackbar = false">
          Close
        </v-btn>
      </v-snackbar>
    </div>
  </v-content>
</template>

<script>
import { mapState } from 'vuex'
import firebase from 'firebase'
export default {
  data() {
    return {
      isValid: false,
      title: null,
      content: null,
      datepickerShown: false,
      date: new Date().toISOString().substr(0, 10),
      specificDate: false,
      snackbar: false,
      snackbarText: null,
      rules: {
        required: v => !!v || 'This field is required'
      }
    }
  },
  methods: {
    submitReminder() {
      this.$refs.form.validate()
      if (this.isValid) {
        const { uid } = this.user
        const reminderKey = Math.floor(Math.random() * 1000000)
        const reminderData = {
          title: this.title,
          content: this.content,
          date: this.specificDate ? this.date : false
        }
        firebase
          .database()
          .ref(`users/${uid}/${reminderKey}/`)
          .update(reminderData)
          .then(() => {
            this.$refs.form.reset()
            this.snackbarText = 'New reminder set.'
            this.snackbar = true
          })
      }
    }
  },
  computed: mapState(['user'])
}
</script>

<style scoped></style>

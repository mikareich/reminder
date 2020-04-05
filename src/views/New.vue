<template>
  <v-content>
    <div class="pa-2">
      <v-banner class="overline">
        Create a memory to never forget anything again. Just enter the title,
        content and date and we will remind you.
      </v-banner>
      <v-form v-model="isValid" class="mt-2">
        <v-text-field
          label="Title"
          v-model="title"
          hint="Title under which the reminder is listed."
          filled
          prepend-inner-icon="title"
          clear-icon="clear"
          clearable
        ></v-text-field>
        <v-textarea
          filled
          label="Content"
          v-model="content"
          hint="Enter the reminder here."
          auto-grow
          prepend-inner-icon="text_fields"
          rows="1"
        ></v-textarea>
        <v-menu
          v-model="datepickerShown"
          :close-on-content-click="false"
          :nudge-right="40"
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
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="date"
            @input="datepickerShown = false"
          ></v-date-picker>
        </v-menu>
        <v-btn color="primary">Create</v-btn>
      </v-form>
    </div>
  </v-content>
</template>

<script>
export default {
  data() {
    return {
      isValid: false,
      title: null,
      content: null,
      datepickerShown: false,
      date: new Date().toISOString().substr(0, 10),
      rules: {}
    }
  }
}
</script>

<style scoped></style>

<template>
  <v-menu
    ref="menu"
    v-model="timePickerVisibility"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    max-width="290px"
    min-width="290px"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        v-model="time"
        :label="label"
        readonly
        v-on="on"
      ></v-text-field>
    </template>
    <v-time-picker
      v-if="timePickerVisibility"
      v-model="time"
      full-width
      @click:hour="hourChanged"
      @click:minute="minuteChanged"
    ></v-time-picker>
  </v-menu>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import {paddedTime} from "@/Helper";

export const EVENT_TIME_CHANGED = "time-changed";

@Component({
  props: {
    label: String
  }
})
export default class TimePicker extends Vue {
  private timePickerVisibility: boolean = false;
  private time: any = "00:00";

  private mounted() {
    this.time = paddedTime(new Date()); // now!
    this.emitTime();
  }

  private hourChanged(hour: any): void {
    this.emitTime();
  }

  private minuteChanged(minute: any): void {
    this.emitTime();
  }

  private emitTime() {
    if (this.time) {
      this.$emit(EVENT_TIME_CHANGED, this.time);
    }
  }
}
</script>

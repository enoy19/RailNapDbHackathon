<template>
  <v-list v-if="route">
    <v-list-item v-for="(segment, index) in route.segments" :key="index">
      <v-checkbox></v-checkbox>
      <v-list-item-title>{{ segmentDestination(segment) }} | Sleep: {{ segmentDuration(segment) }}</v-list-item-title>
    </v-list-item>
  </v-list>
</template>

<script lang="ts">
import Vue from "vue";
import { paddedTime, unixToDate } from "@/Helper";
import Component from "vue-class-component";
import {Segment} from "@/Marudor";

@Component({
  props: {
    route: Object
  }
})
export default class SleepSelector extends Vue {
  private segmentDuration(segment: Segment) {
    return paddedTime(unixToDate(segment.duration));
  }

  private segmentDestination(segment: Segment) {
    return segment.segmentDestination.title;
  }
}
</script>

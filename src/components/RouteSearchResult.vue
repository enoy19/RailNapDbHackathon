<template>
  <v-list-item @click="() => $emit('clicked', route)">
    <v-list-item-content>
      <v-list-item-title>{{departureTimeFormatted}} -> {{arrivalTimeFormatted}} | Max. Sleep: {{ maxSleepTime }}</v-list-item-title
      ><v-list-item-subtitle>
        {{ departure }} -> {{ destination }}
      </v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Route } from "@/Marudor";
import { unixToDate, paddedTime } from "@/Helper";

@Component({
  props: {
    route: Object,
    departure: String,
    destination: String
  }
})
export default class RouteSearchResult extends Vue {
  private get maxSleepTime(): string {
    const route = this.$props.route as Route;
    const maxTravelTime = route.arrival.time - route.departure.time;
    const duration = unixToDate(maxTravelTime);
    return paddedTime(duration);
  }

  private get arrivalTimeFormatted() {
    const route = this.$props.route as Route;
    const time = unixToDate(route.arrival.time);
    return paddedTime(time);
  }

  private get departureTimeFormatted() {
    const route = this.$props.route as Route;
    const time = unixToDate(route.departure.time);
    return paddedTime(time);
  }
}
</script>

<template>
  <v-container>
    <StationSearchBox
      label="Von:"
      @station-selected="station => (this.departure = station)"
    />
    <StationSearchBox
      label="Nach:"
      @station-selected="station => (this.destination = station)"
    />
    <v-row>
      <v-col cols="6" md="4">
        <TimePicker
          label="Zeit"
          @time-changed="time => (this.time = time)"
        ></TimePicker>
      </v-col>
      <v-col cols="6" md="4">
        <v-select
          disabled
          :items="['Abfahrt', 'Ankunft']"
          @change="type => (routeTimeType = type)"
          :value="routeTimeType"
        ></v-select>
      </v-col>
      <v-col cols="12" md="4">
        <v-btn block color="primary" @click="search">Suchen</v-btn>
      </v-col>
    </v-row>
    <v-row v-if="userSearching">
      <v-col cols="12">
        <v-list>
          <v-list-item-group color="primary">
            <RouteSearchResult
              v-for="(route, index) in this.routes"
              :key="index"
              :departure="departure.title"
              :destination="destination.title"
              :route="route"
              @clicked="(route) => routeSelected(route)"
            >
            </RouteSearchResult>
          </v-list-item-group>
        </v-list>
      </v-col>
    </v-row>
    <v-dialog v-model="userSelectingSleep">
      <v-card>
        <v-card-title>Schlaf Auswählen</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <SleepSelector :route="selectedRoute"></SleepSelector>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="blue darken-1" text @click="userSelectingSleep = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="startAlarm">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
// @ is an alias to /src
import Vue from "vue";
import Component from "vue-class-component";
import StationSearchBox from "@/components/StationSearchBox.vue";
import TimePicker from "@/components/TimePicker.vue";
import RouteSearchResult from "@/components/RouteSearchResult.vue";
import SleepSelector from "@/components/SleepSelector.vue";
import { post, Route, Station } from "@/Marudor";

@Component({
  name: "home",
  components: {
    StationSearchBox,
    TimePicker,
    RouteSearchResult,
    SleepSelector
  },
  props: {
    label: String
  }
})
export default class Home extends Vue {
  private routeTimeType: "Abfahrt" | "Ankunft" = "Ankunft";
  private departure: Station | undefined;
  private destination: Station | undefined;
  private time: string = "00:00";
  private routes: Route[] = [];
  private userSearching: boolean = false;
  private selectedRoute: Route | undefined = undefined;
  private userSelectingSleep: boolean = false;

  private async search() {
    if (!this.destination || !this.departure) {
      // TODO: refactor to form? or just show some error
      return;
    }

    const today = new Date();
    let timeString = `${today.getFullYear()}-${today.getMonth() +
      1}-${today.getDate()}T${this.time}:00`;
    const timeStamp = new Date(timeString).getTime();

    const result = await post("hafas/v1/route", {
      destination: this.destination.id,
      start: this.departure.id,
      hafasProfile: "db",
      maxChanges: "-1",
      time: timeStamp,
      transferTime: "0"
    });

    if (!result || (result && !result.routes)) {
      // TODO: ERROR SNACK BAR
      return;
    }

    this.routes.length = 0;
    this.routes.push(...result.routes);

    this.userSearching = true;
  }

  private routeSelected(route: Route) {
    this.selectedRoute = route;
    this.userSelectingSleep = true;
  }

  private startAlarm() {
    this.userSelectingSleep = false;
  }
}
</script>

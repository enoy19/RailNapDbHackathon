<template>
  <v-autocomplete
    :label="label"
    :items="stations"
    item-text="title"
    :return-object="true"
    @change="stationSelected"
    @update:search-input="searchStation"
  ></v-autocomplete>
  <!--<v-container>
    <v-layout text-center wrap>
      <v-flex xs12>
        <v-img
          :src="require('../assets/logo.svg')"
          class="my-3"
          contain
          height="200"
        ></v-img>
      </v-flex>
    </v-layout>
  </v-container>-->
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { get } from "@/Marudor";

@Component({
  props: {
    label: String
  }
})
export default class StationSearchBox extends Vue {
  private stations = [];
  private lastSearch: string | undefined = undefined;

  private async searchStation(search: string) {
    if (!search || this.lastSearch == search) {
      return;
    }

    this.lastSearch = search;

    try {
      this.stations = await get(
        `station/v1/search/${encodeURIComponent(search)}`
      );
    } catch (e) {
      console.error(e);
    }
  }

  private stationSelected(station: any) {
    this.$emit("station-selected", station);
  }
}
</script>

<template>

</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import {Route} from "@/Marudor";

// TODO TODO TODO

@Component({
  props: {
    route: Object
  }
})
export default class StationSearchBox extends Vue {
  private stationSelected(selection: string) {
    this.$emit("station-selected", selection);
  }
}
</script>

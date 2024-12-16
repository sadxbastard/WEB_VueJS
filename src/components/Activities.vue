<template>
  <DataTable
      :value="activities"
      :lazy="true"
      :loading="dataStore.loading"
      :paginator="true"
      :rows="perpage"
      :rows-per-page-options="[2, 5, 10]"
      :total-records="activities_total"
      @page="onPageChange"
      responsive-layout="scroll"
      :first="offset"
  >
    <Column field="id" header="№"/>
    <Column :field="getActivityTypeName" header="Название вида активности"/>
    <Column field="activity_name" header="Название активности"/>
    <Column field="actual_score" header="Фактический результат"/>
  </DataTable>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { useDataStore } from "@/stores/dataStore.js";

export default {
  name: "Activities",
  components: {DataTable, Column},
  data() {
    return {
      dataStore: useDataStore(),
      perpage: 5,
      offset: 0,
    }
  },
  computed: {
    activities() {
      return this.dataStore.activities;
    },
    activities_total() {
      return this.dataStore.activities_total;
    }
  },
  mounted() {
    console.log('Activities component mounted.');
    this.dataStore.get_activities();
    this.dataStore.get_activities_total();
    this.dataStore.get_types_of_activity(); // Подгрузка данных о видах активности
    console.log('Activities = ', this.activities);
  },
  methods: {
    onPageChange(event) {
      this.offset = event.first;
      this.perpage = event.rows;
      this.dataStore.get_activities(this.offset / this.perpage, this.offset / this.perpage);
    },
    getActivityTypeName(row) {
      const activityType = this.dataStore.types_of_activity.find(
          (type) => type.id === row.types_of_activity_id
      );
      return activityType ? activityType.type_of_activity_name : "Неизвестный тип";
    },
  }
}
</script>

<style scoped>

</style>
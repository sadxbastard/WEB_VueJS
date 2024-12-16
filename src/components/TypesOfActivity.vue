<template>
  <DataTable
    :value="types_of_activity"
    :lazy="true"
    :loading="dataStore.loading"
    :paginator="true"
    :rows="perpage"
    :rowsPerPageOptions="[2, 5, 10]"
    :totalRecords="types_of_activity_total"
    @page="onPageChange"
    responsive-layout="scroll"
    :first="offset"
    >
      <Column field="id" header="№"/>
      <Column field="type_of_activity_name" header="Наименование вида активности"/>
      <Column field="maximum_score" header="Максимальный результат"/>
  </DataTable>
</template>

<script>
  import DataTable from "primevue/datatable";
  import Column from "primevue/column";
  import { useDataStore } from "@/stores/dataStore.js";

  export default {
    name: "TypeOfActivity",
    components: {DataTable, Column},
    data() {
      return {
        dataStore: useDataStore(),
        perpage: 5,
        offset: 0,
      }
    },
    computed: {
      types_of_activity() {
        return this.dataStore.types_of_activity;
      },
      types_of_activity_total() {
        return this.dataStore.types_of_activity_total;
      }
    },
    mounted() {
      console.log('Types_of_activity component mounted.');
      this.dataStore.get_types_of_activity();
      this.dataStore.get_types_of_activity_total();
      console.log('Types_of_activity = ', this.dataStore.types_of_activity);
    },
    methods: {
      onPageChange(event) {
        this.offset = event.first;
        this.perpage = event.rows;
        this.dataStore.get_types_of_activity(this.offset / this.perpage, this.perpage);
      }
    }
  }
</script>

<style scoped>

</style>


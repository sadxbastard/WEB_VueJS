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
      <Column field="picture_url" header="Лого">
        <template #body="slotProps">
          <img
              :src="slotProps.data.picture_url"
              alt="Лого"
              style="width: 100px; height: auto; border-radius: 4px;"
          />
        </template>
      </Column>
      <template #footer>
        <div class="text-end">
          <PrimeButton type="button"
                  @click="this.$router.push('/create_type_of_activity')"
                  icon="pi pi-plus"
                  label="Создать вид активности"
          />
        </div>
      </template>
  </DataTable>
</template>

<script>
  import DataTable from "primevue/datatable";
  import Column from "primevue/column";
  import {Button} from "primevue";
  import { useDataStore } from "@/stores/dataStore.js";

  export default {
    name: "TypeOfActivity",
    components: {DataTable, Column, PrimeButton: Button},
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


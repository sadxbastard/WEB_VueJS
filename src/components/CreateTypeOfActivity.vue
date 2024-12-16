<template>
  <div class="flex justify-center">
    <form v-on:submit.prevent="createTypeOfActivity" class="w-2/3 p-6">
      <h2 class="text-2xl mb-4 text-center" style="color: dimgrey">Создание вида активности</h2>
      <div class="flex flex-col mt-4">
        <InputText
            type="text"
            placeholder="Вида активности"
            v-model="this.typeOfActivityName"
        />
      </div>
      <div class="flex flex-col mt-4">
        <InputText
            type="text"
            placeholder="Максимальный балл"
            v-model="this.maximumScore"
        />
      </div>
      <div class="mb-4 mt-4">
        <label for="file" id="file-label" class="block text-md font-medium text-gray-500 border border-gray-300 rounded-md p-2">
          <span class="pi pi-upload mx-3">Выбрать изображение</span>
        </label>
        <input
            type="file"
            hidden
            id="file"
            name="file"
            v-on:change="changeCaption"
            required
            accept="image/*"
        />
      </div>
      <div class="flex flex-col mt-6">
        <PrimeButton type="submit" label="Создать" />
      </div>
    </form>
  </div>
  <Toast position="bottom-right" />
</template>

<script>
import InputText from 'primevue/inputtext'
import Button from 'primevue/button';
import {useDataStore} from "@/stores/dataStore";
import Toast from "primevue/toast";
import { useAuthStore } from '@/stores/authStore';
export default {
  name: "CreateTypeOfActivity",
  components: { InputText, PrimeButton: Button , Toast },
  data() {
    return {
      dataStore: useDataStore(),
      authStore: useAuthStore(),
      typeOfActivityName: '',
      maximumScore: '',
      userId: '',
      typeOfActivityImage: null,
    }
  },
  computed: {
    errorMessage() {
      return this.dataStore.errorMessage
    },
    errorCode() {
      return this.dataStore.errorCode
    }
  },
  methods: {
    changeCaption(event) {
      const file = event.target.files[0];
      if (file) {
        document.getElementById('file-label').innerHTML = '<span class="pi pi-file mx-3"></span>' + file.name;
        this.typeOfActivityImage = file;
      } else {
        document.getElementById('file-label').innerHtml = '<span class="pi pi-upload mx-3"></span>Выбрать изображение';
        this.typeOfActivityImage = null;
      }
    },
    async createTypeOfActivity() {
      const auth = useAuthStore();
      console.log(auth.user);
      const formData = new FormData();
      formData.append('type_of_activity_name', this.typeOfActivityName);
      formData.append('maximum_score', this.maximumScore);
      formData.append('user_id', auth.user.id);
      formData.append('image', this.typeOfActivityImage);
      await this.dataStore.create_type_of_activity(formData);
      if (this.errorCode > 0)
        this.$toast.add({
          severity: 'error',
          summary: "Ошибка создания вида активности",
          detail: this.errorMessage,
          life: 4000
        });
      else
        this.$toast.add({
          severity: 'success',
          summary: 'Вид активности был успешно создан',
          detail: this.errorMessage,
          life: 4000
        });
    }
  }
}
</script>

<style scoped>
.flex {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}
</style>
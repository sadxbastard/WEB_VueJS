import { defineStore } from "pinia";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const useDataStore = defineStore('data', {
   state: () => ({
       types_of_activity: [],
       types_of_activity_total: null,
       activities: [],
       activities_total: null,
       errorMessage: "",
   }),
   actions: {
       async get_types_of_activity(page = 0, perpage = 5){
           this.errorMesage = "";
           try{
               const response = await axios.get(backendUrl + "/type_of_activity", {
                   params: {
                       page: page,
                       perpage: perpage,
                   },
                   headers: {
                       'Content-Type': 'multipart/form-data',
                       Authorization: 'Bearer ' + localStorage.getItem('token')
                   }
               });
               this.types_of_activity = response.data;
           } catch (error) {
               if (error.response) {
                   this.errorMesage = error.response.data.message;
                   console.log(error);
               } else if (error.request) {
                   this.errorMesage = error.message;
                   console.log(error);
               } else {
                   console.log(error);
               }
           }
       },
       async get_activities(page = 0, perpage = 5){
           this.errorMesage = "";
           try{
               const response = await axios.get(backendUrl + "/activity", {
                   params: {
                       page: page,
                       perpage: perpage,
                   },
                   headers: {
                       'Content-Type': 'multipart/form-data',
                       Authorization: 'Bearer ' + localStorage.getItem('token')
                   }
               });
               this.activities = response.data;
           } catch (error) {
               if (error.response) {
                   this.errorMesage = error.response.data.message;
                   console.log(error);
               } else if (error.request) {
                   this.errorMesage = error.message;
                   console.log(error);
               } else {
                   console.log(error);
               }
           }
       },
       async get_types_of_activity_total(){
           this.errorMesage = "";
           try {
               const response = await axios.get(backendUrl + "/types_of_activity_total", {
                   headers: {
                       'Content-Type': 'multipart/form-data',
                       Authorization: 'Bearer ' + localStorage.getItem('token')
                   }
               });
               this.types_of_activity_total = response.data;
           } catch (error) {
               if (error.response) {
                   this.errorMesage = error.response.data.message;
                   console.log(error);
               } else if (error.request) {
                   this.errorMesage = error.message;
                   console.log(error);
               } else {
                   console.log(error);
               }
           }
       },
       async get_activities_total(){
           this.errorMesage = "";
           try {
               const response = await axios.get(backendUrl + "/activities_total",{
                   headers: {
                       'Content-Type': 'multipart/form-data',
                           Authorization: 'Bearer ' + localStorage.getItem('token')
                   }
               });
               this.activities_total = response.data;
           } catch (error) {
               if (error.response) {
                   this.errorMesage = error.response.data.message;
                   console.log(error);
               } else if (error.request) {
                   this.errorMesage = error.message;
                   console.log(error);
               } else {
                   console.log(error);
               }
           }
       },
   },
});
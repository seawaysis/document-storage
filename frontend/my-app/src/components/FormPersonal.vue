<template>
  <v-container class="fill-height text-center">
    <v-row justify="center">
        <v-col>
            <v-table>
                <thead>
                  <th>test</th>
                  <th>testttt</th>
                </thead>
                <tbody>
                <tr>sdsd</tr>
                <tr>sdsd</tr>
                </tbody>
            </v-table>
        </v-col>
    </v-row>
    <v-row justify="center">
      <v-col :cols="12" class="text-center">
        <v-form>
          <v-text-field
            v-model="name"
            :counter="20"
            label="Name"
            required
            @change="changeName"
          />
          <span>{{ name }}</span>
          <v-file-input
            v-model="file"
            label="upload a file"
            accept="file/*"
            @change="handleFileChange"
          />

          <v-btn :disabled="!file" @click="uploadFile"> Upload </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import axios from "axios";
import { ref } from "vue";

const getName = ref<string>("test");
export default {
  //async setup(){
  //    let persons = defineProps({
  //        id: Number,
  //        name: String,
  //        createdAt: Date
  //    });
  //    persons = await axios.get('localhost:8080/personal');
  //    console.log(persons);
  //},
  data() {
    return {
      file: null,
      name: "",
    };
  },
  methods: {
    handleFileChange() {
      console.log("File selected:", this.file);
    },
    changeName() {
      getName.value = this.name;
    },
    async uploadFile() {
      console.log("name : ", this.name);
      if (this.file) {
        const formData = new FormData();
        formData.append("file", this.file);
        formData.append("firstName", this.name);

        try {
          const response = await axios.post(
            "http://localhost:8080/personal",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

          console.log("File uploaded successfully:", response.data);
        } catch (error) {
          console.error("File upload error:", error);
        }
      }
    },
  },
};
</script>
